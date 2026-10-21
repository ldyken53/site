import React from 'react';
import { usePage } from '../melee/HueContext';

const Fun: React.FC = () => {
    usePage('Camille', 'blue');
    return <video className="video" controls src="Meteor.mp4" />;
};

export default Fun;
