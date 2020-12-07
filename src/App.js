// React
import React, { useEffect, useState } from 'react';

// GitHub
import { Octokit } from "@octokit/core";

// Bootstrap
import { Container, Col, Row } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

// Scripts
import covertDateToISOString from './scripts/convertDateToISOString';

// Custom Components
import Profile from './components/Profile/Profile';
import Timeline from './components/Timeline/Timeline';

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
        
        setRepos(response.data.map( repo => (
              {
                "name": repo.name,
                "url": repo.html_url,
                "desc": repo.description,
                "date_created": covertDateToISOString(repo.created_at),
                "date_updated":  covertDateToISOString(repo.pushed_at),
                "topics": repo.topics,
                "image": `https://raw.githubusercontent.com/theodoremoreland/${repo.name}/master/presentation/1.PNG`,
                "size": Number(repo.size),
                "demo_link": repo.homepage
              })
          )
        );
  };

  useEffect(() => {
      getRepoData()
  }, []);

  return (
    <>
    <div className="overlay" />
    <Container className="app" fluid={"xs"}>
      <Row className="content">
        <Col className="profileContainer" xs={2}>
          <Profile />
        </Col>
        <Col className="timelineContainer" xs={10}>
          {
            repos !== undefined
              ? <Timeline projects={repos}/>
              : <Spinner className="timelineSpinner" animation="grow"/>
          }
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default App;
