// React
import React, { useState } from 'react';

// Bootstrap
import Form from 'react-bootstrap/Form';
import { TagCloud } from 'react-tagcloud';


// Custom styles
import './Filter.css';

export default function Filter(props) {
    const { label, wordCloudData } = props;
    const [showTagCloud, setShowTagCloud] = useState(false);

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
                        <TagCloud
                            minSize={12}
                            maxSize={35}
                            tags={wordCloudData}
                            onClick={tag => alert(`'${tag.value}' was selected!`)}
                        />
                    </div>
                : ""
            }
        </>
    );
};