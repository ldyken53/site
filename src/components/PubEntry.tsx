import React from 'react';
import { Link } from 'react-router-dom';
import { Publication } from '../data/pubs';
import ThumbBox from '../melee/ThumbBox';
import Authors from './Authors';
import PubLinks from './PubLinks';

// One AcademicPages archive item: title, authors, venue line, links.
const PubEntry: React.FC<{ pub: Publication; id: number }> = ({ pub, id }) => {
    return (
        <article className="archive-item">
            {pub.thumb && (
                <Link to={`/publications/${id}`} className="archive-thumb" tabIndex={-1} aria-hidden="true">
                    <ThumbBox src={pub.thumb} />
                </Link>
            )}
            <div className="archive-body">
                <h3 className="archive-title">
                    <Link to={`/publications/${id}`}>{pub.title}</Link>
                </h3>
                <Authors authors={pub.authors} />
                <p className="archive-meta">
                    Published in <i>{pub.venue}</i>, {pub.year}
                    {pub.award && <span className="award">{pub.award}</span>}
                </p>
                <PubLinks pub={pub} />
            </div>
        </article>
    );
};

export default PubEntry;
