// React
import React, { useEffect, useState } from 'react';

// GitHub
import { Octokit } from "@octokit/core";

// Bootstrap
import { Container, Col, Row } from 'react-bootstrap';

// Scripts
import covertDateToISOString from './scripts/convertDateToISOString';

// Custom Components
import Profile from './components/Profile/Profile';
import Timeline from './components/Timeline/Timeline';
import TimelineLoadingScreen from './components/Timeline/LoadingScreen/LoadingScreen';

// Custom Styles
import './App.css';

const accessToken = process.env.REACT_APP_GITHUB_API_ACCESS_TOKEN;
const octokit = new Octokit({ auth: accessToken });

function App() {
  const [repos, setRepos] = useState(undefined);

  const getRepoData = async () => {
        const response = await octokit.request('GET /user/repos?per_page=100&affiliation=owner&visibility=public&sort=created', {
          owner: 'octocat',
          repo: 'hello-world',
          mediaType: {
            previews: [
              'mercy'
            ]
          }
        });
        
        const repoDataArray = response.data.reduce((repos, repo) => {
              const repoData = {
                "name": repo.name,
                "url": repo.html_url,
                "desc": repo.description,
                "date_created": covertDateToISOString(repo.created_at),
                "date_updated":  covertDateToISOString(repo.pushed_at),
                "topics": repo.topics,
                "image": `https://raw.githubusercontent.com/theodoremoreland/${repo.name}/master/presentation/thumbnail.png`,
                "demo_link": repo.homepage,
                "readme": `https://raw.githubusercontent.com/theodoremoreland/${repo.name}/master/README.md`,
                "size": Number(repo.size)
              }

              if (repoData.topics.length > 0) { return [...repos, repoData]; }
              else { return repos; };
            }, []);

      setRepos(repoDataArray);
  };

  useEffect(() => {
      getRepoData()
  }, []);

  return (
    <>
    <div className="overlay" />
    <Container className="app" fluid={"xs"}>
      <Row className="content">
        <Col className="profileContainer" sm={12} md={12} lg={2}>
          <Profile />
        </Col>
        <Col className="timelineContainer" sm={12} md={12} lg={10}>
          {
            repos !== undefined
              ? <Timeline projects={repos}/>
              : <TimelineLoadingScreen />
          }
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default App;
