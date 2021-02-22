import React, { Component } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import InputLarge from "./../../components/UI/InputLarge";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./../../actions/index";
class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      checkBoxEmail: false,
      onSubmit: 0,
    };
  }
  componentDidMount() {
    this.props.onDataLogin();
  }
  getEmail = (e) => {
    var { target } = e;
    var name = target.name;
    var value = target.type === "checkbox" ? target.checked : target.value;
    if (name === "email") {
      console.log(value);
    }
    // if (name === "status") {
    //   value = target.value === "true" ? true : false;
    // }
    this.setState({
      [name]: value,
    });
  };
  userLogin = (e) => {
    e.preventDefault();
    console.log(this.state);
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    var { login } = this.props;
    login.forEach((values, index) => {
      if (values.email === this.state.email && values.password === this.state.password) {
        this.props.onLogin(user);
      }
    });
    this.setState({
      onSubmit: 1,
    });
  };
  render() {
    var { login } = this.props;
    var dataLogin = login.map((values, index) => {
      if (
        values.email === this.state.email &&
        this.state.onSubmit === 1 &&
        values.password === this.state.password
      ) {
        const user = {
          email: this.state.email,
          password: this.state.password,
        };
        localStorage.setItem("dataLogin", JSON.stringify(user));
        return <Redirect key={index} to="/" />;
      } else {
        if (this.state.onSubmit === 1) {
          this.setState({
            onSubmit: 0,
          });
        }
      }
    });
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
            {/* <form className="sort" onSubmit={this.userLogin}>
              <div className="form-group">
                <label for="">Username: </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={this.state.email}
                  onChange={this.getEmail}
                />
              </div>
              <div className="form-group">
                <label for="">Password: </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={this.state.password}
                  onChange={this.getEmail}
                />
              </div>
              <div className="checkbox">
                <label>
                  <input
                    type="checkbox"
                    onChange={this.getEmail}
                    value={true}
                    name="checkBoxEmail"
                    checked={this.state.checkBoxEmail === true}
                  />
                  Chấp Nhận
                </label>
              </div>
              <button type="submit" className="btn btn-primary">Lưu lại</button>
            </form> */}

            <Form className="sort" onSubmit={this.userLogin}>
              <Form.Group controlId="formBasicEmail">
                <Row>
                  {/* <InputLarge
                    label="Email Address"
                    placeholder="Enter email"
                    name="email"
                    value={this.state.email}
                    type="email"
                    onChange={this.getEmail}
                  /> */}
                  <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      onChange={this.getEmail}
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
                  {/* <InputLarge
                    label="Password"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    type="password"
                    onChange={(e) => this.getEmail(e.target.value)}
                  /> */}
                  <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={this.getEmail}
                      name="password"
                      value={this.state.password}
                      placeholder="Password"
                    />
                  </Col>
                </Row>
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
                {dataLogin}
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
    login: state.login,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onLogin: (data) => {
      dispatch(actions.loginData(data));
    },
    onDataLogin: () => {
      dispatch(actions.login());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Signin);
