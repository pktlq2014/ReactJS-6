import React, { Component } from 'react';
import {Row, Col, Container} from 'react-bootstrap';
import './styles.css';
class Home extends Component {
    render() {
        return (
            <Container fluid>
                <Row className="side_bar">
                    <Col md={2} className="side_bar_menu">Side bar</Col>
                    <Col md={10} className="side_bar-marginLeft">container</Col>
                </Row>
            </Container>
        );
    }
}

export default Home;