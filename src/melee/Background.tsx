import React, { useEffect, useRef } from 'react';
import { HUES, Hue, STAGE_H, STAGE_W, reducedMotion } from './hues';

// The navy void: a perspective wire grid and slowly turning orbit rings
// (design.md, background-grid). Drawn on a 4:3 stage scaled to cover the
// viewport, fixed behind the scrolling page.
//
// Only the rings move (they carry the camera drift), so the grid is painted
// once per resize and the rings, which are soft glows anyway, are drawn at half
// resolution and 30 fps. Repainting the whole viewport every frame at device
// resolution made the site crawl on HiDPI screens.

const GRID = 34;
const VANISH_Y = -1800; // far above the stage, so the grid converges gently
const FILAMENT = [0x7f, 0x8c, 0xff];
const RING_RES = 0.5; // ring canvas pixels per CSS pixel
const RING_FRAME_MS = 1000 / 30;

const RINGS = [
    { cx: 930, cy: 470, r: 620, tilt: 0.4, tiltSpeed: 0.05, rot: -0.5, rotSpeed: 0.018 },
    { cx: 260, cy: 760, r: 900, tilt: 1.9, tiltSpeed: 0.035, rot: 0.3, rotSpeed: -0.012 },
    { cx: 1120, cy: 160, r: 470, tilt: 2.8, tiltSpeed: 0.07, rot: 1.2, rotSpeed: 0.025 },
    { cx: 640, cy: 520, r: 1180, tilt: 0.9, tiltSpeed: 0.025, rot: 2.2, rotSpeed: 0.008 },
];

const hex = (h: string) => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));

// Scale and offset of a 4:3 stage that covers the viewport.
const fitStage = () => {
    const W = window.innerWidth;
    const H = window.innerHeight;
    const s = Math.max(W / STAGE_W, H / STAGE_H);
    return { W, H, s, ox: (W - STAGE_W * s) / 2, oy: (H - STAGE_H * s) / 2 };
};

const resize = (el: HTMLCanvasElement, w: number, h: number) => {
    if (el.width !== Math.round(w) || el.height !== Math.round(h)) {
        el.width = Math.round(w);
        el.height = Math.round(h);
    }
};

const drawGrid = (el: HTMLCanvasElement) => {
    const ctx = el.getContext('2d');
    if (!ctx) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const { W, H, s, ox, oy } = fitStage();
    resize(el, W * dpr, H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = '#10112E';
    ctx.fillRect(0, 0, W, H);

    ctx.setTransform(dpr * s, 0, 0, dpr * s, dpr * ox, dpr * oy);
    const x0 = -ox / s, x1 = (W - ox) / s;
    const y0 = -oy / s, y1 = (H - oy) / s;
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
};

const drawRings = (ctx: CanvasRenderingContext2D, t: number, tint: number[]) => {
    const { W, H, s, ox, oy } = fitStage();
    resize(ctx.canvas, W * RING_RES, H * RING_RES);
    const k = RING_RES * s;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const driftX = 10 * Math.sin(t * 0.13);
    const driftY = 7 * Math.sin(t * 0.097 + 1);
    ctx.setTransform(k, 0, 0, k, RING_RES * ox, RING_RES * oy);
    ctx.globalCompositeOperation = 'lighter';
    const filament = FILAMENT.map((c, i) => Math.round(c * 0.6 + tint[i] * 0.4));
    const rgba = (a: number) => `rgba(${filament[0]},${filament[1]},${filament[2]},${a})`;
    // A wide soft additive band around a thin bright filament (at least 1 canvas px).
    const passes = [[110, 0.03], [50, 0.05], [16, 0.1], [Math.max(1.6, 1 / k), 0.8]];
    for (const ring of RINGS) {
        const minor = Math.max(0.1, Math.abs(Math.cos(ring.tilt + t * ring.tiltSpeed)));
        const rot = ring.rot + t * ring.rotSpeed;
        for (const [w, a] of passes) {
            ctx.strokeStyle = rgba(a);
            ctx.lineWidth = w;
            ctx.beginPath();
            ctx.ellipse(ring.cx + driftX, ring.cy + driftY, ring.r, ring.r * minor, rot, 0, Math.PI * 2);
            ctx.stroke();
        }
    }
};

const Background: React.FC<{ hue: Hue }> = ({ hue }) => {
    const grid = useRef<HTMLCanvasElement>(null);
    const rings = useRef<HTMLCanvasElement>(null);
    const target = useRef(hex(HUES[hue].bright));

    useEffect(() => { target.current = hex(HUES[hue].bright); }, [hue]);

    useEffect(() => {
        const ctx = rings.current!.getContext('2d');
        const still = reducedMotion();
        let tint = target.current.slice();
        let frame = 0;
        let last = 0;

        const tick = (now: number) => {
            if (!still) frame = requestAnimationFrame(tick);
            if (!still && now - last < RING_FRAME_MS) return;
            const dt = Math.min(0.1, (now - last) / 1000);
            last = now;
            // Crossfade the ring tint toward the frame hue over ~400 ms.
            const k = still ? 1 : 1 - Math.exp(-dt / 0.15);
            tint = tint.map((c, i) => c + (target.current[i] - c) * k);
            if (ctx) drawRings(ctx, still ? 0 : now / 1000, tint);
        };

        const onResize = () => {
            drawGrid(grid.current!);
            if (still) requestAnimationFrame(tick);
        };
        drawGrid(grid.current!);
        frame = requestAnimationFrame(tick);
        window.addEventListener('resize', onResize);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('resize', onResize);
        };
    }, []);

    useEffect(() => {
        // Reduced motion draws one frame; repaint it when the hue changes.
        if (reducedMotion()) window.dispatchEvent(new Event('resize'));
    }, [hue]);

    return (
        <div className="background" aria-hidden="true">
            <canvas ref={grid} className="bg-grid" />
            <canvas ref={rings} className="bg-rings" />
            <div className="bg-vignette" />
        </div>
    );
};

export default Background;
