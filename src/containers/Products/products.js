import React, { Component } from "react";
import {
  Row,
  Col,
  Container,
  Button,
  Modal,
  Form,
  Table,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./styles.css";
import { connect } from "react-redux";
import * as actions from "./../../actions/index";
import SideBar from "./../../components/SideBar/sidebar";
class products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      categoryID: "",
      parentID: "",
      name: "",
      quantity: "",
      price: "",
      description: "",
      productPictures: [],
      image: "",
      star : "",
      sales : ""
    };
  }
  componentDidMount() {
    this.props.onCategory();
    this.props.onShowProduct();
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
      productPictures: data,
    });
    var { target } = e;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };
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
    var array = [];
    var pictures = this.state.productPictures;
    pictures.forEach((values, index) => {
      console.log(values);
      array.push({ id: values.lastModified, img: values.name });
    });
    console.log(pictures);

    var data = {
      name: this.state.name,
      price: this.state.price,
      quantity: this.state.quantity,
      description: this.state.description,
      categoryID: this.state.categoryID,
      parentID: this.state.parentID,
      star: this.state.star,
      sales: this.state.sales,
      image: this.state.image,
      productPictures: array,
    };
    this.props.onProductAPI(data);
    this.setState({
      name: "",
      price: "",
      quantity: "",
      description: "",
      categoryID: "",
      parentID: "",
      star: "",
      sales: "",
      image: "",
      productPictures: [],
      array: [],
    });
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
    var { category, showProduct } = this.props;
    console.log(category);
    console.log(showProduct);
    //var image = require(`./images/truoc.jpg`);
    var data = showProduct.map((values, index) => {
      return (
        <tr key={index} className="textAlign-center">
          <td>{values.id}</td>
          <td className="width-10">{values.name}</td>
          <td className="width-10">{values.price}</td>
          <td>{values.quantity}</td>
          <td className="width-90">{values.description}</td>
          <td>{values.categoryID}</td>
          <td>{values.parentID}</td>
          <td className="width-15">
            {
              values.productPictures.map((valuess, index) => {
                var image = require(`./../../assets/images/${valuess.img}`)
                return (
                  <img
                  key={index}
                  className="img"
                  //src={`${process.env.PUBLIC_URL}/${truoc}`}
                  src={image.default}
                  alt="logo"
                />
                )
              })
            }
          </td>
          <td className="width-5">{values.sales}</td>
          <td className="width-5">{values.star}</td>
        </tr>
      );
    });
    return (
      <Container fluid>
        <Row className="side_bar">
          <SideBar />
          <Col md={10} className="textAlign-justify side_bar-marginLeft">
            <Container>
              <Row>
                <Col md={10}>
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
                          <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Sales</Form.Label>
                            <Form.Control
                              type="text"
                              name="sales"
                              value={this.state.sales}
                              onChange={this.onChange}
                              placeholder="sales..."
                            />
                          </Form.Group>
                          <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Star</Form.Label>
                            <Form.Control
                              type="text"
                              name="star"
                              value={this.state.star}
                              onChange={this.onChange}
                              placeholder="star..."
                            />
                          </Form.Group>
                          <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Category select</Form.Label>
                            <Form.Control
                              name="categoryID"
                              onChange={this.onChange}
                              value={this.state.categoryID}
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
                          <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Parent select</Form.Label>
                            <Form.Control
                              name="parentID"
                              onChange={this.onChange}
                              value={this.state.parentID}
                              as="select"
                            >
                              <option>parent select</option>
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
                          {this.state.productPictures.length > 0
                            ? this.state.productPictures.map(
                                (values, index) => {
                                  return <div key={index}>{values.name}</div>;
                                }
                              )
                            : null}
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
                <Col md={12}>
                  <Table striped bordered hover variant="dark">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Description</th>
                        <th>CategoryID</th>
                        <th>ParentID</th>
                        <th>ProductPicture</th>
                        <th>Sales</th>
                        <th>Star</th>
                      </tr>
                    </thead>
                    <tbody>{data}</tbody>
                  </Table>
                </Col>
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
    showProduct: state.showProduct,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onCategory: () => {
      dispatch(actions.category());
    },
    onProductAPI: (data) => {
      dispatch(actions.productAPI(data));
    },
    onShowProduct: () => {
      dispatch(actions.showProduct());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(products);
