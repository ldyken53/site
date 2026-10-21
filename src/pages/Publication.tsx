import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Authors from '../components/Authors';
import PubLinks from '../components/PubLinks';
import { listed, publications } from '../data/pubs';
import { usePage } from '../melee/HueContext';
import ThumbBox from '../melee/ThumbBox';

const Paper: React.FC<{ id: number }> = ({ id }) => {
    const pub = publications[id];
    usePage(pub?.title ?? null, 'red');
    const [copied, setCopied] = useState(false);
    if (!pub?.title) return <Navigate to="/publications" replace />;

    const at = listed.findIndex(entry => entry.id === id);
    const prev = listed[at - 1];
    const next = listed[at + 1];
    const copy = () => {
        navigator.clipboard.writeText(pub.bibtex!);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <article>
            <h1 className="page-title">{pub.title}</h1>
            <Authors authors={pub.authors} />
            <p className="archive-meta">
                Published in <i>{pub.venue}</i>, {pub.year}
                {pub.award && <span className="award">{pub.award}</span>}
            </p>
            {pub.thumb && <ThumbBox className="thumb-large" src={pub.thumb} turn={-6} tilt={6} fitImage />}
            {pub.teaser && (
                <figure className="teaser">
                    <img alt="teaser" src={pub.teaser} />
                    <figcaption><b>Fig. 1: </b><i>{pub.teaser_caption}</i></figcaption>
                </figure>
            )}
            {pub.abstract && (
                <>
                    <h2 className="section-title">Abstract</h2>
                    <p>{pub.abstract}</p>
                </>
            )}
            <PubLinks pub={pub} copy={false} />
            {pub.supplemental_video && (
                <>
                    <h2 className="section-title">Supplemental Video</h2>
                    <iframe title="Supplemental video" className="video" allowFullScreen src={pub.supplemental_video} />
                </>
            )}
            {pub.presentation_video && (
                <>
                    <h2 className="section-title">Presentation Video</h2>
                    <iframe title="Presentation video" className="video" allowFullScreen src={pub.presentation_video} />
                </>
            )}
            {pub.bibtex && (
                <>
                    <h2 className="section-title">
                        BibTeX
                        <button className="copy-button" onClick={copy}>{copied ? 'Copied!' : 'Copy'}</button>
                    </h2>
                    <pre className="bibtex"><code>{pub.bibtex}</code></pre>
                </>
            )}
            <nav className="pagination">
                {prev ? <Link to={`/publications/${prev.id}`}>← Previous</Link> : <span className="disabled">← Previous</span>}
                {next ? <Link to={`/publications/${next.id}`}>Next →</Link> : <span className="disabled">Next →</span>}
            </nav>
        </article>
    );
};

export default Paper;
