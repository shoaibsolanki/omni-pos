import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Col, FormGroup, Row } from "reactstrap";
import { Modal } from "react-bootstrap";
import { Input, Label } from "reactstrap";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { LiaCookieSolid } from "react-icons/lia";
import {
  handelCustomerAllAddressRequest,
  handleCreateOrderRequest,
  handleShowModal,
  handlecartCount,
} from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeft, BsTrash3 } from "react-icons/bs";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import RoomIcon from '@mui/icons-material/Room';
import FormControl from "@mui/material/FormControl";
import { BsFillCheckCircleFill } from "react-icons/bs";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Drawer, Typography } from '@mui/material';
import { confirmAlert } from "react-confirm-alert"; // Import
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BASE_Url } from "../../URL";
import { PrimaryButton } from "@react-pdf-viewer/core";
import axios from "axios";
import OnlineUserPayment from "./OnlineUserPayment";
import Paytm from "../../assets/Paytm.png";
const MyCart = ({
  show,
  cartData,
  invoiceValue,
  popoverIsOpen,
  discountAmountVal,
  discountPercentVal,
  totalDiscountVal,
  setInvoiceValue,
  setShow,
  setTotalDiscountVal,
  setDiscountAmountVal,
  sumValue,
  setPaymentModal,
  setCartData,
  setSumValue,
  setPopoverIsOpen,
  setDiscountPercentVal,
  totalSum,
  setTotalSum,

}) => {
  const [Barcode, setBarCode] = useState(false);
  const [paymenOptions, setPaymentOptions] = useState(false);
  const [customerId, setCustomerId] = useState(false);
  console.log("CUSTOMER ID", cartData);
  const onOptionChange = (e) => {
    setType(e.target.value);
    // console.log("E TARGET VALUE", e.target.value);
  };

  const addressData = JSON.parse(localStorage.getItem("Address_data"));
  
  // const { name } = JSON.parse(localStorage.getItem("Customer_data"));

  const [type, setType] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState({});

  const navigate = useNavigate();
  const { saasId, storeId, userType, userId, userName,promoCaseCheck,mobileNumber } = localStorage.getItem(
    "User_data"
  )
    ? JSON.parse(localStorage.getItem("User_data"))
    : {};
  const [returnData, setReturnData] = useState(false);

  // const checkCustomer = userName.includes("C");
  const checkCustomer = userType === "CUSTOMER";
  const {
    show_cart_modal,
    dispatch_address,
    customers_all_addresses,
    dispatch_temp_address,
  } = useSelector((e) => e.ComponentPropsManagement);
  const dispatch = useDispatch();
  console.log("ADDRESSES ARR", dispatch_temp_address?.payload?.id);
  console.log("DISPAY", dispatch_address);
  const updateCartInLocalStorage = (updatedCart) => {
    localStorage.setItem("my-cart", JSON.stringify(updatedCart));
  };

  const handleDiscount = (item, discount_value) => {
    const price = Number(item.price) * Number(item.productQty);
    const calculatedVal = (price * discount_value) / 100;
    const t1 = price - calculatedVal;
    item.discount = parseFloat(calculatedVal).toFixed(2);
    item.new_price = Math.trunc(t1);
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

    /*  window.history.pushState(null, null, window.location.href); */
    window.addEventListener("popstate", disableBackButton);

    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
      window.removeEventListener("popstate", disableBackButton);
    };
  }, []);

  const handleDiscountLarge = (discount_value) => {
    cartData.map((item) => {
      item.discount_value = discount_value;
      const price = Number(item.price) * Number(item.productQty);
      if (price !== 0) {
        const val = (sumValue * discount_value) / 100;
        const calculatedVal = (price * val) / sumValue;
        // const calculatedVal = (price * discount_value) / 100;
        // const t1 = price - calculatedVal;
        // item.new_price = t1;
        item.discount = parseFloat(calculatedVal).toFixed(2);
        item.new_price = Math.trunc(price - calculatedVal);
      }
    });
    setCartData([...cartData]);
  };

  const handleDiscountAmountLarge = (discountAmountVal) => {
    cartData.map((item) => {
      item.amount_value = discountAmountVal;
      const price = Number(item.price) * Number(item.productQty);
      if (price !== 0) {
        const calculatedVal = (price * discountAmountVal) / sumValue;
        // const calculatedVal = price - discountAmountVal;
        item.discount = parseFloat(calculatedVal).toFixed(2);
        item.new_price = price - calculatedVal;
      }
    });
    setCartData([...cartData]);
  };

  const handleDiscountOnQTY =async (Item,val)=>{
    console.log('handleDiscountOnQTY',Item)
    if (val && val > 0.001) {
      Item.productQty = Number(
        parseFloat(val).toFixed(3)
      );
      const DicountPrice = await axios.get(`${BASE_Url}/item/get-discount/${Item.price}/${Item.productQty}`)
      const discountless_price = DicountPrice.data.discount_price
      Item.new_price =
        discountless_price * Item.productQty
        cartData.map((item) => {
          if(Item.item_id ==item.item_id){
            item.productQty= Item.productQty
            item.discount_onQty =  discountless_price
            item.discount_value = "";
            item.amount_value = "";
            item.new_price = discountless_price * item.productQty;
            console.log("discount Price",item.new_price)
          }
        });
      setCartData([...cartData]);
      handleQuantityChange(Item);
    } else {
      Item.productQty = Number(1);
      setCartData([...cartData]);
      handleQuantityChange(Item);
    }
  }

  const handleDec =async (Items) => {
    console.log("this is Decrment", Items)
    const {promoCaseCheck} = JSON.parse(localStorage.getItem("User_data")) 
    if(Items.price!==Items.price_pcs){
    if (promoCaseCheck=="YES"  ) {
      
      if (Items.productQty == 1) {
        const DicountPrice = await axios.get(`${BASE_Url}/item/get-discount/${Items.price}/${Items.productQty}`)
        const discountless_price = DicountPrice.data.discount_price
        Items.productQty = Items.productQty = 1;
        Items.new_price = discountless_price;
      }else{
        console.log("this product Qty",Items.productQty)
        const q = Items.productQty - 1;
        Items.productQty = q;
        console.log("this product Qty",Items.productQty)
        const DicountPrice = await axios.get(`${BASE_Url}/item/get-discount/${Items.price}/${q}`)
        const discountless_price = DicountPrice.data.discount_price

        console.log("discount Price",Items.price * Items.productQty -  discountless_price * Items.productQty )
        const dicountVal = Items.price * Items.productQty -  discountless_price * Items.productQty
        handleDiscountAmount(Items, dicountVal)
        // Items.new_price = discountless_price * q;
        cartData.map((item) => {
          if(Items.item_id ==item.item_id){
            if(item.price!==item.price_pcs){
            item.productQty= q
            item.discount_onQty =  discountless_price
            item.discount_value = "";
            item.amount_value = "";
            item.new_price = discountless_price * item.productQty;
            // console.log("discount Price",item.new_price)
             } }
        });
        setDiscountPercentVal("");
        setDiscountAmountVal("");
        setTotalDiscountVal(0);
        setCartData([...cartData]);
        updateCartInLocalStorage(cartData);
      }
    }else{
      if (Items.productQty === 1) {
        Items.productQty = Items.productQty = 1;
        Items.new_price = Items.price;
      } else {
        const q = Items.productQty - 1;
        Items.productQty = q;
        Items.new_price = Items.price * q;
      }
      cartData.map((item) => {
        if(item.price==item.price_pcs){
        item.discount_value = "";
        item.amount_value = "";
        item.new_price = item.price * item.productQty;
     } });
      setDiscountPercentVal("");
      setDiscountAmountVal("");
      setTotalDiscountVal(0);
      setCartData([...cartData]);
      updateCartInLocalStorage(cartData);

    }
  }else{
      if (Items.productQty === 1) {
        Items.productQty = Items.productQty = 1;
        Items.new_price = Items.price;
      } else {
        const q = Items.productQty - 1;
        Items.productQty = q;
        Items.new_price = Items.price * q;
      }
      cartData.map((item) => {
        if(item.price==item.price_pcs){
        item.discount_value = "";
        item.amount_value = "";
        item.new_price = item.price * item.productQty;
     } });
      setDiscountPercentVal("");
      setDiscountAmountVal("");
      setTotalDiscountVal(0);
      setCartData([...cartData]);
      updateCartInLocalStorage(cartData);

    }
  };

  // console.log("cartData", cartData);
  const handleDiscountAmount = (item, amount_value) => {
    const price = Number(item.price) * Number(item.productQty);
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
              dispatch(handleShowModal({ bagModalIsOpne: !show_cart_modal }));
              // setDiscountPercentVal("");
              // setDiscountAmountVal("");

              /* if (discountPercentVal || discountAmountVal) {
                window.location.reload();
              } */
            },
          },
          {
            label: "No",
            onClick: () => { },
          },
        ],
      });
    } else {
      dispatch(handleShowModal({ bagModalIsOpne: !show_cart_modal }));
    }
  };

  const handleDeleteCartItem = (item) => {
    const getData = JSON.parse(localStorage.getItem("my-cart"));
    console.log(getData);
    if (getData) {
      if (getData?.length > 0) {
        if (getData?.length > 1) {
          const updateCart = getData.filter((el) =>
            el.item_id
              ? el.item_id !== item.item_id
              : el.productId !== item.productId
          );

          localStorage.setItem("my-cart", JSON.stringify(updateCart));
          setCartData(updateCart);
          dispatch(handlecartCount(updateCart?.length));
        } else {
          localStorage.setItem("my-cart", JSON.stringify([]));
          setCartData([]);
          dispatch(handlecartCount(0));
        }
      }
    }
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

  const handleQuantityChange = (item) => {
    updateCartInLocalStorage(cartData);
  };

  const handlePlusSign = async(Items) => {
    console.log("this is Decrment", Items)
    const {promoCaseCheck} = JSON.parse(localStorage.getItem("User_data")) 
    if(Items.price!==Items.price_pcs){
    if (promoCaseCheck == "YES") {
      console.log("this is promoCaseCheck",promoCaseCheck)
      const q = Items.productQty + 1;
      Items.productQty = q;
      const newP = Items.price * q;
      Items.new_price = newP;
      const DicountPrice = await axios.get(`${BASE_Url}/item/get-discount/${Items.price}/${q}`)
      console.log('this dicount',DicountPrice.data.discount_price)
      const discountless_price = DicountPrice.data.discount_price
      const dicountVal = Items.price * Items.productQty -  discountless_price * Items.productQty
        handleDiscountAmount(Items, dicountVal)
      cartData.map((item) => {
        if(Items.item_id ==item.item_id){
          if(item.price!==item.price_pcs){
      item.discount_onQty =  discountless_price
      item.discount_value = "";
      item.amount_value = "";
      item.new_price = discountless_price * item.productQty;
      
          }}
  });
      setDiscountPercentVal("");
      setDiscountAmountVal("");
      setTotalDiscountVal(0);
      setCartData([...cartData]);
      updateCartInLocalStorage(cartData);
    }else{
      console.log("else part")
      const q = Items.productQty + 1;
      Items.productQty = q;
      const newP = Items.price * q;
      Items.new_price = newP;
      cartData.map((item) => {
        if(item.price==item.price_pcs){
        item.discount_value = "";
        item.amount_value = "";
        item.new_price = item.price * item.productQty;
   } });
      setDiscountPercentVal("");
      setDiscountAmountVal("");
      setTotalDiscountVal(0);
      setCartData([...cartData]);
      updateCartInLocalStorage(cartData);
    }
  }else{
      console.log("else part")
      const q = Items.productQty + 1;
      Items.productQty = q;
      const newP = Items.price * q;
      Items.new_price = newP;
      cartData.map((item) => {
        if(item.price==item.price_pcs){
        item.discount_value = "";
        item.amount_value = "";
        item.new_price = item.price * item.productQty;
   } });
      setDiscountPercentVal("");
      setDiscountAmountVal("");
      setTotalDiscountVal(0);
      setCartData([...cartData]);
      updateCartInLocalStorage(cartData);
    }

  };

  let finalSum = 0;
  let itemTotalPrice;

  cartData?.map((item) => {
    itemTotalPrice = item.new_price
      ? item.new_price
      : item.price * item.productQty;
    finalSum += itemTotalPrice;
    setTotalSum(finalSum);
  });

  const cartItems = cartData?.map((item) => {
    let finalDisc = 0;
    /*  const itemTotalPrice = item.new_price ? item.new_price : item.price * item.productQty;
    finalSum += itemTotalPrice; */

    if (item.discount_value) {
      const price = Number(item.price) * Number(item.productQty);
      const calculatedVal = (price * item.discount_value) / 100;
      finalDisc = price - parseFloat(calculatedVal).toFixed(2);
    } else if (item.amount_value && !discountAmountVal) {
      const price = Number(item.price) * Number(item.productQty);
      const calculatedVal = (price - Number(item.amount_value)).toFixed(2);
      finalDisc = calculatedVal;
    } else if (discountPercentVal) {
      const Value = discountPercentVal / 100;
      let deductedAmount = Value * (item.price * item.productQty);
      finalDisc = (item.price * item.productQty - deductedAmount).toFixed(2);
      console.log("finalDisc:", finalDisc);
    } else if (discountAmountVal) {
      let perAmount = discountAmountVal / finalSum;
      let deductedAmount = perAmount * (item.price * item.productQty);
      finalDisc = (item.price * item.productQty - deductedAmount).toFixed(2);
      console.log("finalDisc:", finalDisc);
    } else {
      finalDisc = 0;
    }
    item.finalDisc = finalDisc;
    console.log("discountPercentVal:", discountPercentVal);

    return { ...item, finalDisc };
  });

  useEffect(() => {
    if (checkCustomer === "CUSTOMER") {
      const { id } = JSON.parse(localStorage.getItem("Customer_data"));
      dispatch(
        handelCustomerAllAddressRequest({
          address_ids: addressData,
          customer_id: id,
          saas_id: Number(saasId),
          store_id: Number(storeId),
        })
      );
    }
  }, []);
  //  <----------Discount for First add to cart------->
  const [firstAddToCartDiscount, setFirstAddToCartDiscount] = useState();
  useEffect(() => {
 
    if (promoCaseCheck =="YES") {
      setFirstAddToCartDiscount(promoCaseCheck)
      cartData?.map(async(item) => {
        if(item.price!==item.price_pcs){
          console.log("this call",promoCaseCheck)
          const DicountPrice = await axios.get(`${BASE_Url}/item/get-discount/${item.price}/${item.productQty}`)
          const discountless_price = DicountPrice.data.discount_price
        const dicountVal = item.price * item.productQty -  discountless_price * item.productQty
          handleDiscountAmount(item, dicountVal)
        item.discount_onQty =  discountless_price
        item.discount_value = "";
        item.amount_value = "";
        item.new_price = discountless_price * item.productQty;
        
      }  })
    }
  }, [firstAddToCartDiscount])


  const [open, setOpen] = useState(true);

  const handleClose = () => {
    dispatch(handleShowModal({ bagModalIsOpen: !show_cart_modal }));
    setShow(false);
    setOpen(false);
    // Assuming setShow is a state setter function, use it to set the state accordingly
  };
   const { product_count } = useSelector(
    (e) => e.ComponentPropsManagement
  );
  useEffect(() => {
    // console.log("paymentmethod",t1)
 if(product_count==0)
 {
  handleClose();
 }
    
  }, [product_count]);
const InvoiceClosed=()=>{
  setPopoverIsOpen(!popoverIsOpen)
}
  const stylecss={
    boxShadow:"4px 4px 10px 0px rgba(0, 0, 0, 0.25)",
    borderRadius:"4px",
    background:"white",
    color:"black",
    border:"0px"
  }


  const handleNavigateToPayment = () => {
    // Additional logic if needed
    navigate('/payment', {
      state: {
        dispatch_temp_address,
        setCustomerId,
      },
    });
  };


  const [paymentMethod, setPaymentMethod] = useState('');


  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handlePlaceOrder = () => {
    // Make the API call based on the selected payment method
    if (paymentMethod === 'onlinePayment') {
      // Make API call for online payment
      fetch('your_online_payment_api_url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Add your payment-related data here
        }),
      })
        .then(response => response.json())
        .then(data => {
          // Handle the response data
          console.log('Online payment API response:', data);
          // Add any further logic or state updates based on the API response
        })
        .catch(error => {
          // Handle errors
          console.error('Error making online payment API call:', error);
        });
    } else if (paymentMethod === 'cashOnDelivery') {
      // Make API call for cash on delivery
      setPaymentOptions((state) => !state);
                                      dispatch(
                                        handleCreateOrderRequest({
                                          address_id:
                                            dispatch_temp_address.payload.id,
                                          customer_id: userId,
                                          customer_name: userName,
                                          mobile_number:mobileNumber,
                                          saas_id: saasId,
                                          store_id: storeId,
                                          order_qty: cartData.length,
                                          order_tax: 0.0,
                                          // order_value: 100.0,
                                          order_value: Number(invoiceValue),
                                          order_discount: 0.0,
                                          status: "pending",
                                          payment_type: "COD",
                                          item_list: cartData,
                                        })
                                      );
                                      setCartData([]);
                                      setShow(false);
                                      localStorage.removeItem("my-cart");
                                      setTimeout(() => {
                                        // navigate("/");
                                      }, 1000);
    } else if (paymentMethod === 'PayWallet') {
      // Make API call for wallet payment
      fetch('your_wallet_payment_api_url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Add your payment-related data here
        }),
      })
        .then(response => response.json())
        .then(data => {
          // Handle the response data
          console.log('Wallet payment API response:', data);
          // Add any further logic or state updates based on the API response
        })
        .catch(error => {
          // Handle errors
          console.error('Error making wallet payment API call:', error);
        });
    }
  };
  const handleInvoiceValueChange = () => {
    
    localStorage.setItem('invoiceValue', JSON.stringify(invoiceValue));
    navigate("/PaymentStepperForm")
  };
  return (
    <>
    <Drawer anchor="right" open={open} onClose={handleClose}>
    <div style={{ padding: '20px', width: '400px' }}>
     <div className="d-flex">
        <IconButton onClick={handleClose}>
          <ChevronLeftIcon />
        </IconButton>
     
      <Typography className="mt-2 fwbold" style={{fontFamily: "Roboto",
                        fontSize: "20px",
                        fontStyle: "normal",
                        fontWeight: "700",
                        lineHeight: "normal",}} variant="h6" noWrap>
        My Basket ({cartData && cartData?.length} items)
      </Typography> </div>
      <Modal.Body>
        {cartData &&
          cartData?.map((item) => (
            <div
              key={item.item_id ? item.item_id : item.productId}
              // className="cart_container"
              style={stylecss}
              className="m-2"
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  // padding: "10px",
                  alignItems: "center",
                  justifyContent: "center",
                 
                  marginBottom: "10px",
                }}
              >
                <div >
                  <img
                    style={{  width: "100px" }}
                    src={`${BASE_Url}/item/get-image/${item && item.item_id ? item.item_id : item.productId
                      }`}
                    class="card-img-top"
                    alt="..."
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    // padding: "10px 0",
                    justifyContent: "center",
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      // flex: 2,
                      justifyContent: "center",
                    }}
                  >
                    {
                      <h6 className="mx-2 fw-bold" style={{fontFamily: "Roboto",
                      fontSize: "17px",
                      fontStyle: "normal",
                      fontWeight: "700",
                      lineHeight: "normal", marginTop: "10px" }}>
                        {!item.productId ? item.item_name : item.itemName}
                      </h6>
                    }
                    <h5>
                     { item?.discount_onQty ?<>
                                    <span
                                      style={{
                                        textDecorationLine: "line-through",
                                      }}
                                    >
                                      {Math.round(
                                        item.price * item.productQty,
                                        0
                                      )}
                                    </span>
                                    / {Math.round(item.new_price, 0)}
                                  </>:<> {Math.round(item.new_price, 0)}</>
                      }
                      </h5>
                      {/* <span>{item.discount}% OFF</span> */}
                    <div
                    // className="cart_product"
                    >
                      <div style={{ height: "25px" }} className="cart_column">
                        <div
                          style={{
                            border: "1px solid #eee",
                            borderRadius: "20px",
                            padding: "5px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <AiOutlineMinus
                            onClick={() => {
                              handleDec(item);
                            }}
                            style={{ marginRight: "10px" ,cursor:"pointer" }}
                          />

                          <div style={{ width: "100px" }}>
                            <input
                              type="number"
                              value={item.productQty}
                              style={{
                                maxWidth: "100px",
                                borderRadius: "10px",
                                padding: "2px",
                                textAlign: "center",
                              }}
                              onChange={(e) => {
                                const val = e.target.value;
                                const {promoCaseCheck} = JSON.parse(localStorage.getItem("User_data")) 
                                if(item.price!==item.price_pcs){
                                  if (promoCaseCheck == "YES") {
                                    handleDiscountOnQTY(item,val)
                                   } 
                                }
                               else {
                                  if (val && val > 0.001) {
                                    item.productQty = Number(
                                      parseFloat(val).toFixed(3)
                                    );
                                    item.new_price = Math.trunc(
                                      item.price * item.productQty
                                    );
                                    setCartData([...cartData]);
                                    handleQuantityChange(item);
                                  } else {
                                    item.productQty = Number(1);
                                    setCartData([...cartData]);
                                    handleQuantityChange(item);
                                  }
                                }
                              }}
                            />
                          </div>

                          {/* {item.productQty} */}
                          <AiOutlinePlus
                            style={{ marginLeft: "10px" ,cursor:"pointer"}}
                            onClick={() => {
                              handlePlusSign(item);
                            }}
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          //  flex: 1,
                          marginLeft: "20px",
                        }}
                      >
                        {Number(item.price) * Number(item.productQty) === 0 ? (
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
                                    item.price = item.zero_price;
                                    item.new_price = item.zero_price;
                                    setCartData([...cartData]);
                                  }
                                }}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <IconButton
                                      // aria-label="toggle password visibility"
                                      onClick={() => {
                                        item.price = item.zero_price;
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
                            {/* <div>{item.price * item.productQty}</div> */}
                            <div>
                              <div
                                style={{
                                  fontSize: "20px",
                                  // display: "flex",
                                  // justifyContent: "center",
                                  margin: "20px 0px",
                                }}
                              >
                                {item.discount_value || item.amount_value ? (
                                  <>
                                    <span
                                      style={{
                                        textDecorationLine: "line-through",
                                      }}
                                    >
                                      {Math.round(
                                        item.price * item.productQty,
                                        0
                                      )}
                                    </span>
                                    / {Math.round(item.finalDisc, 0)}
                                  </>
                                ) : (
                                  <>
                                  
                                  </>
                                )}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      {/*  */}
                    </div>
                    <div style={{ display: "flex" }}>
                      <div
                        style={{
                          color: "#1E1E1E",
                          fontWeight: "600",
                          cursor: "pointer",
                          marginTop: "10px",
                          display: "flex",
                          alignItems: "center",
                          justifyItems: "center",
                        }}
                      >
                        <BsTrash3 />
                        <p
                          style={{ padding: 0, margin: "0 5px" }}
                          onClick={() => {
                            handleDeleteCartItem(item);
                            // dispatch(handleDeleteCartItem(item));
                          }}
                        // onClick={() => handelDeleteProduct(item)}
                        >
                          Delete
                        </p>
                      </div>
                      <div
                        style={{
                          color: "#1E1E1E",
                          fontWeight: "600",
                          cursor: "pointer",
                          marginTop: "10px",
                          display: "flex",
                          alignItems: "center",
                          justifyItems: "center",
                        }}
                      >
                        <p
                          style={{ padding: 0, margin: "0 5px" }}
                        // onClick={() => {
                        //   setReturnData((state) => !state);
                        //   item.discount_menu_is_open = false;
                        //   setPopoverIsOpen(false);
                        //   Number(-item.productQty);
                        //   // !item.discount_menu_is_open;
                        // }}
                        >
                          {/* Return */}
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexDirection: "row",
                        width: "100%",
                      }}
                    >
                      {/* <p>MRP:</p>
                    <p>COST:</p> */}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexDirection: "row",
                        width: "100%",
                      }}
                    >
                      {/* <p>Purchase Cost:</p> */}
                    </div>
                    <div>{/* <p>Supplier</p> */}</div>
                    <div>{/* <p>Stock</p> */}</div>
                  </div>
                </div>
              </div>
              {totalDiscountVal === 0 && userType== "RETAILER" && promoCaseCheck !=="YES" &&(
                <>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      display: returnData ? "none" : "block",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <LiaCookieSolid size={30} />
                      <p
                        style={{
                          color: "#1E1E1E",
                          fontWeight: "600",
                          padding: 0,
                          margin: 0,
                          fontSize: "25px",
                          cursor: "pointer",
                        }}
                        // onClick={() => {
                        //   item.discount = !item.discount;
                        //   setCartData([...cartData]);
                        //   // setDiscount((state) => !state);
                        // }}
                        onClick={() => {
                          item.discount_menu_is_open =
                            !item.discount_menu_is_open;
                          item.amount_value = "";
                          item.discount_value = "";
                          item.new_price = item.price * item.productQty;
                          setDiscountPercentVal("");
                          setDiscountAmountVal("");
                          setTotalDiscountVal(0);
                          setCartData([...cartData]);
                          // item.discount == !true ? setDiscount((state) => !state) : ""
                        }}
                        className="mx-4"
                      >
                        Discount
                      </p>
                    </div>
                  </div>
                </>
              )}
              {/* {item.discount ? ( */}
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
                        onWheel={(e) => e.target.blur()}
                        className="me-3"
                        // ref={ref}
                        // disabled={amountOff?.length > 0 ? true : false}
                        disabled={item.amount_value}
                        // value={percentOff}
                        // onChange={(e) => setPercentOff(e.target.value)}
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
                        onWheel={(e) => e.target.blur()}
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
                      // disabled={percentOff?.length > 0 ? true : false}
                      // value={amountOff}
                      // onChange={(e) => setAmountOff(e.target.value)}
                      />
                      <div>
                        <button
                          className="btn btn-danger my-3"

                        // onClick={console.log("discount apply in this item 😘😘😘")}
                        >
                          Apply
                        </button>
                        {/* {console.log("cartData", cartData)} */}
                        {/* <div style={{ fontSize: "10px" }}>
                        {item.discount_value || item.amount_value ? (
                          <>
                            <span
                              style={{ textDecorationLine: "line-through" }}
                            >
                              {item.price * item.productQty}
                            </span>{" "}
                            / {parseFloat(item.new_price).toFixed(2)}
                          </>
                        ) : (
                          <>{item.price * item.productQty}</>
                        )}
                      </div> */}
                      </div>
                    </div>
                  </div>
                </>
              )}
              {/* {console.log("ITEM", item)} */}
              <div style={{ display: "flex", flexDirection: "row" }}>
                {/* <p
                style={{
                  color: "#a90a0a",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
                onClick={() => {
                  handleDeleteCartItem(item);
                  // dispatch(handleDeleteCartItem(item));
                }}
                // onClick={() => handelDeleteProduct(item)}
              >
                Remove
              </p> */}
              </div>
            </div>
          ))}

        {/* <div> */}
        {parseInt(finalSum) !== 0 && (
          <>
            <div
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              Total Invoice Value: {Math.round(finalSum)}
              <br />
            </div>
          </>
        )}
        {cartData?.filter((io) => io.discount_menu_is_open === true)?.length ===
          0 &&
          totalDiscountVal !== 0 && (
            <>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Total Discount:{" "}
                {discountPercentVal
                  ? Math.round(
                    finalSum / (1 - discountPercentVal / 100) - finalSum,
                    0
                  )
                  : discountAmountVal}
              </div>
            </>
          )}
        {/* </div> */}

        {cartData?.filter((io) => io.discount_menu_is_open === true)?.length ===
          0 && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  marginTop: "20px",
                }}
                id="pop112"
              // onClick={() => setPopoverIsOpen(!popoverIsOpen)}
              >
                {parseInt(invoiceValue) !== 0 && (
                  <>
                    <button
                      type="button"
                      style={{
                        backgroundColor: "rgb(169, 10, 10)",
                        border: "none",
                        color: "white",
                        fontWeight: "bold",
                        marginBottom: "10px",
                        padding: "1px 7px",
                        borderRadius: "8px",
                      }}
                      id="pop112"
                      onClick={() => {
                        localStorage.removeItem("my-cart");
                        setCartData([]);
                      }}
                    >
                      Remove All
                    </button>

                   {userType=="RETAILER"&& promoCaseCheck !=="YES"? <div>
                      <button
                        type="button"
                        className="dissabled"
                        style={{
                          backgroundColor:
                            discountPercentVal || discountAmountVal
                              ? "gray"
                              : "green",
                          border: "none",
                          color: "white",
                          marginBottom: "10px",
                          fontWeight: "bold",
                          padding: "1px 7px",
                          borderRadius: "8px",
                          display: returnData ? "none" : "block",
                        }}
                        id="pop112"
                        // onClick={() => setPopoverIsOpen(!popoverIsOpen)}
                        onClick={() =>
                          discountPercentVal || discountAmountVal
                            ? setPopoverIsOpen(false)
                            : setPopoverIsOpen(!popoverIsOpen)
                        }
                      >
                        <LiaCookieSolid size={30} />
                        Invoice Discount
                      </button>
                    </div>:""}
                  </>
                )}
              </div>
            </>
          )}

       
     
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
              if (cartData.filter((io) => io.price === 0)?.length === 0) {
                if(userType==="GUEST"){
                  navigate(`/${saasId}/${storeId}`)
                  // localStorage.clear();
                  return
                }
                if (checkCustomer) {
               
                } else {
                  setShow(false)
                  setPaymentModal(true);
                }
              } else {
                toast.error("Item amount should not be zero");
              }
            } else {
              setPaymentModal(false);
            }
          }}
          style={{
            width: "100%",
            float: "feft",
            backgroundColor: paymenOptions ? "#fff" : "#ffc107",
            color: "black",
            outline: "none",
            border: "none",
            fontSize: "20px",
          }}
        // className="bg-primary"
        >
          {cartData && cartData?.length > 0 ? (
            // ? "Proceed to checkout"
            <div onClick={() => { console.log("proceed to buy")}}>
              {checkCustomer ? (
                <div onClick={() =>handleInvoiceValueChange() }>
                Select Payment options
                </div>
              ) : (
                "Proceed to checkout"
              )}
              {/* {"Select Payment Method"} */}
            </div>
          ) : (
            "No Item here"
          )}
          {/* Proceed to checkout */}
        </Button>
      </Modal.Footer>
      </div>
    </Drawer>
      <OnlineUserPayment Barcode={Barcode} setModalIsOpen={setBarCode}/>
      <Drawer anchor="right" open={paymenOptions} onClose={() => setPaymentOptions(false)}>
        <div style={{ width: "430px", padding: '16px' }}>
       
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        // alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <p className="fw-bold"
                        onClick={() => setPaymentOptions(false)}
                        style={{
                          color: "black",
                          outline: "none",
                          border: "none",
                          fontSize: "20px",
                          fontFamily:"Roboto"
                        }}
                      >
                        PAYMENT METHOD
                      </p>
                      <div>
                        <div > 
                        <div className="d-flex" > 
                          <p
                            onClick={() => {
                              const { id } = JSON.parse(
                                localStorage.getItem("Customer_data")
                              );
                              customers_all_addresses &&
                                customers_all_addresses.length > 0
                                ? setCustomerId(true)
                                : setCustomerId(false);
                                console.log("All Address",customers_all_addresses)
                              dispatch(
                                handelCustomerAllAddressRequest({
                                  address_ids: addressData,
                                  customer_id: id,
                                  saas_id: Number(saasId),
                                  store_id: Number(storeId),
                                })
                              );
                            }}
                          >
                            Your Delivery Address
                          </p>
                          <Link to="/profile">
                              <button className="btn btn-primary ">
                                Add New Address
                              </button>
                            </Link>
                            </div>
                          <hr />
                          {/* ---------------- */}
                          <div
                            className="my-3"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              flexDirection: "column",
                              justifyContent: "center",
                            }}
                          >
                          
                            {customers_all_addresses &&
                              customers_all_addresses.map((el) => (
                                <div className="form-check form-check-inline">
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      marginTop: 20,
                                    }}
                                    onClick={() => setCustomerId(el.id)}
                                  >
                                    <input
                                      className="form-check-TextField mx-2"
                                      type="radio"
                                      name="inlineRadioOptions"
                                      value={"OFFICE"}
                                      // required
                                      onChange={onOptionChange}
                                      id={el.id}
                                    // value="option1"
                                    />
                                    <p
                                      className="form-check-label"
                                      style={{ fontSize: 15 }}
                                    // htmlFor={el.id}
                                    >
                                      {`${el?.address +
                                        " " +
                                        el?.street +
                                        " " +
                                        el?.city
                                        }`}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            {dispatch_temp_address.payload &&
                              dispatch_temp_address.payload.address ? (
                              <div className="form-check form-check-inline">
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: 20,
                                  }}
                                  onClick={() => {
                                    setCustomerId(!customerId);
                                  }}
                                >
                                  {dispatch_temp_address.payload.address +
                                    " " +
                                    dispatch_temp_address.payload.street +
                                    " " +
                                    dispatch_temp_address.payload.city}
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  {/* --------------- */}
                                  <ul style={{ listStyle: "none" }}></ul>
                                  {/* --------------- */}
                                  <div className="card w-75 border-black d-flex justify-content-center ">
                                  <ul
                                  className="m-2"
                                    style={{ listStyle: "none" }}
                                    onClick={() => {
                                      setBarCode(true)
                                   
                                    }
                                  }
                                  >
                                   <input
  type="radio"
  id="onlinePayment"
  name="paymentMethod"
  value="onlinePayment"
  className="btn btn-warning m-1"
/>
<label htmlFor="onlinePayment">Pay Online</label>
<img
className="rounded-pill"
        src={Paytm}  // Replace this with the actual path to your Paytm icon image
        alt="Paytm Icon"
        width="30"
        height="20"
      />
                                  </ul> </div>
                                  <div className="card border-black mt-2  w-75 d-flex justify-content-center ">
                                  <ul
                                  className="m-2"
                                    style={{ marginLeft:"0px" }}
                                    
                                  >
                                 <input
              type="radio"
              id="cashOnDelivery"
              name="paymentMethod"
              value="cashOnDelivery"
              className="btn btn-warning m-1"
              onChange={handlePaymentMethodChange}
            />
        <label htmlFor="cashOnDelivery">Pay COD</label>
                                  </ul>
                                  </div>
                                  <div className=" card border-black mt-2  w-75 d-flex justify-content-center ">
                                    <ul className="m-2">
                                    <input
  type="radio"
  id="onlinePayment"
  name="PayWallet"
  value="onlinePayment"
  className="btn btn-warning m-1"
/>
<label htmlFor="onlinePayment">Pay Wallet</label>
                                      </ul>
                                  </div>

                                  <div
                                  className="mt-3"
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        // alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <p className="fw-bold"
                        onClick={() => setPaymentOptions(false)}
                        style={{
                          color: "black",
                          outline: "none",
                          border: "none",
                          fontSize: "18px",
                          fontFamily:"Roboto"
                        }}
                      >
                     Bill Details
                      </p>
                      <Row className="fw-bold">
                        <Col>ITEMS</Col>
                        <Col>     {cartData?.length > 0 ? cartData?.length  : ""}</Col>
                        </Row>  
                        <Row className="fw-bold">
                        <Col>  Total Amount :</Col>
                        {parseInt(finalSum) !== 0 && ( <Col> 
         
             {Math.round(finalSum)}
             
        </Col> )}
                        </Row> 
                      </div>  
                     
                                  <Button className="fw-bold mt-5"  style={{
            width: "100%",
            float: "feft",
            backgroundColor:  "#ffc107",
            color: "black",
            outline: "none",
            border: "none",
            fontSize: "18px",
            fontFamily:"Roboto"
          }}  onClick={handlePlaceOrder}> PLACED ORDER </Button>
                                </div>
                                 
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                          <>
                            {customers_all_addresses &&
                              customers_all_addresses.length > 0 ? (
                              <>
                                {customerId ? (
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    {/* --------------- */}
                                    <ul style={{ listStyle: "none" }}></ul>
                                    {/* --------------- */}
                                    <ul
                                      style={{ listStyle: "none" }}
                                      onClick={() => {
                                        setPaymentOptions((state) => !state);
                                        dispatch(
                                          handleCreateOrderRequest({
                                            address_id: customerId,
                                            customer_id: userId,
                                            customer_name: userName,
                                            mobile_number:mobileNumber,
                                            saas_id: saasId,
                                            store_id: storeId,
                                            order_qty: cartData.length,
                                            order_tax: 0.0,
                                            // order_value: 100.0,
                                            order_value: Number(invoiceValue),
                                            order_discount: 0.0,
                                            status: "pending",
                                            payment_type: "COD",
                                            item_list: cartData,
                                          })
                                        );
                                        setCartData([]);
                                        setShow(false);
                                        localStorage.removeItem("my-cart");
                                        setTimeout(() => {
                                          // navigate("/");
                                        }, 1000);
                                      }}
                                    >
                                      <button className="btn btn-warning">
                                        {"Cash On delivery"}
                                      </button>
                                    </ul>
                                    <ul
                                      style={{ listStyle: "none" }}
                                      onClick={() => {
                                        setPaymentOptions((state) => !state);
                                        dispatch(
                                          handleCreateOrderRequest({
                                            address_id: customerId,
                                            customer_id: userId,
                                            customer_name: userName,
                                            mobile_number:mobileNumber,
                                            saas_id: saasId,
                                            store_id: storeId,
                                            order_qty: cartData.length,
                                            order_tax: 0.0,
                                            // order_value: 100.0,
                                            order_value: Number(invoiceValue),
                                            order_discount: 0.0,
                                            status: "pending",
                                            payment_type: "PFS",
                                            item_list: cartData,
                                          })
                                        );
                                        setCartData([]);
                                        setShow(false);
                                        localStorage.removeItem("my-cart");
                                        setTimeout(() => {
                                          // navigate("/");
                                        }, 1000);
                                      }}
                                    >
                                      <button className="btn btn-warning">
                                        {"Pickup at Store"}
                                      </button>
                                    </ul>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </>
                            ) : (
                              ""
                            )}
                          </>
                        
                        </div>
                      </div>
                    </div>
                
        </div>
      </Drawer>
              <Drawer anchor="right" open={popoverIsOpen} onClose={InvoiceClosed}>
      <div style={{width:"430px", padding: '16px' }}>
          <Modal.Header
            closeButton
            onClick={() => setPopoverIsOpen(!popoverIsOpen)}
          >
            <Modal.Title id="contained-modal-title-vcenter">
              <span style={{ fontWeight: "800", marginRight: "5px" }}>
                Invoice Discount
              </span>
              {/* ({cartData?.length} items) */}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label>
                    Percent on invoice <span className="text-red"> * </span>
                  </Label>
                  <Input
                    type="text"
                    disabled={discountAmountVal}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val) {
                        if (val >= 1 && val <= 99) {
                          Math.trunc(setDiscountPercentVal(val));
                        } else {
                          Math.trunc(setDiscountPercentVal(99));
                        }
                      } else {
                        setDiscountPercentVal("");
                      }
                      // handleDiscount(item, val);
                    }}
                    value={discountPercentVal}
                    onWheel={(e) => e.target.blur()}
                    placeholder="Percent Value"
                  />
                </FormGroup>
              </Col>

              <Col md={12}>
                <FormGroup>
                  <Label>
                    Amount on invoice <span className="text-red"> * </span>
                  </Label>
                  <Input
                    type="text"
                    disabled={discountPercentVal}
                    onWheel={(e) => e.target.blur()}
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
                      // handleDiscountAmount(item, val);
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
          </div> </Drawer>
    </>
  );
};

export default MyCart;