import React from 'react';
import { CONTACTS } from '../data/site';
import MenuScreen, { MenuItem } from '../melee/MenuScreen';
import PreviewList from '../melee/PreviewList';

const items: MenuItem[] = CONTACTS.map(c => ({
    label: c.label,
    caption: c.caption,
    href: c.href,
    preview: <PreviewList items={c.preview} />,
}));

const Contact: React.FC = () => (
    <MenuScreen title={['Contact']} hue="green" parent="/" layout="sub" items={items} />
);

export default Contact;
