import React, { useLayoutEffect, useRef, useState } from 'react';

interface Props {
    children: React.ReactNode;
    // Largest horizontal scale; sub-menu labels sit at 0.86.
    max?: number;
    align?: 'center' | 'left';
    className?: string;
}

// Condenses a single line horizontally until it fits, the way the game
// squeezes long labels instead of wrapping them.
const Fit: React.FC<Props> = ({ children, max = 1, align = 'center', className }) => {
    const outer = useRef<HTMLSpanElement>(null);
    const inner = useRef<HTMLSpanElement>(null);
    const [scale, setScale] = useState(max);

    useLayoutEffect(() => {
        let live = true;
        const measure = () => {
            if (!live || !outer.current || !inner.current) return;
            const natural = inner.current.offsetWidth;
            const avail = outer.current.clientWidth;
            setScale(natural ? Math.min(max, avail / natural) : max);
        };
        measure();
        document.fonts?.ready.then(measure);
        return () => { live = false; };
    }, [children, max]);

    return (
        <span ref={outer} className={`fit fit-${align} ${className ?? ''}`}>
            <span ref={inner} className="fit-inner" style={{ transform: `scaleX(${scale})` }}>
                {children}
            </span>
        </span>
    );
};

export default Fit;
