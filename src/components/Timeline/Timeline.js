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
            const contextFilters = wordCloudData["contexts"].map(data => data.text).filter((topic) => filtersCurrentlyInUse.has(topic));
            const competencyFilters = wordCloudData["competencies"].map(data => data.text).filter((topic) => filtersCurrentlyInUse.has(topic));
            const languageFilters = wordCloudData["languages"].map(data => data.text).filter((topic) => filtersCurrentlyInUse.has(topic));
            const toolFilters = wordCloudData["tools"].map(data => data.text).filter((topic) => filtersCurrentlyInUse.has(topic));
            const orderedFilterGroups = [contextFilters, competencyFilters, languageFilters, toolFilters]; // List filters in terms of heirarchy

            const createFilteredProjectsArray = (filteredProjectsArray, orderedFilterGroups) => {
                const processedLastFilterGroup = orderedFilterGroups.length === 0;

                if (!processedLastFilterGroup) {
                    let projectsMatchingFilterGroup = [];
                    const filterGroup = orderedFilterGroups[0];

                    for (const topic of filterGroup) {
                        let projectsMathcingTopic = filteredProjectsArray.filter(project => project.topics.includes(topic));
                        projectsMatchingFilterGroup = [...projectsMatchingFilterGroup, ...projectsMathcingTopic];
                    }
        
                    filteredProjectsArray = projectsMatchingFilterGroup.length > 0 ? projectsMatchingFilterGroup : filteredProjectsArray;
                    orderedFilterGroups.shift();
                    return createFilteredProjectsArray(filteredProjectsArray, orderedFilterGroups);
                }
                else {
                    return filteredProjectsArray;
                }
            };

            const filteredProjectsArray = createFilteredProjectsArray(projects, orderedFilterGroups);
            filteredProjectsArray.forEach(project => filteredProjectsSet.add(project));
            return [...filteredProjectsSet];
        }
        else {
            return projects;
        }
    }, [projects, wordCloudData, filtersCurrentlyInUse]);

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
                            <Col key={`${label.toLowerCase()}FilterColumn`} xs={6}>
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