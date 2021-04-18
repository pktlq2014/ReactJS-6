import React, { Component } from "react";
import "./styles.css";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {
  Button,
  Navbar,
  Nav,
  Form,
  Row,
  Col,
  Container,
  FormControl,
  NavDropdown,
} from "react-bootstrap";
class Test extends Component {
  render() {
    return (
      <div>
        <Navbar
          collapseOnSelect
          expand="lg"
          //   fixed="top"
          bg="primary"
          variant="dark"
        >
          <div className="header_test" href="#home">
            Download Apps
          </div>
          <input className="test_input" type="text" placeholder="aaa" alt="" />
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link className="mr-auto" href="#features">
                Features
              </Nav.Link>
              <Nav.Link className="mr-auto" href="#pricing">
                Pricing
              </Nav.Link>
              <NavDropdown
                className="mr-auto"
                title="Dropdown"
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link className="mr-auto" href="#deets">
                More deets
              </Nav.Link>
              <Nav.Link className="mr-auto" eventKey={2} href="#memes">
                Dank memes
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="divide_ui">
          <div className="divide_ui_left">a</div>
          <div className="divide_ui_right">
            <Grid
              className="divide_ui_right_child_3"
              container
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
            >
              <Grid item xs={11} sm={11} md={5} lg={5} xl={5}>
                <div className="divide_ui_right_child_3_name">
                  Search for similar products by name :
                </div>
              </Grid>
              <Grid item xs={11} sm={11} md={5} lg={5} xl={5}>
                <TextField
                  className="divide_ui_right_child_3_input"
                  id="standard-basic"
                />
              </Grid>
            </Grid>
            <Grid
              className="divide_ui_right_child_1"
              container
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
            >
              <Grid item class="item_test" xs={6} sm={6} md={6} lg={4} xl={4}>
                <div>aaaaaaaaaaaaaaaaaaaaaaa</div>
                <div>aaaaaaaaaaaaaaaaaaaaaaa</div>
                <div>aaaaaaaaaaaaaaaaaaaaaaa</div>
              </Grid>
              <Grid item class="item_test" xs={6} sm={6} md={6} lg={4} xl={4}>
                <div>aaaaaaaaaaaaaaaaaaaaaaa</div>
                <div>aaaaaaaaaaaaaaaaaaaaaaa</div>
                <div>aaaaaaaaaaaaaaaaaaaaaaa</div>
              </Grid>
              <Grid item class="item_test" xs={6} sm={6} md={6} lg={4} xl={4}>
                <div>aaaaaaaaaaaaaaaaaaaaaaa</div>
                <div>aaaaaaaaaaaaaaaaaaaaaaa</div>
                <div>aaaaaaaaaaaaaaaaaaaaaaa</div>
              </Grid>
              <Grid item class="item_test" xs={6} sm={6} md={6} lg={4} xl={4}>
                <div>aaaaaaaaaaaaaaaaaaaaaaa</div>
                <div>aaaaaaaaaaaaaaaaaaaaaaa</div>
                <div>aaaaaaaaaaaaaaaaaaaaaaa</div>
              </Grid>
              <Grid item class="item_test" xs={6} sm={6} md={6} lg={4} xl={4}>
                <div>aaaaaaaaaaaaaaaaaaaaaaa</div>
                <div>aaaaaaaaaaaaaaaaaaaaaaa</div>
                <div>aaaaaaaaaaaaaaaaaaaaaaa</div>
              </Grid>
            </Grid>
            <div className="margin-bottom"></div>
          </div>
        </div>
        <Grid
          className="divide_ui_right_child_2"
          container
          xs={12}
          sm={12}
          spacing={2}
          md={12}
          lg={12}
          xl={12}
        >
          <Grid item xs={11} sm={5} md={5} lg={3} xl={3}>
            <div className="divide_ui_right_child_2_item_left">
              <div>a</div>
              <div>b</div>
              <div>c</div>
            </div>
          </Grid>
          <Grid item xs={11} sm={5} md={5} lg={3} xl={3}>
            <div className="divide_ui_right_child_2_item_left">
              <div>a</div>
              <div>b</div>
              <div>c</div>
            </div>
          </Grid>
          <Grid item xs={11} sm={5} md={5} lg={3} xl={3}>
            <div className="divide_ui_right_child_2_item_left">
              <div>a</div>
              <div>b</div>
              <div>c</div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Test;
