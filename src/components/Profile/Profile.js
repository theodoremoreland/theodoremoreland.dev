// React
import React from 'react';

// Bootstrap
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

// Custom styles
import './Profile.css';
import profilePic from '../../images/headshot-1.jpg';

export default function Profile() {

    return (
        <Card className="profile">
            <Card.Body>
                <Card.Title className="profileTitle">Theodore Moreland</Card.Title>
                <Card.Subtitle className="mb-2 text-muted profileSubTitle">Software Engineer</Card.Subtitle>
                <Image className="profilePic" src={profilePic} roundedCircle fluid/>
                <Card.Text className="text-muted profileBio">
                    @github.theodoremoreland
                </Card.Text>
            </Card.Body>
        </Card>
    );
};