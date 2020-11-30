// React
import React from 'react';

// Bootstrap
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'

// Custom Components
import Timeline from '../Timeline/Timeline';

// Custom styles
import './ProfileCard.css';
import profilePic from '../../images/headshot-1.jpg';
import { Col, Row } from 'react-bootstrap';


export default function ProfileCard() {

    return (
        <Card className="profileCard">
            <Row>
            <Col className="profileContainer" xs={3}>
                <Card.Body>
                    <Card.Title className="profileTitle">Theodore Moreland</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted profileSubTitle">Software Engineer</Card.Subtitle>
                    <Image className="profilePic" src={profilePic} roundedCircle fluid/>
                    <Card.Text className="text-muted bio">
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                </Card.Body>
            </Col>
            <Col className="timelineContainer" xs={8}>
                <Timeline />
            </Col>
            </Row>
        </Card>
    );
};