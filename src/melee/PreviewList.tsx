import React from 'react';
import Fit from './Fit';

// A preview-pane list of the next screen's items, each line condensed to fit.
const PreviewList: React.FC<{ items: string[]; small?: boolean }> = ({ items, small }) => (
    <ul className={`preview-list${small ? ' small' : ''}`}>
        {items.map(item => (
            <li key={item}><Fit align="left">{item}</Fit></li>
        ))}
    </ul>
);

export default PreviewList;
