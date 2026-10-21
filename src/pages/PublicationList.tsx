import React from 'react';
import publications from '../data/publications.json';
import MenuScreen, { MenuItem } from '../melee/MenuScreen';

const items: MenuItem[] = publications.map((pub, i) => ({
    label: pub.label,
    caption: pub.award ? `${pub.venue_short} · ${pub.award}!` : pub.venue_short,
    to: `/publications/${i}`,
    preview: (
        <>
            {pub.thumb && <img className="preview-thumb" alt="" src={pub.thumb} />}
            <p className="preview-title">{pub.title}</p>
        </>
    ),
}));

const PublicationList: React.FC = () => (
    <MenuScreen title={['Publications']} hue="red" parent="/" layout="sub" items={items} />
);

export default PublicationList;
