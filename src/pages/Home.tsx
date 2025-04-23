import React from 'react';
import profile from '../img/profile.jpg';
import PublicationList from './PublicationList';

const Home: React.FC = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'row'}} className="col-12 page">
            <div className="text-center mr-4">
                <img style={{maxHeight: '400px'}} alt="Landon" src={profile} />
                <h1 className="display-4 mt-2">Landon Dyken</h1>
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <h2 className='display-6 border-bottom'>Graduate Research Assistant</h2>
                <div style={{fontSize: "large"}}>Welcome! I’m Landon, a PhD student and graduate research assistant at the University of Illinois Chicago, currently pursuing a degree in Computer Science under Dr. Sidharth Kumar. My focus is on data visualization and high performance computing, specifically using applied ML, web-based tools and GPU-accelerated systems. Before beginning my PhD, I received a dual B.S. in Mathematics and Computer Science from the University of Alabama at Birmingham in 2021, and an M.S. in Computer Science from the University of Alabama at Birmingham in 2023. Please feel free to connect with me through any of the platforms below, and check out my publications!</div>
                <br />
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <a className="color2" href="https://www.linkedin.com/in/landon-dyken-a7b086222/">LinkedIn</a>
                    <span className="tab"></span>
                    <a className="color2" href="https://github.com/ldyken53">Github</a>
                    <span className="tab"></span>
                    <a className="color2" href="mailto:ldyke@uic.edu">Email</a>
                    <span className="tab"></span>
                    <a className="color2" href="https://scholar.google.com/citations?user=LVW51pcnYFYC&hl=en&oi=ao">Google Scholar</a>
                </div>
                <br />
                <h2 className='display-6 border-bottom'>Publications</h2>
                <PublicationList />
            </div>
        </div>
    );
}

export default Home;