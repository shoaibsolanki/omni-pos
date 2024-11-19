import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import Table from "react-bootstrap/Table";

import Accordion from "react-bootstrap/Accordion";
import Select, { useStateManager } from "react-select";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import Flatpickr from "react-flatpickr";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import MyCart from "./MyCart";
import {
  handleViewOrderPendingRequest,
  handelgetOrderDetailsRequest,
} from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";

const ViewOrders = ({ viewOrderModalIsOpen, setViewOrderModalIsOpen }) => {
  const { userName, userType } = localStorage.getItem("User_data")
    ? JSON.parse(localStorage.getItem("User_data"))
    : {};

  // console.log("MAIN PENDING ORDER", userType);
  const {
    pending_order_data,
    bahikhata_party_name_dropdown,
    view_status_data,
  } = useSelector((e) => e.ComponentPropsManagement);

  console.log("view_status_data ", view_status_data);
  console.log("pending_order_data", pending_order_data);

  const checkCustomer = userName.includes("CUSTOMER");
  const [bahikhataArr, setBahikhataArr] = useState({
    party_name: "",
    payment_type: "",
    payment_date: "",
    payment_mode: "",
    amount: "",
    payment_notes: "",
  });
  // useEffect(() => {
  //   if (userType === "CUSTOMER") {
  //     // navigate("/home");
  //   }
  // }, [userType]);

  const [show, setShow] = useState(false);
  // const [openSummery, setOpenSummery] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [openSummery, setOpenSummery] = useState(false);

  console.log("ORDER NUMBER", orderNumber);

  // console.log("view_status_data", view_status_data);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(handleViewOrderPendingRequest());
  //   console.log("this is UseEfect")
  // }, []);

  useEffect(() => {
    if (pending_order_data.length > 0) {
      // setOrderNumber(pending_order_data[0].order_id);
    }
  }, [pending_order_data]);

  // useEffect(() => {
  //   dispatch(handelgetOrderDetailsRequest());
  // }, []);

  return (
    <>
      <Modal
        fullscreen={true}
        isOpen={viewOrderModalIsOpen}
        toggle={() => setViewOrderModalIsOpen(!viewOrderModalIsOpen)}
        className="modal-xl"
      >
        <ModalHeader>
          <div className="w-100">
            <div className="">
              <div
                style={{
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <HiOutlineArrowSmallLeft
                    className="mouse-pointer"
                    onClick={() => {
                      setViewOrderModalIsOpen(!viewOrderModalIsOpen);
                    }}
                  />
                  &nbsp;{" "}
                  <span
                    style={{
                      color: "#ff8b00",
                      fontSize: 19,
                      fontWeight: "bold",
                    }}
                  >
                    Pending Orders
                  </span>
                </div>
                <div onClick={() => {
                  setOpenSummery((state) => !state)
                  dispatch(handelgetOrderDetailsRequest());
                  }}>
                  <button
                    color="primary"
                    style={{
                      color: "#ff8b00",
                      border: "none",
                      outline: "none",
                      backgroundColor: "#fff",
                      // border: "1px solid #ff8b00",
                      borderRight: 10,
                      padding: 5,
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    Order Summery
                  </button>
                </div>
              </div>
              <div>
                {/* <Button type='button' className='btn btn-sm' color='primary'>To Bill</Button> */}
              </div>
            </div>
          </div>
        </ModalHeader>
        <ModalBody
          style={{
            background: "#FDEECC",
            // justifyContent: "center",
            width: "100%",
          }}
        >
          <div style={{}}>
            {openSummery ? (
              <Table striped bordered hover variant="light">
                <thead>
                  <tr>
                    <th
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: 20,
                      }}
                    >
                      Item Name
                    </th>
                    <th
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: 20,
                      }}
                    >
                      Quantity
                    </th>
                  </tr>
                </thead>
                {view_status_data.data &&
                  view_status_data.data.map((el) => (
                    <tbody>
                      <tr>
                        <td style={{ textAlign: "center" }}>{el.item_name}</td>
                        <td style={{ textAlign: "center" }}>
                          {el.total_quantity}
                        </td>
                      </tr>
                    </tbody>
                  ))}
              </Table>
            ) : (
              false
            )}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "center",
                // margin: "auto",
              }}
            >
              {pending_order_data.map((item) => (
                <>
                  <div
                    style={{
                      backgroundColor: "white",
                      // margin: 20,
                      // marginTop: 20,
                      marginLeft: 20,
                      marginRight: 20,
                      marginTop: 20,
                      borderRadius: "8px",
                    }}
                  >
                    <div
                      style={{
                        padding: 20,
                        borderRadius: "8px",
                        border: "2px solid #BFBFBF",
                        width: "350px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",

                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <p
                            style={{
                              color: "#808080",
                              fontSize: "14px",
                              fontWeight: 400,
                              lineHeight: "normal",
                            }}
                          >
                            Order Id
                          </p>
                          <p
                            style={{
                              color: "#1E1E1E",
                              fontSize: "16px",
                              fontWeight: 400,
                              lineHeight: "normal",
                            }}
                          >
                            {item.order_id}
                          </p>
                        </div>
                        <Button
                          style={{ backgroundColor: "#FFDCA8", color: "#000" }}
                        >
                          Pending
                        </Button>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <p
                          style={{
                            color: "#808080",
                            fontSize: "14px",
                            fontWeight: 400,
                            lineHeight: "normal",
                          }}
                        >
                          Date
                        </p>
                        <p
                          style={{
                            color: "#1E1E1E",
                            fontSize: "16px",
                            fontWeight: 400,
                            lineHeight: "normal",
                          }}
                        >
                          {item.order_date}
                        </p>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <p
                          style={{
                            color: "#808080",
                            fontSize: "14px",
                            fontWeight: 400,
                            lineHeight: "normal",
                          }}
                        >
                          Name
                        </p>
                        <p
                          style={{
                            color: "#1E1E1E",
                            fontSize: "16px",
                            fontWeight: 400,
                            lineHeight: "normal",
                          }}
                        >
                          {item.customer_name}
                        </p>
                      </div>
                      {item.mobile_number &&<div style={{ display: "flex", flexDirection: "column" }}>
                        <p
                          style={{
                            color: "#808080",
                            fontSize: "14px",
                            fontWeight: 400,
                            lineHeight: "normal",
                          }}
                        >
                          mobile_number
                        </p>
                        <p
                          style={{
                            color: "#1E1E1E",
                            fontSize: "16px",
                            fontWeight: 400,
                            lineHeight: "normal",
                          }}
                        >
                          {item.mobile_number}
                        </p>
                      </div>}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <p
                            style={{
                              color: "#808080",
                              fontSize: "14px",
                              fontWeight: 400,
                              lineHeight: "normal",
                            }}
                          >
                            Quantity
                          </p>
                          <p
                            style={{
                              color: "#1E1E1E",
                              fontSize: "16px",
                              fontWeight: 400,
                              lineHeight: "normal",
                            }}
                          >
                            {item.order_qty}
                          </p>
                        </div>{" "}
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <p
                            style={{
                              color: "#808080",
                              fontSize: "14px",
                              fontWeight: 400,
                              lineHeight: "normal",
                            }}
                          >
                            Value
                          </p>
                          <p
                            style={{
                              color: "#1E1E1E",
                              fontSize: "16px",
                              fontWeight: 400,
                              lineHeight: "normal",
                            }}
                          >
                            {item.order_value}
                          </p>
                        </div>
                      </div>
                      <div
                        style={{ width: "100%" }}
                        onClick={() => {
                          setShow(true);
                          setOrderNumber(item.order_id);
                        }}
                      >
                        <Button
                          style={{
                            width: "100%",
                            backgroundColor: "#457FD4",
                            fontWeight: 600,
                          }}
                        >
                          Process Order
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
      {show === true && (
        <>
          <MyCart show={show} setShow={setShow} orderNumber={orderNumber} />
        </>
      )}
    </>
  );
};

export default ViewOrders;
