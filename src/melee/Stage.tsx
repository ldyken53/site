import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Background from './Background';
import Fit from './Fit';
import Frame from './Frame';
import { useScreen } from './ScreenContext';
import { STAGE_H, STAGE_W } from './hues';

const TITLE_X = 120;

// The fixed 1280x960 stage, scaled uniformly and letterboxed (design.md, Layout).
const Stage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { screen, swinging, go } = useScreen();
    const [scale, setScale] = useState(1);
    const [titleW, setTitleW] = useState(240);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const fit = () => setScale(Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H));
        fit();
        window.addEventListener('resize', fit);
        return () => window.removeEventListener('resize', fit);
    }, []);

    const titleKey = screen.title.join(' ');
    useLayoutEffect(() => {
        const measure = () => titleRef.current && setTitleW(titleRef.current.offsetWidth);
        measure();
        document.fonts?.ready.then(measure);
    }, [titleKey]);

    useEffect(() => { document.title = screen.title[0] === 'Main Menu' ? 'Landon Dyken' : `${titleKey} · Landon Dyken`; }, [screen.title, titleKey]);

    const twoLine = screen.caption.length > 30;

    return (
        <div className="viewport">
            <Background hue={screen.hue} />
            <svg width={0} height={0} style={{ position: 'absolute' }} aria-hidden="true">
                <defs>
                    <linearGradient id="melee-gold" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#B8903F" />
                        <stop offset="1" stopColor="#7A5C28" />
                    </linearGradient>
                </defs>
            </svg>
            <div className="stage" style={{ transform: `translate(-50%, -50%) scale(${scale})` }}>
                <div className={`camera${swinging ? ' swing' : ''}`}>
                    <Frame hue={screen.hue} notchX={Math.max(300, TITLE_X + titleW + 28)} />
                    <h1 ref={titleRef} className="screen-title" style={{ left: TITLE_X }}>
                        {screen.title.map((part, i) => <React.Fragment key={i}>{i > 0 && ' '}<span>{part}</span></React.Fragment>)}
                    </h1>
                    {screen.parent !== undefined && (
                        <button className="back-prompt" onClick={() => go(screen.parent!)}>
                            <span className="b-button">B</span>Back
                        </button>
                    )}
                    {children}
                    <div className={`caption-pill${twoLine ? ' two-line' : ''}`} aria-live="polite">
                        {twoLine ? screen.caption : <Fit>{screen.caption}</Fit>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stage;
