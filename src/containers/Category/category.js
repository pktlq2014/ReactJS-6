import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Category from "./../../components/Category/category";
import "./styles.css";
import { connect } from "react-redux";
import * as actions from "./../../actions/index";
import { Row, Col, Container, Button, Modal, Form } from "react-bootstrap";
import SideBar from "../../components/SideBar/sidebar";
import CheckboxTree from "react-checkbox-tree";
import CheckBox from "@material-ui/icons/CheckBox";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import CheckBoxOutlineBlank from "@material-ui/icons/CheckBoxOutlineBlank";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
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
      checked: [],
      expanded: [],
      expandedArray: [],
      updateCategory: false,
      temp : 3,
      title : [
        {
          id : 0,
          name : 'Add New Category'
        },
        {
          id : 1,
          name : 'Update Category'
        },
        {
          id : 2,
          name : 'Delete Category'
        },
      ]
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
    this.props.onAddCategory(data);
    this.setState({
      idParent: "",
      name: "",
      image: "",
    });
  };
  setModalShow = () => {
    this.setState({
      modalShow: true,
      temp : 0
    });
  };
  setModalShowCategory = () => {
    this.setState({
      modalShow: true,
      temp : 1
    });
    console.log(this.state.checked);
    console.log(this.state.expanded);
  };
  setModalShowCategoryDelete = () => {
    this.setState({
      modalShow: true,
      temp : 2
    });
    console.log(this.state.checked);
    console.log(this.state.expanded);
  };
  onHideShow = () => {
    this.setState({
      modalShow: false,
    });
  };
  updateCategory = () => {
    this.setState({
      updateCategory: false,
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
            {<ul>{this.getMenu(item.children)}</ul>}
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
    return options1;
  };
  createCategories = (categories, idParent = null) => {
    const categoryList = [];
    let category;
    if (idParent === null) {
      category = categories.filter((cat, index) => {
        return cat.idParent === undefined || cat.idParent === "";
      });
    } else {
      category = categories.filter((cat) => cat.idParent === idParent);
    }
    for (let cate of category) {
      // categoryList.push({
      //   id: cate.id,
      //   name: cate.name,
      //   idParent: cate.idParent,
      //   children: this.createCategories(categories, cate.id),
      // });
      categoryList.push({
        value: cate.id,
        label: cate.name,
        idParent: cate.idParent,
        children: this.createCategories(categories, cate.id)
      });
    }
    return categoryList;
  };
  createCategoriesTree = (categories) => {
    const categoryList = [];
    for (let cate of categories) {
      categoryList.push({
        value: cate.id,
        label: cate.name,
        idParent: cate.idParent,
        children: cate.children && cate.children.length > 0 && this.createCategories(cate.children)
      });
    }
    return categoryList;
  };
  render() {
    // api data từ cateroty đang ở dạng thẳng, phải filter qua lọc qua và
    // dùng đệ quy để lọc và hiển thị con theo cha
    var { category1 } = this.props;
    //var test = [...category];
    // lọc và hiển thị lại array sau khi nhận từ api
    // sắp xếp json theo dạng cha-con
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
                    <h3>Add Category</h3>
                    <Button onClick={this.setModalShow} variant="success">
                      Add Category
                    </Button>
                  </div>
                  <Modal
                    show={this.state.modalShow}
                    onHide={this.onHideShow}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="contained-modal-title-vcenter">
                        {
                          this.state.title.map((values, index) => {
                            if(values.id === this.state.temp) {
                              return values.name;
                            }
                          })
                          // this.state.temp === 0 ? <p>Add New Category</p> : 'Update Category'
                        }
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
                            {/* ép json dạng cha-con thẳng lại thành cây
                              trong khi đó lại không dùng json nguyên mẫu rãnh thiệt */}
                            {/* {this.getOptionMenu(category).map(
                                (values, index) => {
                                  return (
                                    <option key={index} value={values.id}>
                                      {values.name}
                                    </option>
                                  );
                                }
                              )} */}
                            {category1.map((values, index) => {
                              return (
                                <option key={index} value={values.id}>
                                  {values.name}
                                </option>
                              );
                            })}
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

                  {/* Edit */}
                  {/* <Modal
                    show={this.state.updateCategory}
                    onHide={this.updateCategory}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="contained-modal-title-vcenter">
                        Update New Category
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form onSubmit={this.onSubmit}>
                        <Row>
                          <Col>
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
                          </Col>

                          <Col>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                              <Form.Label>Category select</Form.Label>
                              <Form.Control
                                name="idParent"
                                onChange={this.onChange}
                                value={this.state.idParent}
                                as="select"
                              >
                                <option>category select</option>
                                {category1.map((values, index) => {
                                  return (
                                    <option key={index} value={values.id}>
                                      {values.name}
                                    </option>
                                  );
                                })}
                              </Form.Control>
                            </Form.Group>
                          </Col>

                          <Col>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                              <Form.Label>Type select</Form.Label>
                              <Form.Control
                                name="idParent"
                                onChange={this.onChange}
                                value={this.state.idParent}
                                as="select"
                              >
                                <option value="">Type select</option>
                                <option value="store">Store</option>
                                <option value="product">Product</option>
                                <option value="page">Page</option>
                              </Form.Control>
                            </Form.Group>
                          </Col>
                        </Row>
                        <Form.File
                          type="file"
                          name="image"
                          onChange={this.onChange}
                          id="exampleFormControlFile1"
                          label="Picture category input"
                        />
                        <Modal.Footer>
                          <Button
                            onClick={this.updateCategory}
                            type="submit"
                            variant="primary"
                          >
                            Save Changes
                          </Button>
                          <Button onClick={this.updateCategory}>Close</Button>
                        </Modal.Footer>
                      </Form>
                    </Modal.Body>
                  </Modal> */}
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  {/* đọc json dạng cha-con này hiển thị lên UI */}
                  {/* <ul>{this.getMenu(category)}</ul> */}
                  <CheckboxTree
                    nodes={this.createCategories(category1)}
                    checked={this.state.checked}
                    expanded={this.state.expanded}
                    onCheck={(checked) => this.setState({ checked })}
                    onExpand={(expanded) => this.setState({ expanded })}
                    icons={{
                      check: <CheckBox />,
                      uncheck: <CheckBoxOutlineBlank />,
                      halfCheck: <CheckBoxOutlineBlank />,
                      expandClose: <KeyboardArrowRight />,
                      expandOpen: <KeyboardArrowDown />,
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col className="edit_category">
                  <h3>Edit Category</h3>
                  <Button onClick={this.setModalShowCategory} variant="primary">
                    Update Category
                  </Button>
                  <Button onClick={this.setModalShowCategoryDelete} variant="danger">
                    Delete Category
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  <CheckboxTree
                    nodes={this.createCategoriesTree(category1)}
                    checked={this.state.checked}
                    expanded={this.state.expanded}
                    onCheck={(checked) => this.setState({ checked })}
                    onExpand={(expanded) => this.setState({ expanded })}
                    icons={{
                      check: <CheckBox />,
                      uncheck: <CheckBoxOutlineBlank />,
                      halfCheck: <CheckBoxOutlineBlank />,
                      expandClose: <KeyboardArrowRight />,
                      expandOpen: <KeyboardArrowDown />,
                    }}
                  />
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
