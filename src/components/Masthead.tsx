import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { CV_URL, NAME } from '../data/site';
import { useHue } from '../melee/HueContext';
import { Hue } from '../melee/hues';

const NAV: Array<{ label: string; hue: Hue; to?: string; href?: string }> = [
    { label: 'Publications', hue: 'red', to: '/publications' },
    { label: 'CV', hue: 'green', href: CV_URL },
];

const Masthead: React.FC = () => {
    const { setHoverHue } = useHue();
    return (
        <header className="masthead">
            <nav className="masthead-inner">
                <Link className="site-title" to="/" onPointerEnter={() => setHoverHue('blue')} onPointerLeave={() => setHoverHue(null)}>
                    {NAME}
                </Link>
                <ul className="nav-links">
                    {NAV.map(item => (
                        <li key={item.label} onPointerEnter={() => setHoverHue(item.hue)} onPointerLeave={() => setHoverHue(null)}>
                            {item.to
                                ? <NavLink to={item.to}>{item.label}</NavLink>
                                : <a href={item.href} target="_blank" rel="noopener noreferrer">{item.label}</a>}
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Masthead;
