// React
import React, { useCallback, useMemo, useState } from 'react';

// Bootstrap
import { Col, Row } from 'react-bootstrap';

// Custom utils
import createWordCloudData from './createWordCloudData';

// Custom Components
import Project from './Project/Project';
import Filter from './Filter/Filter';

// Custom styles
import './Timeline.css';

const filterLabels = [
    "Contexts",
    "Competencies",
    "Languages",
    "Tools"
];

const createWordCloudsAreOpenObject = () => {
    const wordCloudsAreOpenObject = {};
    for (const label of filterLabels) {
        wordCloudsAreOpenObject[label] = false;
    };
    return wordCloudsAreOpenObject;
};

export default function Timeline(props) {
    const { projects } = props;
    const [filtersCurrentlyInUse, setFiltersCurrentlyInUse] = useState([]);
    const wordCloudData = useMemo(() => createWordCloudData(projects), [projects]);
    const [wordCloudsAreOpenObject, setWordCloudsAreOpenObject] = useState(createWordCloudsAreOpenObject);

    const filterTopics = useCallback(() => {
        if ([...filtersCurrentlyInUse].length > 0) {
            let filteredProjectsSet = new Set();
            for (const topic of filtersCurrentlyInUse) {
                const filteredProjectsArray = projects.filter(project => project.topics.includes(topic));
                filteredProjectsArray.forEach(project => filteredProjectsSet.add(project));
            }
            return [...filteredProjectsSet];
        }
        else {
            return projects;
        }
    }, [projects, filtersCurrentlyInUse]);

    return (
        <>
            <Row>
                {
                    filterLabels.map((label) => {
                        const filterComponentData = {
                            label
                            , wordCloudData : wordCloudData[label.toLowerCase()]
                            , filtersCurrentlyInUse
                            , setFiltersCurrentlyInUse
                            , wordCloudsAreOpenObject
                            , setWordCloudsAreOpenObject
                        };
                        return (
                            <Col key={`${label.toLowerCase()}FilterColumn`}>
                                <Filter key={`${label.toLowerCase()}Filter`} filterComponentData={filterComponentData} />
                            </Col>
                        );
                    })
                }
            </Row>
            <div className="timeline">
                { filterTopics(filtersCurrentlyInUse).map(project => <Project key={project.name} projectData={project} />) }
            </div>
        </>
    );
};