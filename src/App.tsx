import React from 'react';
import './App.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Paper from './pages/Publication';
import PublicationList from './pages/PublicationList';
import Fun from './pages/Fun'
import Home from './pages/Home';
import { HashRouter as Router, Routes, Route, useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

function Publication() {
    let id = useParams()!['pubId'];
    return <Paper id={parseFloat(id!)} />
}

function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
        <header className="App-header">
            <Navbar fixed="top" expand="lg">
            <Container>
                <Navbar.Brand style={{fontSize: '2rem'}} className="color" href="/">Landon Dyken</Navbar.Brand>
                <Nav className="me-auto">
                    <Link className="nav-link" style={{fontSize: '1.25rem'}} to="/publications">Publications</Link>
                    <Link className="nav-link" style={{fontSize: '1.25rem'}} to="/projects">Projects</Link>
                    <Nav.Link style={{fontSize: '1.25rem'}} href="https://drive.google.com/file/d/1Jrk69NGqaLh3WmHiGV2YlE-Cmr0Tlptc/view?usp=sharing">CV</Nav.Link>
                </Nav>
            </Container>
            </Navbar>
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path={`/publications/:pubId`} element={<div><Publication /></div>} />
                <Route path={`/publications`} element={<div className="page"><PublicationList /></div>} />
                <Route path={`/camille`} element={<div className="page"><Fun /></div>} />
                {/* <Route path='/projects' element={<Paper page={publications[0]}></Paper>}/> */}
            </Routes>
        </header>
    </div>
  );
}

export default App;
