// React
import React from 'react';

// Bootstrap
import Card from 'react-bootstrap/Card';

// Custom styles
import './Project.css';

export default function Project(props) {
    const { projectData } = props;

    return (
        <Card className="projectCard">
            <Card.Img className="projectImage" variant="bottom" src={projectData.image} />
            <Card.Body>
                <Card.Title>{projectData.name}</Card.Title>
                <Card.Text>
                    {projectData.desc}
                </Card.Text>
            </Card.Body>
        </Card>
    );

};