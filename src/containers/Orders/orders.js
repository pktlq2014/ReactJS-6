import React, { Component } from "react";
import { Row, Col, Container, Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./styles.css";
import { connect } from "react-redux";
import * as actions from "./../../actions/index";
import SideBar from "./../../components/SideBar/sidebar";

import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import HotelIcon from "@material-ui/icons/Hotel";
import RepeatIcon from "@material-ui/icons/Repeat";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
class orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      status: 0,
      data: {},
    };
  }
  onClickUpdate = (object) => {
    console.log(object);
    var data = {
      address: object.address,
      date: object.date,
      id: object.id,
      order: object.order,
      payment: object.payment,
      status: this.state.status,
      total: object.total,
      username: object.username,
    };
    this.setState({
      data: data,
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
    console.log(this.state.data);
    this.props.onOrderUpdate(this.state.data);
  };
  onClick = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };
  componentDidMount() {
    this.props.onOrderAPI();
  }
  render() {
    var { order } = this.props;
    console.log(order);
    return (
      <Container fluid>
        <Row className="side_bar">
          <SideBar />
          <Col md={10} className="side_bar-marginLeft">
            {order.map((object, index) => {
              var date = object.date.split(",");
              var dateDelivery = date[0].split("/");
              var dateSetup = 0,
                monthSetup = 0,
                yearSetup = 0;
              return (
                <div key={index} className="order_parent">
                  <div className="order_title">
                    <div>Order</div>
                    <div>{object.id}</div>
                  </div>
                  <div className="divide_title_content"></div>
                  <div className="order_content">
                    <div>
                      <Table
                        className="order_table"
                        striped
                        bordered
                        hover
                        size="sm"
                      >
                        <thead>
                          <tr className="order_table_item">
                            <th className="order_table_item_order_name">
                              Account name
                            </th>
                            <th className="order_table_item_order_content">
                              {object.username}
                            </th>
                          </tr>
                          <tr className="order_table_item">
                            <th className="order_table_item_order_name">
                              Delivery address
                            </th>
                            <th className="order_table_item_order_content limit">
                              {object.address ? (
                                object.address
                              ) : (
                                <div className="order_table_item_available">
                                  delivery address not available, please check
                                  again
                                </div>
                              )}
                            </th>
                          </tr>
                          <tr className="order_table_item">
                            <th className="order_table_item_order_name">
                              Order
                            </th>
                            <th className="order_table_item_order_content">
                              {object.order.map((values, index) => {
                                return (
                                  <div key={index}>{`${values.name} : ${
                                    values.price
                                  }$ (price) x ${
                                    values.quantity
                                  } (quantity) = ${
                                    values.price * values.quantity
                                  }$`}</div>
                                );
                              })}
                            </th>
                          </tr>
                          <tr className="order_table_item">
                            <th className="order_table_item_order_name">
                              Total amount
                            </th>
                            <th className="order_table_item_order_content">
                              {object.total + 6}$ (+6$ shipping)
                            </th>
                          </tr>
                          <tr className="order_table_item">
                            <th className="order_table_item_order_name">
                              Payment method
                            </th>
                            <th className="order_table_item_order_content">
                              {object.payment ? (
                                object.payment
                              ) : (
                                <div className="order_table_item_available">
                                  payment method not available, please check
                                  again
                                </div>
                              )}
                            </th>
                          </tr>
                          <tr>
                            <th>Date of order</th>
                            <th>{`${dateDelivery[1]}/${dateDelivery[0]}/${dateDelivery[2]}`}</th>
                          </tr>
                        </thead>
                      </Table>
                    </div>
                    <div key={index} className="status_order">
                      <div className="timeline">
                        <div className="timeline_child">
                          <div>ordered</div>
                          <div className="timeline_child_status">
                            <div className="timeline_2_child">1</div>
                            {object.status > 0 ? (
                              <div className="timeline_status update_status"></div>
                            ) : (
                              <div className="timeline_status"></div>
                            )}
                          </div>
                          <div>{`${Number(dateDelivery[1]) + 1}/${
                            dateDelivery[0]
                          }/${dateDelivery[2]}`}</div>
                        </div>

                        {object.status > 1 ? (
                          <div className="timeline_child">
                            <div>packed</div>
                            <div className="timeline_child_status">
                              <div className="timeline_2_child">2</div>
                              <div className="timeline_status update_status"></div>
                            </div>
                            <div>{`${Number(dateDelivery[1]) + 2}/${
                              dateDelivery[0]
                            }/${dateDelivery[2]}`}</div>
                          </div>
                        ) : (
                          <div className="timeline_child_active">
                            <div>packed</div>
                            <div className="timeline_child_status">
                              <div className="timeline_2_child_active">2</div>
                              <div className="timeline_status"></div>
                            </div>
                            <div>{`${Number(dateDelivery[1]) + 2}/${
                              dateDelivery[0]
                            }/${dateDelivery[2]}`}</div>
                          </div>
                        )}

                        {object.status >= 3 && object.status <= 4 ? (
                          <div className="timeline_child">
                            <div>shipped</div>
                            <div className="timeline_child_status">
                              <div className="timeline_2_child">3</div>
                              <div className="timeline_status update_status"></div>
                            </div>
                            <div>{`${Number(dateDelivery[1]) + 3}/${
                              dateDelivery[0]
                            }/${dateDelivery[2]}`}</div>
                          </div>
                        ) : (
                          <div className="timeline_child_active">
                            <div>shipped</div>
                            <div className="timeline_child_status">
                              <div className="timeline_2_child_active">3</div>
                              <div className="timeline_status"></div>
                            </div>
                            <div>{`${Number(dateDelivery[1]) + 3}/${
                              dateDelivery[0]
                            }/${dateDelivery[2]}`}</div>
                          </div>
                        )}

                        {object.status > 3 && object.status <= 4 ? (
                          <div className="timeline_child">
                            <div>delivered</div>
                            <div className="timeline_child_status">
                              <div className="timeline_2_child">4</div>
                            </div>
                            <div>{`${Number(dateDelivery[1]) + 4}/${
                              dateDelivery[0]
                            }/${dateDelivery[2]}`}</div>
                          </div>
                        ) : (
                          <div className="timeline_child_active">
                            <div>delivered</div>
                            <div className="timeline_child_status">
                              <div className="timeline_2_child_active">4</div>
                            </div>
                            <div>{`${Number(dateDelivery[1]) + 4}/${
                              dateDelivery[0]
                            }/${dateDelivery[2]}`}</div>
                          </div>
                        )}
                      </div>

                      <div className="update_status_delivery">
                        <form onSubmit={this.onSubmit}>
                          <select
                            name="status"
                            onChange={this.onChange}
                            id="input"
                            value={this.state.status}
                            className="form-control"
                            required="required"
                          >
                            <option value={0}>select status</option>
                            <option value={1}>packed</option>
                            <option value={2}>shipped</option>
                            <option value={3}>delivery</option>
                            <option value={4}>success</option>
                          </select>
                          <button
                            onClick={() => this.onClickUpdate(object)}
                            className="submit_delivery"
                            type="submit"
                          >
                            save the delivery status
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Col>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    order: state.order,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onOrderAPI: () => {
      dispatch(actions.orderAPI());
    },
    onOrderUpdate: (data) => {
      dispatch(actions.updateOrderAPI(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(orders);
