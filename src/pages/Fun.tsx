import React from 'react';
import MenuScreen from '../melee/MenuScreen';

const Fun: React.FC = () => (
    <MenuScreen
        title={['Camille']}
        hue="blue"
        parent="/"
        layout="detail"
        items={[{ label: 'Main Menu', caption: 'Back to the menu.', to: '/' }]}
        paneLabel={() => 'Video'}
        panel={() => <video className="info-video" controls src="Meteor.mp4" />}
    />
);

export default Fun;
