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
    const items = linksOf(pub).map(link => <a key={link.href} href={link.href}>{link.label}</a>);
    if (copy && pub.bibtex) {
        items.push(<button key="bibtex" className="link-button" onClick={copyBibtex}>{copied ? 'Copied!' : 'Copy BibTeX'}</button>);
    }
    if (!items.length) return null;
    return (
        <p className="archive-links">
            {items.map((item, i) => (
                <React.Fragment key={item.key}>
                    {i > 0 && <span className="sep"> | </span>}
                    {item}
                </React.Fragment>
            ))}
        </p>
    );
};

export default PubLinks;
