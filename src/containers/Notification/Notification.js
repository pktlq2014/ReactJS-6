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
import * as actions from "../../actions/index";
import SideBar from "../../components/SideBar/sidebar";
class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      title: "",
      description: "",
      imageNotificationArray: [],
      imageNotification: "",
    };
  }
  componentDidMount() {
    this.props.onNotificationShow();
  }
  onChangeImageNotification = (e) => {
    var data = [...this.state.imageNotificationArray, e.target.files[0]];
    this.setState({
      imageNotificationArray: data,
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
    var picturesProduct = this.state.imageNotificationArray;
    picturesProduct.forEach((values, index) => {
      console.log(values);
      array.push({ id: values.lastModified, img: values.name });
    });
    var data = {
      title: this.state.title,
      description: this.state.description,
      notification: this.state.imageNotification,
      notificationArray: array,
    };
    this.props.onNotification(data);
    this.setState({
      title: "",
      description: "",
      imageNotification: "",
      imageNotificationArray: [],
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
    var { notification } = this.props;
    console.log(notification);
    // console.log(category);
    // console.log(showProduct);
    var data = notification.map((values, index) => {
      return (
        <tr key={index} className="textAlign-center">
          <td>{values.id}</td>
          <td className="width-40">{values.title}</td>
          <td className="width-90">{values.description}</td>
          <td className="width-15-notification">
            {values.notificationArray.map((valuess, index) => {
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
        </tr>
      );
    });
    return (
      <div className="admin">
        <div className="side_bar_menu_new admin_left">
          <li>
            <NavLink exact to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/notification">
              Notification
            </NavLink>
          </li>
          <li>
            <NavLink to="/products">Products</NavLink>
          </li>
          <li>
            <NavLink to="/orders">Orders</NavLink>
          </li>
          <li>
            <NavLink to="/category">Category</NavLink>
          </li>
        </div>
        <div className="admin_right ">
          <div className="category_new">
            <h3>Notification</h3>
            <Button onClick={this.setModalShow} variant="success">
              Add Notification
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
                  Add New Notification
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
                  {this.state.imageNotificationArray.length > 0
                    ? this.state.imageNotificationArray.map((values, index) => {
                        return <div key={index}>{values.name}</div>;
                      })
                    : null}
                  <Form.File
                    type="file"
                    name="imageNotification"
                    onChange={this.onChangeImageNotification}
                    id="exampleFormControlFile1"
                    label="Picture notification input"
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
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>NotificationPicture</th>
              </tr>
            </thead>
            <tbody>{data}</tbody>
          </Table>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onNotification: (data) => {
      dispatch(actions.notificationAPI(data));
    },
    onNotificationShow: () => {
      dispatch(actions.notificationShowAPI());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Notification);
