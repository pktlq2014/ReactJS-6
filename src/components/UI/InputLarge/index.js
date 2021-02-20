import React, { Component } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
class InputLarge extends Component {
  render() {
    return (
      <Col xs={12} sm={12} md={12} lg={12} xl={12}>
        <Form.Label>{this.props.label}</Form.Label>
        <Form.Control type={this.props.type} placeholder={this.props.placeholder} />
      </Col>
    );
  }
}

export default InputLarge;
