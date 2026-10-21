import raw from './publications.json';

export interface Publication {
    title: string;
    authors: string;
    venue: string;
    year: number;
    short_title: string;
    paper_pdf?: string;
    category?: string;
    status?: string;
    award?: string;
    thumb?: string;
    teaser?: string;
    teaser_caption?: string;
    abstract?: string;
    doi?: string;
    downloads?: Array<{
        title: string;
        list: Array<{ link: string; icon?: string; title: string }>;
    }>;
    supplemental_video?: string;
    presentation_video?: string;
    bibtex?: string;
}

// Entries still being written (no title or slug yet) are skipped.
export const listed = (raw as unknown as Publication[]).filter(pub => pub.title && pub.short_title);

// Paper pages were once addressed by array position; keep those links working.
const LEGACY_IDS = [
    'floodann-pacificvis2025', 'graphwagu-pacificvis2025', 'prog-iso-ml-tvcg24', 'bruck-gpu',
    'speculative-ldav2023', 'graphwagu', 'cudf',
];

export const findPub = (param: string) => {
    const slug = /^\d+$/.test(param) ? LEGACY_IDS[Number(param)] : param;
    return listed.find(pub => pub.short_title === slug);
};

export const CATEGORIES = ['Journal Articles', 'Book Chapters', 'Conference Papers', 'Workshop Papers'];

// AcademicPages groups by category; infer it from the venue unless set.
export const categoryOf = (pub: Publication) =>
    pub.category ??
    (/transactions|journal/i.test(pub.venue) ? 'Journal Articles'
        : /workshop/i.test(pub.venue) ? 'Workshop Papers'
            : 'Conference Papers');

export const venueLead = (pub: Publication) =>
    pub.status === 'In press' ? 'To appear in' : 'Published in';

export interface PubLink {
    label: string;
    href: string;
}

export const linksOf = (pub: Publication): PubLink[] => {
    const links: PubLink[] = [];
    if (pub.paper_pdf) links.push({ label: 'Paper', href: pub.paper_pdf });
    if (pub.doi) links.push({ label: 'Publisher’s Version', href: `https://dx.doi.org/${pub.doi}` });
    pub.downloads?.forEach(group => group.list.forEach(link => links.push({
        label: link.title === 'Github' ? 'Code' : link.title === 'Live demo!' ? 'Live Demo' : link.title,
        href: link.link,
    })));
    return links;
};
