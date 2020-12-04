// React
import React from 'react';

// Bootstrap
import { Col, Row } from 'react-bootstrap';

// Custom Components
import Project from './Project/Project';
import Filter from './Filter/Filter';

// Custom styles
import './Timeline.css';

export default function Timeline(props) {
    const { projects } = props;
    let allTopicsList = [];
    projects.forEach(project => {
        allTopicsList = [...allTopicsList, ...project.topics]
    });
    const allTopicsString = allTopicsList.join();
    const topics = new Set(allTopicsList);
    const wordCloudData = [...topics].map(topic => {
        const topicRegExp = new RegExp(`[^a-z]${topic}[^a-z]`, "g");
        const matches = allTopicsString.match(topicRegExp) || [];
        return (
            {"text": topic, "value": matches.length}
        )
    });
    const contexts = wordCloudData.filter(topic => ["professional","personal", "coursework"].includes(topic.text));
    const competencies = wordCloudData.filter(topic => ["web-development", "data-engineering", "data-analytics"].includes(topic.text));
    const languages = wordCloudData.filter(topic => ["python", "javascript", "java", "sql", "plpgsql", "vba", "bash", "html", "css"].includes(topic.text));
    const tools = wordCloudData.filter(topic => [
        "react"
        , "angular"
        , "node"
        , "flask"
        , "spring-boot"
        , "bootstrap"
        , "material-ui"
        , "junit"
        , "unittest"
        , "jasmine-framework"
        , "jest"
        , "pandas"
        , "matplotlib"
        , "d3"
        , "plotly"
        , "jupyter-notebook"
        , "aws"
        , "cloudfront"
        , "s3"
        , "docker"
        , "splinter"
        , "selenium"
        , "alexa"
        , "excel"
        , "postgresql"
        , "mysql"
    ].includes(topic.text));

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