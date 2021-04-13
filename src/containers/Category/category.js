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
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
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
      temp: 3,
      title: [
        {
          id: 0,
          name: "Add New Category",
        },
        {
          id: 1,
          name: "Update Category",
        },
        {
          id: 2,
          name: "Delete Category",
        },
      ],
      checkedArrayShow: [],
      expandedArrayShow: [],
      typeSelected: 0,
      arrayUpdate: [],
      dataUpdate: {
        id: "",
        name: "",
        idParent: "",
      },
      idUpdate: "",
      nameUpdate: "",
      idParentUpdate: "",
      showDelete: false,
      arrayDelete: [],
      type : ""
    };
  }
  showDeleteName = () => {
    var { category1 } = this.props;
    var deleteName = [];
    category1.forEach((values, index) => {
      this.state.checked.forEach((valuess, index) => {
        if (values.id === valuess) {
          console.log(values.name);
          deleteName.push(values);
        }
      });
    });
    // if(!this.state.arrayDelete) {
    //   this.setState({
    //     arrayDelete : deleteName
    //   })
    // }
    console.log(deleteName);
    console.log(this.state.arrayDelete);
    var result = deleteName.map((values, index) => {
      return <h6 key={index}>{values.name}</h6>;
    });
    return result;
  };
  hiddenDeleteAccess = () => {
    this.setState({
      showDelete: false,
    });
    var { category1 } = this.props;
    var arrayDelete = [];
    category1.forEach((values, index) => {
      this.state.checked.forEach((valuess, index) => {
        if (values.id === valuess) {
          console.log(values.name);
          arrayDelete.push(values);
        }
      });
    });
    console.log(arrayDelete);
    arrayDelete.forEach((values, index) => {
      this.props.onDeleteCategory(values.id);
    });
  };
  hiddenDelete = () => {
    this.setState({
      showDelete: false,
    });
  };
  renderAddCategoryModal = (category1) => {
    return (
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
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Type select</Form.Label>
              <Form.Control
                name="type"
                onChange={this.onChange}
                value={this.state.type}
                as="select"
              >
                <option value="">Type select</option>
                <option value="store">Store</option>
                <option value="product">Product</option>
                <option value="page">Page</option>
              </Form.Control>
            </Form.Group>
            {/* <Form.Group> */}
            {/* <Form.File
                          type="file"
                          name="image"
                          onChange={this.onChange}
                          id="exampleFormControlFile1"
                          label="Picture category input"
                        /> */}
            {/* </Form.Group> */}
            <Modal.Footer>
              <Button onClick={this.onHideShow} type="submit" variant="primary">
                Save Changes
              </Button>
              <Button onClick={this.onHideShow}>Close</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    );
  };
  handleCategoryInput = (key, value, index, type) => {
    var { checkedArrayShow, expandedArrayShow } = this.state;
    console.log(checkedArrayShow);
    if (type === "checked") {
      var resultChecked = checkedArrayShow.map((values, _index) => {
        return index === _index ? { ...values, [key]: value } : values;
      });
      console.log(resultChecked);
      this.setState({
        checkedArrayShow: resultChecked,
      });
    } else {
      var resultExpanded = expandedArrayShow.map((values, _index) => {
        return index === _index ? { ...values, [key]: value } : values;
      });
      console.log(resultExpanded);
      this.setState({
        expandedArrayShow: resultExpanded,
      });
    }
  };
  onChange = (e) => {
    var { target } = e;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };
  // onChangeUpdate = (e) => {
  //   var { target } = e;
  //   var name = target.name;
  //   var value = target.value;
  //   this.setState({
  //     [name]: value,
  //   });
  // };
  onSubmit = (e) => {
    e.preventDefault();
    var data = {
      idParent: this.state.idParent,
      name: this.state.name,
      image: this.state.image,
      type: this.state.type
    };
    this.props.onAddCategory(data);
    this.setState({
      idParent: "",
      name: "",
      image: "",
      type: ""
    });
  };
  onSubmitUpdate = (e) => {
    e.preventDefault();
    console.log(this.state);
    var array = [];
    var { checkedArrayShow, expandedArrayShow } = this.state;
    console.log(checkedArrayShow);
    console.log(expandedArrayShow);
    checkedArrayShow.forEach((values, index) => {
      //array.push(values);
      console.log(values.id);
      console.log(values.idParent);
      console.log(values.name);
      console.log(values.type);
      // this.setState({
      //   idUpdate : values.id,
      //   nameUpdate : values.name,
      //   idParentUpdate  : values.idParent
      // })
      // this.setState({
      //   dataUpdate : {
      //     id : values.id,
      //     idParent : values.idParent,
      //     name : values.name
      //   }
      // });
      var result = {
        id: values.id,
        name: values.name,
        idParent: values.idParent,
        type: values.type,
      };
      console.log(result);
      this.props.onUpdateCategory(result);
    });
    // expandedArrayShow.forEach((values, index) => {
    //   array.push(values);
    // });
    console.log(array);
    // this.setState({
    //   arrayUpdate : array
    // })
    // console.log(this.state.arrayUpdate);
  };
  // onSubmitUpdate = (e) => {
  //   e.preventDefault();
  //   console.log(this.state);
  // };
  setModalShow = () => {
    this.setState({
      modalShow: true,
      temp: 0,
    });
  };
  setModalShowCategory = () => {
    this.setState({
      updateCategory: true,
      temp: 1,
    });
    var { checked, expanded, checkedArrayShow, expandedArrayShow } = this.state;
    var { category1 } = this.props;
    var checkedArray = [];
    var expandedArray = [];
    console.log(category1);
    // const categories = this.createCategories(this.props.category1);
    checked.length > 0 &&
      checked.forEach((values, index) => {
        category1.forEach((valuess, index) => {
          if (values === valuess.id) {
            checkedArray.push(valuess);
          }
        });
      });
    expanded.length > 0 &&
      expanded.forEach((values, index) => {
        category1.forEach((valuess, index) => {
          if (values === valuess.id) {
            expandedArray.push(valuess);
          }
        });
      });
    console.log(checkedArray);
    console.log(expandedArray);
    console.log(this.state.checked);
    console.log(this.state.expanded);
    this.setState({
      checkedArrayShow: checkedArray,
      expandedArrayShow: expandedArray,
    });
    console.log(checkedArrayShow);
    console.log(expandedArrayShow);
  };
  setModalShowCategoryDelete = () => {
    this.setState({
      showDelete: true,
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
        children: this.createCategories(categories, cate.id),
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
        children:
          cate.children &&
          cate.children.length > 0 &&
          this.createCategoriesTree(cate.children),
      });
    }
    return categoryList;
  };
  render() {
    console.log(this.state.checkedArrayShow);
    console.log(this.state.expandedArrayShow);
    // api data từ cateroty đang ở dạng thẳng, phải filter qua lọc qua và
    // dùng đệ quy để lọc và hiển thị con theo cha
    var { category1 } = this.props;
    var result = this.getOptionMenu(category1);
    var deleteName = [];
    var { checkedArrayShow, expandedArrayShow, arrayDelete } = this.state;
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
                    <div class="actions_btn">
                      <span className="actions_btn-child">Actions: </span>
                      <Button
                        className="actions_btn-child"
                        onClick={this.setModalShow}
                        variant="success"
                      >
                        <AddCircleOutlineIcon className="category_icon" />
                        <span className="title_btn">Add Category</span>
                      </Button>
                      <Button
                        className="actions_btn-child"
                        onClick={this.setModalShowCategory}
                        variant="primary"
                      >
                        <EditIcon className="category_icon" />
                        <span className="title_btn">Update Category</span>
                      </Button>
                      <Button
                        className="actions_btn-child"
                        onClick={this.setModalShowCategoryDelete}
                        variant="danger"
                      >
                        <DeleteForeverIcon className="category_icon" />
                        <span className="title_btn">Delete Category</span>
                      </Button>
                    </div>
                  </div>
                  {this.renderAddCategoryModal(category1)}
                  {/* delete */}
                  <Modal
                    show={this.state.showDelete}
                    onHide={this.hiddenDelete}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Are you sure delete category?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      {
                        // this.showDeleteName()
                        this.state.checked.length > 0 ? (
                          this.showDeleteName()
                        ) : (
                          <h6>No data available </h6>
                        )
                      }
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="primary"
                        onClick={this.hiddenDeleteAccess}
                      >
                        Save Changes
                      </Button>
                      <Button variant="secondary" onClick={this.hiddenDelete}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  {/* Edit */}
                  <Modal
                    show={this.state.updateCategory}
                    onHide={this.updateCategory}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="contained-modal-title-vcenter">
                        Update Category
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form onSubmit={this.onSubmitUpdate}>
                        <div className="expanded_category">
                          <p className="expanded">Expanded Category</p>
                          {console.log(expandedArrayShow)}
                          {expandedArrayShow.length > 0 ? (
                            expandedArrayShow.map((values, index) => {
                              return (
                                <Row key={index}>
                                  <Col>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                      <Form.Label>Name category</Form.Label>
                                      <Form.Control
                                        type="text"
                                        //name="nameUpdate"
                                        // value={this.state.name}
                                        value={values.name}
                                        onChange={(e) =>
                                          this.handleCategoryInput(
                                            "name",
                                            e.target.value,
                                            index,
                                            "expanded"
                                          )
                                        }
                                        placeholder="input category..."
                                      />
                                    </Form.Group>
                                  </Col>

                                  <Col>
                                    <Form.Group controlId="exampleForm.ControlSelect1">
                                      <Form.Label>Category select</Form.Label>
                                      <Form.Control
                                        onChange={(e) =>
                                          this.handleCategoryInput(
                                            "idParent",
                                            e.target.value,
                                            index,
                                            "expanded"
                                          )
                                        }
                                        //value={this.state.idParent}
                                        value={values.idParent}
                                        as="select"
                                      >
                                        <option value="">category select</option>
                                        {category1.map((values, index) => {
                                          return (
                                            <option
                                              key={index}
                                              value={values.id}
                                            >
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
                                        name="typeSelected"
                                        onChange={(e) =>
                                          this.handleCategoryInput(
                                            "type",
                                            e.target.value,
                                            index,
                                            "expanded"
                                          )
                                        }
                                        value={values.type}
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
                              );
                            })
                          ) : (
                            <p>No data available </p>
                          )}
                        </div>

                        <div className="checked_category">
                          <p className="checked">Checked Category</p>
                          {checkedArrayShow.length > 0 ? (
                            checkedArrayShow.map((values, index) => {
                              return (
                                <Row>
                                  <Col>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                      <Form.Label>Name category</Form.Label>
                                      <Form.Control
                                        type="text"
                                        //name="nameUpdate"
                                        //value={this.state.nameUpdate}
                                        value={values.name}
                                        //onChange={this.onChangeUpdate}
                                        onChange={(e) =>
                                          this.handleCategoryInput(
                                            "name",
                                            e.target.value,
                                            index,
                                            "checked"
                                          )
                                        }
                                        placeholder="input category..."
                                      />
                                    </Form.Group>
                                  </Col>

                                  <Col>
                                    <Form.Group controlId="exampleForm.ControlSelect1">
                                      <Form.Label>Category select</Form.Label>
                                      <Form.Control
                                        onChange={(e) =>
                                          this.handleCategoryInput(
                                            "idParent",
                                            e.target.value,
                                            index,
                                            "checked"
                                          )
                                        }
                                        //value={this.state.idParent}
                                        value={values.idParent}
                                        as="select"
                                      >
                                        <option value="">category select</option>
                                        {category1.map((values, index) => {
                                          return (
                                            <option
                                              key={index}
                                              value={values.id}
                                            >
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
                                        name="typeSelected"
                                        onChange={(e) =>
                                          this.handleCategoryInput(
                                            "type",
                                            e.target.value,
                                            index,
                                            "checked"
                                          )
                                        }
                                        value={values.type}
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
                              );
                            })
                          ) : (
                            <p>No data available </p>
                          )}
                        </div>
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
                  </Modal>
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
    onUpdateCategory: (data) => {
      dispatch(actions.updateCategoryAPI(data));
    },
    onDeleteCategory: (id) => {
      dispatch(actions.deleteCategoryAPI(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(category);
