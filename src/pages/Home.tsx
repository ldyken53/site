import React from 'react';
import { Link } from 'react-router-dom';
import PubEntry from '../components/PubEntry';
import { selected } from '../data/pubs';
import { BIO } from '../data/site';
import { usePage } from '../melee/HueContext';

const Home: React.FC = () => {
    usePage(null, 'blue');
    return (
        <>
            <h1 className="page-title">About me</h1>
            {BIO.map((para, i) => <p key={i}>{para}</p>)}
            <h2 className="section-title">
                Selected Publications
                <Link className="see-all" to="/publications">See all →</Link>
            </h2>
            {selected.map(pub => <PubEntry key={pub.short_title} pub={pub} />)}
        </>
    );
};

export default Home;
