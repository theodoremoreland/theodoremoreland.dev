// React
import React from 'react';

// Bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

// Custom styles
import './ProjectCard.css';

export default function ProjectCard(props) {
    const { repo } = props;

    return (
        <Card className="projectCard">
            <Card.Img className="projectImage" variant="bottom" src={repo.image} />
            <Card.Body>
                <Card.Title>{repo.name}</Card.Title>
                <Card.Text>
                    {repo.desc}
                </Card.Text>
                <Button variant="primary">View on GitHub</Button>
            </Card.Body>
        </Card>
    );

};