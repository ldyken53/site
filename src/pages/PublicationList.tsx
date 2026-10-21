import React from 'react';
import PubEntry from '../components/PubEntry';
import { CATEGORIES, categoryOf, listed } from '../data/pubs';
import { SCHOLAR_URL } from '../data/site';
import { usePage } from '../melee/HueContext';

const PublicationList: React.FC = () => {
    usePage('Publications', 'red');
    const extra = Array.from(new Set(listed.map(({ pub }) => categoryOf(pub)))).filter(c => !CATEGORIES.includes(c));
    return (
        <>
            <h1 className="page-title">Publications</h1>
            <p>You can also find my articles on <a href={SCHOLAR_URL}>my Google Scholar profile</a>.</p>
            {[...CATEGORIES, ...extra].map(category => {
                const entries = listed.filter(({ pub }) => categoryOf(pub) === category);
                if (!entries.length) return null;
                return (
                    <section key={category}>
                        <h2 className="section-title">{category}</h2>
                        {entries.map(({ pub, id }) => <PubEntry key={id} pub={pub} id={id} />)}
                    </section>
                );
            })}
        </>
    );
};

export default PublicationList;
