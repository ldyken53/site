import React from 'react';
import publications from '../data/publications.json';
import { CONTACTS, CV_URL } from '../data/site';
import profile from '../img/profile.jpg';
import MenuScreen, { MenuItem } from '../melee/MenuScreen';
import PreviewList from '../melee/PreviewList';

const items: MenuItem[] = [
    {
        label: 'Profile',
        hue: 'blue',
        caption: 'Meet Landon!',
        to: '/profile',
        preview: (
            <>
                <img className="preview-thumb tall" alt="" src={profile} />
                <PreviewList items={['Landon Dyken', 'PhD Student', 'UIC']} />
            </>
        ),
    },
    {
        label: 'Publications',
        hue: 'red',
        caption: 'Read the papers!',
        to: '/publications',
        preview: <PreviewList items={publications.map(p => p.label)} small />,
    },
    {
        label: 'Contact',
        hue: 'green',
        caption: 'Get in touch!',
        to: '/contact',
        preview: <PreviewList items={CONTACTS.map(c => c.label)} />,
    },
    {
        label: 'CV',
        caption: 'View the CV.',
        href: CV_URL,
        preview: <PreviewList items={['Curriculum Vitae', 'Ph.D. · UIC', 'M.S. · UAB 2023', 'B.S. · UAB 2021']} />,
    },
];

const MainMenu: React.FC = () => <MenuScreen title={['Main Menu']} layout="main" items={items} />;

export default MainMenu;
