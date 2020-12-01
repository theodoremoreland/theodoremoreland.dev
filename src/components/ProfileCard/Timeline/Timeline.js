// React
import React from 'react';

// Custom Components
import ProjectCard from '../ProjectCard/ProjectCard';

// Custom styles
import './Timeline.css';


export default function Timeline(props) {
    const {content} = props;

    return (
        <div className="timeline">
            {   content !== undefined
                    ? content.map(repo => <ProjectCard repo={repo} />)
                    : ""
            }
        </div>
    );
};