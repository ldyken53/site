import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { Hue, reducedMotion } from './hues';

export interface ScreenState {
    title: string[];
    hue: Hue;
    caption: string;
    parent?: string;
}

interface ScreenApi {
    screen: ScreenState;
    setScreen: (s: ScreenState) => void;
    // True while the current stack flies out before a route change.
    leaving: boolean;
    swinging: boolean;
    go: (to: string) => void;
}

const ScreenContext = createContext<ScreenApi | null>(null);

// Tabs fly out ~260 ms apart by 26 ms (design.md, Elevation & Depth).
const OUT_MS = 380;
const SWING_MS = 640;

export const ScreenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const [screen, setScreen] = useState<ScreenState>({ title: ['Main Menu'], hue: 'blue', caption: '' });
    const [leaving, setLeaving] = useState(false);
    const [swinging, setSwinging] = useState(false);
    const pending = useRef(false);

    const go = useCallback((to: string) => {
        if (pending.current) return;
        if (reducedMotion()) {
            navigate(to);
            return;
        }
        pending.current = true;
        setLeaving(true);
        setSwinging(true);
        setTimeout(() => {
            navigate(to);
            setLeaving(false);
            pending.current = false;
        }, OUT_MS);
        setTimeout(() => setSwinging(false), SWING_MS);
    }, [navigate]);

    const api = useMemo(() => ({ screen, setScreen, leaving, swinging, go }), [screen, leaving, swinging, go]);
    return <ScreenContext.Provider value={api}>{children}</ScreenContext.Provider>;
};

export const useScreen = () => {
    const api = useContext(ScreenContext);
    if (!api) throw new Error('useScreen outside ScreenProvider');
    return api;
};
