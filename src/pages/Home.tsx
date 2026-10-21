import React from 'react';
import { Link } from 'react-router-dom';
import PubEntry from '../components/PubEntry';
import { listed } from '../data/pubs';
import { BIO } from '../data/site';
import { usePage } from '../melee/HueContext';

const RECENT = 3;

const Home: React.FC = () => {
    usePage(null, 'blue');
    return (
        <>
            <h1 className="page-title">About me</h1>
            {BIO.map((para, i) => <p key={i}>{para}</p>)}
            <h2 className="section-title">Recent Publications</h2>
            {listed.slice(0, RECENT).map(pub => <PubEntry key={pub.short_title} pub={pub} />)}
            <p><Link to="/publications">All publications →</Link></p>
        </>
    );
};

export default Home;
