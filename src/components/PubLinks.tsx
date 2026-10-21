import React, { useState } from 'react';
import { Publication, linksOf } from '../data/pubs';

// Pipe-separated paper links, optionally ending in a Copy BibTeX action.
const PubLinks: React.FC<{ pub: Publication; copy?: boolean }> = ({ pub, copy = true }) => {
    const [copied, setCopied] = useState(false);
    const copyBibtex = () => {
        navigator.clipboard.writeText(pub.bibtex!);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };
    return (
        <p className="archive-links">
            {linksOf(pub).map((link, i) => (
                <React.Fragment key={link.href}>
                    {i > 0 && <span className="sep"> | </span>}
                    <a href={link.href}>{link.label}</a>
                </React.Fragment>
            ))}
            {copy && pub.bibtex && (
                <>
                    <span className="sep"> | </span>
                    <button className="link-button" onClick={copyBibtex}>{copied ? 'Copied!' : 'Copy BibTeX'}</button>
                </>
            )}
        </p>
    );
};

export default PubLinks;
