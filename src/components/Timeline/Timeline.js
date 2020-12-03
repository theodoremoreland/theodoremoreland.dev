// React
import React from 'react';

// Custom Components
import Project from './Project/Project';

// Custom styles
import './Timeline.css';

export default function Timeline(props) {
    const { projects } = props;

    return (
        <div className="timeline">
            { projects.map(project => <Project key={project.name} projectData={project} />) }
        </div>
    );
};