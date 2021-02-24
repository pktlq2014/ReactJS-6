import React, { Component } from "react";
import { Row, Col, Container, Button, Modal, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./styles.css";
import {connect} from 'react-redux';
import * as actions from './../../actions/index';
import SideBar from "./../../components/SideBar/sidebar";
class products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      idParent: 0,
      name: "",
      quantity: "",
      price: "",
      description: "",
      productPictures: [],
      image : ""
    };
  }
  componentDidMount() {
    this.props.onCategory();
  }
  getOptionMenu = (categories, options1 = []) => {
    // ép phẳng json về, sau đó dùng option hiển thị ra 1 lượt là xong
    categories.forEach((item, index) => {
      // giả sử không có proptery children hoặc length nó = 0
      if (!item.children || item.children.length === 0) {
        options1.push({ id: item.id, name: item.name });
      } else {
        options1.push({ id: item.id, name: item.name });
        this.getOptionMenu(item.children, options1);
      }
    });
    console.log(options1);
    return options1;
  };
  onChangeImage = (e) => {
    var data = [...this.state.productPictures, e.target.files[0]];
    this.setState({
      productPictures : data
    });
    var { target } = e;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
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
    console.log(this.state);
  };
  setModalShow = () => {
    this.setState({
      modalShow: true,
    });
  };
  onHideShow = () => {
    this.setState({
      modalShow: false,
    });
  };
  render() {
    var { category } = this.props;
    console.log(category);
    return (
      <Container fluid>
        <Row className="side_bar">
          <SideBar />
          <Col md={10} className="textAlign-justify side_bar-marginLeft">
            <Container>
              <Row>
                <Col md={12}>
                  <div className="category">
                    <h3>Products</h3>
                    <Button onClick={this.setModalShow} variant="success">
                      Add Product
                    </Button>

                    <Modal
                      show={this.state.modalShow}
                      onHide={this.onHideShow}
                      size="lg"
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                    >
                      <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                          Add New Products
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form onSubmit={this.onSubmit}>
                          <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="name"
                              value={this.state.name}
                              onChange={this.onChange}
                              placeholder="products name..."
                            />
                          </Form.Group>
                          <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                              type="text"
                              name="quantity"
                              value={this.state.quantity}
                              onChange={this.onChange}
                              placeholder="quantity..."
                            />
                          </Form.Group>
                          <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                              type="text"
                              name="price"
                              value={this.state.price}
                              onChange={this.onChange}
                              placeholder="price..."
                            />
                          </Form.Group>
                          <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                              type="text"
                              name="description"
                              value={this.state.description}
                              onChange={this.onChange}
                              placeholder="description..."
                            />
                          </Form.Group>
                          <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Category select</Form.Label>
                            <Form.Control
                              name="idParent"
                              onChange={this.onChange}
                              value={this.state.idParent}
                              as="select"
                            >
                              <option>category select</option>
                              {this.getOptionMenu(category).map(
                                (values, index) => {
                                  return (
                                    <option key={index} value={values.id}>
                                      {values.name}
                                    </option>
                                  );
                                }
                              )}
                            </Form.Control>
                          </Form.Group>
                          {
                            this.state.productPictures.length > 0 ?
                            this.state.productPictures.map((values, index) => {
                              return <div key={index}>{values.name}</div>;
                            })
                             : null
                          }
                          <Form.File
                            type="file"
                            name="image"  
                            onChange={this.onChangeImage}
                            id="exampleFormControlFile1"
                            label="Picture product input"
                          />
                          <Modal.Footer>
                            <Button
                              onClick={this.onHideShow}
                              type="submit"
                              variant="primary"
                            >
                              Save Changes
                            </Button>
                            <Button onClick={this.onHideShow}>Close</Button>
                          </Modal.Footer>
                        </Form>
                      </Modal.Body>
                    </Modal>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={12}></Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    category: state.category,
  };
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    onCategory: () => {
      dispatch(actions.category());
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(products);
