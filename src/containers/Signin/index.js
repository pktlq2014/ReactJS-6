import React, { Component } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import InputLarge from "./../../components/UI/InputLarge";
class Signin extends Component {
  render() {
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
            <Form className="sort">
              <Form.Group controlId="formBasicEmail">
                <Row>
                  <InputLarge
                    label="Email Address"
                    placeholder="Enter email"
                    value=""
                    type="email"
                    onChange={() => {}}
                  />
                </Row>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Row>
                  <InputLarge
                    label="Password"
                    placeholder="Password"
                    value=""
                    type="password"
                    onChange={() => {}}
                  />
                </Row>
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
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

export default Signin;