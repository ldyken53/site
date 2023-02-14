import React from 'react';
import publications from '../data/publications.json';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

interface Props {
    pub: {
        thumb?: string;
        title: string;
        authors: string;
        venue: string;
        year: number;
        short_title: string;
        paper_pdf: string;
        bibtex?: string;
        doi?: string;
        award?: string;
    },
    i: number
}

const Publication: React.FC<Props> = ({ pub, i }) => {
    const navigate = useNavigate();
    return (
        <div className="row col-12 mb-3 float-md-left">
            <div className="float-md-left col-12 col-md-2">
                {pub.thumb && (
                    <img alt="thumb" className="mx-auto img-thumbnail" src={pub.thumb} />
                )}
            </div>
            <div className="col-md-10 col-12 text-md-left">
                <b>{pub.title}</b>
                <br />
                {pub.authors}. <i>{pub.venue}</i>, {pub.year}.
                <br/>
                <Link className="mr-2 color2"  to={`/publications/${i}`}>
                    <i className="far fa-file-alt"></i> Project Page</Link>
                <a className="mr-2 color2" href={pub.paper_pdf}><i className="far fa-file-pdf"></i> PDF</a>
                {pub.bibtex && (
                    <Button variant="outline-secondary" className="bib mr-2" onClick={
                        () => {navigator.clipboard.writeText(pub.bibtex!)}}> Copy BibTeX</Button>
                )}
                {pub.doi && (
                    <a className="mr-2 color2" href={`https://dx.doi.org/${pub.doi}`}>
                        <i className="fas fa-external-link-alt"></i> Publisher's Version</a>
                )}
                {pub.award && (
                    <p><i className="fas fa-award"></i><i> {pub.award}</i></p>
                )}
            </div>
        </div>
    );
};

const PublicationList: React.FC = () => {
    return (
        <div>
        {publications.map((pub, i) => (
            <Publication pub={pub} i={i} />
        ))}
        </div>
    )
}

export default PublicationList;