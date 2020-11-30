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


export default function ProfileCard() {

    return (
        <Card className="profileCard">
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                <Image className="profilePic" src={profilePic} roundedCircle fluid/>
                <Timeline />
                <Card.Text className="bio">
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                </Card.Text>
            </Card.Body>
        </Card>
    );
};