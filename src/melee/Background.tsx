import React, { useEffect, useRef } from 'react';
import { HUES, Hue, STAGE_H, STAGE_W, reducedMotion } from './hues';

// The navy void: a perspective wire grid and slowly turning orbit rings
// (design.md, background-grid). Drawn in stage pixels so it lines up with the
// letterboxed stage, but it fills the whole viewport.

const GRID = 34;
const VANISH_Y = -1800; // far above the stage, so the grid converges gently
const FILAMENT = [0x7f, 0x8c, 0xff];

const RINGS = [
    { cx: 930, cy: 470, r: 620, tilt: 0.4, tiltSpeed: 0.05, rot: -0.5, rotSpeed: 0.018 },
    { cx: 260, cy: 760, r: 900, tilt: 1.9, tiltSpeed: 0.035, rot: 0.3, rotSpeed: -0.012 },
    { cx: 1120, cy: 160, r: 470, tilt: 2.8, tiltSpeed: 0.07, rot: 1.2, rotSpeed: 0.025 },
    { cx: 640, cy: 520, r: 1180, tilt: 0.9, tiltSpeed: 0.025, rot: 2.2, rotSpeed: 0.008 },
];

const hex = (h: string) => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));

const Background: React.FC<{ hue: Hue }> = ({ hue }) => {
    const canvas = useRef<HTMLCanvasElement>(null);
    const target = useRef(hex(HUES[hue].bright));

    useEffect(() => { target.current = hex(HUES[hue].bright); }, [hue]);

    useEffect(() => {
        const el = canvas.current!;
        const ctx = el.getContext('2d');
        if (!ctx) return;
        const still = reducedMotion();
        let tint = target.current.slice();
        let frame = 0;
        let last = performance.now();

        const draw = (now: number) => {
            const dt = Math.min(0.1, (now - last) / 1000);
            last = now;
            const t = still ? 0 : now / 1000;
            // Crossfade the ring tint toward the frame hue over ~400 ms.
            const k = still ? 1 : 1 - Math.exp(-dt / 0.15);
            tint = tint.map((c, i) => c + (target.current[i] - c) * k);

            const dpr = Math.min(2, window.devicePixelRatio || 1);
            const W = window.innerWidth;
            const H = window.innerHeight;
            if (el.width !== Math.round(W * dpr) || el.height !== Math.round(H * dpr)) {
                el.width = Math.round(W * dpr);
                el.height = Math.round(H * dpr);
            }
            const s = Math.min(W / STAGE_W, H / STAGE_H);
            const ox = (W - STAGE_W * s) / 2;
            const oy = (H - STAGE_H * s) / 2;

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = '#10112E';
            ctx.fillRect(0, 0, W, H);

            // Stage space from here on, with a slow camera drift.
            const driftX = 7 * Math.sin(t * 0.13);
            const driftY = 5 * Math.sin(t * 0.097 + 1);
            ctx.setTransform(dpr * s, 0, 0, dpr * s, dpr * (ox + driftX * s), dpr * (oy + driftY * s));
            const x0 = -ox / s - 20, x1 = (W - ox) / s + 20;
            const y0 = -oy / s - 20, y1 = (H - oy) / s + 20;

            ctx.strokeStyle = '#1F2148';
            ctx.lineWidth = 1 / s;
            ctx.beginPath();
            const span = STAGE_H - VANISH_Y;
            for (let y = STAGE_H; y > y0; y -= GRID * (y - VANISH_Y) / span) {
                ctx.moveTo(x0, y); ctx.lineTo(x1, y);
            }
            for (let y = STAGE_H; y < y1; y += GRID * (y - VANISH_Y) / span) {
                ctx.moveTo(x0, y); ctx.lineTo(x1, y);
            }
            // Vertical lines run toward the vanishing point above the stage.
            const reach = (STAGE_W / 2 - x0) * (y1 - VANISH_Y) / span + GRID;
            for (let x = STAGE_W / 2 - Math.ceil(reach / GRID) * GRID; x <= STAGE_W / 2 + reach; x += GRID) {
                const at = (y: number) => STAGE_W / 2 + (x - STAGE_W / 2) * (y - VANISH_Y) / span;
                ctx.moveTo(at(y0), y0); ctx.lineTo(at(y1), y1);
            }
            ctx.stroke();

            // Orbit rings: a wide soft additive band around a thin bright filament.
            ctx.globalCompositeOperation = 'lighter';
            const filament = FILAMENT.map((c, i) => Math.round(c * 0.6 + tint[i] * 0.4));
            const rgba = (a: number) => `rgba(${filament[0]},${filament[1]},${filament[2]},${a})`;
            for (const ring of RINGS) {
                const minor = Math.max(0.1, Math.abs(Math.cos(ring.tilt + t * ring.tiltSpeed)));
                const rot = ring.rot + t * ring.rotSpeed;
                const px = ring.cx + driftX * 1.5, py = ring.cy + driftY * 1.5;
                for (const [w, a] of [[110, 0.025], [60, 0.035], [26, 0.05], [8, 0.09], [1.6, 0.55]]) {
                    ctx.strokeStyle = rgba(a);
                    ctx.lineWidth = w;
                    ctx.beginPath();
                    ctx.ellipse(px, py, ring.r, ring.r * minor, rot, 0, Math.PI * 2);
                    ctx.stroke();
                }
            }

            // Corners fall to surface-dim.
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.globalCompositeOperation = 'source-over';
            const vignette = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.35, W / 2, H / 2, Math.hypot(W, H) / 2);
            vignette.addColorStop(0, 'rgba(12,12,40,0)');
            vignette.addColorStop(1, 'rgba(12,12,40,0.85)');
            ctx.fillStyle = vignette;
            ctx.fillRect(0, 0, W, H);

            if (!still) frame = requestAnimationFrame(draw);
        };

        frame = requestAnimationFrame(draw);
        const redraw = () => { if (still) requestAnimationFrame(draw); };
        window.addEventListener('resize', redraw);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('resize', redraw);
        };
    }, []);

    useEffect(() => {
        // Reduced motion draws one frame; repaint it when the hue changes.
        if (reducedMotion()) window.dispatchEvent(new Event('resize'));
    }, [hue]);

    return <canvas ref={canvas} className="background" aria-hidden="true" />;
};

export default Background;
