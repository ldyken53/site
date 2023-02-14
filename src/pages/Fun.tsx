import React from 'react';

const Fun: React.FC = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <div className="text-center mr-4">
                <video width="90%" height="80%" controls src="Meteor.mp4"  />
            </div>
        </div>
    );
}

export default Fun;