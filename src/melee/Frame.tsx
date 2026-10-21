import React from 'react';
import { HUES, Hue } from './hues';

// The console frame (design.md, Layout): inset 96 left, 84 right, 146 top and
// 80 bottom, 44px corners, with the top-left corner cut into a notched header
// for the screen title and a bottom tray divider at the caption pill's top.
const LEFT = 96;
const RIGHT = 1280 - 84;
const TOP = 146;
const BOTTOM = 960 - 80;
const R = 44;
export const NOTCH_Y = 206;
const RAMP = 56;
export const TRAY_Y = 841;

const Frame: React.FC<{ hue: Hue; notchX: number }> = ({ hue, notchX }) => {
    const { line, bright } = HUES[hue];
    const d = [
        `M ${notchX + RAMP} ${TOP}`,
        `H ${RIGHT - R} A ${R} ${R} 0 0 1 ${RIGHT} ${TOP + R}`,
        `V ${BOTTOM - R} A ${R} ${R} 0 0 1 ${RIGHT - R} ${BOTTOM}`,
        `H ${LEFT + R} A ${R} ${R} 0 0 1 ${LEFT} ${BOTTOM - R}`,
        `V ${NOTCH_Y + R} A ${R} ${R} 0 0 1 ${LEFT + R} ${NOTCH_Y}`,
        `H ${notchX} Z`,
    ].join(' ');
    const stroke = (color: string) => ({ stroke: color, transition: 'stroke 400ms ease' });
    // Four hatch strokes parallel to the ramp, just past it.
    const hatches = [0, 1, 2, 3].map(i => {
        const x = notchX + RAMP + 18 + i * 14;
        return <line key={i} x1={x} y1={TOP - 4} x2={x + RAMP * 0.45} y2={TOP - 4 - 60 * 0.45} />;
    });

    return (
        <svg className="frame" viewBox="0 0 1280 960" width={1280} height={960} aria-hidden="true">
            <g fill="none" strokeLinejoin="round">
                <path d={d} strokeWidth={14} opacity={0.2} style={stroke(line)} />
                <path d={d} strokeWidth={4} style={stroke(line)} />
                <path d={d} strokeWidth={1.5} transform="translate(1.5 -1.5)" opacity={0.8} style={stroke(bright)} />
                <line x1={LEFT} y1={TRAY_Y} x2={RIGHT} y2={TRAY_Y} strokeWidth={3} style={stroke(line)} />
                <g strokeWidth={4} strokeLinecap="square" style={stroke(line)}>{hatches}</g>
            </g>
        </svg>
    );
};

export default Frame;
