import raw from './publications.json';

export interface Publication {
    title: string;
    authors: string;
    venue: string;
    year: number;
    paper_pdf: string;
    category?: string;
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

// Indexed like the JSON array so /publications/:id links stay stable; entries
// still being written (no title yet) are skipped in listings.
export const publications = raw as unknown as Publication[];

export const listed = publications
    .map((pub, id) => ({ pub, id }))
    .filter(({ pub }) => pub.title);

export const CATEGORIES = ['Journal Articles', 'Conference Papers', 'Workshop Papers'];

// AcademicPages groups by category; infer it from the venue unless set.
export const categoryOf = (pub: Publication) =>
    pub.category ??
    (/transactions|journal/i.test(pub.venue) ? 'Journal Articles'
        : /workshop/i.test(pub.venue) ? 'Workshop Papers'
            : 'Conference Papers');

export interface PubLink {
    label: string;
    href: string;
}

export const linksOf = (pub: Publication): PubLink[] => {
    const links: PubLink[] = [{ label: 'Paper', href: pub.paper_pdf }];
    if (pub.doi) links.push({ label: 'Publisher’s Version', href: `https://dx.doi.org/${pub.doi}` });
    pub.downloads?.forEach(group => group.list.forEach(link => links.push({
        label: link.title === 'Github' ? 'Code' : link.title === 'Live demo!' ? 'Live Demo' : link.title,
        href: link.link,
    })));
    return links;
};

// First sentence of the abstract, as the list excerpt.
export const excerptOf = (pub: Publication) => {
    const match = pub.abstract?.match(/^.*?[.!?](\s|$)/);
    return match ? match[0].trim() : pub.abstract;
};
