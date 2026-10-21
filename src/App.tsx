import React from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import './melee/melee.css';
import { ScreenProvider } from './melee/ScreenContext';
import Stage from './melee/Stage';
import Contact from './pages/Contact';
import Fun from './pages/Fun';
import MainMenu from './pages/MainMenu';
import Profile from './pages/Profile';
import Paper from './pages/Publication';
import PublicationList from './pages/PublicationList';

function Publication() {
    const id = useParams()['pubId'];
    return <Paper key={id} id={parseFloat(id!)} />;
}

function App() {
    return (
        <ScreenProvider>
            <Stage>
                <Routes>
                    <Route path="/" element={<MainMenu />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/publications" element={<PublicationList />} />
                    <Route path="/publications/:pubId" element={<Publication />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/camille" element={<Fun />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Stage>
        </ScreenProvider>
    );
}

export default App;
