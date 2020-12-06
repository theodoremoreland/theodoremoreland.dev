// React
import React from 'react';

// Bootstrap
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { Col, Row } from 'react-bootstrap';

// Custom styles
import './Profile.css';
import profilePic from '../../images/headshot-1.jpg';
import octocatIcon from '../../images/Octocat.png';
import linkedInIcon from '../../images/LI-In-Bug.png';

export default function Profile() {

    return (
        <Card className="profile">
            <Card.Body>
                <Card.Title className="profileTitle">Theodore Moreland</Card.Title>
                <Card.Subtitle className="mb-2 profileSubTitle">Software Engineer</Card.Subtitle>
                <Image className="profilePic" src={profilePic} roundedCircle fluid/>
                <Row className="profileLinks" noGutters>
                    <Col>
                        <a href="https://github.com/theodoremoreland" rel="noopener noreferrer" target="_blank">
                            <Image className="octocatIcon" src={octocatIcon} fluid/>
                        </a>
                        <a href="https://www.linkedin.com/in/theodore-moreland/" rel="noopener noreferrer" target="_blank">
                            <Image className="linkedInIcon" src={linkedInIcon} fluid/>
                        </a>   
                    </Col>
                </Row>
                <Card.Text className="profileBio">
                    Some stuff about me.
                </Card.Text>
            </Card.Body>
        </Card>
    );
};