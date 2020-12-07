// React
import React from 'react';

// Bootstrap
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import DropdownButton from 'react-bootstrap/DropdownButton';
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
    const userSelectedTopicsForLabelString = [...filtersToAdd].filter((topic) => topicsForLabel.includes(topic)).join(" or ");
    
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
        colors: [
            '#bdbdbd'
            , '#969696'
            , '#737373'
            , '#878787'
            , '#525252'
            , '#252525'
            , '#1a1a1a'
            , '#000000' 
        ],
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
            <InputGroup className="filter">
                <DropdownButton
                as={InputGroup.Prepend}
                variant="outline-secondary"
                title={label}
                id={`${label.toLowerCase()}FilterDropdownButton`}
                onClick={() => handleClick()}
                >
                </DropdownButton>
                <FormControl 
                    aria-describedby={`${label.toLowerCase()}FormGroup`}
                    as="input"
                    value={userSelectedTopicsForLabelString || `All ${label.toLowerCase()}`}
                    disabled
                />
            </InputGroup>
            { wordCloudsAreOpenObject[label]
                ?   <>
                        {/* The div: "notWordCloudCanvas" is used to mimic clickAway event such that the wordCloudCanvas closes
                        when the user clicks something other than the filters or canvas itself. */}
                        <div className="notWordCloudCanvas" onClick={() => setWordCloudsAreOpenObject({...wordCloudsAreOpenObject, [label]: false})}/>
                        <div className="wordCloudCanvas" id={`${label.toLowerCase()}WordCloudCanvas`}>
                            <ReactWordcloud
                                words={wordCloudData}
                                options={options}
                                callbacks={callbacks}
                            />
                        </div>
                    </>
                : ""
            }
        </>
    );
};