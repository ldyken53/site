import React from 'react';
import { Publication, venueLead } from '../data/pubs';

const Venue: React.FC<{ pub: Publication }> = ({ pub }) => (
    <p className="archive-meta">
        {venueLead(pub)} <i>{pub.venue}</i>, {pub.year}
        {pub.award && <span className="award">{pub.award}</span>}
    </p>
);

export default Venue;
