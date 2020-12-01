// React
import React, { useEffect, useState } from 'react';

// GitHub
import { Octokit } from "@octokit/core";

// Bootstrap
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

// Custom Components
import Timeline from './Timeline/Timeline';

// Custom styles
import './ProfileCard.css';
import profilePic from '../../images/headshot-1.jpg';
import { Col, Row } from 'react-bootstrap';

const accessToken = process.env.REACT_APP_GITHUB_API_ACCESS_TOKEN;
const octokit = new Octokit({ auth: accessToken });


export default function ProfileCard() {
    const [repos, setRepos] = useState(undefined);

    const getRepoData = async () => {
          const response = await octokit.request('GET /user/repos?per_page=100&affiliation=owner', {
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
                  "topics": repo.topics,
                  "image": `https://raw.githubusercontent.com/theodoremoreland/${repo.name}/master/presentation/1.PNG`
                })
            )
          );
    };

    useEffect(() => {
        getRepoData()
    }, []);

    return (
        <Card className="profileCard">
            <Row>
                <Col className="profileContainer" xs={3}>
                    <Card.Body>
                        <Card.Title className="profileTitle">Theodore Moreland</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted profileSubTitle">Software Engineer</Card.Subtitle>
                        <Image className="profilePic" src={profilePic} roundedCircle fluid/>
                        <Card.Text className="text-muted profileBio">
                            @github.theodoremoreland
                        </Card.Text>
                    </Card.Body>
                </Col>
                <Col className="timelineContainer" xs={8}>
                    <Timeline content={repos}/>
                </Col>
            </Row>
        </Card>
    );
};