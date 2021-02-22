import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./styles.css";
import SideBar from "./../../components/SideBar/sidebar";
class products extends Component {
  render() {
    return (
      <Container fluid>
        <Row className="side_bar">
          <SideBar />
          <Col md={10} className="side_bar-marginLeft">
            Products
          </Col>
        </Row>
      </Container>
    );
  }
}

export default products;
