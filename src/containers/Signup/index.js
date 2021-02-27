import React, { Component } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import InputSmall from "../../components/UI/InputSmall";
import InputLarge from "./../../components/UI/InputLarge";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "./../../actions/index";
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      onSubmit: 0,
    };
  }
  componentDidMount() {
    this.props.onAccount();
  }
  onChange = (e) => {
    var { target } = e;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    var { firstname, lastname, email, password } = this.state;
    if (
      firstname !== "" &&
      lastname !== "" &&
      email !== "" &&
      password !== ""
    ) {
      var { login } = this.props;
      console.log(login);
      login.forEach((values, index) => {
        if (values.email === email) {
          alert("Email Đã Được Đăng Ký. Xin Vui Lòng Nhập Email Khác!!!");
        } else {
          var data = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
          };
          this.props.onSignup(data);
          this.setState({
            onSubmit: 1,
          });
        }
      });
    } else {
      alert("Dữ Liệu Chưa Nhập Đầy Đủ. Xin Vui Lòng Kiểm Tra Lại!!!");
    }
  };
  render() {
    var { dataSignup, login } = this.props;
    console.log(dataSignup);
    console.log(login);
    var { onSubmit } = this.state;
    if (onSubmit === 1) {
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
    dataSignup: state.dataSignup,
    login: state.login,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onSignup: (data) => {
      dispatch(actions.signUp(data));
    },
    onAccount: () => {
      dispatch(actions.login());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
