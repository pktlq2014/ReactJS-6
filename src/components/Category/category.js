import React, { Component } from "react";
import './styles.css';
import { Row, Col, Container, Button } from "react-bootstrap";
class category extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col md={12}>
            <div className="category">
              <h3>Category</h3>
              <Button variant="success">Success</Button>    
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
              <ul>

              </ul>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default category;
