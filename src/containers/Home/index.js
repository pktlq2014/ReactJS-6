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
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      categoryID: "",
      title: "",
      productPictures: [],
      bannerPictures: [],
      imageBanner: "",
      imageProduct: "",
    };
  }
  componentDidMount() {
    this.props.onShowPage();
    this.props.onShowCategory();
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
  onChangeImageBanner = (e) => {
    var data = [...this.state.bannerPictures, e.target.files[0]];
    this.setState({
      bannerPictures: data,
    });
    var { target } = e;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };
  onChangeImageProduct = (e) => {
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
    var arrayProduct = [];
    var arrayBanner = [];
    var picturesProduct = this.state.productPictures;
    var picturesBanner = this.state.bannerPictures;
    picturesProduct.forEach((values, index) => {
      console.log(values);
      arrayProduct.push({
        id: values.lastModified,
        img: values.name,
        navigateTo: `/productClicked?categoryId=${values.lastModified}&type=${values.name}`,
      });
    });
    picturesBanner.forEach((values, index) => {
      console.log(values);
      arrayBanner.push({
        id: values.lastModified,
        img: values.name,
        navigateTo: `/bannerClicked?categoryId=${values.lastModified}&type=${values.name}`,
      });
    });

    var data = {
      category: this.state.categoryID,
      title: this.state.title,
      imageBanner: this.state.imageBanner,
      imageProduct: this.state.imageProduct,
      banners: arrayBanner,
      products: arrayProduct,
    };
    this.props.onPageAPI(data);
    this.setState({
      categoryID: "",
      title: "",
      imageBanner: "",
      imageProduct: "",
      productPictures: [],
      bannerPictures: [],
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
    var { category, page } = this.props;
    console.log(page);
    // console.log(category);
    // console.log(showProduct);
    //var image = require(`./images/truoc.jpg`);
    var data = page.map((values, index) => {
      return (
        <tr key={index} className="textAlign-center">
          <td>{values.id}</td>
          <td>{values.category}</td>
          <td className="width-40">{values.title}</td>
          <td className="width-15">
            {values.products.map((valuess, index) => {
              var image = require(`./../../assets/images/${valuess.img}`);
              return (
                <img
                  key={index}
                  className="img"
                  //src={`${process.env.PUBLIC_URL}/${truoc}`}
                  src={image.default}
                  alt="logo"
                />
              );
            })}
          </td>
          <td className="width-15">
            {values.banners.map((valuesss, index) => {
              var image = require(`./../../assets/images/${valuesss.img}`);
              return (
                <img
                  key={index}
                  className="img"
                  //src={`${process.env.PUBLIC_URL}/${truoc}`}
                  src={image.default}
                  alt="logo"
                />
              );
            })}
          </td>
        </tr>
      );
    });
    return (
      <div className="admin">
        <SideBar />
        <div className="textAlign-justify side_bar-marginLeft">
          <Container>
            <Row>
              <Col md={12}>
                <div className="category">
                  <h3>Type</h3>
                  <Button onClick={this.setModalShow} variant="success">
                    Add Type
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
                        Add New Type
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form onSubmit={this.onSubmit}>
                        <Form.Group controlId="exampleForm.ControlInput1">
                          <Form.Label>Title</Form.Label>
                          <Form.Control
                            type="text"
                            name="title"
                            value={this.state.title}
                            onChange={this.onChange}
                            placeholder="title..."
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
                        {this.state.bannerPictures.length > 0
                          ? this.state.bannerPictures.map((values, index) => {
                              return <div key={index}>{values.name}</div>;
                            })
                          : null}
                        <Form.File
                          type="file"
                          name="imageBanner"
                          onChange={this.onChangeImageBanner}
                          id="exampleFormControlFile1"
                          label="Picture banner input"
                        />
                        {this.state.productPictures.length > 0
                          ? this.state.productPictures.map((values, index) => {
                              return <div key={index}>{values.name}</div>;
                            })
                          : null}
                        <Form.File
                          type="file"
                          name="imageProduct"
                          onChange={this.onChangeImageProduct}
                          id="exampleFormControlFile2"
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
                      <th>CategoryID</th>
                      <th>Title</th>
                      <th>ProductPicture</th>
                      <th>BannerPicture</th>
                    </tr>
                  </thead>
                  <tbody>{data}</tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </div>
        {/* <Col md={10} className="textAlign-justify side_bar-marginLeft">
         </Col> */}
      </div>
      // <Container fluid>
      //   <Row className="side_bar">
      //    </Row>
      // </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    page: state.page,
    category: state.category,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onPageAPI: (data) => {
      dispatch(actions.pageAPI(data));
    },
    onShowPage: () => {
      dispatch(actions.showPageAPI());
    },
    onShowCategory: () => {
      dispatch(actions.category());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
