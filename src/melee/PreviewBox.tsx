import React from 'react';
import { HUES, Hue } from './hues';

export interface BoxGeometry {
    x: number;
    y: number;
    w: number;
    h: number;
    // Gap between the wireframe front face and the glass pane.
    inset: number;
    turn: number;
    skew: number;
}

interface Props {
    box: BoxGeometry;
    hue: Hue;
    label: string;
    leaving: boolean;
    paneRef?: React.Ref<HTMLDivElement>;
    scroll?: boolean;
    children: React.ReactNode;
}

// The wireframe preview box with the teal glass pane floating inside it
// (design.md, Layout / Preview pane). Its right edge is nearer the viewer.
const PreviewBox: React.FC<Props> = ({ box, hue, label, leaving, paneRef, scroll, children }) => {
    const { line, bright } = HUES[hue];
    const edges = [[0, 0], [box.w, 0], [0, box.h], [box.w, box.h]];
    const vars = {
        '--turn': `${box.turn}deg`,
        '--line': line,
        '--bright': bright,
    } as React.CSSProperties;
    const pane = {
        left: box.inset,
        top: box.inset,
        width: box.w - box.inset * 2,
        height: box.h - box.inset * 2,
    };

    return (
        <div
            className={`preview-region${leaving ? ' leaving' : ''}`}
            style={{ left: box.x, top: box.y, width: box.w, height: box.h, ...vars }}
        >
            <div className="box3d">
                <div className="box-face box-back" />
                {edges.map(([x, y], i) => (
                    <div key={i} className="box-edge" style={{ left: x, top: y - 1 }} />
                ))}
                <div className="box-face" />
                <div className="pane-label" style={{ left: 0, width: box.inset }}>
                    <span>{label}</span>
                </div>
                {/* The glass is skewed into a parallelogram; the text on it stays level. */}
                <div className="pane-glass" style={{ ...pane, transform: `translateZ(-45px) skewY(${box.skew}deg)` }} />
                <div
                    ref={paneRef}
                    className={`pane${scroll ? ' pane-scroll' : ''}`}
                    style={{ ...pane, transform: 'translateZ(-45px)' }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

export default PreviewBox;
