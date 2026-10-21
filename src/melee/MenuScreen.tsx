import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import MenuTab, { TabSize } from './MenuTab';
import PreviewBox, { BoxGeometry } from './PreviewBox';
import { useScreen } from './ScreenContext';
import { Hue } from './hues';

export interface MenuItem {
    label: string;
    caption: string;
    // Main Menu items carry their own hue; inside a section the section's hue holds.
    hue?: Hue;
    to?: string;
    href?: string;
    onConfirm?: () => void;
    preview?: React.ReactNode;
}

type Layout = 'main' | 'sub' | 'detail';

interface Props {
    title: string[];
    items: MenuItem[];
    layout: Layout;
    hue?: Hue;
    parent?: string;
    // detail layout: the big glass pane follows the highlighted item.
    panel?: (selected: number) => React.ReactNode;
    paneLabel?: (selected: number) => string;
}

const STACKS: Record<Layout, { size: TabSize; pitch: number; stagger: number; shift: number }> = {
    main: { size: { w: 600, h: 78, font: 48, condense: 1 }, pitch: 98, stagger: 56, shift: 120 },
    sub: { size: { w: 600, h: 60, font: 40, condense: 0.86 }, pitch: 80, stagger: 64, shift: 120 },
    // Info screens keep the silhouette but shrink the stack to make room to read.
    detail: { size: { w: 380, h: 50, font: 32, condense: 0.86 }, pitch: 66, stagger: 36, shift: 64 },
};

const BOXES: Record<'menu' | 'detail', BoxGeometry> = {
    menu: { x: 836, y: 272, w: 350, h: 440, inset: 20, turn: -16, skew: 5 },
    detail: { x: 630, y: 236, w: 546, h: 584, inset: 26, turn: -9, skew: 2.5 },
};

const STACK_X = 100;
const CONTENT_MID = 500;

// Remembers the highlighted item per screen, so backing out lands where you left.
const remembered = new Map<string, number>();

const MenuScreen: React.FC<Props> = ({ title, items, layout, hue, parent, panel, paneLabel }) => {
    const { pathname } = useLocation();
    const { setScreen, leaving, go } = useScreen();
    const [selected, setSelected] = useState(() => Math.min(remembered.get(pathname) ?? 0, items.length - 1));
    const [flash, setFlash] = useState<string | null>(null);
    const paneRef = useRef<HTMLDivElement>(null);
    const stack = STACKS[layout];
    const item = items[selected];

    useEffect(() => { remembered.set(pathname, selected); }, [pathname, selected]);
    useEffect(() => { setFlash(null); }, [selected]);

    const titleKey = title.join('\u0000');
    useEffect(() => {
        setScreen({
            title: titleKey.split('\u0000'),
            hue: hue ?? item?.hue ?? 'blue',
            caption: flash ?? item?.caption ?? '',
            parent,
        });
    }, [setScreen, titleKey, hue, item, flash, parent]);

    const confirm = useCallback((i: number, e?: React.MouseEvent) => {
        const it = items[i];
        setSelected(i);
        if (it.to) {
            e?.preventDefault();
            go(it.to);
        } else if (it.onConfirm) {
            e?.preventDefault();
            it.onConfirm();
            setFlash('Copied!');
        } else if (it.href && !e) {
            // Keyboard confirm; a click follows the link itself.
            if (it.href.startsWith('mailto:')) window.location.href = it.href;
            else window.open(it.href, '_blank', 'noopener,noreferrer');
        }
    }, [items, go]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.metaKey || e.ctrlKey || e.altKey || leaving) return;
            const n = items.length;
            if (e.key === 'ArrowDown') setSelected(s => (s + 1) % n);
            else if (e.key === 'ArrowUp') setSelected(s => (s + n - 1) % n);
            else if (e.key === 'Enter' || e.key === ' ') confirm(selected);
            else if ((e.key === 'Escape' || e.key === 'Backspace') && parent) go(parent);
            else if (e.key === 'PageDown' || e.key === 'PageUp') {
                const pane = paneRef.current;
                if (pane) pane.scrollBy({ top: (e.key === 'PageDown' ? 0.8 : -0.8) * pane.clientHeight, behavior: 'smooth' });
            } else return;
            e.preventDefault();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [items.length, selected, confirm, parent, go, leaving]);

    const stackH = (items.length - 1) * stack.pitch + stack.size.h;
    const y0 = Math.max(226, CONTENT_MID - stackH / 2);
    const isDetail = layout === 'detail';
    const sectionHue = hue ?? item?.hue ?? 'blue';

    return (
        <>
            <nav className={`tab-stack${leaving ? ' leaving' : ''}`} aria-label={title[title.length - 1]}>
                {items.map((it, i) => (
                    <div
                        key={it.label}
                        className="tab-slot"
                        style={{
                            left: STACK_X + (i % 2 ? stack.stagger : 0),
                            top: y0 + i * stack.pitch,
                            zIndex: i === selected ? 10 : 1,
                            '--i': i,
                            '--shift': `${stack.shift}px`,
                        } as React.CSSProperties}
                    >
                        <MenuTab
                            label={it.label}
                            size={stack.size}
                            selected={i === selected}
                            href={it.to ? `#${it.to}` : it.href ?? '#'}
                            external={!!it.href}
                            onSelect={() => setSelected(i)}
                            onConfirm={e => confirm(i, e)}
                        />
                    </div>
                ))}
            </nav>
            <PreviewBox
                box={BOXES[isDetail ? 'detail' : 'menu']}
                hue={sectionHue}
                label={isDetail ? paneLabel?.(selected) ?? '' : 'Next Screen'}
                leaving={leaving}
                paneRef={paneRef}
                scroll={isDetail}
            >
                <div key={isDetail ? paneLabel?.(selected) : selected} className="pane-content">
                    {isDetail ? panel?.(selected) : item?.preview}
                </div>
            </PreviewBox>
        </>
    );
};

export default MenuScreen;
