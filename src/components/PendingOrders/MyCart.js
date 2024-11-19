import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Col, FormGroup, Row } from "reactstrap";
import { Modal } from "react-bootstrap";
import { Input, Label } from "reactstrap";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import { BsHandbag, BsArrowRight } from "react-icons/bs";
import { FcSpeaker } from "react-icons/fc";
import { IoCashOutline } from "react-icons/io5";
import { BsArrowLeft } from "react-icons/bs";
import { TbDiscount2 } from "react-icons/tb";
import { SiPaytm } from "react-icons/si";
import { FaGooglePay } from "react-icons/fa";
import FormControl from "@mui/material/FormControl";
import { BsFillCheckCircleFill } from "react-icons/bs";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { SiPhonepe } from "react-icons/si";
import { SiContactlesspayment } from "react-icons/si";
import { BsCreditCardFill } from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io";
import { confirmAlert } from "react-confirm-alert"; // Import
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import PaymentModal from "./PaymentModal";
// import { pendingOrderCartDataRequest } from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import {
  handelCustomerAllAddressRequest,
  handelCustomerDetailforAddressRequest,
  handelCustomerDetailforPendingRequest,
  pendingOrderCartDataRequest,
} from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import Sale from "../../assets/Sale.png";
import axios from "axios";
import { BASE_Url, host } from "../../URL";
const MyCart = ({ show, setShow, orderNumber }) => {
  // console.log("ORDERNUMBER", orderNumber);
  const {
    user_data,
    pending_order_cart_data,
    customer_detail_pending_order,
    customer_address_pending_order,
  } = useSelector((e) => e.ComponentPropsManagement);
  console.log("CDPO", customer_detail_pending_order);
  const {
    createdAt,
    password,
    registerId,
    status,
    saasId,
    storeId,
    storeName,
    userId,
    userName,
  } = localStorage.getItem("User_data")
      ? JSON.parse(localStorage.getItem("User_data"))
      : {};

  console.log("ADDRESS ID", customer_detail_pending_order);
  const checkCustomer = userName.includes("C");

  const dispatch = useDispatch();
  const [invoiceValue, setInvoiceValue] = useState(0);
  const [addressDetails, setAddressDetails] = useState("");
  const [street, settreet] = useState("");
  const [state, setState] = useState("");
  const [sumValue, setSumValue] = useState(0);
  const [popoverIsOpen, setPopoverIsOpen] = useState(false);

  const [discountPercentVal, setDiscountPercentVal] = useState("");
  const [discountAmountVal, setDiscountAmountVal] = useState("");
  const [totalDiscountVal, setTotalDiscountVal] = useState(0);
  const [cartData, setCartData] = useState([]);
  const [paymentModalIsOpen, setPaymentModalIsOpen] = useState(false);
  const [balanceDue, setBalanceDue] = useState(0);
  const [amount, setAmount] = useState("");
  const [optionTickSum, setOptionTickSum] = useState(0);
  const [optionTick, setOptionTick] = useState([]);

  // console.log("this is state", state)

  useEffect(() => {
    dispatch(pendingOrderCartDataRequest({ order_id: orderNumber }));
  }, []);

  useEffect(() => {
    if (pending_order_cart_data?.length > 0) {
      const obj = JSON.parse(JSON.stringify(pending_order_cart_data));
      obj.map((item) => {
        item["discount_menu_is_open"] = false;
        item["discount_value"] = "";
        item["amount_value"] = "";
        item["discount"] = 0;
        item["new_price"] = Number(item.item_price) * Number(item.item_qty);
        item["zero_price"] = Number(item.item_price) * Number(item.item_qty);
        item["itemName"] = item.item_name;
        item["productId"] = item.item_id;
        item["productName"] = item.item_name;
        item["price"] = item.item_price;
        item["sku"] = "SKU";
        item["description"] = item.item_name;
        item["tax"] = item.bill_tax;
        item["department"] = "Dept2";
        item["productQty"] = item.item_qty;
        item["saasId"] = saasId;
        item["storeId"] = storeId;
        item["promoId"] = null;
        item["category"] = item.item_name;
        item["status"] = "active";
        item["taxPercent"] = 10;
        item["imageName"] = null;
        item["hsnCode"] = "0";
        item["taxRate"] = 0;
        item["taxCode"] = "0";
      });
      // console.log("OBJ", obj);
      setCartData(obj);
    }
  }, [pending_order_cart_data, orderNumber]);
  // console.log("PNDT CART DATA", pending_order_cart_data);
  useEffect(() => {
    setInvoiceValue(parseFloat(sumValue).toFixed(2));
  }, [sumValue, totalDiscountVal]);

  useEffect(() => {
    if (
      Number(optionTickSum) === Number(invoiceValue) &&
      Number(invoiceValue) !== 0
    ) {
      setAmount(0);
      setBalanceDue(0);
    } else if (Number(optionTickSum) < Number(invoiceValue)) {
      const balance_due = Number(invoiceValue) - Number(optionTickSum);
      setBalanceDue(parseFloat(balance_due).toFixed(2));
      setAmount(parseFloat(balance_due).toFixed(2));
    }
  }, [optionTickSum, invoiceValue]);

  useEffect(() => {
    let sum = 0;
    if (optionTick && optionTick?.length > 0) {
      optionTick.map((item) => {
        sum = sum + Number(item.amount);
      });
    } else {
      sum = 0;
    }
    setOptionTickSum(sum);
  }, [optionTick]);

  useEffect(() => {
    if (cartData.length > 0) {
      const t1 = [];
      cartData.map((item) => {
        const r1 = Number(item.new_price);
        t1.push(parseFloat(r1).toFixed(2));
      });
      let sum = 0;
      t1.map((item) => {
        sum = sum + Number(item);
      });
      setSumValue(sum);
      setAmount(sum);
    } else {
      setInvoiceValue(0);
      setSumValue(0);
      setDiscountPercentVal("");
      setDiscountAmountVal("");
      setTotalDiscountVal(0);
    }
  }, [cartData]);

  const handleDiscount = (item, discount_value) => {
    const price = Number(item.item_price) * Number(item.item_qty);
    const calculatedVal = (price * discount_value) / 100;
    const t1 = price - calculatedVal;
    item.discount = parseFloat(calculatedVal).toFixed(2);
    item.new_price = t1;
    setCartData([...cartData]);
  };

  useEffect(() => {
    const handleWindowClose = (event) => {
      event.preventDefault();
      // Custom message to display in the confirmation dialog

      const confirmationMessage =
        "Please complete the transaction, we can see you have some items in your cart if you leave or exit data will be deleted!!";
      event.returnValue = confirmationMessage; // Gecko, Trident, Chrome 34+
      return confirmationMessage; // Gecko, WebKit, Chrome <34
    };

    window.addEventListener("beforeunload", handleWindowClose);

    const disableBackButton = (event) => {
      event.preventDefault();
      window.history.forward(); // Navigates forward to the next page
    };

    window.history.pushState(null, null, window.location.href);
    window.addEventListener("popstate", disableBackButton);

    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
      window.removeEventListener("popstate", disableBackButton);
    };
  }, []);

  const handleDiscountLarge = (discount_value) => {
    cartData.map((item) => {
      item.discount_value = discount_value;
      const price = Number(item.item_price) * Number(item.item_qty);
      if (price !== 0) {
        const val = (sumValue * discount_value) / 100;
        const calculatedVal = (price * val) / sumValue;
        item.discount = parseFloat(calculatedVal).toFixed(2);
        item.new_price = price - calculatedVal;
      }
    });
    setCartData([...cartData]);
  };

  const handleDiscountAmountLarge = (discountAmountVal) => {
    cartData.map((item) => {
      item.amount_value = discountAmountVal;
      const price = Number(item.item_price) * Number(item.item_qty);
      if (price !== 0) {
        const calculatedVal = (price * discountAmountVal) / sumValue;
        item.discount = parseFloat(calculatedVal).toFixed(2);
        item.new_price = price - calculatedVal;
      }
    });
    setCartData([...cartData]);
  };

  const handleDec = (item) => {
    if (item.item_qty === 1) {
      item.item_qty = item.item_qty = 1;
      item.new_price = item.item_price;
    } else {
      const q = item.item_qty - 1;
      item.item_qty = q;
      item.new_price = item.item_price * q;
    }
    cartData.map((item) => {
      item.discount_value = "";
      item.amount_value = "";
      item.new_price = item.item_price * item.item_qty;
    });
    setDiscountPercentVal("");
    setDiscountAmountVal("");
    setTotalDiscountVal(0);
    setCartData([...cartData]);
  };

  const handleDiscountAmount = (item, amount_value) => {
    const price = Number(item.item_price) * Number(item.item_qty);
    const calculatedVal = price - amount_value;
    item.discount = parseFloat(amount_value).toFixed(2);
    item.new_price = calculatedVal;
    setCartData([...cartData]);
  };

  const confirmBack = () => {
    if (cartData?.length > 0) {
      confirmAlert({
        title: "Are you sure to exit",
        message: "Are you sure to do this.",
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              setShow(!show);
            },
          },
          {
            label: "No",
            onClick: () => { },
          },
        ],
      });
    } else {
      setShow(!show);
    }
  };

  const handleDeleteCartItem = (item) => {
    const updateCart = cartData.filter((el) => el.item_id !== item.item_id);
    setCartData(updateCart);
  };

  const handleApplyClick = () => {
    if (discountPercentVal) {
      handleDiscountLarge(discountPercentVal);
      const val1 = (sumValue * discountPercentVal) / 100;

      setTotalDiscountVal(parseFloat(val1).toFixed(2));
    } else if (discountAmountVal) {
      handleDiscountAmountLarge(discountAmountVal);
      setTotalDiscountVal(parseFloat(discountAmountVal).toFixed(2));
    } else {
      setTotalDiscountVal(0);
      handleDiscountAmountLarge(0);
    }
  };

  const handlePlusSign = (item) => {
    const q = item.item_qty + 1;
    item.item_qty = q;
    const newP = item.item_price * q;
    item.new_price = newP;

    cartData.map((item) => {
      item.discount_value = "";
      item.amount_value = "";
      item.new_price = item.item_price * item.item_qty;
    });
    setDiscountPercentVal("");
    setDiscountAmountVal("");
    setTotalDiscountVal(0);
    setCartData([...cartData]);
  };

  // console.log("pending_order_cart_data", pending_order_cart_data);
  console.log("PENDING ORDER CARTDATA", cartData);

  //

  const userData = async () => {
    axios
      .get(
        `${BASE_Url}/order/get-ordermaster-details/${saasId}/${storeId}/${orderNumber}`
      )
      .then((res) => {
        // console.log("RESPONSE STORE DATA", res.data.data);
        setState(res.data.data);
      });
  };



  const userAddress = () => {
    axios
      .get(
        `${host}customer/get-address/${saasId}/${storeId}/${state?.address_id}`
      )
      .then((res) => {
        console.log("RESPONSE STORE DATA", res);
        setAddressDetails(res.data.data);
        // setState(res.data.data);
      });
  };
  useEffect(() => {
    if (state) {
      userAddress();
    }
  }, [state]);

  useEffect(() => {
    userData();
  }, []);

  // useEffect(() => {

  // }, []);

  //
  // useEffect(() => {
  //   dispatch(handelCustomerDetailforPendingRequest({ orderNumber }));
  // }, [orderNumber]);

  useEffect(() => {
    dispatch(
      handelCustomerDetailforAddressRequest({
        id: customer_detail_pending_order?.address_id,
      })
    );
  }, [customer_detail_pending_order]);
  // debugger;
  // useEffect(() => {
  //   dispatch(handelCustomerAllAddressRequest());
  // }, []);

  console.log("CART DATA ", cartData);
  return (
    <>
      <Modal
        fullscreen={true}
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            <span style={{ fontWeight: "900", marginRight: "10px" }}>
              <BsArrowLeft
                style={{ cursor: "pointer", marginRight: "5px" }}
                onClick={() => {
                  confirmBack();
                }}
              />
              Process Order
            </span>
            {orderNumber}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            background: "#FDEECC",
          }}
        >
          <div style={{ maxWidth: "500px", margin: "auto" }}>
            <div style={{ width: "100%" }}>
              <div
                style={{
                  backgroundColor: "white",
                  marginTop: 20,
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{
                    padding: 20,
                    borderRadius: "8px",
                    border: "2px solid #BFBFBF",
                  }}
                >
                  <div>
                    <p
                      style={{
                        color: "#808080",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "normal",
                      }}
                    >
                      Order Details
                    </p>
                  </div>
                  <hr />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",

                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
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
                        {state?.order_id}
                      </p>
                    </div>
                    <Button
                      style={{ backgroundColor: "#FFDCA8", color: "#000" }}
                    >
                      {state?.status}
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
                      {state.order_date}
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
                      {/* {customer_detail_pending_order.customer_name} */}
                      {state.customer_name}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
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
                        {state.order_qty}
                      </p>
                    </div>{" "}
                    <div style={{ display: "flex", flexDirection: "column" }}>
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
                        {state.order_value}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* ------------------------------------------------------------------------------------------------------------------------------------------------ */}
              <div
                style={{
                  backgroundColor: "white",
                  marginTop: 20,
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{
                    padding: 20,
                    borderRadius: "8px",
                    border: "2px solid #BFBFBF",
                  }}
                >
                  <div>
                    <p
                      style={{
                        color: "#808080",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "normal",
                      }}
                    >
                      Customer Details *
                    </p>
                  </div>
                  <hr />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",

                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
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
                        {state.customer_name}
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",

                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <p
                        style={{
                          color: "#808080",
                          fontSize: "14px",
                          fontWeight: 400,
                          lineHeight: "normal",
                        }}
                      >
                      street
                      </p>
                      <p
                        style={{
                          color: "#1E1E1E",
                          fontSize: "16px",
                          fontWeight: 400,
                          lineHeight: "normal",
                        }}
                      >
                        {addressDetails.street}
                      </p>
                    </div>
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
                      Address
                    </p>
                    <p
                      style={{
                        color: "#1E1E1E",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "normal",
                      }}
                    >
                      {addressDetails?.address}
                      {/* {customer_address_pending_order.city}
                      {" " +   customer_address_pending_order.pincode} */}
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
                      City
                    </p>
                    <p
                      style={{
                        color: "#1E1E1E",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "normal",
                      }}
                    >
                      {addressDetails?.city}
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
                      State
                    </p>
                    <p
                      style={{
                        color: "#1E1E1E",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "normal",
                      }}
                    >
                      {addressDetails?.state}
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
                      Pincode
                    </p>
                    <p
                      style={{
                        color: "#1E1E1E",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "normal",
                      }}
                    >
                      {addressDetails?.pincode}
                    </p>
                  </div>
                </div>
              </div>
              {/* ---------- */}
              <div
                style={{
                  backgroundColor: "white",
                  marginTop: 20,
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{
                    padding: 20,
                    borderRadius: "8px",
                    border: "2px solid #BFBFBF",
                  }}
                >
                  <div>
                    <p
                      style={{
                        color: "#808080",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "normal",
                      }}
                    >
                      Order Items *
                    </p>
                  </div>
                  <hr />
                  <div>
                    {/* ------------------------------------------------------------------------------------------------------------------------------------------------ */}
                    {cartData?.map((item) => (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginBottom: "10px",
                        }}
                      >
                        <div>
                          <p style={{ fontSize: 20, fontWeight: 400 }}>
                            {item.item_name}
                          </p>
                          <p style={{ fontSize: 20, fontWeight: 400 }}>
                            Color:{item.color}
                          </p>
                        </div>
                        <div className="d-flex justify-content-center my-3">
                          <img width={200} height={200}  src={item.image_url} alt="" />

                        </div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <div
                            style={{ height: "50px" }}
                            className="cart_column"
                          >
                            <div
                              style={{
                                border: "1px solid #eee",
                                borderRadius: "20px",
                                padding: "10px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                              }}
                            >
                              <AiOutlineMinus
                                onClick={() => {
                                  handleDec(item);
                                }}
                              />

                              {item.item_qty}
                              <AiOutlinePlus
                                onClick={() => {
                                  handlePlusSign(item);
                                }}
                              />
                            </div>
                          </div>
                          <div>
                            <div>Total Value</div>
                            <div style={{ flex: 1, marginLeft: "20px" }}>
                              {Number(item.item_price) *
                                Number(item.item_qty) ===
                                0 ? (
                                <>
                                  <FormControl
                                    sx={{ m: 1, width: "25ch" }}
                                    variant="outlined"
                                  >
                                    <InputLabel>Amount</InputLabel>
                                    <OutlinedInput
                                      type="number"
                                      size="small"
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                          item.item_price = item.zero_price;
                                          item.new_price = item.zero_price;
                                          setCartData([...cartData]);
                                        }
                                      }}
                                      endAdornment={
                                        <InputAdornment position="end">
                                          <IconButton
                                            onClick={() => {
                                              item.item_price = item.zero_price;
                                              item.new_price = item.zero_price;
                                              setCartData([...cartData]);
                                            }}
                                            edge="end"
                                          >
                                            <BsFillCheckCircleFill
                                              color={
                                                item.zero_price === "" ||
                                                  item.zero_price === 0
                                                  ? "#979797"
                                                  : "green"
                                              }
                                            />
                                          </IconButton>
                                        </InputAdornment>
                                      }
                                      label="Amount"
                                      className="w-50"
                                      onChange={(e) => {
                                        const val = e.target.value;
                                        if (val) {
                                          item.zero_price = Number(val);
                                          setCartData([...cartData]);
                                        } else {
                                          item.zero_price = "";
                                          setCartData([...cartData]);
                                        }
                                      }}
                                      value={item.zero_price}
                                    />
                                  </FormControl>
                                </>
                              ) : (
                                <>
                                  <div>{item.item_price * item.item_qty}</div>
                                  <div>
                                    <div
                                      style={{
                                        fontSize: "10px",
                                        marginRight: "30px",
                                      }}
                                    >
                                      {item.discount_value ||
                                        item.amount_value ? (
                                        <>
                                          <span
                                            style={{
                                              textDecorationLine:
                                                "line-through",
                                            }}
                                          >
                                            {item.item_price * item.item_qty}
                                          </span>{" "}
                                          /{" "}
                                          {parseFloat(item.new_price).toFixed(
                                            2
                                          )}
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        {item.discount_menu_is_open === true && (
                          <>
                            <div className="d-flex flex-sm-row">
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <TextField
                                  label="Percent Off"
                                  type="number"
                                  className="me-3"
                                  disabled={item.amount_value}
                                  onChange={(e) => {
                                    const val = Number(e.target.value);
                                    if (val) {
                                      if (val >= 1 && val <= 99) {
                                        item.discount_value = val;
                                        handleDiscount(item, val);
                                      } else {
                                        item.discount_value = 99;
                                        handleDiscount(item, 99);
                                      }
                                    } else {
                                      item.discount_value = "";
                                      handleDiscount(item, 0);
                                    }

                                    setDiscountPercentVal("");
                                    setDiscountAmountVal("");
                                    setTotalDiscountVal(0);
                                    // handleDiscount(item, "");
                                  }}
                                  value={item.discount_value}
                                />
                                <TextField
                                  label="Amount Off"
                                  type="number"
                                  className="me-3"
                                  disabled={item.discount_value}
                                  onChange={(e) => {
                                    const val = Number(e.target.value);
                                    if (val) {
                                      if (val >= 1 && val <= 99999) {
                                        item.amount_value = val;
                                        handleDiscountAmount(item, val);
                                      } else {
                                        item.amount_value = 99999;
                                        handleDiscountAmount(item, 99999);
                                      }
                                    } else {
                                      item.amount_value = "";
                                      handleDiscountAmount(item, 0);
                                    }

                                    setDiscountPercentVal("");
                                    setDiscountAmountVal("");
                                    setTotalDiscountVal(0);
                                  }}
                                  value={item.amount_value}
                                />
                                <div>
                                  <button className="btn btn-danger my-3">
                                    Apply
                                  </button>
                                </div>
                              </div>
                            </div>
                          </>
                        )}

                        {/* <div style={{ display: "flex", flexDirection: "row" }}> */}
                        {/* <p
                            style={{
                              color: "#a90a0a",
                              fontWeight: "600",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              handleDeleteCartItem(item);
                            }}
                          >
                            Remove
                          </p> */}
                        {totalDiscountVal === 0 && (
                          <div
                            style={{
                              width: "100%",
                              textAlign: "center",
                              marginTop: 20,
                            }}
                          >
                            <Button
                              style={{
                                backgroundColor: "#EEE",
                                width: "90%",
                                color: "#1E1E1E",
                              }}
                              onClick={() => {
                                item.discount_menu_is_open =
                                  !item.discount_menu_is_open;
                                item.amount_value = "";
                                item.discount_value = "";
                                item.new_price =
                                  item.item_price * item.item_qty;
                                setDiscountPercentVal("");
                                setDiscountAmountVal("");
                                setTotalDiscountVal(0);
                                setCartData([...cartData]);
                              }}
                              className="mx-4"
                            >
                              <TbDiscount2 size={20} />
                              Discount
                            </Button>
                          </div>
                        )}
                      </div>
                      // </div>
                    ))}

                    {/* <div> */}
                    {parseInt(invoiceValue) !== 0 && (
                      <>
                        <div
                          style={{
                            fontSize: "20px",
                            fontWeight: "bold",
                            textAlign: "center",
                            marginBottom: "10px",
                          }}
                        >
                          Total Invoice Value:
                           {Math.round(invoiceValue)}
                          <br />
                        </div>
                      </>
                    )}
                    {cartData?.filter((io) => io.discount_menu_is_open === true)
                      ?.length === 0 &&
                      totalDiscountVal !== 0 && (
                        <>
                          <div
                            style={{
                              fontSize: "20px",
                              fontWeight: "bold",
                              textAlign: "center",
                            }}
                          >
                            Total Discount: {totalDiscountVal}
                          </div>
                        </>
                      )}
                    {cartData?.filter((io) => io.discount_menu_is_open === true)
                      ?.length === 0 && (
                        <>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              flexWrap: "wrap",
                              marginTop: "20px",
                            }}
                            id="pop112"
                          >
                            {parseInt(invoiceValue) !== 0 && (
                              <>
                                {/* <button
                                type="button"
                                style={{
                                  backgroundColor: "rgb(169, 10, 10)",
                                  border: "none",
                                  color: "white",
                                  fontWeight: "bold",
                                  marginBottom: "10px",
                                  padding: "6px 20px",
                                  borderRadius: "10px",
                                }}
                                id="pop112"
                                onClick={() => {
                                  setCartData([]);
                                }}
                              >
                                Remove All Cart Items
                              </button> */}
                                <div
                                  style={{
                                    width: "100%",

                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Button
                                    type="button"
                                    style={{
                                      backgroundColor: "#DDE",
                                      width: "100%",
                                      fontSize: 18,
                                      color: "#1E1E1E",
                                    }}
                                    id="pop112"
                                    onClick={() =>
                                      setPopoverIsOpen(!popoverIsOpen)
                                    }
                                  >
                                    <TbDiscount2 size={22} />
                                    Invoice Discount
                                  </Button>
                                </div>
                              </>
                            )}
                          </div>
                        </>
                      )}

                    <Modal
                      show={popoverIsOpen}
                      size="sm"
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                    >
                      <Modal.Header
                        closeButton
                        onClick={() => setPopoverIsOpen(!popoverIsOpen)}
                      >
                        <Modal.Title id="contained-modal-title-vcenter">
                          <span
                            style={{ fontWeight: "900", marginRight: "10px" }}
                          >
                            Invoice Discount
                          </span>
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Row>
                          <Col md={12}>
                            <FormGroup>
                              <Label>
                                Percent <span className="text-red"> * </span>
                              </Label>
                              <Input
                                type="text"
                                disabled={discountAmountVal}
                                onChange={(e) => {
                                  const val = Number(e.target.value);
                                  if (val) {
                                    if (val >= 1 && val <= 99) {
                                      setDiscountPercentVal(val);
                                    } else {
                                      setDiscountPercentVal(99);
                                    }
                                  } else {
                                    setDiscountPercentVal("");
                                  }
                                }}
                                value={discountPercentVal}
                                placeholder="Percent Value"
                              />
                            </FormGroup>
                          </Col>

                          <Col md={12}>
                            <FormGroup>
                              <Label>
                                Amount <span className="text-red"> * </span>
                              </Label>
                              <Input
                                type="text"
                                disabled={discountPercentVal}
                                onChange={(e) => {
                                  const val = Number(e.target.value);
                                  if (val) {
                                    if (val >= 1 && val <= 99999) {
                                      setDiscountAmountVal(val);
                                    } else {
                                      setDiscountAmountVal(99999);
                                    }
                                  } else {
                                    setDiscountAmountVal("");
                                  }
                                }}
                                value={discountAmountVal}
                                placeholder="Amount Value"
                              />
                            </FormGroup>
                          </Col>
                          <Col md={12}>
                            <FormGroup className="d-flex justify-content-end">
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => {
                                  cartData.map((item) => {
                                    item.discount_value = "";
                                    item.amount_value = "";
                                  });
                                  setCartData([...cartData]);
                                  handleApplyClick();
                                  setPopoverIsOpen(!popoverIsOpen);
                                }}
                              >
                                Apply
                              </button>
                            </FormGroup>
                          </Col>
                        </Row>
                      </Modal.Body>
                    </Modal>
                    {/* ------------------------------------------------------------------------------------------------------------------------------------------------ */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={() => {
              if (cartData?.length > 0) {
                if (
                  cartData.filter((io) => io.item_price === 0)?.length === 0
                ) {
                  setPaymentModalIsOpen(true);
                } else {
                  toast.error("Item amount should not be zero");
                }
              } else {
                setPaymentModalIsOpen(false);
              }
            }}
            style={{
              backgroundColor: "#20b9e3",
              outline: "none",
              border: "none",
              fontSize: "20px",
            }}
          >
            {cartData && cartData?.length > 0
              ? "Pick, Pack & Dispatch"
              : "No Item here"}
          </Button>
        </Modal.Footer>
      </Modal>

      <PaymentModal
        setPaymentModalIsOpen={setPaymentModalIsOpen}
        paymentModalIsOpen={paymentModalIsOpen}
        invoiceValue={invoiceValue}
        sumValue={sumValue}
        amount={amount}
        orderNumber={orderNumber}
        setAmount={setAmount}
        setBalanceDue={setBalanceDue}
        balanceDue={balanceDue}
        optionTickSum={optionTickSum}
        setOptionTickSum={setOptionTickSum}
        setOptionTick={setOptionTick}
        optionTick={optionTick}
        cartData={cartData}
        setCartData={setCartData}
        state={state}

      />
    </>
  );
};

export default MyCart;
