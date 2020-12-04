// React
import React, { useMemo } from 'react';

// Bootstrap
import { Col, Row } from 'react-bootstrap';

// Custom utils
import createWordCloudData from './createWordCloudData';

// Custom Components
import Project from './Project/Project';
import Filter from './Filter/Filter';

// Custom styles
import './Timeline.css';

export default function Timeline(props) {
    const { projects } = props;
    const { contexts, competencies, languages, tools } = useMemo(() => createWordCloudData(projects), [projects]);

    return (
        <>
            <Row>
                <Col>
                    <Filter label={"Context"} wordCloudData={contexts} />
                </Col>
                <Col>
                    <Filter label={"Competency"} wordCloudData={competencies} />
                </Col>
                <Col>
                    <Filter label={"Language"} wordCloudData={languages} />
                </Col>
                <Col>
                    <Filter label={"Tool"} wordCloudData={tools} />
                </Col>
            </Row>
            <div className="timeline">
                { projects.map(project => <Project key={project.name} projectData={project} />) }
            </div>
        </>
    );
};