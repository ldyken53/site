import React from 'react';
import { Navigate } from 'react-router-dom';
import publications from '../data/publications.json';
import MenuScreen, { MenuItem } from '../melee/MenuScreen';

interface Page {
    title: string;
    label: string;
    authors: string;
    venue: string;
    year: number;
    award?: string;
    teaser?: string;
    teaser_caption?: string;
    abstract: string;
    paper_pdf: string;
    doi?: string;
    downloads: Array<{
        title: string;
        list: Array<{
            link: string;
            icon?: string;
            title: string;
        }>
    }>;
    supplemental_video?: string;
    presentation_video?: string;
    bibtex: string;
    thumb?: string;
}

interface Props {
    id: number;
}

type Panel = 'Abstract' | 'Video' | 'BibTeX';

const linkLabel = (title: string) =>
    title === 'Github' ? 'GitHub' : title === 'Live demo!' ? 'Live Demo' : title;

const linkCaption = (title: string) =>
    title === 'Github' ? 'Browse the code!' : title === 'Live demo!' ? 'Try it live!' : `Open ${title}.`;

const Paper: React.FC<Props> = ({ id }) => {
    const page: Page | undefined = publications[id];
    if (!page) return <Navigate to="/publications" replace />;

    const items: Array<MenuItem & { panel: Panel; video?: string }> = [
        { label: 'Read Paper', caption: 'Read the paper!', href: page.paper_pdf, panel: 'Abstract' },
    ];
    if (page.doi) {
        items.push({ label: 'Publisher', caption: 'The publisher’s version.', href: `https://dx.doi.org/${page.doi}`, panel: 'Abstract' });
    }
    page.downloads.forEach(download => download.list.forEach(link => {
        items.push({ label: linkLabel(link.title), caption: linkCaption(link.title), href: link.link, panel: 'Abstract' });
    }));
    if (page.supplemental_video) {
        items.push({ label: 'Video', caption: 'Watch the video!', href: page.supplemental_video, panel: 'Video', video: page.supplemental_video });
    }
    if (page.presentation_video) {
        items.push({ label: 'Talk', caption: 'Watch the talk!', href: page.presentation_video, panel: 'Video', video: page.presentation_video });
    }
    items.push({
        label: 'Copy BibTeX',
        caption: 'Copy the BibTeX!',
        onConfirm: () => { navigator.clipboard.writeText(page.bibtex); },
        panel: 'BibTeX',
    });

    const panel = (i: number) => {
        const item = items[i];
        if (item.panel === 'BibTeX') return <code className="info-code">{page.bibtex}</code>;
        if (item.panel === 'Video') return (
            <>
                <h2 className="info-title">{page.title}</h2>
                <iframe title={item.label} className="info-video" allowFullScreen src={item.video} />
            </>
        );
        return (
            <>
                {page.thumb && <img className="info-image" alt="" src={page.thumb} />}
                <h2 className="info-title">{page.title}</h2>
                <p className="info-meta">{page.authors}</p>
                <p className="info-meta">In <i>{page.venue}</i>, {page.year}</p>
                {page.award && <span className="info-award">{page.award}</span>}
                {page.teaser && (
                    <figure style={{ margin: '16px 0 0' }}>
                        <img alt="teaser" className="info-image" src={page.teaser} />
                        <figcaption className="info-meta"><b>Fig. 1: </b><i>{page.teaser_caption}</i></figcaption>
                    </figure>
                )}
                <h3 className="info-heading">Abstract</h3>
                <p className="info-body">{page.abstract}</p>
            </>
        );
    };

    return (
        <MenuScreen
            title={['Publications', page.label]}
            hue="red"
            parent="/publications"
            layout="detail"
            items={items}
            panel={panel}
            paneLabel={i => items[i].panel}
        />
    );
};

export default Paper;
