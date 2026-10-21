import React from 'react';
import { NAME } from '../data/site';

// The author list with my name highlighted.
const Authors: React.FC<{ authors: string }> = ({ authors }) => (
    <p className="archive-authors">
        {authors.split(NAME).map((part, i) => (
            <React.Fragment key={i}>
                {i > 0 && <strong className="me">{NAME}</strong>}
                {part}
            </React.Fragment>
        ))}
    </p>
);

export default Authors;
