// React
import React from 'react';

// Bootstrap
import Form from 'react-bootstrap/Form';
import ReactWordcloud from 'react-wordcloud';

// Custom styles
import './Filter.css';

let filtersToAdd = new Set();

export default function Filter({filterComponentData}) {
    const { label
        , wordCloudData
        , setFiltersCurrentlyInUse
        , wordCloudsAreOpenObject
        , setWordCloudsAreOpenObject
    } = filterComponentData;
    const topicsForLabel = wordCloudData.map((data) => data.text);
    const userSelectedTopicsForLabelString = [...filtersToAdd].filter((topic) => topicsForLabel.includes(topic)).join(", ");
    
    const addOrRemoveTopicFromFilter = (userSelectedTopic) => {
        if (filtersToAdd.has(userSelectedTopic)) {
            filtersToAdd.delete(userSelectedTopic);
            setFiltersCurrentlyInUse(new Set([...filtersToAdd]));
        }
        else {
            filtersToAdd.add(userSelectedTopic);
            setFiltersCurrentlyInUse(new Set([...filtersToAdd]));
        }
    };

    const options = {
        rotations: 0,
        padding: 0,
        fontSizes: [12, 82],
        fontFamily: "header"
    };

    const callbacks = {
        onWordClick: (word) => addOrRemoveTopicFromFilter(word.text)
    }

    const handleClick = () => {
        const shouldOpenWordCloud = !wordCloudsAreOpenObject[label];

        if (shouldOpenWordCloud) {
            // The following statement closes all wordclouds in shallow copy
            Object.keys(wordCloudsAreOpenObject).forEach((key) => wordCloudsAreOpenObject[key] = false);
            // The next statement sets shallow copy, then opens active wordcloud
            setWordCloudsAreOpenObject({...wordCloudsAreOpenObject, [label] : true});
        }
        else {
            setWordCloudsAreOpenObject({...wordCloudsAreOpenObject, [label] : false});
        }
    };

    return (
        <>
            <Form className="filter">
                <Form.Group controlId={`${label.toLowerCase()}FormGroup`} onClick={() => handleClick()}>
                <Form.Label>{label}</Form.Label>
                <Form.Control
                    as="input"
                    custom
                    value={userSelectedTopicsForLabelString || `All ${label.toLowerCase()}`} 
                />
                </Form.Group>
            </Form>
            { wordCloudsAreOpenObject[label]
                ?   <div className="wordCloudCanvas" id={`${label.toLowerCase()}WordCloudCanvas`}>
                        <ReactWordcloud
                            words={wordCloudData}
                            options={options}
                            callbacks={callbacks}
                        />
                    </div>
                : ""
            }
        </>
    );
};