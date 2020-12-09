// React
import React from 'react';

// Bootstrap
// import { Col, Row } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

// Custom styles
import './SortButtonGroup.css';

// Converts appearance of sort option for Front-end
const optionTransmuter = {
    "date_created": "Date Created",
    "date_updated": "Date Updated",
    "size": "Cumulative File Size"
};

export default function SortButtonGroup(props) {
    const { sortOptions, sortValue, setSortValue } = props;

    return (
        <>
            <InputGroup className="sortButtonGroup">
                <FormControl
                    className="sortButtonGroupTextField"
                    aria-describedby="bg-nested-dropdown"
                    as="input"
                    value={`Sort by: ${optionTransmuter[sortValue.name]} (${sortValue.direction})`}
                    disabled
                />
                {
                    sortOptions.map(option => 
                        <DropdownButton
                            key={`${optionTransmuter[option]}Dropdown`}
                            as={InputGroup.Append}
                            title={optionTransmuter[option]}
                            id="bg-nested-dropdown"
                            variant="outline-secondary"
                        >
                            <Dropdown.Item
                                as="button"
                                value="asc"
                                onClick={(event) => setSortValue({"name": option, "direction": event.target.value})}
                            >
                                asc
                            </Dropdown.Item>
                            <Dropdown.Item
                                as="button"
                                value="desc"
                                onClick={(event) => setSortValue({"name": option, "direction": event.target.value})}
                            >
                                desc
                            </Dropdown.Item>
                        </DropdownButton>
                    )
                }
            </InputGroup>
        </>
    );
};