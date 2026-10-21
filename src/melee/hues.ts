// The console frame takes the hue of the highlighted item (design.md, Colors).
export type Hue = 'blue' | 'red' | 'green';

export const HUES: Record<Hue, { line: string; bright: string }> = {
    blue: { line: '#4A56A8', bright: '#6799D3' },
    red: { line: '#C45244', bright: '#E07B6B' },
    green: { line: '#1E9832', bright: '#6FD07A' },
};

export const STAGE_W = 1280;
export const STAGE_H = 960;

export const reducedMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
