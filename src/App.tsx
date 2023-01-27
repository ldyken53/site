import React from 'react';
import './App.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Paper from './pages/Publication';
import PublicationList from './pages/PublicationList';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';

function Publication() {
    let id = useParams()!['pubId'];
    return <Paper id={parseFloat(id!)} />
}

function App() {
  return (
    <Router><div className="App">
        <header className="App-header">
            <Navbar fixed="top" expand="lg">
            <Container>
                <Navbar.Brand style={{fontSize: '2rem'}} className="color" href="/">Landon Dyken</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link style={{fontSize: '1.25rem'}} href="/publications">Publications</Nav.Link>
                    <Nav.Link style={{fontSize: '1.25rem'}} href="/projects">Projects</Nav.Link>
                    <Nav.Link style={{fontSize: '1.25rem'}} href="https://docs.google.com/document/d/1IM8minmPcwixm0tvnp9xvlVqKlPKWllHsAJ4NTmMGbY/edit?usp=sharing">Resume</Nav.Link>
                </Nav>
            </Container>
            </Navbar>
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path={`${process.env.PUBLIC_URL}/publications/:pubId`} element={<div><Publication /></div>} />
                <Route path={`${process.env.PUBLIC_URL}/publications`} element={<div className="page"><PublicationList /></div>} />
                {/* <Route path='/projects' element={<Paper page={publications[0]}></Paper>}/> */}
            </Routes>
        </header>
    </div></Router>
  );
}

export default App;
