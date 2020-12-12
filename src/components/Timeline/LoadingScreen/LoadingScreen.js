import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

// Bootstrap
import { Col, Row } from 'react-bootstrap';

export default function TimelineLoadingScreen() {

    return (
        <SkeletonTheme color="#242b31d7" highlightColor="#444">
            <Row className="filtersContainer">
                <Col className="mb-5" xs={6}>
                    <Skeleton  height={"180%"}/>
                </Col>
                <Col className="mb-5" xs={6}>
                    <Skeleton height={"180%"}/>
                </Col>
                <Col className="mb-5" xs={6}>
                    <Skeleton height={"180%"}/>
                </Col>
                <Col className="mb-5" xs={6}>
                    <Skeleton height={"180%"}/>
                </Col>
            </Row>
            <div className="timeline">
                <Col>
                    <Skeleton height={"100%"} width={"100%"}/>
                </Col>
            </div>
            <Row className="sortButtonGroupContainer">
                <Col xs={{span: 6, offset: 6}}>
                    <Skeleton height={"150%"}/>
                </Col>
            </Row>
        </SkeletonTheme>
    );

};