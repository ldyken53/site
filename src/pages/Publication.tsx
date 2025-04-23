import React from 'react';
import publications from '../data/publications.json';

interface page {
    title: string;
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

const Paper: React.FC<Props> = ( { id } ) => {
    let page : page = publications[id];
    return (
        <div className="row col-12 page">
            <div className="contain">
            <div className="col-12 text-center">
                {page.thumb && <img style={{maxHeight: '300px'}} alt="thumb" src={page.thumb} />}
                <h2>{page.title}</h2>
                <h4>{page.authors}</h4>
                <h5>In <i>{page.venue}</i>, {page.year}</h5>
                {page.award && <p><i className="fas fa-award"></i><i> {page.award}</i></p>}
                {page.teaser && 
                    <figure>
                        <img alt="teaser" className="img-fluid" src={page.teaser}/>
                        <figcaption className="text-left mt-2">
                            <b>Fig. 1: </b><i>{page.teaser_caption}</i>
                        </figcaption>
                    </figure>
                }
            </div>
            <div className="col-12 mt-2">
                <h2 className="border-bottom border-secondary">Abstract</h2>
                <p style={{fontSize: "small"}}>{page.abstract}</p>
            </div>
            <div className="col-12 mt-2">
                <h2 className="border-bottom border-secondary">Links</h2>
                <dl>
                    <dt>Publication</dt>
                    <dd><a href={page.paper_pdf}><i className="far fa-file-pdf"></i> Paper (PDF)</a></dd>
                    {page.doi && <dd><a href={`https://dx.doi.org/${page.doi}`}>
                        <i className="fas fa-external-link-alt"></i> Publisher's Version</a>
                    </dd>}
                    {page.downloads.map((download, i) => (
                        <React.Fragment key={i}>
                            <dt>{download.title}</dt>
                            {download.list.map((link, j) => (
                                <dd key={j}><a href={link.link}>
                                    {link.link.includes("youtu.be") ? <i className="fab fa-youtube"></i> : 
                                    link.icon ? <i className={link.icon}></i> : <i className="fas fa-external-link-alt"></i> } 
                                    {link.title}
                                </a></dd>
                            ))}
                        </React.Fragment>
                    ))}
                </dl>
            </div>
            {page.supplemental_video &&
                <div className="col-12 mt-2">
                    <h2 className="border-bottom border-secondary">Supplemental Video</h2>
                    <div className="embed-responsive embed-responsive-16by9">
                        <iframe title="Supplemental" className="embed-responsive-item" allowFullScreen src={page.supplemental_video}>
                        </iframe>
                    </div>
                </div>
            }
            {page.presentation_video &&
                <div className="col-12 mt-2">
                    <h2 className="border-bottom border-secondary">Presentation Video</h2>
                    <div className="embed-responsive embed-responsive-16by9">
                        <iframe title="Presentation" className="embed-responsive-item" allowFullScreen src={page.presentation_video}>
                        </iframe>
                    </div>
                </div>
            }
            <div className="col-12 mt-2">
                <h2 className="border-bottom border-secondary">BibTeX</h2>
                <code style={{whiteSpace: "pre-wrap"}}>{page.bibtex}</code>
            </div>
            </div>
        </div>
    );
}

export default Paper;