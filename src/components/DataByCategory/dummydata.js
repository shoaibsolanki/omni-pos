import React, { useEffect, useState, useCallback, useRef } from "react";
import { FormControl, ListGroup, Modal } from "react-bootstrap";
import { BASE_Url } from "../../URL";
import { InputLabel, OutlinedInput, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { handlecartCount,
   handleCategoriesRequest, 
   handleAllDataByCategoryRequest,
    handleRecommendedDataRequest,
     handleShowModal, 
     handleSaveTransactionRequest, 
     handleAccruvalRequest,
     handlewhatsAppRequest,
     handleEmailNotificationResponse,
     handleRedeemPointRequest,
     handelSMSRequest,
 } from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
//import { BsCreditCardFill, BsFillCheckCircleFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { Row, Col, Container, Card, Button, Image } from "react-bootstrap";
import axios from "axios";
import { Warning } from "@material-ui/icons";
import MyCart from "../my-cart/MyCart";




//---------------------------------
// import "bootstrap/dist/css/bootstrap.min.css";

// import { BsCamera } from "react-icons/bs";
// import { BsHandbag, BsArrowRight } from "react-icons/bs";
import { FcSalesPerformance, FcSpeaker } from "react-icons/fc";
import { IoCashOutline } from "react-icons/io5";
import { SiPaytm } from "react-icons/si";
import { FaGooglePay } from "react-icons/fa";
import { SiPhonepe } from "react-icons/si";
// import { GrClose } from "react-icons/gr";
import { SiContactlesspayment } from "react-icons/si";
import { AiFillHome, AiOutlineMail, AiOutlineSearch } from "react-icons/ai";
import { BsCreditCardFill } from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io";
import { FcSms } from "react-icons/fc";
import pdfFile from "../../assets/PDF.pdf";
import ViewOrdersCustomer from "../PendingOrders/ViewOrdersCustomer";


import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { BiBox, BiCart, BiGroup ,BiCube } from "react-icons/bi";



//import Modal from "react-bootstrap/Modal";
//import { useDispatch, useSelector } from "react-redux";


const DataByCategory = ({
  // setSearchValue,
   //data,
  // setData,
  // setUpdatecart,
  // updatecart,
  
  // //setInvoiceValue,
  // //invoiceValue,
  // popoverIsOpen,
  // setPopoverIsOpen,
  // discountAmountVal,
  // discountPercentVal, setDiscountPercentVal, totalDiscountVal,
  //  //paymentModal, setPaymentModal,
  //   //setCartData, 
  // //sumValue, setSumValue,
  //  setTotalDiscountVal,
  // setDiscountAmountVal, totalSum, setTotalSum, optionTickSum, balanceDue,

}) => {
  // ---------------------------------
  const {
     cart_data,
     get_categories, 
     get_all_catrgory_data, 
     category_list,
     get_QR_img, 
    link_loyalty_detail, 
    handle_saveTransaction_data }
 = useSelector((e) => e.ComponentPropsManagement);
  const [myPrice, setMyPrice] = useState({ productId: "", price: "" });
  const [showButton, setShowButton] = useState(true);
  // const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  //console.log("**DATA", data);
  console.log("this is get category data", category_list)

  useEffect(() => {
    const el = JSON.parse(localStorage.getItem("my-cart"));
    console.log("EL", el);
    //console.log("DATA", data);
    if (el) {
      dispatch(handlecartCount(el?.length));
    } else {
      dispatch(handlecartCount(0));
    }
    dispatch(handleCategoriesRequest())
    dispatch(handleAllDataByCategoryRequest())
  }, []);
  // ---------------------------------
  console.log("DataByCategory", get_all_catrgory_data);

  const addToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem("my-cart")) || [];
    console.log('cart ddddd', cart)
    console.log('sssssss', item)
    const existingItem = cart.find(
      (cartItem) => cartItem.item_id === item.item_id
    );

    if (existingItem) {
      existingItem.productQty += 1;

    } else {
      const newItem = { ...item, productQty: 1 };
      cart.push(newItem);

    }

    localStorage.setItem("my-cart", JSON.stringify(cart));

    dispatch(handlecartCount(cart.length));

    // setUpdatecart(!updatecart);
    // setSearchValue("");
  };




  //-------------------------------------
  //-------------cartwork-------
  const {
    get_searched_data,
    // cart_data,
    
   
    total_price,
    
    get_recommended_items,
    xyz_State,
    search_customer_data,
    show_cart_modal,
  
    show_viewOrder_modal,
  } = useSelector((e) => e.ComponentPropsManagement);

  const navigate = useNavigate();
  const [popoverIsOpen, setPopoverIsOpen] = useState(false);
  
  const [defaultPdfFile] = useState(pdfFile);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const {
    createdAt,
    password,
    registerId,
    status,
    saasId,
    storeId,
    // storeName,
    userId,
    userName,
    categoryReq,
    userType,
  } = localStorage.getItem("User_data")
    ? JSON.parse(localStorage.getItem("User_data"))
    : {};

  // console.log('',userType);
  const checkCustomer = userName.includes("C");
  console.log("HOME CTGR", categoryReq);
  const userData = JSON.parse(localStorage.getItem("User_data"));


  // console.log('',userType);
  

 
  // console.log("GSD", get_searched_data);

  // useEffect(() => {
  //   console.log("xyz_State", xyz_State);
  // }, []);

  console.log("xyz_State", xyz_State);

  // useEffect(() => {
  //   dispatch(handleXYZRequest({}));
  // }, []);

  useEffect(() => {
    dispatch(handleRecommendedDataRequest());
  }, []);

  // console.log("LINK CUSTOMER DATA", search_customer_data);

  const [validated, setValidated] = useState(false);
  const [searchedData, setSearchedData] = useState([]);
  const [recommendedData, setRecommendedData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  // const [cartData, setCartData] = useState(null);
  const [cartData, setCartData] = useState(null);
  const [percentOff, setPercentOff] = useState(1);
  const [amountOff, setAmountOff] = useState("");
  const [show, setShow] = useState(true);
  const [speachModal, setSpechModal] = useState(false);
  const [visibleVoiceCommand, setVisibleVoiceCommand] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [paymentModal, setPaymentModal] = useState(false);
  const [handleShowReceipt, setHandleShowReceipt] = useState(false);
  const [handleShowQR, setHandleShowQR] = useState(false);
  const [handleOpenWhatsapp, setHandleOpenWhatsapp] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [balanceDue, setBalanceDue] = useState(0);
  const [sumValue, setSumValue] = useState(0);
  const [QR, setQR] = useState(null);
  const [overDicount, setOverDiscount] = useState([]);
  const [isIndividualDiscount, setIsIndividualDiscount] = useState(true);
  const [amount, setAmount] = useState("");
  const [optionTick, setOptionTick] = useState([]);
  const [optionTickSum, setOptionTickSum] = useState(0);
  const [discountPercentVal, setDiscountPercentVal] = useState("");
  const [discountAmountVal, setDiscountAmountVal] = useState("");
  const [totalDiscountVal, setTotalDiscountVal] = useState(Math.trunc(0));
  const [invoiceValue, setInvoiceValue] = useState(Math.trunc(0));
  const [addPrice, setAddPrice] = useState("");
  const [email, setEmail] = useState("");
  const [updatecart, setUpdatecart] = useState(true);
  const [storeName, setStoreName] = useState("");
  const [checkLoyalty, setcheckLoyalty] = useState(false);
  const [loyalityRedemedValue, setLoyalityRedemedValue] = useState(0);
  const [totalSum, setTotalSum] = useState(0);
  const [fileResult, setFileResult] = useState();
  const [emailOpen, setEmailOpen] = useState(false);
  const [WhatsAppOpen, setWhatsAppOpen] = useState(false);
  const [smsOpen, setSmsOpen] = useState(false);
  const [whatsApp, setWhatsApp] = useState("");
  const [webcamResult, setwebcamResult] = useState();
  const [sms, setSms] = useState("");
  const [showVierCustomerOrderModal, setShowVierCustomerOrderModal] =
    useState(false);
  const [qrData, setQrData] = useState(null);
  const [loyaltyAmount, setLoyaltyAmount] = useState(
    link_loyalty_detail.balance_amount
  );
  const [viewOrderModalIsOpen, setViewOrderModalIsOpen] = useState(false);

  console.log("recommended DATA", recommendedData);

  useEffect(() => {
    if (localStorage.getItem("Store_data")) {
      const allData = JSON.parse(localStorage.getItem("Store_data"));
      // console.log("STORE NAME", storeName);
      setStoreName(allData?.storeName);
    }
  }, [storeName]);

  const getDataFromStorage = () => {
    try {
      const t1 = JSON.parse(localStorage.getItem("my-cart"));
      setCartData(t1);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getDataFromStorage();
  }, [updatecart]);

  // console.log("handle_saveTransaction_data", handle_saveTransaction_data);

  useEffect(() => {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    var MyDate = new Date();
    var MyDateString;
    console.log("inside effect", cartData);
    if (link_loyalty_detail && Object.keys(link_loyalty_detail.length > 0)) {
      if (checkLoyalty === true) {
        dispatch(
          handleRedeemPointRequest({
            link_loyalty_detail,
            redeem_amount: optionTick.filter((el) => el.value === "loyalty")[0]
              .amount,
            bussiness_date: "2023-04-24",
            invoice_number: handle_saveTransaction_data.transaction_id + "",
            remarks: "",
          })
        );
        // dispatch(
        //   handleAccruvalRequest({
        //     link_loyalty_detail,
        //     client_id: userData && userData.saasId,
        //     source_channel: "POS",
        //     register_id: userData && userData.registerId,
        //     total_invoice_amount: Number(invoiceValue),
        //     store_id: Number(userData && userData.storeId),
        //     business_date: `${year}-${month < 10 ? "0" + month : month}-${
        //       day < 10 ? "0" + day : day
        //     }`,
        //     invoice_no: handle_saveTransaction_data.transaction_id + "",
        //     source_app: "POS",
        //     concept_code: Number(1),
        //     source_function: "POST",
        //     country: link_loyalty_detail.country?.toUpperCase(),
        //     reference_number: handle_saveTransaction_data.transaction_id + "",
        //     territory_code: "INR",
        //     remarks: "GOOD",
        //     product: cartDataAcc(),
        //     transaction_type: "PURCHASE",
        //     program_name: "campaign name",
        //     base_currency: link_loyalty_detail.base_currency,
        //     tender: handleTander3(),
        //   })
        // );
      } else {
        // dispatch(
        //   handleAccruvalRequest({
        //     link_loyalty_detail,
        //     client_id: userData && userData.saasId,
        //     source_channel: "POS",
        //     register_id: userData && userData.registerId,
        //     total_invoice_amount: Number(invoiceValue),
        //     store_id: Number(userData && userData.storeId),
        //     business_date: `${year}-${month < 10 ? "0" + month : month}-${
        //       day < 10 ? "0" + day : day
        //     }`,
        //     invoice_no: handle_saveTransaction_data.transaction_id + "",
        //     source_app: "POS",
        //     concept_code: Number(1),
        //     source_function: "POST",
        //     country: link_loyalty_detail.country?.toUpperCase(),
        //     reference_number: handle_saveTransaction_data.transaction_id + "",
        //     territory_code: "INR",
        //     remarks: "GOOD",
        //     product: cartDataAcc(),
        //     transaction_type: "PURCHASE",
        //     program_name: "campaign name",
        //     base_currency: link_loyalty_detail.base_currency,
        //     tender: handleTander3(),
        //   })
        // );
      }
    } else {
      // dispatch(
      //   handleAccruvalRequest({
      //     link_loyalty_detail,
      //     client_id: userData && userData.saasId,
      //     source_channel: "POS",
      //     register_id: userData && userData.registerId,
      //     total_invoice_amount: Number(invoiceValue),
      //     store_id: Number(userData && userData.storeId),
      //     business_date: `${year}-${month < 10 ? "0" + month : month}-${
      //       day < 10 ? "0" + day : day
      //     }`,
      //     invoice_no: handle_saveTransaction_data.transaction_id + "",
      //     source_app: "POS",
      //     concept_code: Number(1),
      //     source_function: "POST",
      //     country: link_loyalty_detail.country?.toUpperCase(),
      //     reference_number: handle_saveTransaction_data.transaction_id + "",
      //     territory_code: "INR",
      //     remarks: "GOOD",
      //     product: cartDataAcc(),
      //     transaction_type: "PURCHASE",
      //     program_name: "campaign name",
      //     base_currency: link_loyalty_detail.base_currency,
      //     tender: handleTander3(),
      //   })
      // );
    }
  }, [handle_saveTransaction_data]);

  // useEffect(() => {
  //   dispatch(handleCategoriesRequest());
  // }, []);

  // const findtLoyaltyTender = () => {
  //   if (optionTick?.length > 0) {
  //     const obj = {};
  //     optionTick.map((item) => {
  //       obj[item.name] = item.amount;
  //     });
  //     return obj;
  //     // setSendValues(obj)
  //   }
  //   return {};
  // };

  const cartDataAcc = () => {
    if (cartData?.length > 0) {
      let arr = [];
      cartData.map((item) => {
        console.log("ITEM", item);

        arr.push({
          product_name: item.category,
          product_quantity: item.productQty,
          product_amount: item.price,
          product_non_sale_amount: item.discount == 0 ? item.price : "",
          product_sale_amount:
            item.discount > 0 ? item.price - item.discount : "",
          product_discount_amount: Number(
            item.discount > 0 ? item.discount : 0
          ),
          qr_sale_flag: true,
        });
      });
      return arr;
      // setSendValues(obj)
    }
    return [];
  };

  // cartDataAcc();

  useEffect(() => {
    setShow(show_cart_modal);
  }, [show_cart_modal]);

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
  }, [optionTickSum, invoiceValue, discountPercentVal, invoiceValue]);

  useEffect(() => {
    // if (totalDiscountVal) {
    //   setInvoiceValue(parseFloat(sumValue - totalDiscountVal).toFixed(2));
    // } else {
    // }
    setInvoiceValue(parseFloat(sumValue).toFixed(2));
  }, [sumValue, totalDiscountVal]);

  useEffect(() => {
    if (get_recommended_items && get_recommended_items?.data) {
      if (get_recommended_items?.data?.length > 0) {
        const t1 = JSON.parse(JSON.stringify(get_recommended_items?.data));
        t1.map((item) => {
          item["new_price"] = item.price;
        });
        setRecommendedData(t1);
      }
    }
  }, [get_recommended_items]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  useEffect(() => {
    console.log("cartData", cartData);
    const arr = [];
    let sum = 0;
    cartData?.map((el) => {
      // const totalCart = Number(el.price) * Number(el.productQty);
      // arr.push(totalCart);
      // const r =  el.new_price* el.productQty
      arr.push(el.new_price);
    });
    arr?.map((el) => {
      sum = sum + el;
    });
    console.log("SUM", sum);
    // setBalanceDue(sum);
    setSumValue(sum);
    setAmount(sum);

    // =============================
  }, [cartData]);

  useEffect(() => {
    if (get_QR_img) {
      setQR(get_QR_img);
    }
  }, [get_QR_img]);

  // useEffect(() => {
  //   if (cart_data) {
  //     if (cart_data?.length > 0) {
  //       const t1 = JSON.parse(JSON.stringify(cart_data));
  // t1.map((item) => {
  //   item["discount_menu_is_open"] = false;
  //   item["discount_value"] = "";
  //   item["amount_value"] = "";
  //   item["new_price"] = Number(item.price) * Number(item.productQty);
  //   item["zero_price"] = Number(item.price) * Number(item.productQty);
  // });
  //       setCartData(t1);
  //     }
  //  else {
  //   setCartData([]);
  //   setTotalDiscountVal(0);
  // }
  // }
  // }, [cart_data]);
  const optionArray = [
    {
      id: 1,
      name: "Cash",
      icon: <IoCashOutline size={25} />,
      value: "cash",
      isActive: false,
    },
    {
      id: 2,
      name: "Paytm",
      icon: <SiPaytm size={25} />,
      value: "paytm",
      isActive: false,
    },
    {
      id: 3,
      name: "Google Pay",
      icon: <FaGooglePay size={25} color="white" />,
      value: "googlepay",
      isActive: false,
    },
    {
      id: 4,
      name: "Phone Pay",
      icon: <SiPhonepe size={25} color="white" />,
      value: "phonepay",
      isActive: false,
    },
    {
      id: 5,
      name: "UPI",
      icon: <SiContactlesspayment size={25} color="white" />,
      value: "upi",
      isActive: false,
    },
    {
      id: 6,
      name: "Card",
      icon: <BsCreditCardFill size={25} />,
      value: "card",
      isActive: false,
    },
    {
      id: 7,
      name: "Credit Sale",
      icon: <FcSalesPerformance size={25} />,
      value: "credit_sale",
      isActive: false,
    },

    {
      id: 8,
      name: "Loyalty",
      cardValue: link_loyalty_detail.balance_amount,
      icon: link_loyalty_detail.balance_amount,
      value: "loyalty",
      isActive: link_loyalty_detail.balance_amount > 0 ? false : true,
    },
  ];
  console.log("RECOMMENDED", recommendedData);
  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 1000);
    };
  };

  const handleVoiceSearch = (value) => {
    dispatch(handleSearchedDataRequest({ searchValue: value }));
  };

  const optimizedVoicefn = useCallback(debounce(handleVoiceSearch), []);

  useEffect(() => {
    if (get_searched_data && get_searched_data?.data) {
      if (get_searched_data?.data?.length > 0) {
        const t1 = JSON.parse(JSON.stringify(get_searched_data?.data));
        t1.map((item) => {
          item["new_price"] = item.price;
        });
        setSearchedData(t1);
      }
    }
  }, [get_searched_data]);

  // console.log(searchedData);
  const handleSearch = (value) => {
    dispatch(handleSearchedDataRequest({ searchValue: value }));
  };

  const optimizedFn = useCallback(debounce(handleSearch), []);

  useEffect(() => {
    if (searchValue) {
      optimizedFn(searchValue);
    }
  }, [searchValue]);

  let recognition = null;
  try {
    recognition = window.recognition;
    recognition.addEventListener("result", (e) => {
      const transcript = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");

      // document.getElementById("p").innerHTML = transcript;
      setSearchValue(transcript);
    });
  } catch (err) {
    console.log(err);
  }

  const handleVoiceCommand = () => {
    try {
      recognition.start();
    } catch (err) {
      console.log("err", err);
    }
    // setVisibleVoiceCommand((state) => !state);
    // SpeechRecognition.startListening({ language: "en-IN" });
  };

  const handleSelect = (e) => {
    // console.log(e.target.value);
  };

  useEffect(() => {
    // console.log("optionTick", optionTick);
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

  const handleToQR = () => {
    if (balanceDue === 0) {
      setHandleShowReceipt(true);
    } else {
      success("Pay Due Amount!");
    }
  };

  const handleWhatsSubmit = (event) => {
    event.preventDefault();
    success("Invoice Sent To Your WhatsApp!");
    // alert("Form Sumbited!");
    // window.location.reload();
  };
  console.log(searchedData);
  console.log(searchValue);

  console.log(recommendedData);

  const RenderUi = () => {
    if (searchedData && searchValue?.length > 0) {
      return (
        <>
          <Product
            setSearchValue={setSearchValue}
            data={searchedData}
            cartData={cartData}
            setCartData={setCartData}
            setData={setSearchedData}
            setUpdatecart={setUpdatecart}
            updatecart={updatecart}
          />
        </>
      );
    } else if (recommendedData && recommendedData?.length > 0) {
      return (
        <>
          <Product
            setSearchValue={setSearchValue}
            data={recommendedData}
            cartData={cartData}
            setCartData={setCartData}
            setData={setRecommendedData}
            setUpdatecart={setUpdatecart}
            updatecart={updatecart}
          />
        </>
      );
    }
  };
  console.log(searchValue);

  const handleTenderAmount = () => {
    if (optionTick?.length > 0) {
      const obj = {};
      optionTick.map((item) => {
        obj[item.name] = item.amount;
      });
      return obj;
      // setSendValues(obj)
    }
    return {};
  };

  const handleTander2 = () => {
    if (optionTick?.length > 0) {
      const obj = {};
      optionTick.map((item) => {
        // obj[item.name] = item.amount;
        obj["tender_name"] = item.name.toLowerCase();
        obj["tender_value"] = Number(item.amount);
      });
      return obj;
      // setSendValues(obj)
    }
    return {};
  };
  const handleTander3 = () => {
    if (optionTick?.length > 0) {
      const arr = [];
      optionTick.map((item) => {
        arr.push({
          tender_name: item.name.toLowerCase(),
          tender_value: Number(item.amount),
        });
        // obj["tender_name"] = item.name.toLowerCase();
        // obj["tender_value"] = Number(item.amount);
      });
      return arr;
      // setSendValues(obj)
    }
    return [];
  };

  const handleNotifyEmail = (e) => {
    e.preventDefault();
    if (email) {
      dispatch(
        handleEmailNotificationResponse({
          to: email,
          receiptFileName:
            handle_saveTransaction_data &&
            handle_saveTransaction_data.pdf_file_name,
        })
      );
    }
    setEmail("");
  };
  const handleWhatsApp = (e) => {
    e.preventDefault();
    console.log("handleWhatsApp", e);
    // if (whatsApp) {
    dispatch(
      handlewhatsAppRequest({
        to: whatsApp,
        url:
          handle_saveTransaction_data &&
          handle_saveTransaction_data.pdf_file_name,
      })
    );
    setWhatsApp("");
    // }
    setEmail("");
  };

  console.log("HOME CARTDATA", cartData);

  // console.log("DISCOUNT AMOUNT", discountAmountVal);
  // console.log("OPTION TICK", optionTick);
  console.log("TENDER 3", handleTander3());

  // console.log("HANDLE TENDER", handleTenderAmount());
  const customerTab = [
    {
      id: 1,
      label: "Home",
      value: "home",
      icon: <AiFillHome color="#D64046" opacity={0.6} size="25" />,
      isActive: true,
    },
    {
      id: 2,
      label: "Order",
      value: "order",
      icon: <BiBox color="#D64046" size="25" />,
      isActive: true,
    },
    {
      id: 4,
      label: "Cart",
      value: "cart",
      icon: <BiCart color="#D64046" size="25" />,
      isActive: true,
    },
    {
      id: 5,
      label: "Profile",
      value: "profile",
      icon: <BiGroup color="#D64046" size="25" />,
      isActive: true,
    },
  ];
  const handleUserCheck = () => {
    if (userType === "CUSTOMER") {
      return (
        <div
          className="d-flex flex-row"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          {customerTab
            .filter((io) => io.isActive === true)
            .map((item) => {
              return (
                <>
                  <div
                    style={{
                      display: "flex",
                      // justifyContent: "space-between",
                      alignItems: "center",
                      flexDirection: "column",
                      // margin: "10px",
                      // marginBottom: "20px",
                      cursor: "pointer",
                      color: "#3d2b2b",
                    }}
                    onClick={() => {
                      if (item.value === "home") {
                        navigate("/home");
                      } else if (item.value === "order") {
                        setShowVierCustomerOrderModal((state) => !state);
                      } else if (item.value === "cart") {
                        dispatch(
                          handleShowModal({ bagModalIsOpne: !show_cart_modal })
                        );
                      } else if (item.value === "profile") {
                      }
                    }}>
                    <div>{item.icon}</div>
                    <div style={{ color: "#D64046" }}>{item.label}</div>
                  </div>
                </>
              );
            })}
        </div>
      );
    }
  };

  const handleSMS = (event) => {
    event.preventDefault();
    dispatch(
      handelSMSRequest({
        number: sms,
        pdf:
          handle_saveTransaction_data &&
          handle_saveTransaction_data.pdf_file_name,
      })
    );
    setSms("");
  };




    //----------------










  const { catname } = useParams();


  const [filterdetails, setFilterdetails] = useState([]);
  const [category2, setCategory2] = useState([])
  const [FilterCategory, setFilterCategory] = useState('')



  // const { storeId, saasId, userName } = JSON.parse(
  //   localStorage.getItem("User_data")
  // );

  useEffect(() => {
    axios.get(`${BASE_Url}/search/get-result/${storeId}/${saasId}/${catname}`)
      .then((res) => setFilterdetails(res.data.data));
    axios
      .get(`${BASE_Url}/category/get-list/${saasId}/${storeId}`)
      .then((res) => setCategory2(res.data.data));

  }, []);




  const filterres = category2.filter((ele) => ele.category_name == catname)

  console.log(filterres)

  return (
    <div className="app">
      <div className="d-flex align-items-center justify-content-center  mt-3">

        {
          filterres[0] &&
          <Card style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0,)', borderRadius: '10px', width: '20rem' }} className="cardCategory ">
            <div className="d-flex align-items-center justify-content-center">
              <Image src={filterres[0].image_path} roundedCircle style={{ width: "100px", height: '100px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.' }} className="m-1" />
              <h1 className="text-center">{filterres[0].category_name}</h1>
            </div>
          </Card>
        }

      </div>


      <div >
        <div className="d-flex align-items-center justify-content-center mt-2 ">
          <Container>
            <Row xs={2} sm={4} md={4}>
              {filterdetails.map((ele) => {
                return (
                  <Col className="mt-5">
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Card style={{ borderRadius: "10px", width: "12rem", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", }}
                        className="cardCategory">
                        <Card.Img src={"https://pos.photonsoftwares.com/prod/api/v1/item/get-image/7044"}></Card.Img>
                        <div>
                          <div className="text-center">
                            <Card.Body>
                              <h6>{ele.description}</h6>
                              <p><span >₹</span>{' '}{ele.price}</p>
                              <Button variant="warning" onClick={() => addToCart(ele)} >Add to cart</Button>
                            </Card.Body>
                          </div>

                        </div>
                      </Card>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Container>
        </div>
      </div>

      {
        show == true && (<MyCart
          show={show}
          cartData={cartData}
          setInvoiceValue={setInvoiceValue}
          invoiceValue={invoiceValue}
          popoverIsOpen={popoverIsOpen}
          setPopoverIsOpen={setPopoverIsOpen}
          discountAmountVal={discountAmountVal}
          discountPercentVal={discountPercentVal}
          setDiscountPercentVal={setDiscountPercentVal}
          totalDiscountVal={totalDiscountVal}
          setShow={setShow}
          setPaymentModal={setPaymentModal}
          setCartData={setCartData}
          sumValue={sumValue}
          setSumValue={setSumValue}
          setTotalDiscountVal={setTotalDiscountVal}
          setDiscountAmountVal={setDiscountAmountVal}
          totalSum={totalSum}
          setTotalSum={setTotalSum}
        />



        )}

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        // id="contained-modal-title-vcenter"
        show={paymentModal}
      // style={{ position: "relative" }}
      >
        <Modal.Body>
          <div className="main-container">
            <div
              className="main-container1"
              style={{
                backgroundColor: "#f8f8f8",
              }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <div>
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: 700,
                      textAlign: "center",
                    }}>
                    Total Invoice Value: {totalSum}
                  </div>
                  <div className="mt-2">
                    <input
                      type="number"
                      className="input-style"
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (!val) {
                          setAmount("");
                        } else {
                          if (val <= balanceDue) {
                            setAmount(val);
                          } else {
                            setAmount(balanceDue);
                          }
                        }
                      }}
                      // disabled={optionTick?.length > 0}
                      disabled={Number(optionTickSum) === Number(sumValue)}
                      value={!balanceDue ? "0" : totalSum}
                      required={true}
                      placeholder="Enter Amount"
                    />
                  </div>
                </div>
              </div>
              <div
                style={{
                  maxWidth: "100%",
                  display: "flex",
                  marginRight: "26px",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <div className="option-item-container">
                  {optionArray
                    .filter((el) => el.isActive === false)
                    .map((item, i) => {
                      return (
                        <>
                          <div className="mb-2 d-flex px-0" key={item.id}>
                            <div
                              onClick={() => {
                                if (optionTick?.length === 0) {
                                  const obj = { ...item, amount };
                                  setOptionTick([...optionTick, obj]);
                                } else if (optionTick?.length > 0) {
                                  if (
                                    optionTick.filter(
                                      (io) => io.value === item.value
                                    )?.length > 0
                                  ) {
                                    setOptionTick(
                                      optionTick.filter(
                                        (io) => io.value !== item.value
                                      )
                                    );
                                  } else {
                                    if (Number(optionTickSum) <= sumValue) {
                                      const obj = { ...item, amount };
                                      setOptionTick([...optionTick, obj]);
                                    }
                                  }
                                }
                                console.log(item);
                                if (item.value === "loyalty") {
                                  setcheckLoyalty(true);
                                  let newLoyaltyAmount = loyaltyAmount;
                                  if (loyaltyAmount > amount) {
                                    newLoyaltyAmount = amount;
                                  }
                                  if (optionTick?.length === 0) {
                                    const obj = {
                                      ...item,
                                      amount: newLoyaltyAmount,
                                    };
                                    setOptionTick([...optionTick, obj]);
                                  } else if (optionTick?.length > 0) {
                                    if (
                                      optionTick.filter(
                                        (io) => io.value === item.value
                                      )?.length > 0
                                    ) {
                                      setOptionTick(
                                        optionTick.filter(
                                          (io) => io.value !== item.value
                                        )
                                      );
                                    } else {
                                      if (Number(optionTickSum) <= sumValue) {
                                        const obj = {
                                          ...item,
                                          amount: newLoyaltyAmount,
                                        };
                                        setOptionTick([...optionTick, obj]);
                                      }
                                    }
                                  }
                                }
                              }}
                              className={`option-item ${optionTick.filter(
                                (io) => io.name === item.value
                              )?.length > 0 && ""
                                }`}
                              style={{
                                width: "90%",
                                backgroundColor:
                                  item.name === "Cash"
                                    ? "#fed813"
                                    : item.name === "Paytm"
                                      ? "#00B9F1"
                                      : item.name === "Google Pay"
                                        ? "#2DA94F"
                                        : item.name === "Phone Pay"
                                          ? "#5f259f"
                                          : item.name === "UPI"
                                            ? "#ff7909"
                                            : item.name === "Credit Sale"
                                              ? "#1741b2"
                                              : item.name === "Loyalty"
                                                ? "#c8030e"
                                                : "silver",
                              }}>
                              <div style={{ position: "relative", top: "2px" }}>
                                {item.icon}
                              </div>
                              <div
                                style={{
                                  fontSize: "10px",
                                  color:
                                    item.name === "Cash"
                                      ? "black"
                                      : item.name === "Paytm"
                                        ? "black"
                                        : item.name === "Google Pay"
                                          ? "white"
                                          : item.name === "Phone Pay"
                                            ? "white"
                                            : item.name === "UPI"
                                              ? "white"
                                              : item.name === "Credit Sale"
                                                ? "#fff"
                                                : item.name === "Loyalty"
                                                  ? "#fff"
                                                  : "black",
                                }}>
                                {item.name}
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <div className="calculated_amount-container">
                  {optionTick && optionTick?.length > 0 && (
                    <>
                      {optionTick.map((item) => {
                        return (
                          <>
                            <div style={{ fontSize: "20px" }}>
                              {item.name} - {totalSum}
                            </div>
                          </>
                        );
                      })}
                    </>
                  )}
                </div>
              </div>

              <div className="due-blnce-container">
                Balance Due = {balanceDue}
              </div>

              <div className="btn-container">
                <button
                  type="submit"
                  className="btn-style"
                  onClick={() => {
                    const date = new Date();

                    let day = date.getDate();
                    let month = date.getMonth() + 1;
                    let year = date.getFullYear();

                    handleToQR();

                    dispatch(
                      handleSaveTransactionRequest({
                        registerId: userData && userData.registerId,
                        storeId: userData && userData.storeId,
                        saasId: userData && userData.saasId,
                        tenderId: "TENDER1",
                        tender: handleTenderAmount(),
                        cartItems: cartData,
                        customer_id:
                          search_customer_data && search_customer_data.id,
                        loyalty_id:
                          link_loyalty_detail && link_loyalty_detail.loyalty_id,
                      })
                    );
                    dispatch(
                      handleAccruvalRequest({
                        link_loyalty_detail,
                        client_id: userData && userData.saasId,
                        source_channel: "POS",
                        register_id: userData && userData.registerId,
                        total_invoice_amount: Number(invoiceValue),
                        store_id: Number(userData && userData.storeId),
                        business_date: `${year}-${month < 10 ? "0" + month : month
                          }-${day < 10 ? "0" + day : day}`,
                        invoice_no:
                          handle_saveTransaction_data.transaction_id + "",
                        source_app: "POS",
                        concept_code: Number(1),
                        source_function: "POST",
                        country: link_loyalty_detail.country?.toUpperCase(),
                        reference_number:
                          handle_saveTransaction_data.transaction_id + "",
                        territory_code: "INR",
                        remarks: "GOOD",
                        product: cartDataAcc(),
                        transaction_type: "PURCHASE",
                        program_name: "campaign name",
                        base_currency: link_loyalty_detail.base_currency,
                        tender: handleTander3(),
                      })
                    );
                    //---------------------------------------------------------------------------------
                    // dispatch(
                    //   handleAccruvalRequest({
                    //     client_id: userData && userData.saasId,
                    //     source_channel: "POS",
                    //     register_id: "2002",
                    //     total_invoice_amount: balanceDue,
                    //     store_id: userData && userData.storeId,
                    //     business_date: "2023-04-05",
                    //     invoice_no: "8487021",
                    //     source_app: "POS",
                    //     concept_code: 1,
                    //     source_function: "POST",
                    //     country: loyalty_data && loyalty_data.data.country,
                    //     reference_number: "8487021",
                    //     territory_code:
                    //       loyalty_data && loyalty_data.data.country,
                    //     remarks: "GOOD",
                    //     product: cartData,
                    //     transaction_type: "PURCHASE",
                    //     program_name: "campaign name",
                    //     base_currency: loyalty_data.data.base_currency,
                    //     tender: handleTenderAmount(),
                        //  [
                        //   {
                        //     tender_name: "check",
                        //     tender_value: 300,
                        //   },
                        //   {
                        //     tender_name: "cash",
                        //     tender_value: 300,
                        //   },
                        // ],
                    //   })
                    // );
                    //-----------------------------------------------------------------------------------
                  }}>
                  Receipts
                </button>
                <Button
                  onClick={() => setPaymentModal(false)}
                  style={{
                    backgroundColor: "#20b9e3",
                    fontSize: "20px",
                    marginLeft: "20px",
                    padding: "10px 20px",
                    outline: "none",
                    border: "none",
                    fontSize: "20px",
                  }}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      {/* PDF RECEiPT*/}
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={handleShowReceipt}
        style={{ height: "100%" }}>
        <Modal.Header>
          <Modal.Title>Your Receipt! </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ height: "300px", width: "100%", margin: "auto" }}>
            {defaultPdfFile && (
              <>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                  <Viewer
                    fileUrl={`${BASE_Url}/transaction/pdf/${handle_saveTransaction_data &&
                      handle_saveTransaction_data.pdf_file_name
                      }`}
                    plugins={[defaultLayoutPluginInstance]}
                  />
                </Worker>
              </>
            )}
          </div>
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-evenly",
                marginTop: "20px",
              }}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}>
                <div
                // style={{ flex: 1 }}
                >
                  <Button
                    variant="outline-success"
                    size="lg"
                    // onClick={() => setHandleOpenWhatsapp(true)}
                    onClick={() => {
                      setWhatsAppOpen((state) => !state);
                      setSmsOpen(false);
                      setEmailOpen(false);
                    }}>
                    WhatsApp <IoLogoWhatsapp size={25} />
                  </Button>
                </div>
                <div
                //  style={{ flex: 1 }}
                >
                  <Button
                    variant="outline-success"
                    size="lg"
                    // onClick={() => setHandleOpenWhatsapp(true)}
                    onClick={() => {
                      setEmailOpen((state) => !state);
                      setWhatsAppOpen(false);
                      setSmsOpen(false);
                    }}>
                    Email <AiOutlineMail size={25} />
                  </Button>
                </div>
                <div
                // style={{ flex: 1 }}
                >
                  <Button
                    variant="outline-success"
                    size="lg"
                    onClick={() => {
                      setSmsOpen((state) => !state);
                      setEmailOpen(false);
                      setWhatsAppOpen(false);
                    }}>
                    SMS <FcSms size={25} />
                  </Button>
                </div>
              </div>
              {emailOpen ? (
                <form
                  onSubmit={handleNotifyEmail}
                  className="d-flex flex-row align-items-center"
                  style={{ width: "50%" }}>
                  <TextField
                    type="email"
                    className="form-control my-2"
                    id="customer-name"
                    required
                    size="small"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="mx-2">
                    <button type="submit" className="btn btn-primary">
                      Send
                    </button>
                  </div>
                </form>
              ) : (
                ""
              )}
              {WhatsAppOpen ? (
                <form
                  onSubmit={handleWhatsApp}
                  className="d-flex flex-row align-items-center"
                  style={{ width: "50%" }}>
                  <TextField
                    type="number"
                    className="form-control my-2"
                    id="customer-name"
                    required
                    onWheel={(e) => e.target.blur()}
                    size="small"
                    label="WhatsApp"
                    value={whatsApp}
                    onChange={(e) => setWhatsApp(e.target.value)}
                  />
                  <div className="mx-2">
                    <button type="submit" className="btn btn-primary">
                      Send
                    </button>
                  </div>
                </form>
              ) : (
                ""
              )}
              {smsOpen ? (
                <form
                  onSubmit={handleSMS}
                  className="d-flex flex-row align-items-center"
                  style={{ width: "50%" }}>
                  <TextField
                    type="text"
                    className="form-control my-2"
                    id="customer-name"
                    required
                    size="small"
                    label="SMS"
                    value={sms}
                    onChange={(e) => setSms(e.target.value)}
                  />
                  <div className="mx-2">
                    <button type="submit" className="btn btn-primary">
                      Send
                    </button>
                  </div>
                </form>
              ) : (
                ""
              )}
              <Button
                //  variant="secondary"
                style={{
                  backgroundColor: "#20b9e3",
                  outline: "none",
                  border: "none",
                  fontSize: "20px",
                  marginTop: "20px",
                }}
                onClick={() => {
                  setHandleShowReceipt(false);
                  setPaymentModal(false);
                  // setShow(false);
                  // dispatch(handleEmptyCartItem());
                  setCartData([]);
                  setAmount(0);
                  // setSumValue(0);
                  setSearchValue("");
                  dispatch(
                    handleShowModal({ bagModalIsOpne: !show_cart_modal })
                  );
                  localStorage.removeItem("my-cart");
                  setTimeout(() => {
                    window.location.reload();
                  }, 500);
                }}>
                Close
              </Button>
              <div
                style={{
                  // height: "100px",
                  // width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // marginTop: "20px",
                  marginBottom: "20px",
                }}>
                <img
                  src={`${BASE_Url}/transaction/pdf-qr/${handle_saveTransaction_data &&
                    handle_saveTransaction_data.qr_file_name
                    }`}
                  alt=""
                  style={{ height: "100%", width: "80%" }}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      {/* QR */}
      {/* WhatsApp */}
      <ViewOrdersCustomer
        showVierCustomerOrderModal={showVierCustomerOrderModal}
        setShowVierCustomerOrderModal={setShowVierCustomerOrderModal}
      />




    </div>
  )
}
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "row",
//         // alignItems: "center",
//         gap: "0 10px",
//         justifyContent: "center",
//         flexWrap: "wrap",
//       }}
//     >
//       {get_all_catrgory_data.map((item) => (
//         <div
//           class="card"
//           key={item.productId}
//           style={{
//             width: "10rem",
//             margin: "5px",
//             display: "flex",
//           }}
//         >
//           <div style={{ height: "100px", width: "100%" }}>
//             <img
//               style={{ height: "100%", width: "100%" }}
//               src={`${BASE_Url}/item/get-image/${item && item.productId}`}
//               class="card-img-top"
//               alt="..."
//             />
//           </div>
//           <div class="card-body">
//             <h5 class="card-title">{item.itemName}</h5>
//             {Number(item.price) === 0 ? (
//               <>
//                 <FormControl  sx={{ m: 1, width: "25ch" }} variant="outlined">
//                   <InputLabel>Amount</InputLabel>
//                   <OutlinedInput
//                     type="number"
//                     size="small"
//                     onKeyDown={(e) => {
//                       if (e.key === "Enter") {
//                         item.price = item.new_price;
//                         setData([...data]);
//                       }
//                     }}
//                     endAdornment={
//                       <InputAdornment position="end">
//                         <IconButton
//                           // aria-label="toggle password visibility"
//                           onClick={() => {
//                             item.price = item.new_price;
//                             setData([...data]);
//                           }}
//                           edge="end"
//                         >
//                           <BsFillCheckCircleFill
//                             color={
//                               item.new_price === "" || item.new_price === 0
//                                 ? "#979797"
//                                 : "green"
//                             }
//                           />
//                         </IconButton>
//                       </InputAdornment>
//                     }
//                     label="Amount"
//                     className="w-50"
//                     onChange={(e) => {
//                       const val = e.target.value;
//                       if (val) {
//                         setMyPrice({
//                           productId: item.productId,
//                           price: Number(val),
//                         });
//                         item.new_price = Number(val);
//                         // setMyPrice(Number(val))
//                       } else {
//                         item.new_price = "";
//                         setMyPrice({
//                           productId: item.productId,
//                           price: val,
//                         });
//                         // setMyPrice(val)
//                       }
//                       // setData([...data])
//                     }}
//                     value={
//                       item.productId === myPrice.productId ? myPrice.price : ""
//                     }
//                   />
//                 </FormControl>
//               </>
//             ) : (
//               <>
//                 <p style={{ fontWeight:"500", fontSize:"24px" }}>₹&nbsp;{item.price}</p>
//               </>
//             )}
//             {/* <a href="#" class="btn btn-sm btn-warning">
//                 Add to Cart
//               </a> */}
//             <div
//               style={{
//                 display: "flex",
//                 flex: 1,
//                 alignItems: "center",
//                 // justifyContent: "flex-end",
//               }}
//             >
//               <div
//                 style={{
//                   display:
//                     item.price === 0 || item.price === 0 ? "none" : "block",
//                 }}
//               >
//                 <Button
//                   size="sm"
//                   variant={`warning`}
//                   style={{
//                     width: "100%",
//                     fontSize: "10px",
//                     display: item.price === 0 ? "hidden" : "block",
//                   }}
//                   onClick={() => addToCart(item)}
//                 >
//                   Add to cart
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

export default DataByCategory;

//--------------------------------------------------------------------------------

import "bootstrap/dist/css/bootstrap.min.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BsCamera } from "react-icons/bs";
import { BsHandbag, BsArrowRight } from "react-icons/bs";
import { FcSalesPerformance, FcSpeaker } from "react-icons/fc";
import { IoCashOutline } from "react-icons/io5";
import { SiPaytm } from "react-icons/si";
import { FaGooglePay } from "react-icons/fa";
import { SiPhonepe } from "react-icons/si";
import { GrClose } from "react-icons/gr";
import { SiContactlesspayment } from "react-icons/si";
import { AiOutlineMail, AiOutlineSearch } from "react-icons/ai";
import { BsCreditCardFill } from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io";
import { FcSms } from "react-icons/fc";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import Product from "../../components/Product";

import qrData from "../../assets/QR.jpeg";
import {
  handleSearchedDataRequest,
  handleSaveTransactionRequest,
  handleRecommendedDataRequest,
  handleAccruvalRequest,
  handleShowModal,
  handelSMSRequest,
  handlewhatsAppRequest,
  handleItemsDataRequest,
  handleEmailNotificationResponse,
  handleRedeemPointRequest,
  handleViewOrderModal,
  handleCategoriesRequest,
  handleXYZRequest,
  handlecartCount,
} from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { Button, Card, Col, Container, Row ,Image} from "react-bootstrap";
import pdfFile from "../../assets/PDF.pdf";

//assets\PDF.pdf
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import { BASE_Url } from "../../URL";
import { useNavigate, useParams } from "react-router-dom";
import { TextField } from "@mui/material";

import MyCart from "../my-cart/MyCart";
import { HiCreditCard } from "react-icons/hi2";
import { RiH1, RiMoneyDollarCircleFill } from "react-icons/ri";
import { AiFillHome } from "react-icons/ai";
import { BiBox, BiCart, BiCube, BiGroup } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
//import ViewOrders from "./PendingOrders";
//import { Category, WhatsApp } from "@material-ui/icons";
import Category from "../../components/Category/Category";
import ViewOrdersCustomer from "../PendingOrders/ViewOrdersCustomer";
import axios from "axios";

const DataByCategory = () => {
  // const loyalty_data = JSON.parse(localStorage.getItem("Loyalty_data"));
  const navigate = useNavigate();
  const [popoverIsOpen, setPopoverIsOpen] = useState(false);
  const dispatch = useDispatch();
  const [defaultPdfFile] = useState(pdfFile);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const {
    createdAt,
    password,
    registerId,
    status,
    saasId,
    storeId,
    // storeName,
    userId,
    userName,
    categoryReq,
    userType,
  } = localStorage.getItem("User_data")
    ? JSON.parse(localStorage.getItem("User_data"))
    : {};

  // console.log('',userType);
  const checkCustomer = userName.includes("C");
  console.log("HOME CTGR", categoryReq);
  const userData = JSON.parse(localStorage.getItem("User_data"));

  const {
    get_searched_data,
    // cart_data,
    get_QR_img,
    link_loyalty_detail,
    total_price,
    handle_saveTransaction_data,
    get_recommended_items,
    xyz_State,
    search_customer_data,
    show_cart_modal,
    get_all_catrgory_data,
    show_viewOrder_modal,
  } = useSelector((e) => e.ComponentPropsManagement);
  // console.log("GSD", get_searched_data);

  // useEffect(() => {
  //   console.log("xyz_State", xyz_State);
  // }, []);

  console.log("xyz_State", xyz_State);

  // useEffect(() => {
  //   dispatch(handleXYZRequest({}));
  // }, []);

  useEffect(() => {
    dispatch(handleRecommendedDataRequest());
  }, []);

  // console.log("LINK CUSTOMER DATA", search_customer_data);

  const [validated, setValidated] = useState(false);
  const [searchedData, setSearchedData] = useState([]);
  const [recommendedData, setRecommendedData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  // const [cartData, setCartData] = useState(null);
  const [cartData, setCartData] = useState(null);
  const [percentOff, setPercentOff] = useState(1);
  const [amountOff, setAmountOff] = useState("");
  const [show, setShow] = useState(false);
  const [speachModal, setSpechModal] = useState(false);
  const [visibleVoiceCommand, setVisibleVoiceCommand] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [paymentModal, setPaymentModal] = useState(false);
  const [handleShowReceipt, setHandleShowReceipt] = useState(false);
  const [handleShowQR, setHandleShowQR] = useState(false);
  const [handleOpenWhatsapp, setHandleOpenWhatsapp] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [balanceDue, setBalanceDue] = useState(0);
  const [sumValue, setSumValue] = useState(0);
  const [QR, setQR] = useState(null);
  const [overDicount, setOverDiscount] = useState([]);
  const [isIndividualDiscount, setIsIndividualDiscount] = useState(true);
  const [amount, setAmount] = useState("");
  const [optionTick, setOptionTick] = useState([]);
  const [optionTickSum, setOptionTickSum] = useState(0);
  const [discountPercentVal, setDiscountPercentVal] = useState("");
  const [discountAmountVal, setDiscountAmountVal] = useState("");
  const [totalDiscountVal, setTotalDiscountVal] = useState(Math.trunc(0));
  const [invoiceValue, setInvoiceValue] = useState(Math.trunc(0));
  const [addPrice, setAddPrice] = useState("");
  const [email, setEmail] = useState("");
  const [updatecart, setUpdatecart] = useState(true);
  const [storeName, setStoreName] = useState("");
  const [checkLoyalty, setcheckLoyalty] = useState(false);
  const [loyalityRedemedValue, setLoyalityRedemedValue] = useState(0);
  const [totalSum, setTotalSum] = useState(0);
  const [fileResult, setFileResult] = useState();
  const [emailOpen, setEmailOpen] = useState(false);
  const [WhatsAppOpen, setWhatsAppOpen] = useState(false);
  const [smsOpen, setSmsOpen] = useState(false);
  const [whatsApp, setWhatsApp] = useState("");
  const [webcamResult, setwebcamResult] = useState();
  const [sms, setSms] = useState("");
  const [showVierCustomerOrderModal, setShowVierCustomerOrderModal] =
    useState(false);
  const [qrData, setQrData] = useState(null);
  const [loyaltyAmount, setLoyaltyAmount] = useState(
    link_loyalty_detail.balance_amount
  );
  const [viewOrderModalIsOpen, setViewOrderModalIsOpen] = useState(false);

  console.log("recommended DATA", recommendedData);

  useEffect(() => {
    if (localStorage.getItem("Store_data")) {
      const allData = JSON.parse(localStorage.getItem("Store_data"));
      // console.log("STORE NAME", storeName);
      setStoreName(allData?.storeName);
    }
  }, [storeName]);

  const getDataFromStorage = () => {
    try {
      const t1 = JSON.parse(localStorage.getItem("my-cart"));
      setCartData(t1);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getDataFromStorage();
  }, [updatecart]);

  // console.log("handle_saveTransaction_data", handle_saveTransaction_data);

  useEffect(() => {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    var MyDate = new Date();
    var MyDateString;
    console.log("inside effect", cartData);
    if (link_loyalty_detail && Object.keys(link_loyalty_detail.length > 0)) {
      if (checkLoyalty === true) {
        dispatch(
          handleRedeemPointRequest({
            link_loyalty_detail,
            redeem_amount: optionTick.filter((el) => el.value === "loyalty")[0]
              .amount,
            bussiness_date: "2023-04-24",
            invoice_number: handle_saveTransaction_data.transaction_id + "",
            remarks: "",
          })
        );
        // dispatch(
        //   handleAccruvalRequest({
        //     link_loyalty_detail,
        //     client_id: userData && userData.saasId,
        //     source_channel: "POS",
        //     register_id: userData && userData.registerId,
        //     total_invoice_amount: Number(invoiceValue),
        //     store_id: Number(userData && userData.storeId),
        //     business_date: `${year}-${month < 10 ? "0" + month : month}-${
        //       day < 10 ? "0" + day : day
        //     }`,
        //     invoice_no: handle_saveTransaction_data.transaction_id + "",
        //     source_app: "POS",
        //     concept_code: Number(1),
        //     source_function: "POST",
        //     country: link_loyalty_detail.country?.toUpperCase(),
        //     reference_number: handle_saveTransaction_data.transaction_id + "",
        //     territory_code: "INR",
        //     remarks: "GOOD",
        //     product: cartDataAcc(),
        //     transaction_type: "PURCHASE",
        //     program_name: "campaign name",
        //     base_currency: link_loyalty_detail.base_currency,
        //     tender: handleTander3(),
        //   })
        // );
      } else {
        // dispatch(
        //   handleAccruvalRequest({
        //     link_loyalty_detail,
        //     client_id: userData && userData.saasId,
        //     source_channel: "POS",
        //     register_id: userData && userData.registerId,
        //     total_invoice_amount: Number(invoiceValue),
        //     store_id: Number(userData && userData.storeId),
        //     business_date: `${year}-${month < 10 ? "0" + month : month}-${
        //       day < 10 ? "0" + day : day
        //     }`,
        //     invoice_no: handle_saveTransaction_data.transaction_id + "",
        //     source_app: "POS",
        //     concept_code: Number(1),
        //     source_function: "POST",
        //     country: link_loyalty_detail.country?.toUpperCase(),
        //     reference_number: handle_saveTransaction_data.transaction_id + "",
        //     territory_code: "INR",
        //     remarks: "GOOD",
        //     product: cartDataAcc(),
        //     transaction_type: "PURCHASE",
        //     program_name: "campaign name",
        //     base_currency: link_loyalty_detail.base_currency,
        //     tender: handleTander3(),
        //   })
        // );
      }
    } else {
      // dispatch(
      //   handleAccruvalRequest({
      //     link_loyalty_detail,
      //     client_id: userData && userData.saasId,
      //     source_channel: "POS",
      //     register_id: userData && userData.registerId,
      //     total_invoice_amount: Number(invoiceValue),
      //     store_id: Number(userData && userData.storeId),
      //     business_date: `${year}-${month < 10 ? "0" + month : month}-${
      //       day < 10 ? "0" + day : day
      //     }`,
      //     invoice_no: handle_saveTransaction_data.transaction_id + "",
      //     source_app: "POS",
      //     concept_code: Number(1),
      //     source_function: "POST",
      //     country: link_loyalty_detail.country?.toUpperCase(),
      //     reference_number: handle_saveTransaction_data.transaction_id + "",
      //     territory_code: "INR",
      //     remarks: "GOOD",
      //     product: cartDataAcc(),
      //     transaction_type: "PURCHASE",
      //     program_name: "campaign name",
      //     base_currency: link_loyalty_detail.base_currency,
      //     tender: handleTander3(),
      //   })
      // );
    }
  }, [handle_saveTransaction_data]);

  // useEffect(() => {
  //   dispatch(handleCategoriesRequest());
  // }, []);

  // const findtLoyaltyTender = () => {
  //   if (optionTick?.length > 0) {
  //     const obj = {};
  //     optionTick.map((item) => {
  //       obj[item.name] = item.amount;
  //     });
  //     return obj;
  //     // setSendValues(obj)
  //   }
  //   return {};
  // };

  const cartDataAcc = () => {
    if (cartData?.length > 0) {
      let arr = [];
      cartData.map((item) => {
        console.log("ITEM", item);

        arr.push({
          product_name: item.category,
          product_quantity: item.productQty,
          product_amount: item.price,
          product_non_sale_amount: item.discount == 0 ? item.price : "",
          product_sale_amount:
            item.discount > 0 ? item.price - item.discount : "",
          product_discount_amount: Number(
            item.discount > 0 ? item.discount : 0
          ),
          qr_sale_flag: true,
        });
      });
      return arr;
      // setSendValues(obj)
    }
    return [];
  };

  // cartDataAcc();

  useEffect(() => {
    setShow(show_cart_modal);
  }, [show_cart_modal]);

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
  }, [optionTickSum, invoiceValue, discountPercentVal, invoiceValue]);

  useEffect(() => {
    // if (totalDiscountVal) {
    //   setInvoiceValue(parseFloat(sumValue - totalDiscountVal).toFixed(2));
    // } else {
    // }
    setInvoiceValue(parseFloat(sumValue).toFixed(2));
  }, [sumValue, totalDiscountVal]);

  useEffect(() => {
    if (get_recommended_items && get_recommended_items?.data) {
      if (get_recommended_items?.data?.length > 0) {
        const t1 = JSON.parse(JSON.stringify(get_recommended_items?.data));
        t1.map((item) => {
          item["new_price"] = item.price;
        });
        setRecommendedData(t1);
      }
    }
  }, [get_recommended_items]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  useEffect(() => {
    console.log("cartData", cartData);
    const arr = [];
    let sum = 0;
    cartData?.map((el) => {
      // const totalCart = Number(el.price) * Number(el.productQty);
      // arr.push(totalCart);
      // const r =  el.new_price* el.productQty
      arr.push(el.new_price);
    });
    arr?.map((el) => {
      sum = sum + el;
    });
    console.log("SUM", sum);
    // setBalanceDue(sum);
    setSumValue(sum);
    setAmount(sum);

    // =============================
  }, [cartData]);

  useEffect(() => {
    if (get_QR_img) {
      setQR(get_QR_img);
    }
  }, [get_QR_img]);

  // useEffect(() => {
  //   if (cart_data) {
  //     if (cart_data?.length > 0) {
  //       const t1 = JSON.parse(JSON.stringify(cart_data));
  // t1.map((item) => {
  //   item["discount_menu_is_open"] = false;
  //   item["discount_value"] = "";
  //   item["amount_value"] = "";
  //   item["new_price"] = Number(item.price) * Number(item.productQty);
  //   item["zero_price"] = Number(item.price) * Number(item.productQty);
  // });
  //       setCartData(t1);
  //     }
  //  else {
  //   setCartData([]);
  //   setTotalDiscountVal(0);
  // }
  // }
  // }, [cart_data]);
  const optionArray = [
    {
      id: 1,
      name: "Cash",
      icon: <IoCashOutline size={25} />,
      value: "cash",
      isActive: false,
    },
    {
      id: 2,
      name: "Paytm",
      icon: <SiPaytm size={25} />,
      value: "paytm",
      isActive: false,
    },
    {
      id: 3,
      name: "Google Pay",
      icon: <FaGooglePay size={25} color="white" />,
      value: "googlepay",
      isActive: false,
    },
    {
      id: 4,
      name: "Phone Pay",
      icon: <SiPhonepe size={25} color="white" />,
      value: "phonepay",
      isActive: false,
    },
    {
      id: 5,
      name: "UPI",
      icon: <SiContactlesspayment size={25} color="white" />,
      value: "upi",
      isActive: false,
    },
    {
      id: 6,
      name: "Card",
      icon: <BsCreditCardFill size={25} />,
      value: "card",
      isActive: false,
    },
    {
      id: 7,
      name: "Credit Sale",
      icon: <FcSalesPerformance size={25} />,
      value: "credit_sale",
      isActive: false,
    },

    {
      id: 8,
      name: "Loyalty",
      cardValue: link_loyalty_detail.balance_amount,
      icon: link_loyalty_detail.balance_amount,
      value: "loyalty",
      isActive: link_loyalty_detail.balance_amount > 0 ? false : true,
    },
  ];
  console.log("RECOMMENDED", recommendedData);
  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 1000);
    };
  };

  const handleVoiceSearch = (value) => {
    dispatch(handleSearchedDataRequest({ searchValue: value }));
  };

  const optimizedVoicefn = useCallback(debounce(handleVoiceSearch), []);

  useEffect(() => {
    if (get_searched_data && get_searched_data?.data) {
      if (get_searched_data?.data?.length > 0) {
        const t1 = JSON.parse(JSON.stringify(get_searched_data?.data));
        t1.map((item) => {
          item["new_price"] = item.price;
        });
        setSearchedData(t1);
      }
    }
  }, [get_searched_data]);

  // console.log(searchedData);
  const handleSearch = (value) => {
    dispatch(handleSearchedDataRequest({ searchValue: value }));
  };

  const optimizedFn = useCallback(debounce(handleSearch), []);

  useEffect(() => {
    if (searchValue) {
      optimizedFn(searchValue);
    }
  }, [searchValue]);

  let recognition = null;
  try {
    recognition = window.recognition;
    recognition.addEventListener("result", (e) => {
      const transcript = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");

      // document.getElementById("p").innerHTML = transcript;
      setSearchValue(transcript);
    });
  } catch (err) {
    console.log(err);
  }

  const handleVoiceCommand = () => {
    try {
      recognition.start();
    } catch (err) {
      console.log("err", err);
    }
    // setVisibleVoiceCommand((state) => !state);
    // SpeechRecognition.startListening({ language: "en-IN" });
  };

  const handleSelect = (e) => {
    // console.log(e.target.value);
  };

  useEffect(() => {
    // console.log("optionTick", optionTick);
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

  const handleToQR = () => {
    if (balanceDue === 0) {
      setHandleShowReceipt(true);
    } else {
      success("Pay Due Amount!");
    }
  };

  const handleWhatsSubmit = (event) => {
    event.preventDefault();
    success("Invoice Sent To Your WhatsApp!");
    // alert("Form Sumbited!");
    // window.location.reload();
  };
  console.log(searchedData);
  console.log(searchValue);

  console.log(recommendedData);

  
  console.log(searchValue);

  const handleTenderAmount = () => {
    if (optionTick?.length > 0) {
      const obj = {};
      optionTick.map((item) => {
        obj[item.name] = item.amount;
      });
      return obj;
      // setSendValues(obj)
    }
    return {};
  };

  const handleTander2 = () => {
    if (optionTick?.length > 0) {
      const obj = {};
      optionTick.map((item) => {
        // obj[item.name] = item.amount;
        obj["tender_name"] = item.name.toLowerCase();
        obj["tender_value"] = Number(item.amount);
      });
      return obj;
      // setSendValues(obj)
    }
    return {};
  };
  const handleTander3 = () => {
    if (optionTick?.length > 0) {
      const arr = [];
      optionTick.map((item) => {
        arr.push({
          tender_name: item.name.toLowerCase(),
          tender_value: Number(item.amount),
        });
        // obj["tender_name"] = item.name.toLowerCase();
        // obj["tender_value"] = Number(item.amount);
      });
      return arr;
      // setSendValues(obj)
    }
    return [];
  };

  const handleNotifyEmail = (e) => {
    e.preventDefault();
    if (email) {
      dispatch(
        handleEmailNotificationResponse({
          to: email,
          receiptFileName:
            handle_saveTransaction_data &&
            handle_saveTransaction_data.pdf_file_name,
        })
      );
    }
    setEmail("");
  };
  const handleWhatsApp = (e) => {
    e.preventDefault();
    console.log("handleWhatsApp", e);
    // if (whatsApp) {
    dispatch(
      handlewhatsAppRequest({
        to: whatsApp,
        url:
          handle_saveTransaction_data &&
          handle_saveTransaction_data.pdf_file_name,
      })
    );
    setWhatsApp("");
    // }
    setEmail("");
  };

  console.log("HOME CARTDATA", cartData);

  // console.log("DISCOUNT AMOUNT", discountAmountVal);
  // console.log("OPTION TICK", optionTick);
  console.log("TENDER 3", handleTander3());

  // console.log("HANDLE TENDER", handleTenderAmount());
  const customerTab = [
    {
      id: 1,
      label: "Home",
      value: "home",
      icon: <AiFillHome color="#D64046" opacity={0.6} size="25" />,
      isActive: true,
    },
    {
      id: 2,
      label: "Order",
      value: "order",
      icon: <BiBox color="#D64046" size="25" />,
      isActive: true,
    },
    {
      id: 4,
      label: "Cart",
      value: "cart",
      icon: <BiCart color="#D64046" size="25" />,
      isActive: true,
    },
    {
      id: 5,
      label: "Profile",
      value: "profile",
      icon: <BiGroup color="#D64046" size="25" />,
      isActive: true,
    },
  ];
  const handleUserCheck = () => {
    if (userType === "CUSTOMER") {
      return (
        <div
          className="d-flex flex-row"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          {customerTab
            .filter((io) => io.isActive === true)
            .map((item) => {
              return (
                <>
                  <div
                    style={{
                      display: "flex",
                      // justifyContent: "space-between",
                      alignItems: "center",
                      flexDirection: "column",
                      // margin: "10px",
                      // marginBottom: "20px",
                      cursor: "pointer",
                      color: "#3d2b2b",
                    }}
                    onClick={() => {
                      if (item.value === "home") {
                        navigate("/home");
                      } else if (item.value === "order") {
                        setShowVierCustomerOrderModal((state) => !state);
                      } else if (item.value === "cart") {
                        dispatch(
                          handleShowModal({ bagModalIsOpne: !show_cart_modal })
                        );
                      } else if (item.value === "profile") {
                      }
                    }}>
                    <div>{item.icon}</div>
                    <div style={{ color: "#D64046" }}>{item.label}</div>
                  </div>
                </>
              );
            })}
        </div>
      );
    }
  };

  const handleSMS = (event) => {
    event.preventDefault();
    dispatch(
      handelSMSRequest({
        number: sms,
        pdf:
          handle_saveTransaction_data &&
          handle_saveTransaction_data.pdf_file_name,
      })
    );
    setSms("");
  };
  //----------------------------------------------------
  const addToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem("my-cart")) || [];
    console.log('cart ddddd', cart)
    console.log('sssssss', item)
    const existingItem = cart.find(
      (cartItem) => cartItem.item_id === item.item_id
    );

    if (existingItem) {
      existingItem.productQty += 1;

    } else {
      const newItem = { ...item, productQty: 1 };
      cart.push(newItem);

    }

    localStorage.setItem("my-cart", JSON.stringify(cart));

    dispatch(handlecartCount(cart.length));

    // setUpdatecart(!updatecart);
    // setSearchValue("");
  };

  const { catname } = useParams();


  const [filterdetails, setFilterdetails] = useState([]);
  const [category2, setCategory2] = useState([])
  



  // const { storeId, saasId, userName } = JSON.parse(
  //   localStorage.getItem("User_data")
  // );

  useEffect(() => {
    axios.get(`${BASE_Url}/search/get-result/${storeId}/${saasId}/${catname}`)
      .then((res) => setFilterdetails(res.data.data));
    axios
      .get(`${BASE_Url}/category/get-list/${saasId}/${storeId}`)
      .then((res) => setCategory2(res.data.data));

  }, []);




  const filterres = category2.filter((ele) => ele.category_name == catname)

  console.log(filterres)

  return (
    <div className="app">
        <div className="d-flex align-items-center justify-content-center  mt-3">

{
  filterres[0] &&
  <Card style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0,)', borderRadius: '10px', width: '20rem' }} className="cardCategory ">
    <div className="d-flex align-items-center justify-content-center">
      <Image src={filterres[0].image_path} roundedCircle style={{ width: "100px", height: '100px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.' }} className="m-1" />
      <h1 className="text-center">{filterres[0].category_name}</h1>
    </div>
  </Card>
}

</div>


<div >
<div className="d-flex align-items-center justify-content-center mt-2 ">
  <Container>
    <Row xs={2} sm={4} md={4}>
      {filterdetails.map((ele) => {
        return (
          <Col className="mt-5">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Card style={{ borderRadius: "10px", width: "12rem", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", }}
                className="cardCategory">
                <Card.Img src={"https://pos.photonsoftwares.com/prod/api/v1/item/get-image/7044"}></Card.Img>
                <div>
                  <div className="text-center">
                    <Card.Body>
                      <h6>{ele.description}</h6>
                      <p><span >₹</span>{' '}100</p>
                      <Button variant="warning" onClick={() => addToCart(ele)} >Add to cart</Button>
                    </Card.Body>
                  </div>

                </div>
              </Card>
            </div>
          </Col>
        );
      })}
    </Row>
  </Container>
</div>
</div>
         
     
     
     
     
     
     
     
     
     
     
     
     
     
     {/* carddata */}
      <div
        style={{
          position: "absolute",
          bottom: "0",
          backgroundColor: "#fff",
          width: "100%",
          height: "50px",
          borderRadius: "5px",
        }}>
        {/* {cart_data && ( */}
        <div
          style={{
            paddingLeft: "20px",
            paddingRight: "20px",
            display: "flex",
            width: "100%",
            alignItems: "center",
            // justifyContent: "space-around",
            color: "#fff",
          }}>
          <div
            style={{
              color: "#eee",
              fontWeight: "bolder",
              color: "#8f0707",
              // display: "flex",
              // alignItems: "center",
              // justifyContent: "space-between",
              width: "100%",
            }}>
            {link_loyalty_detail && link_loyalty_detail.customer_name ? (
              <div
                className="d-flex flex-row text-center"
                style={{ width: "100%" }}>
                <p style={{ padding: 0, margin: 0, marginRight: "30px" }}>
                  Cutomer Name
                </p>
                <p style={{ padding: 0, margin: 0 }}>
                  {link_loyalty_detail.customer_name}
                </p>
              </div>
            ) : (
              // ""
              handleUserCheck()
            )}
          </div>
          <div
            style={{
              fontWeight: "lighter",
              color: "#fff",
              position: "relative",
              cursor: "pointer",
            }}>
            <div style={{ margin: "5px 0px" }}>
              {/* <BsHandbag color="#000" fontSize={30} opacity={0.8} /> */}
            </div>
            <h6
              style={{
                fontSize: "15px",
                padding: 0,
                margin: 0,
                position: "absolute",
                color: "red",
                right: "11px",
                top: "16px",
              }}>
              {/* {cartData?.length} */}
            </h6>
          </div>
          <h2
            style={{
              padding: 0,
              margin: 0,
              fontWeight: "400",
              color: "#000",
              textDecoration: "none",
              fontSize: "20px",
              cursor: "pointer",
            }}
            // onClick={() => {
            //   if (cartData && cartData?.length > 0) {
            //     setShow(true);
            //   } else {
            //     .error("Please add atleast one item in cart");
            //   }
            // }}
          >
            {/* View Cart <BsArrowRight /> */}
          </h2>
        </div>
        {/* )} */}
      </div>
      {/* MY CART */}
      {show === true && (
        <MyCart
          show={show}
          cartData={cartData}
          setInvoiceValue={setInvoiceValue}
          invoiceValue={invoiceValue}
          popoverIsOpen={popoverIsOpen}
          setPopoverIsOpen={setPopoverIsOpen}
          discountAmountVal={discountAmountVal}
          discountPercentVal={discountPercentVal}
          setDiscountPercentVal={setDiscountPercentVal}
          totalDiscountVal={totalDiscountVal}
          setShow={setShow}
          setPaymentModal={setPaymentModal}
          setCartData={setCartData}
          sumValue={sumValue}
          setSumValue={setSumValue}
          setTotalDiscountVal={setTotalDiscountVal}
          setDiscountAmountVal={setDiscountAmountVal}
          totalSum={totalSum}
          setTotalSum={setTotalSum}
        />
      )}

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        // id="contained-modal-title-vcenter"
        show={paymentModal}
        // style={{ position: "relative" }}
      >
        <Modal.Body>
          <div className="main-container">
            <div
              className="main-container1"
              style={{
                backgroundColor: "#f8f8f8",
              }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <div>
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: 700,
                      textAlign: "center",
                    }}>
                    Total Invoice Value: {totalSum}
                  </div>
                  <div className="mt-2">
                    <input
                      type="number"
                      className="input-style"
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (!val) {
                          setAmount("");
                        } else {
                          if (val <= balanceDue) {
                            setAmount(val);
                          } else {
                            setAmount(balanceDue);
                          }
                        }
                      }}
                      // disabled={optionTick?.length > 0}
                      disabled={Number(optionTickSum) === Number(sumValue)}
                      value={!balanceDue ? "0" : totalSum}
                      required={true}
                      placeholder="Enter Amount"
                    />
                  </div>
                </div>
              </div>
              <div
                style={{
                  maxWidth: "100%",
                  display: "flex",
                  marginRight: "26px",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <div className="option-item-container">
                  {optionArray
                    .filter((el) => el.isActive === false)
                    .map((item, i) => {
                      return (
                        <>
                          <div className="mb-2 d-flex px-0" key={item.id}>
                            <div
                              onClick={() => {
                                if (optionTick?.length === 0) {
                                  const obj = { ...item, amount };
                                  setOptionTick([...optionTick, obj]);
                                } else if (optionTick?.length > 0) {
                                  if (
                                    optionTick.filter(
                                      (io) => io.value === item.value
                                    )?.length > 0
                                  ) {
                                    setOptionTick(
                                      optionTick.filter(
                                        (io) => io.value !== item.value
                                      )
                                    );
                                  } else {
                                    if (Number(optionTickSum) <= sumValue) {
                                      const obj = { ...item, amount };
                                      setOptionTick([...optionTick, obj]);
                                    }
                                  }
                                }
                                console.log(item);
                                if (item.value === "loyalty") {
                                  setcheckLoyalty(true);
                                  let newLoyaltyAmount = loyaltyAmount;
                                  if (loyaltyAmount > amount) {
                                    newLoyaltyAmount = amount;
                                  }
                                  if (optionTick?.length === 0) {
                                    const obj = {
                                      ...item,
                                      amount: newLoyaltyAmount,
                                    };
                                    setOptionTick([...optionTick, obj]);
                                  } else if (optionTick?.length > 0) {
                                    if (
                                      optionTick.filter(
                                        (io) => io.value === item.value
                                      )?.length > 0
                                    ) {
                                      setOptionTick(
                                        optionTick.filter(
                                          (io) => io.value !== item.value
                                        )
                                      );
                                    } else {
                                      if (Number(optionTickSum) <= sumValue) {
                                        const obj = {
                                          ...item,
                                          amount: newLoyaltyAmount,
                                        };
                                        setOptionTick([...optionTick, obj]);
                                      }
                                    }
                                  }
                                }
                              }}
                              className={`option-item ${
                                optionTick.filter(
                                  (io) => io.name === item.value
                                )?.length > 0 && ""
                              }`}
                              style={{
                                width: "90%",
                                backgroundColor:
                                  item.name === "Cash"
                                    ? "#fed813"
                                    : item.name === "Paytm"
                                    ? "#00B9F1"
                                    : item.name === "Google Pay"
                                    ? "#2DA94F"
                                    : item.name === "Phone Pay"
                                    ? "#5f259f"
                                    : item.name === "UPI"
                                    ? "#ff7909"
                                    : item.name === "Credit Sale"
                                    ? "#1741b2"
                                    : item.name === "Loyalty"
                                    ? "#c8030e"
                                    : "silver",
                              }}>
                              <div style={{ position: "relative", top: "2px" }}>
                                {item.icon}
                              </div>
                              <div
                                style={{
                                  fontSize: "10px",
                                  color:
                                    item.name === "Cash"
                                      ? "black"
                                      : item.name === "Paytm"
                                      ? "black"
                                      : item.name === "Google Pay"
                                      ? "white"
                                      : item.name === "Phone Pay"
                                      ? "white"
                                      : item.name === "UPI"
                                      ? "white"
                                      : item.name === "Credit Sale"
                                      ? "#fff"
                                      : item.name === "Loyalty"
                                      ? "#fff"
                                      : "black",
                                }}>
                                {item.name}
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <div className="calculated_amount-container">
                  {optionTick && optionTick?.length > 0 && (
                    <>
                      {optionTick.map((item) => {
                        return (
                          <>
                            <div style={{ fontSize: "20px" }}>
                              {item.name} - {totalSum}
                            </div>
                          </>
                        );
                      })}
                    </>
                  )}
                </div>
              </div>

              <div className="due-blnce-container">
                Balance Due = {balanceDue}
              </div>

              <div className="btn-container">
                <button
                  type="submit"
                  className="btn-style"
                  onClick={() => {
                    const date = new Date();

                    let day = date.getDate();
                    let month = date.getMonth() + 1;
                    let year = date.getFullYear();

                    handleToQR();

                    dispatch(
                      handleSaveTransactionRequest({
                        registerId: userData && userData.registerId,
                        storeId: userData && userData.storeId,
                        saasId: userData && userData.saasId,
                        tenderId: "TENDER1",
                        tender: handleTenderAmount(),
                        cartItems: cartData,
                        customer_id:
                          search_customer_data && search_customer_data.id,
                        loyalty_id:
                          link_loyalty_detail && link_loyalty_detail.loyalty_id,
                      })
                    );
                    dispatch(
                      handleAccruvalRequest({
                        link_loyalty_detail,
                        client_id: userData && userData.saasId,
                        source_channel: "POS",
                        register_id: userData && userData.registerId,
                        total_invoice_amount: Number(invoiceValue),
                        store_id: Number(userData && userData.storeId),
                        business_date: `${year}-${
                          month < 10 ? "0" + month : month
                        }-${day < 10 ? "0" + day : day}`,
                        invoice_no:
                          handle_saveTransaction_data.transaction_id + "",
                        source_app: "POS",
                        concept_code: Number(1),
                        source_function: "POST",
                        country: link_loyalty_detail.country?.toUpperCase(),
                        reference_number:
                          handle_saveTransaction_data.transaction_id + "",
                        territory_code: "INR",
                        remarks: "GOOD",
                        product: cartDataAcc(),
                        transaction_type: "PURCHASE",
                        program_name: "campaign name",
                        base_currency: link_loyalty_detail.base_currency,
                        tender: handleTander3(),
                      })
                    );
                    // dispatch(
                    //   handleAccruvalRequest({
                    //     client_id: userData && userData.saasId,
                    //     source_channel: "POS",
                    //     register_id: "2002",
                    //     total_invoice_amount: balanceDue,
                    //     store_id: userData && userData.storeId,
                    //     business_date: "2023-04-05",
                    //     invoice_no: "8487021",
                    //     source_app: "POS",
                    //     concept_code: 1,
                    //     source_function: "POST",
                    //     country: loyalty_data && loyalty_data.data.country,
                    //     reference_number: "8487021",
                    //     territory_code:
                    //       loyalty_data && loyalty_data.data.country,
                    //     remarks: "GOOD",
                    //     product: cartData,
                    //     transaction_type: "PURCHASE",
                    //     program_name: "campaign name",
                    //     base_currency: loyalty_data.data.base_currency,
                    //     tender: handleTenderAmount(),
                    //     //  [
                    //     //   {
                    //     //     tender_name: "check",
                    //     //     tender_value: 300,
                    //     //   },
                    //     //   {
                    //     //     tender_name: "cash",
                    //     //     tender_value: 300,
                    //     //   },
                    //     // ],
                    //   })
                    // );
                  }}>
                  Receipts
                </button>
                <Button
                  onClick={() => setPaymentModal(false)}
                  style={{
                    backgroundColor: "#20b9e3",
                    fontSize: "20px",
                    marginLeft: "20px",
                    padding: "10px 20px",
                    outline: "none",
                    border: "none",
                    fontSize: "20px",
                  }}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      {/* PDF RECEiPT*/}
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={handleShowReceipt}
        style={{ height: "100%" }}>
        <Modal.Header>
          <Modal.Title>Your Receipt! </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ height: "300px", width: "100%", margin: "auto" }}>
            {defaultPdfFile && (
              <>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                  <Viewer
                    fileUrl={`${BASE_Url}/transaction/pdf/${
                      handle_saveTransaction_data &&
                      handle_saveTransaction_data.pdf_file_name
                    }`}
                    plugins={[defaultLayoutPluginInstance]}
                  />
                </Worker>
              </>
            )}
          </div>
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-evenly",
                marginTop: "20px",
              }}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}>
                <div
                // style={{ flex: 1 }}
                >
                  <Button
                    variant="outline-success"
                    size="lg"
                    // onClick={() => setHandleOpenWhatsapp(true)}
                    onClick={() => {
                      setWhatsAppOpen((state) => !state);
                      setSmsOpen(false);
                      setEmailOpen(false);
                    }}>
                    WhatsApp <IoLogoWhatsapp size={25} />
                  </Button>
                </div>
                <div
                //  style={{ flex: 1 }}
                >
                  <Button
                    variant="outline-success"
                    size="lg"
                    // onClick={() => setHandleOpenWhatsapp(true)}
                    onClick={() => {
                      setEmailOpen((state) => !state);
                      setWhatsAppOpen(false);
                      setSmsOpen(false);
                    }}>
                    Email <AiOutlineMail size={25} />
                  </Button>
                </div>
                <div
                // style={{ flex: 1 }}
                >
                  <Button
                    variant="outline-success"
                    size="lg"
                    onClick={() => {
                      setSmsOpen((state) => !state);
                      setEmailOpen(false);
                      setWhatsAppOpen(false);
                    }}>
                    SMS <FcSms size={25} />
                  </Button>
                </div>
              </div>
              {emailOpen ? (
                <form
                  onSubmit={handleNotifyEmail}
                  className="d-flex flex-row align-items-center"
                  style={{ width: "50%" }}>
                  <TextField
                    type="email"
                    className="form-control my-2"
                    id="customer-name"
                    required
                    size="small"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="mx-2">
                    <button type="submit" className="btn btn-primary">
                      Send
                    </button>
                  </div>
                </form>
              ) : (
                ""
              )}
              {WhatsAppOpen ? (
                <form
                  onSubmit={handleWhatsApp}
                  className="d-flex flex-row align-items-center"
                  style={{ width: "50%" }}>
                  <TextField
                    type="number"
                    className="form-control my-2"
                    id="customer-name"
                    required
                    onWheel={(e) => e.target.blur()}
                    size="small"
                    label="WhatsApp"
                    value={whatsApp}
                    onChange={(e) => setWhatsApp(e.target.value)}
                  />
                  <div className="mx-2">
                    <button type="submit" className="btn btn-primary">
                      Send
                    </button>
                  </div>
                </form>
              ) : (
                ""
              )}
              {smsOpen ? (
                <form
                  onSubmit={handleSMS}
                  className="d-flex flex-row align-items-center"
                  style={{ width: "50%" }}>
                  <TextField
                    type="text"
                    className="form-control my-2"
                    id="customer-name"
                    required
                    size="small"
                    label="SMS"
                    value={sms}
                    onChange={(e) => setSms(e.target.value)}
                  />
                  <div className="mx-2">
                    <button type="submit" className="btn btn-primary">
                      Send
                    </button>
                  </div>
                </form>
              ) : (
                ""
              )}
              <Button
                //  variant="secondary"
                style={{
                  backgroundColor: "#20b9e3",
                  outline: "none",
                  border: "none",
                  fontSize: "20px",
                  marginTop: "20px",
                }}
                onClick={() => {
                  setHandleShowReceipt(false);
                  setPaymentModal(false);
                  // setShow(false);
                  // dispatch(handleEmptyCartItem());
                  setCartData([]);
                  setAmount(0);
                  // setSumValue(0);
                  setSearchValue("");
                  dispatch(
                    handleShowModal({ bagModalIsOpne: !show_cart_modal })
                  );
                  localStorage.removeItem("my-cart");
                  setTimeout(() => {
                    window.location.reload();
                  }, 500);
                }}>
                Close
              </Button>
              <div
                style={{
                  // height: "100px",
                  // width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // marginTop: "20px",
                  marginBottom: "20px",
                }}>
                <img
                  src={`${BASE_Url}/transaction/pdf-qr/${
                    handle_saveTransaction_data &&
                    handle_saveTransaction_data.qr_file_name
                  }`}
                  alt=""
                  style={{ height: "100%", width: "80%" }}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      {/* QR */}
      {/* WhatsApp */}
      <ViewOrdersCustomer
        showVierCustomerOrderModal={showVierCustomerOrderModal}
        setShowVierCustomerOrderModal={setShowVierCustomerOrderModal}
      />
    </div>
  );
};

export default DataByCategory;
