import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import SideBar from "./../../components/SideBar/sidebar";
import "./styles.css";
class Home extends Component {
  render() {
    return (
      <Container fluid>
        <Row className="side_bar">
          <SideBar />
          <Col md={10} className="side_bar-marginLeft">
            Home
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
