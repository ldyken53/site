import React, { useRef } from 'react';
import { reducedMotion } from './hues';

interface Props {
    src: string;
    alt?: string;
    // Resting turn; the right edge sits nearer the viewer.
    turn?: number;
    // How far the box follows the pointer, in degrees.
    tilt?: number;
    // Size the box to the image's own aspect ratio instead of cropping.
    fitImage?: boolean;
    className?: string;
}

// An image floating as a glass pane inside a wireframe box that turns toward
// the pointer. Only CSS variables change, so the tilt stays on the compositor.
const ThumbBox: React.FC<Props> = ({ src, alt = '', turn = -16, tilt = 14, fitImage, className }) => {
    const box = useRef<HTMLDivElement>(null);

    const follow = (e: React.PointerEvent) => {
        if (!box.current || reducedMotion()) return;
        const r = box.current.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        box.current.style.setProperty('--ry', `${x * tilt * 2}deg`);
        box.current.style.setProperty('--rx', `${-y * tilt}deg`);
    };
    const fit = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const img = e.currentTarget;
        if (fitImage && box.current && img.naturalWidth) {
            box.current.style.aspectRatio = `${img.naturalWidth + 20} / ${img.naturalHeight + 20}`;
        }
    };
    const rest = () => {
        box.current?.style.setProperty('--ry', `${turn}deg`);
        box.current?.style.setProperty('--rx', '0deg');
    };

    return (
        <div
            ref={box}
            className={`thumb-box ${className ?? ''}`}
            style={{ '--ry': `${turn}deg`, '--rx': '0deg' } as React.CSSProperties}
            onPointerMove={follow}
            onPointerLeave={rest}
        >
            <div className="thumb-3d">
                <div className="thumb-face thumb-back" />
                <span className="thumb-edge" style={{ left: 0, top: -1 }} />
                <span className="thumb-edge" style={{ right: -40, top: -1 }} />
                <span className="thumb-edge" style={{ left: 0, bottom: -1 }} />
                <span className="thumb-edge" style={{ right: -40, bottom: -1 }} />
                <img className="thumb-pane" src={src} alt={alt} loading="lazy" onLoad={fit} />
                <div className="thumb-face" />
            </div>
        </div>
    );
};

export default ThumbBox;
