// React
import React, { useState } from 'react';

// Bootstrap
import Form from 'react-bootstrap/Form';
import ReactWordcloud from 'react-wordcloud';


// Custom styles
import './Filter.css';

export default function Filter(props) {
    const { label, wordCloudData } = props;
    const [showTagCloud, setShowTagCloud] = useState(false);

    const options = {
        rotations: 0,
        padding: 0,
        fontSizes: [15, 65]
      };

    const handleClick = () => {
        setShowTagCloud(!showTagCloud);
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
            { showTagCloud
                ?   <div id="wordCloudCanvas">
                        <ReactWordcloud
                            words={wordCloudData}
                            options={options}
                        />
                    </div>
                : ""
            }
        </>
    );
};