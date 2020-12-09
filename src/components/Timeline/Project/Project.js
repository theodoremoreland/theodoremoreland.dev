// React
import React, { useState } from 'react';
import { Col } from 'react-bootstrap';

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
        : (dayDifference === 1 ? `yesterday` : `${dayDifference} days ago`);
    return `Last updated ${stringEnd}`;
};

export default function Project(props) {
    const { projectData } = props;
    const [readmeIsActive, setReadmeIsActive] = useState(false);

    return (
        <>
            <Card className="projectCard">
                <Card.Img className="projectImage" variant="top" src={projectData.image} />
                <Card.Body>
                    <Card.Title>
                        {projectData.name} <span className="infoIcon" onClick={() => setReadmeIsActive(true)}>&#x1F6C8;</span>
                    </Card.Title>
                    <Card.Text className="projectDesc">
                        {projectData.desc}
                    </Card.Text>
                    {
                        projectData.demo_link !== "" && projectData.demo_link !== null
                            ?   <Card.Link
                                    className="demoLinks"
                                    href={projectData.demo_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Live Demo
                                </Card.Link>
                            :   ""
                    }
                    <footer className="projectFooter">
                        <Col className="projectDates">
                            Date created: {`${new Date(projectData.date_created).toLocaleDateString()}`}
                        </Col>
                        <Col className="projectDates">
                            {getLastUpdatedDateInDaysString(projectData.date_updated)}
                        </Col>
                        <Col className="projectSizes">
                            {projectData.size.toLocaleString()}kb
                        </Col>
                    </footer>
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