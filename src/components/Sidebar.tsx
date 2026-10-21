import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuildingColumns, faEnvelope, faGraduationCap, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { CONTACTS, NAME, PROFILE } from '../data/site';
import profile from '../img/profile.jpg';

// The AcademicPages author profile.
const Sidebar: React.FC = () => (
    <aside className="sidebar">
        <div className="author-avatar">
            <img src={profile} alt={NAME} />
        </div>
        <div className="author-content">
            <h2 className="author-name">{NAME}</h2>
            <p className="author-bio">{PROFILE.bio}</p>
        </div>
        <ul className="author-links">
            <li><FontAwesomeIcon icon={faLocationDot} fixedWidth />{PROFILE.location}</li>
            <li><FontAwesomeIcon icon={faBuildingColumns} fixedWidth />{PROFILE.employer}</li>
            <li><a href={CONTACTS.email}><FontAwesomeIcon icon={faEnvelope} fixedWidth />Email</a></li>
            <li><a href={CONTACTS.scholar}><FontAwesomeIcon icon={faGraduationCap} fixedWidth />Google Scholar</a></li>
            <li><a href={CONTACTS.github}><FontAwesomeIcon icon={faGithub} fixedWidth />GitHub</a></li>
            <li><a href={CONTACTS.linkedin}><FontAwesomeIcon icon={faLinkedin} fixedWidth />LinkedIn</a></li>
        </ul>
    </aside>
);

export default Sidebar;
