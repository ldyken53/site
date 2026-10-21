import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Hue } from './hues';

// Each page has a hue; hovering a nav link previews that page's hue, the way
// the console frame followed the highlighted item.
interface HueApi {
    hue: Hue;
    setPageHue: (h: Hue) => void;
    setHoverHue: (h: Hue | null) => void;
}

const HueContext = createContext<HueApi | null>(null);

export const HueProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [page, setPageHue] = useState<Hue>('blue');
    const [hover, setHoverHue] = useState<Hue | null>(null);
    const api = useMemo(() => ({ hue: hover ?? page, setPageHue, setHoverHue }), [page, hover]);
    return <HueContext.Provider value={api}>{children}</HueContext.Provider>;
};

export const useHue = () => {
    const api = useContext(HueContext);
    if (!api) throw new Error('useHue outside HueProvider');
    return api;
};

// Sets the page's hue and document title while the page is mounted.
export const usePage = (title: string | null, hue: Hue) => {
    const { setPageHue } = useHue();
    useEffect(() => { setPageHue(hue); }, [hue, setPageHue]);
    useEffect(() => {
        document.title = title ? `${title} - Landon Dyken` : 'Landon Dyken';
        window.scrollTo(0, 0);
    }, [title]);
};
