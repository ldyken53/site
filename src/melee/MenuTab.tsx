import React from 'react';
import Fit from './Fit';

// Chevron-and-cap slab tab (design.md, Shapes / Menu tab). Geometry is drawn
// for the measured 600x78 tab and scaled by height for smaller stacks.
export interface TabSize {
    w: number;
    h: number;
    font: number;
    condense: number;
}

interface Props {
    label: string;
    size: TabSize;
    selected: boolean;
    href: string;
    external?: boolean;
    onSelect: () => void;
    onConfirm: (e: React.MouseEvent) => void;
}

const MenuTab: React.FC<Props> = ({ label, size, selected, href, external, onSelect, onConfirm }) => {
    const { w, h, font, condense } = size;
    const u = h / 78;
    const chev = 40 * u;
    const apex = h * 0.54;
    const b = 6 * u;
    const silhouette = `M ${chev} 0 H ${w - h / 2} A ${h / 2} ${h / 2} 0 0 1 ${w - h / 2} ${h} H ${chev} L 0 ${apex} Z`;
    const interior = `M ${chev + b * 0.4} ${b} H ${w - h} V ${h - b} H ${chev + b * 0.4} L ${b * 1.6} ${apex} Z`;
    const opensTab = external && !href.startsWith('mailto:');

    return (
        <a
            className={`menu-tab${selected ? ' selected' : ''}`}
            href={href}
            target={opensTab ? '_blank' : undefined}
            rel={opensTab ? 'noopener noreferrer' : undefined}
            style={{ width: w, height: h }}
            onPointerEnter={onSelect}
            onFocus={onSelect}
            onClick={onConfirm}
        >
            {/* The bloom filter sits on the slab alone and the pulsing halo is its own
                layer, so the pulse never forces the blur to be recomputed. */}
            <svg className="tab-svg tab-body" width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
                {selected ? (
                    <path d={silhouette} fill="var(--primary)" />
                ) : (
                    <>
                        <path d={silhouette} fill="#5C4518" transform={`translate(${6 * u} ${6 * u})`} />
                        <path d={silhouette} fill="url(#melee-gold)" />
                        <path d={interior} fill="var(--surface-container-lowest)" />
                    </>
                )}
            </svg>
            {selected && (
                <span
                    className="marker-halo"
                    style={{ left: w - h + (26 - 48) * u, top: (36 - 48) * u, width: 96 * u, height: 96 * u }}
                />
            )}
            <svg className="tab-svg" width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
                <g transform={`translate(${w - h} 0) scale(${u})`}>
                    {selected ? <TargetMarker /> : <PMarker />}
                </g>
            </svg>
            <span className="tab-label" style={{ left: chev, width: w - h - chev, fontSize: font }}>
                <Fit max={condense}>{label}</Fit>
            </span>
        </a>
    );
};

// The black "P" cut into the gold cap, its stem hanging below the bar.
const PMarker = () => (
    <g>
        <rect x={8} y={4} width={14} height={92} fill="var(--on-primary-container)" />
        <path d="M 22 8 A 26 26 0 0 1 22 60 Z" fill="var(--on-primary-container)" />
        <path d="M 22 17 A 17 17 0 0 1 22 51 Z" fill="url(#melee-gold)" />
        <path d="M 22 28 A 6 6 0 0 1 22 40 Z" fill="var(--on-primary-container)" />
    </g>
);

// The selected tab's "P" redrawn as a glowing target.
const TargetMarker = () => (
    <g>
        <rect x={12} y={4} width={5} height={92} fill="var(--on-primary-container)" />
        <path d="M 22 10 A 26 26 0 0 1 22 62" fill="none" stroke="#5F7F7A" strokeWidth={4} />
        <circle cx={26} cy={36} r={34} fill="none" stroke="var(--primary-bright)" strokeWidth={5} />
        <circle cx={26} cy={36} r={11} fill="var(--primary)" />
        <circle cx={26} cy={36} r={4} fill="var(--on-primary-container)" />
    </g>
);

export default MenuTab;
