import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./styles.css";
class sidebar extends Component {
  render() {
    return (
      <div className="side_bar_menu_new">
        <li>
          <NavLink exact to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/notification">
            Notification
          </NavLink>
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
      </div>
    );
  }
}

export default sidebar;
