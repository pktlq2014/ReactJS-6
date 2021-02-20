import React, { Component } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
class Input extends Component {
  render() {
    return (
      <Col xs={12} sm={12} md={12} lg={6} xl={6}>
        <Form.Label>{this.props.label}</Form.Label>
        <Form.Control type={this.props.type} placeholder={this.props.placeholder} />
      </Col>
    );
  }
}

export default Input;
