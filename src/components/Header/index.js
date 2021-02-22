import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { NavLink, Link, Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./../../actions/index";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 1,
    };
  }
  signOut = () => {
    this.props.onSignout(0);
    // this.setState({
    //   data: 0,
    // });
  };
  renderLoggedInLinks = () => {
    return (
      <Nav>
        <Nav.Link>
          <NavLink onClick={this.signOut} to="/signin" className="nav-item">
            {this.props.dataLogin.email} - Signout
          </NavLink>
          {/* <Navbar.Brand onClick={this.signOut}> 
          {this.props.dataLogin.email} - Signout </Navbar.Brand> */}
        </Nav.Link>
        {/* <Nav.Link eventKey={2} href="#memes">
    Dank memes
  </Nav.Link> */}
      </Nav>
    );
  };
  renderNonLoggedInLinks = () => {
    return (
      <Nav>
        <Nav.Link href="#home">
          <NavLink to="/signin" className="nav-item">
            Signin
          </NavLink>
        </Nav.Link>
        <Nav.Link href="#link">
          <NavLink to="/signup" className="nav-item">
            Signup
          </NavLink>
        </Nav.Link>
        {/* <Nav.Link eventKey={2} href="#memes">
    Dank memes
  </Nav.Link> */}
      </Nav>
    );
  };
  render() {
    //var dataLogin = JSON.parse(localStorage.getItem('dataLogin'));
    var { dataLogin } = this.props;
    console.log(dataLogin);
    // if(dataLogin1) {
    //   this.setState({
    //     data : 1
    //   })
    // }
    // this.setState({
    //   dataLoginNews: dataLogin,
    // });
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container fluid>
            {/* <Link  className="navbar-brand">
              Admin Dashboard
            </Link> */}
            <Navbar.Brand>Admin Dashboard</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                {/* <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
              </Nav>
              {dataLogin
                ? this.renderLoggedInLinks() // login -> logout
                : this.renderNonLoggedInLinks()}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    dataLogin: state.dataLogin,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onSignout: (data) => {
      dispatch(actions.signOut(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
