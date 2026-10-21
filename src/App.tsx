import React from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import './site.css';
import Footer from './components/Footer';
import Masthead from './components/Masthead';
import Sidebar from './components/Sidebar';
import Background from './melee/Background';
import { HueProvider, useHue } from './melee/HueContext';
import Fun from './pages/Fun';
import Home from './pages/Home';
import Paper from './pages/Publication';
import PublicationList from './pages/PublicationList';

function Publication() {
    const id = useParams()['pubId'];
    return <Paper key={id} id={parseFloat(id!)} />;
}

function Page() {
    const { hue } = useHue();
    return (
        <div className={`site hue-${hue}`}>
            <Background hue={hue} />
            <Masthead />
            <div className="page-wrap">
                <Sidebar />
                <main className="page-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/publications" element={<PublicationList />} />
                        <Route path="/publications/:pubId" element={<Publication />} />
                        <Route path="/camille" element={<Fun />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </main>
            </div>
            <Footer />
        </div>
    );
}

function App() {
    return (
        <HueProvider>
            <Page />
        </HueProvider>
    );
}

export default App;
