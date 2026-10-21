import React from 'react';
import { Link } from 'react-router-dom';
import { Publication } from '../data/pubs';
import ThumbBox from '../melee/ThumbBox';
import Authors from './Authors';
import Venue from './Venue';
import PubLinks from './PubLinks';

// One AcademicPages archive item: title, authors, venue line, links.
const PubEntry: React.FC<{ pub: Publication }> = ({ pub }) => {
    const to = `/publications/${pub.short_title}`;
    return (
        <article className="archive-item">
            {pub.thumb && (
                <Link to={to} className="archive-thumb" tabIndex={-1} aria-hidden="true">
                    <ThumbBox src={pub.thumb} />
                </Link>
            )}
            <div className="archive-body">
                <h3 className="archive-title">
                    <Link to={to}>{pub.title}</Link>
                </h3>
                <Authors authors={pub.authors} />
                <Venue pub={pub} />
                <PubLinks pub={pub} />
            </div>
        </article>
    );
};

export default PubEntry;
