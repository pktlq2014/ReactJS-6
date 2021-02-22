import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./styles.css";
class sidebar extends Component {
  render() {
    return (
      <Col md={2} className="side_bar_menu">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/products">Products</NavLink>
        </li>
        <li>
          <NavLink to="/orders">Orders</NavLink>
        </li>
        <li>
          <NavLink to="/category">Category</NavLink>
        </li>
      </Col>
    );
  }
}

export default sidebar;
