// React
import React, { useCallback, useMemo, useState } from 'react';

// Bootstrap
import { Col, Row } from 'react-bootstrap';

// Custom utils
import createWordCloudData from './createWordCloudData';

// Custom Components
import Project from './Project/Project';
import Filter from './Filter/Filter';
import SortButtonGroup from './SortButtonGroup/SortButtonGroup';

// Custom styles
import './Timeline.css';

const filterLabels = [
    "Contexts",
    "Competencies",
    "Languages",
    "Tools"
];

const sortOptions = [
    "date_created",
    "date_updated",
    "size",
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
    const [sortValue, setSortValue] = useState({"name": sortOptions[0], "direction": "desc"});

    // eslint-disable-next-line
    const sortProjects = useMemo(() => {
        // useMemo executes this function every time sortValue or projects change
        // but because .sort works inplace, there is no need to reassign projects
        const name = sortValue.name;
        const dir = sortValue.direction;
        
        if (name === "date_created" && dir === "desc") {
            projects.sort((a, b) => new Date(a[name]) < new Date(b[name]));
        }
        else if (name === "date_created" && dir === "asc") {
            projects.sort((a, b) => new Date(a[name]) > new Date(b[name]));
        }
        else if (name === "date_updated" && dir === "desc") {
            projects.sort((a, b) => new Date(a[name]) < new Date(b[name]));
        }
        else if (name === "date_updated" && dir === "asc") {
            projects.sort((a, b) => new Date(a[name]) > new Date(b[name]));
        }
        else if (name === "size" && dir === "desc") {
            projects.sort((a, b) => a[name] < b[name]);
        }
        else if (name === "size" && dir === "asc") {
            projects.sort((a, b) => a[name] > b[name]);
        };
    }, [sortValue, projects]);


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
                    const userDidNotSelectTopicForFilterGroup = filterGroup.length === 0;

                    for (const topic of filterGroup) {
                        let projectsMatchingTopic = filteredProjectsArray.filter(project => project.topics.includes(topic));
                        projectsMatchingFilterGroup = [...projectsMatchingFilterGroup, ...projectsMatchingTopic];
                    }
                    
                    // if user didn't select topic, assign everything filtered thus far, else assign updated filter even if now empty
                    filteredProjectsArray = userDidNotSelectTopicForFilterGroup ? filteredProjectsArray : projectsMatchingFilterGroup;
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
            <Row>
                <Col>
                    <h5>{`${filterTopics(filtersCurrentlyInUse).length} results`}</h5>
                </Col>
                <Col>
                    <SortButtonGroup sortOptions={sortOptions} sortValue={sortValue} setSortValue={setSortValue}/>
                </Col>
            </Row>
            
        </>
    );
};