// React
import React from 'react';
import { Row, Col } from 'react-bootstrap';

// Bootstrap
import Card from 'react-bootstrap/Card';

// Scripts
import covertDateToISOString from '../../../scripts/convertDateToISOString';

// Custom styles
import './Project.css';

const getLastUpdatedDateInDaysString = (previousDataString) => {
    let currentDateObject = new Date();
    const currentDateString = covertDateToISOString(currentDateObject);
    currentDateObject = new Date(currentDateString);
    const previousDateObject = new Date(previousDataString);
    const timeDifference = currentDateObject.getTime() - previousDateObject.getTime(); 
    const dayDifference = timeDifference / (1000 * 3600 * 24);
    const stringEnd = dayDifference === 0
        ? "today"
        : (dayDifference === 1 ? `${dayDifference} day ago` : `${dayDifference} days ago`);
    return `Last updated ${stringEnd}`;
};

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
                <Row className="projectDates">
                    <Col>
                        Date created: {`${projectData.date_created}`}
                    </Col>
                </Row>
                <Row className="projectDates">
                    <Col>
                        {getLastUpdatedDateInDaysString(projectData.date_updated)}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );

};