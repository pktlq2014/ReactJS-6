import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import SideBar from "./../../components/SideBar/sidebar";
import "./styles.css";
class Page extends Component {
  render() {
    return (
      <Container fluid>
        <Row className="side_bar">
          <SideBar />
          <Col md={10} className="side_bar-marginLeft">
            Page1111
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Page;
