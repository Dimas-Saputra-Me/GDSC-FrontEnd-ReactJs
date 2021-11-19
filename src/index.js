import React, { useState, useEffect, createRef } from 'react';
import ReactDOM from 'react-dom';

// Import package for online rest api
import axios from 'axios'

//Import package for page navigation
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

// Import Bootstrap
import { Navbar, Container, Nav, Form, FormControl, Button, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

//Import Cookies
import { useCookies } from 'react-cookie';

// Import css
import './css/style.css';

function NavBar() {
    const [value, setValue] = useState('');
    let inputRef = createRef();
    let navigate = useNavigate();

    function submit(i) {
        setValue(inputRef.current.value);
        navigate("/detail", { state: { id: inputRef.current.value } });
    }

    useEffect(() => {
        inputRef.current.value = value;
    }, [value, inputRef]);

    return (
        <Navbar bg="dark" expand="lg" variant="dark">
            <Container fluid>
                <Navbar.Brand href="./">Movies21</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link active={(window.location.href.endsWith('/') ? true : false)} href="./">Home</Nav.Link>
                        <Nav.Link active={(window.location.href.endsWith('/about') ? true : false)} href="./about">About</Nav.Link>
                    </Nav>
                    <Form className="d-flex" onSubmit={(e) => { e.preventDefault(); submit() }}>
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            ref={inputRef}
                        />
                        <Button variant="outline-success" type="submit" >Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

function Title() {
    return (
        <h1 className="judul-text">Movies21</h1>
    )
}

function FilmListContainer({ id }) {
    const [film, setFilm] = useState({ value: [] });
    const [cookies, setCookie, removeCookie] = useCookies(['film']);
    let navigate = useNavigate();

    useEffect(() => {
        const fetchDataPhotos = async () => {
            const { data } = await axios(
                `https://jsonplaceholder.typicode.com/photos/${(id === undefined) ? '?_limit=50' : id
                }`
            );
            setFilm({ value: data, });
        };

        fetchDataPhotos();
    }, [setFilm, id]);

    function addData(film) {
        if ("film" in cookies) {
            setCookie('film', cookies.film.concat(film));
        } else {
            setCookie('film', [film]);
        }
    }

    function checkDetail() {
        if (id === undefined) {
            return (
                <>
                    {(!cookies.film) ? '' : <WishlistContainer cookies={cookies} setCookie={setCookie} removeCookie={removeCookie} />}
                    {film.value &&
                        film.value.map((film, index) => (
                            <div className="film-container" key={index}>
                                <h3>{film.title}</h3>
                                <img src={film.thumbnailUrl} alt="Cover Film" />
                                <p></p>
                                <p className="deskripsi-film"> Director : {film.title} </p>
                                <p className="deskripsi-film"> Publisher : {film.title} </p>
                                <p className="deskripsi-film"> Sinopsis Film :</p>
                                <p className="deskripsi-film"> &emsp; {
                                    film.title + film.title + film.title + film.title + film.title + film.title +
                                    film.title + film.title + film.title + film.title + film.title + film.title
                                } </p>
                                <Button className="my-2" variant="primary" onClick={() => addData(film)} > Add to Wishlist </Button>
                                <br/>
                                <Button className="my-2" variant="primary" onClick={(e) => {
                                    e.preventDefault();
                                    navigate("/detail", { state: { id: film.id } });
                                }} > View Detail </Button>

                            </div>)
                        )}
                </>
            )
        } else {
            return (
                <div className="film-container">
                    <h3>{film.value.title}</h3>
                    <img src={film.value.thumbnailUrl} alt="Cover Film" />
                    <p></p>
                    <p className="deskripsi-film"> Director : {film.value.title} </p>
                    <p className="deskripsi-film"> Publisher : {film.value.title} </p>
                    <p className="deskripsi-film"> Sinopsis Film :</p>
                    <p className="deskripsi-film"> &emsp; {
                        film.value.title + film.value.title + film.value.title + film.value.title + film.value.title + film.value.title +
                        film.value.title + film.value.title + film.value.title + film.value.title + film.value.title + film.value.title +
                        film.value.title + film.value.title + film.value.title + film.value.title + film.value.title + film.value.title
                    } </p>
                    <p className="deskripsi-film"> &emsp; {
                        film.value.title + film.value.title + film.value.title + film.value.title + film.value.title + film.value.title +
                        film.value.title + film.value.title + film.value.title + film.value.title + film.value.title + film.value.title +
                        film.value.title + film.value.title + film.value.title + film.value.title + film.value.title + film.value.title
                    } </p>
                    <p className="deskripsi-film"> &emsp; {
                        film.value.title + film.value.title + film.value.title + film.value.title + film.value.title + film.value.title +
                        film.value.title + film.value.title + film.value.title + film.value.title + film.value.title + film.value.title +
                        film.value.title + film.value.title + film.value.title + film.value.title + film.value.title + film.value.title
                    } </p>
                    <Button className="my-2" variant="primary" onClick={() => addData(film.value)} > Add to Wishlist </Button>
                    <br />
                    <Button className="my-2" variant="primary" onClick={(e) => {
                        e.preventDefault();
                        navigate("/");
                    }} > Back </Button>

                </div>
            )
        }
    }


    return (
        <div id="containerFilm">
            {checkDetail()}
        </div>
    )
}


function WishlistContainer({ cookies, setCookie, removeCookie }) {
    let navigate = useNavigate();

    function removeFilm(index) {
        const dataBaru = cookies.film.filter((arr, i) => i !== index);
        setCookie('film', dataBaru)
    }

    function removeAll() {
        removeCookie('film');
    }

    return (
        <div className="wishlist-container">
            <h3 className="title" > Wishlist </h3>
            {cookies.film &&
                cookies.film.map((film, index) => (
                    <Row key={index}>
                        <Col xs={12} md={8} className="px-5">
                            <p>
                                {index + 1}. {film.title} <br />
                                &emsp;Director  : {film.title} <br />
                                &emsp;Publisher : {film.title} <br />
                            </p>
                            <Button className="my-2 mb-4" variant="primary" onClick={(e) => {
                                    e.preventDefault();
                                    navigate("/detail", { state: { id: film.id } });
                                }} > View Detail </Button>
                        </Col>
                        <br />
                        <br />
                        <Col xs={6} md={4} className="my-auto text-center">
                            <Button variant="danger" onClick={() => removeFilm(index)}> Remove </Button>
                        </Col>
                    </Row>
                ))}
            {(cookies.film.length <= 1) ? '' : (
                <Col className="text-center my-2" >
                    <Button variant="danger" onClick={() => removeAll()}> Remove All </Button>
                </Col>
            )}
        </div>
    )
}

function AboutPage() {
    return (
        <div className="about-container">
            <br />
            <h1>Hi, I'm Dimas Saputra <img alt="Banner" src="https://media.giphy.com/media/hvRJCLFzcasrR4ia7z/giphy.gif" width="35" /></h1>
            <p>
                <a href="https://github.com/DenverCoder1/readme-typing-svg"><img alt="Typing Banner" src="https://readme-typing-svg.herokuapp.com?lines=Informatics%20Engineering%20Student;Technology%20Enthusiast;&center=true&width=500&height=50" /></a>
            </p>

            <h2> Github Profile stats </h2>
            <br />
            <p>
                <a href="https://github.com/Dimas-Saputra-Me"><img src="https://github-readme-stats.vercel.app/api?username=Dimas-Saputra-Me&show_icons=true&locale=en&theme=algolia" alt="Dimas-Saputra-Me" height="192px" /></a>
            </p>
            <br />

            <details>
                <summary><b>See More Stats </b></summary>
                <br />
                <p><img src="https://github-readme-streak-stats.herokuapp.com/?user=Dimas-Saputra-Me&theme=algolia" alt="Dimas-Saputra-Me" /></p>
                <p ><img src="https://github-readme-stats.vercel.app/api/top-langs?username=Dimas-Saputra-Me&show_icons=true&locale=en&layout=compact&theme=algolia" alt="Dimas-Saputra-Me" height="192px" /></p>
                <a href="https://github.com/Dimas-Saputra-Me"><img alt="Dimas Saputra Activity Graph" src="https://activity-graph.herokuapp.com/graph?username=Dimas-Saputra-Me&custom_title=Dimas%20Saputra%20Contribution%20Graph&theme=react-dark" /></a>
                <br />
            </details>

            <br />

            <h2> Languages, Tools, and Softwares </h2>

            <br />

            <h4><b>Languages : </b></h4>
            <p>
                &emsp;
                <a href="-" target="_blank">
                    <img alt="HTML" src="https://img.shields.io/badge/HTML5%20-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white" />
                </a>
                &emsp;
                <a href="-" target="_blank">
                    <img alt="CSS" src="https://img.shields.io/badge/CSS%20-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white" />
                </a>
                &emsp;
                <a href="-" target="_blank">
                    <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript%20-%23F7DF1E.svg?&style=for-the-badge&logo=javascript&logoColor=black" />
                </a>
                &emsp;
                <a href="-" target="_blank">
                    <img alt="PHP" src="https://img.shields.io/badge/PHP-%23777BB4.svg?&style=for-the-badge&logo=php&logoColor=white" />
                </a>
                &emsp;
                <a href="-" target="_blank">
                    <img alt="C++" src="https://img.shields.io/badge/C++%20-%2300599C.svg?&style=for-the-badge&logo=c%2B%2B&logoColor=white" />
                </a>
                &emsp;
                <a href="-" target="_blank">
                    <img alt="Dart" src="https://img.shields.io/badge/Dart%20-%230175C2.svg?&style=for-the-badge&logo=dart&logoColor=white" />
                </a>
                &emsp;
            </p>
            <br />
            <h4><b>Frameworks : </b></h4>
            <p>
                &emsp;
                <a href="-" target="_blank">
                    <img alt="Flutter" src="https://img.shields.io/badge/Flutter%20-%2302569B.svg?&style=for-the-badge&logo=Flutter&logoColor=white" />
                </a>
                &emsp;
            </p>
            <br />
            <h4><b>Version Control : </b></h4>
            <p>
                &emsp;
                <a href="-" target="_blank">
                    <img alt="Git" src="https://img.shields.io/badge/git%20-%23F05033.svg?&style=for-the-badge&logo=git&logoColor=white" />
                </a>
                &emsp;
                <a href="-" target="_blank">
                    <img alt="GitHub" src="https://img.shields.io/badge/github%20-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white" />
                </a>
                &emsp;
            </p>
            <br />
            <br />
            <h2> Contact Me </h2>
            <p>
                <a href="https://www.linkedin.com/in/dimas-saputra-7b82b721b/"><img alt="LinkedIn" src="https://img.shields.io/badge/Linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white" /></a>
                &emsp;<a href="./about.html"><img alt="StackOverflow" src="https://img.shields.io/badge/<>-FE7A16?style=for-the-badge&logo=stack-overflow&logoColor=white" /></a>
                &emsp;<a href="./about.html"><img alt="Facebook" src="https://img.shields.io/badge/<>-%23034EFC.svg?&style=for-the-badge&logo=Facebook&logoColor=white" /></a>
                &emsp;<a href="./about.html"><img alt="Instagram" src="https://img.shields.io/badge/<>-%23E4405F.svg?&style=for-the-badge&logo=Instagram&logoColor=white" /></a>
            </p>
        </div>
    )
}

function DetailPage() {
    const location = useLocation();
    const { id } = location.state;

    return (
        <>
            <Title />
            <FilmListContainer id={id} />
        </>
    )
}

function MainPage() {
    return (
        <>
            <Title />
            <FilmListContainer />
        </>
    )
}


function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="detail" element={<DetailPage />} />
                <Route path="about" element={<AboutPage />} />
            </Routes>
        </Router>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);