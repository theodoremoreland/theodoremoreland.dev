export default function createWordCloudData(projects) {
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

    const contexts = ["professional","personal", "coursework"];
    const competencies = ["web-development", "data-engineering", "data-analytics"];
    const languages = ["python", "javascript", "java", "typescript", "sql", "plpgsql", "vba", "bash", "html", "css"];
    const tools = [
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
        , "sqlalchemy"
        , "pymongo"
        , "psycopg2"
    ];

    const contextsWordCloudData = wordCloudData.filter(topic => contexts.includes(topic.text));
    const competenciesWordCloudData = wordCloudData.filter(topic => competencies.includes(topic.text));
    const languagesWordCloudData = wordCloudData.filter(topic => languages.includes(topic.text));
    const toolsWordCloudData = wordCloudData.filter(topic => tools.includes(topic.text));

    return {
        "contexts": contextsWordCloudData,
        "competencies": competenciesWordCloudData,
        "languages": languagesWordCloudData,
        "tools": toolsWordCloudData
    }
};