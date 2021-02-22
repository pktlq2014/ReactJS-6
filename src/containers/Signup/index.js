import React, { Component } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import InputSmall from "../../components/UI/InputSmall";
import InputLarge from "./../../components/UI/InputLarge";
import {connect} from 'react-redux';
import { Redirect } from "react-router-dom";
import * as actions from './../../actions/index';
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname : '',
      lastname : '',
      email : '',
      password : '',
      onSubmit : 0
    };
  }
  onChange = (e) => {
    var {target} = e;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name] : value
    })
  }
  onSubmit = (e) => {
    e.preventDefault();
    var data = {
      firstname : this.state.firstname,
      lastname : this.state.lastname,
      email : this.state.email,
      password : this.state.password
    }
    this.props.onSignup(data);
    this.setState({
      onSubmit : 1
    })
  }
  render() {
    var {dataSignup} = this.props;
    console.log(dataSignup);
    var {onSubmit} = this.state;
    if(onSubmit === 1) {
      return <Redirect to="/" />;
    }
    return (
      <Container>
        <Row>
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            className="col_form-center"
          >
            <Form className="sort" onSubmit={this.onSubmit}>
              <Form.Group controlId="">
                <Row>
                  <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstname"
                      value={this.state.firstname}
                      onChange={this.onChange}
                      placeholder="Enter first name"
                    />
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                       type="text"
                       name="lastname"
                       value={this.state.lastname}
                       onChange={this.onChange}
                      placeholder="Enter last name"
                    />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      onChange={this.onChange}
                      name="email"
                      type="email"
                      value={this.state.email}
                      placeholder="Enter email"
                    />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={this.onChange}
                      name="password"
                      value={this.state.password}
                      placeholder="Password"
                    />
                  </Col>
                </Row>
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    dataSignup : state.dataSignup
  };
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    onSignup : (data) => {
      dispatch(actions.signUp(data));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
