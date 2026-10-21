import React from 'react';
import { CONTACTS, NAME } from '../data/site';

const Footer: React.FC = () => (
    <footer className="page-footer">
        <div className="footer-follow">
            <strong>Follow:</strong>
            <a href={CONTACTS.github}>GitHub</a>
            <a href={CONTACTS.scholar}>Google Scholar</a>
            <a href={CONTACTS.linkedin}>LinkedIn</a>
        </div>
        <div className="footer-copyright">
            © {new Date().getFullYear()} {NAME}
        </div>
    </footer>
);

export default Footer;
