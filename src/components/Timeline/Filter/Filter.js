// React
import React from 'react';

// Bootstrap
import Form from 'react-bootstrap/Form'
import WordCloud from 'wordcloud';

// Custom styles
import './Filter.css';

export default function Filter(props) {
    const { label, wordCloudData } = props;

    const handleClick = () => {
        WordCloud(document.getElementById('wordCloudCanvas'),
            { 
                list: wordCloudData,
                weightFactor: 1,
                rotateRatio: 0
            } 
        );
    };

    return (
        <>
            <Form className="filter">
                <Form.Group controlId="fella" onClick={() => handleClick()}>
                <Form.Label>{label}</Form.Label>
                <Form.Control
                    as="input"
                    custom
                    defaultValue={`Every ${label.toLowerCase()}`} 
                />
                </Form.Group>
            </Form>
            <canvas id="wordCloudCanvas"></canvas>
        </>
    );
};