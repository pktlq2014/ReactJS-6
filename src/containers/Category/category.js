import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Category from "./../../components/Category/category";
import "./styles.css";
import { connect } from "react-redux";
import * as actions from "./../../actions/index";
import { Row, Col, Container, Button, Modal, Form } from "react-bootstrap";
import SideBar from "../../components/SideBar/sidebar";
function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add New Category
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>New category</Form.Label>
            <Form.Control type="text" placeholder="input category..." />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Example select</Form.Label>
            <Form.Control as="select">
              {/* <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option> */}
              {this.getOptionMenu(this.props.category)}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.File
              type="file"
              id="exampleFormControlFile1"
              label="Example file input"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
class category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      name: "",
      idParent: "",
      options: [],
      data: [],
      image: "",
    };
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
    var data = {
      idParent: this.state.idParent,
      name: this.state.name,
      image: this.state.image,
    };
    console.log(data);
    this.props.onAddCategory(data);
    this.setState({
      idParent : "",
      name : "",
      image : ""
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
  componentDidMount() {
    this.props.onCategory();
  }
  getMenu = (currentLevel) => {
    const menuChildren = currentLevel.map((item, index) => {
      // giả sử không có proptery children hoặc length nó = 0
      if (!item.children || item.children.length === 0) {
        return <li key={index}>{item.name}</li>;
      } else {
        return (
          <li key={index}>
            {item.name}
            {
              <ul>
                <li>{this.getMenu(item.children)}</li>
              </ul>
            }
          </li>
        );
      }
    });
    return menuChildren;
  };
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
  createCategories = (categories, idParent = null) => {
    console.log(categories);
    const categoryList = [];
    let category;
    if (idParent === null) {
      category = categories.filter((cat, index) => {
        return cat.idParent === undefined || cat.idParent === "";
      });
    } else {
      category = categories.filter((cat) => cat.idParent === idParent);
    }
    console.log(category);
    for (let cate of category) {
      categoryList.push({
        id: cate.id,
        name: cate.name,
        idParent: cate.idParent,
        children: this.createCategories(categories, cate.id),
      });
    }
    console.log(categoryList);
    return categoryList;
  };
  render() {
    // api data từ cateroty đang ở dạng thẳng, phải filter qua lọc qua và
    // dùng đệ quy để lọc và hiển thị con theo cha
    var { category1 } = this.props;
    //var test = [...category];
    // lọc và hiển thị lại array sau khi nhận từ api
    var category = this.createCategories(category1);
    return (
      <Container fluid>
        <Row className="side_bar">
          <SideBar />
          <Col md={10} className="textAlign-justify side_bar-marginLeft">
            <Container>
              <Row>
                <Col md={12}>
                  <div className="category">
                    <h3>Category</h3>
                    <Button onClick={this.setModalShow} variant="success">
                      Add Category
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
                          Add New Category
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form onSubmit={this.onSubmit}>
                          <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>New category</Form.Label>
                            <Form.Control
                              type="text"
                              name="name"
                              value={this.state.name}
                              onChange={this.onChange}
                              placeholder="input category..."
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
                          {/* <Form.Group> */}
                          <Form.File
                            type="file"
                            name="image"
                            onChange={this.onChange}
                            id="exampleFormControlFile1"
                            label="Picture category input"
                          />
                          {/* </Form.Group> */}
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
                  <ul>{this.getMenu(category)}</ul>
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
    category1: state.category,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onCategory: () => {
      dispatch(actions.category());
    },
    onAddCategory: (data) => {
      dispatch(actions.categoryADD(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(category);
