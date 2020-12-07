// React
import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

// Bootstrap
import Card from 'react-bootstrap/Card';

// Scripts
import covertDateToISOString from '../../../scripts/convertDateToISOString';

// Custom Components
import README from '../README/README';

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
    const [readmeIsActive, setReadmeIsActive] = useState(false);

    return (
        <>
            <Card className="projectCard">
                <Card.Img className="projectImage" variant="bottom" src={projectData.image} />
                <Card.Body>
                    <Card.Title>
                        {projectData.name} <text className="infoIcon" onClick={() => setReadmeIsActive(true)}>&#x1F6C8;</text>
                    </Card.Title>
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
                    {
                        projectData.demo_link !== "" && projectData.demo_link !== null
                            ?   <Card.Link href={projectData.demo_link} target="_blank" rel="noopener noreferrer">Live Demo</Card.Link>
                            :   ""
                    }
                </Card.Body>
            </Card>
            <README
                name={projectData.name}
                link={projectData.readme}
                readmeIsActive={readmeIsActive}
                setReadmeIsActive={setReadmeIsActive}
            />
        </>
    );

};