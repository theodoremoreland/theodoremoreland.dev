// React
import React from 'react';

// Bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

// Custom styles
import './Timeline.css';


export default function ProfileCard(props) {
    const {content} = props;

    return (
        <div className="timeline">
            {   content !== undefined
                    ? content.map(repo =>
                        <Card className="projectCard">
                        <Card.Img variant="top" src={repo.image} />
                        <Card.Body>
                            <Card.Title>{repo.name}</Card.Title>
                            <Card.Text>
                            
                            {repo.desc}
                            </Card.Text>
                            <Button variant="primary">View on GitHub</Button>
                        </Card.Body>
                        </Card>)
                    : ""
            }
        </div>
    );
};