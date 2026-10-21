import React from 'react';
import { Link } from 'react-router-dom';
import { Publication, citationOf, excerptOf, linksOf } from '../data/pubs';
import ThumbBox from '../melee/ThumbBox';

// One AcademicPages archive item: title, venue line, excerpt, citation, links.
const PubEntry: React.FC<{ pub: Publication; id: number }> = ({ pub, id }) => {
    const cite = citationOf(pub);
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
                <p className="archive-meta">
                    Published in <i>{pub.venue}</i>, {pub.year}
                    {pub.award && <span className="award">{pub.award}</span>}
                </p>
                {pub.abstract && <p className="archive-excerpt">{excerptOf(pub)}</p>}
                <p className="archive-citation">
                    Recommended citation: {cite.lead}<i>{cite.venue}</i>.
                </p>
                <p className="archive-links">
                    {linksOf(pub).map((link, i) => (
                        <React.Fragment key={link.href}>
                            {i > 0 && <span className="sep"> | </span>}
                            <a href={link.href}>{link.label}</a>
                        </React.Fragment>
                    ))}
                </p>
            </div>
        </article>
    );
};

export default PubEntry;
