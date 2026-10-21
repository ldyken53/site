import React from 'react';
import { BIO, CV_URL } from '../data/site';
import profile from '../img/profile.jpg';
import MenuScreen, { MenuItem } from '../melee/MenuScreen';

const items: MenuItem[] = [
    { label: 'Publications', caption: 'Read the papers!', to: '/publications' },
    { label: 'Contact', caption: 'Get in touch!', to: '/contact' },
    { label: 'CV', caption: 'View the CV.', href: CV_URL },
];

const Profile: React.FC = () => (
    <MenuScreen
        title={['Profile']}
        hue="blue"
        parent="/"
        layout="detail"
        items={items}
        paneLabel={() => 'Profile'}
        panel={() => (
            <>
                <img className="info-portrait" alt="Landon Dyken" src={profile} />
                <h2 className="info-title">Landon Dyken</h2>
                <p className="info-meta">Graduate Research Assistant</p>
                <p className="info-meta">University of Illinois Chicago</p>
                <h3 className="info-heading">About</h3>
                <p className="info-body">{BIO}</p>
            </>
        )}
    />
);

export default Profile;
