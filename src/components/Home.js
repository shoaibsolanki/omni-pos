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
import {
  AiFillDollarCircle,
  AiOutlineArrowLeft,
  AiOutlineMail,
  AiOutlineSearch,
} from "react-icons/ai";
import { BsCreditCardFill } from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io";
import { FcSms } from "react-icons/fc";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";

import qrData from "../assets/QR.jpeg";
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
  handleViewOrderByCustomerRequest,
  handlecartCount
} from "../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { Button } from "react-bootstrap";
import pdfFile from "../assets/PDF.pdf";

//assets\PDF.pdf
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import { BASE_Url } from "../URL";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";

import MyCart from "./my-cart/MyCart";
import { HiCreditCard } from "react-icons/hi2";
import { RiH1, RiMoneyDollarCircleFill } from "react-icons/ri";
import { AiFillHome } from "react-icons/ai";
import { BiBox, BiCart, BiCube, BiGroup } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import ViewOrders from "./PendingOrders";
//import { Category, WhatsApp } from "@material-ui/icons";
import Category from "../components/Category/Category";
import ViewOrdersCustomer from "./PendingOrders/ViewOrdersCustomer";
import PaginationComponent from "../PaginationComponent";
import Swal from "sweetalert2";

const Home = () => {
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
  // const checkCustomer = userName.includes("C");

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
    cart_data,
    show_cart_modal,
    get_all_catrgory_data,
    show_viewOrder_modal,
    page_number,
    up_next

  } = useSelector((e) => e.ComponentPropsManagement);
  // console.log("GSD", get_searched_data);

  // useEffect(() => {
  //   console.log("xyz_State", xyz_State);
  // }, []);
 console.log("home page 😁😁😁", up_next)
  console.log("cart_data", cart_data);

  // useEffect(() => {
  //   dispatch(handleXYZRequest({}));
  // }, []);

  useEffect(() => {
    dispatch(handleRecommendedDataRequest(page_number));
  }, [page_number]);

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
  const [error, setErrorMsg] = useState("");
  const [showVierCustomerOrderModal, setShowVierCustomerOrderModal] =
    useState(false);
  const [qrData, setQrData] = useState(null);
  const [loyaltyAmount, setLoyaltyAmount] = useState(
    link_loyalty_detail?.balance_amount
  );
  const [viewOrderModalIsOpen, setViewOrderModalIsOpen] = useState(false);

  console.log("recommended DATA", recommendedData);
  const t1 = JSON.parse(localStorage.getItem("my-cart"));

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
  const { product_count } = useSelector(
    (e) => e.ComponentPropsManagement
  );

  useEffect(() => {
    // console.log("paymentmethod",t1)
 if(product_count==0)
 {
  setCartData([]);
 }
    
  }, [product_count]);
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
  
      } else {
   
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

  console.log("HOME RECOMMENDED", get_recommended_items.data);
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
    dispatch(handleSearchedDataRequest({ searchValue: value,setSearchValue }));
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
    console.log("Selected amount",sum)
    setOptionTickSum(sum);
  }, [optionTick]);

  const handleToQR = () => {
    if (balanceDue === 0) {
      setHandleShowReceipt(true);
    } else {
      setErrorMsg("Please Select A Valid Payment Method");
    }
  };

  const handleWhatsSubmit = (event) => {
    event.preventDefault();
    // success("Invoice Sent To Your WhatsApp!");
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
          <PaginationComponent
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
          <PaginationComponent
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
    console.log("this is option",optionTick)
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

  console.log("HANDLE TENDER", handleTenderAmount());
  const checkSaasID =(saasId =='3')
  const customerTab = [
    {
      id: 1,
      label: "Home",
      value: "home",
      icon: <AiFillHome color="blue" size="22" />,
      isActive: true,
    },
    {
      id: 2,
      label: "Order",
      value: "order",
      icon: <BiBox  size="22" />,
      isActive: true,
    },
    {
      id: 4,
      label: "Cart",
      value: "cart",
      icon: <BiCart  size="22" />,
      isActive: true,
    },
    {
      id: 4,
      label: "RFL",
      value: "Request For Loan",
      icon: <AiFillDollarCircle  size="22" />,
      isActive: checkSaasID,
    },
    {
      id: 5,
      label: "Profile",
      value: "profile",
      icon: <BiGroup  size="22" />,
      isActive: true,
    },
  ];
  const handleUserCheck = () => {
    if (userType === "CUSTOMER") {
      return (
        <div
        className="container"
          style={{
            maxWidth: "800px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="container"
            style={{
              boxShadow: '0 2px 12px rgba(36, 36, 39, 0.12)',
              borderRadius: '0.75rem',
              background:"white",
              fontFamily: "DM sans-serif",
              fontSize: "1.125rem",
              border: "0 2px 12px rgba(36, 36, 39, .12)",
              padding:"5px",
              position: "fixed",
              bottom: 0,
              zIndex: 88,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              width: "100%",
              marginBottom:"px"
            }}
          >
            {customerTab
              .filter((io) => io.isActive === true)
              .map((item) => {
                return (
                  <>
                    <div
                      style={{
                        display: "flex",
                        zIndex: 99,
                        // width: "100%",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "column",
                        // margin: "10px",
                        // marginBottom: "20px",
                        cursor: "pointer",
                        color: "black",
                      }}
                      onClick={() => {
                        if (item.value === "home") {
                          navigate("/home");
                        } else if (item.value === "order") {
                          dispatch(handleViewOrderByCustomerRequest({ saasId, userName }));
                          setShowVierCustomerOrderModal((state) => !state);
                        } else if (item.value === "cart") {
                          dispatch(
                            handleShowModal({
                              bagModalIsOpne: !show_cart_modal,
                            })
                          );
                        } else if (item.value === "profile") {
                          navigate("/profile");
                        }else if(item.value === "Request For Loan"){
                          navigate("/PayFileCharges");
                        }
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "blue"; // Set hover color to blue
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "black"; // Reset to default color on mouse leave
                      }}
                    >
                      <div>{item.icon}</div>
                      <div style={{ color: "black" }}>{item.label}</div>
                    </div>
                  </>
                );
              })}
          </div>
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

  return (
    <div className="app">

      <div
        style={{
          // position: "sticky",
          // top: 0,
          width: "",
          // height: "85px",
          backgroundColor: "#fff",
        }}
      >
        <div
          className="d-flex flex-row align-items-center justify-content-center mt-3"
          style={{ display: "flex", flexDirection: "column" }}
        >
          {/* <IoIosSearch size={30} opacity={0.4} /> */}
          {/* {userType == "RETAILER"&&<button style={{backgroundColor:"#ffc107"}} type="button" onClick={() => navigate("/")} class="btn d-flex flex-row align-items-center justify-content-center mx-1"><i class="fa-solid fa-circle-left"></i>Back</button>} */}
         <div class="form-group has-search w-50">
    <span class="fa fa-search form-control-feedback"></span>
    <input type="text" class="form-control"
    value={searchValue}
      onChange={(e) => {
              const val = e.target.value;
              // optimizedFn(val)
              setSearchValue(val);
            }} placeholder="Search"/>
  </div>
          {/* // <div style={{ width: "100%" }}>{transcript}</div> */}
          {/* )} */}
          {/* <div style={{ height: "200px", width: "200px" }}>
            <QrReader
              onResult={(result, error) => {
                if (!!result) {
                  setQrData(result?.text);
                }

                if (!!error) {
                  console.info(error);
                }
              }}
              style={{ width: "100%", height: "200px" }}
            />
            <p>{qrData}</p>
          </div> */}
          <FcSpeaker
            size={30}
            opacity={0.9}
            // onClick={() => setSpechModal(true)}
            onClick={handleVoiceCommand}
          // onClick={() => {
          //   setVisibleVoiceCommand(true);
          //   startListening;
          // }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            // marginTop: "10px",
            justifyContent: "center",
          }}
        >
        
        </div>
      </div>
     

      <ul
        style={{
          paddingLeft: "20px",
          paddingRight: "20px",
          overflowY: "hidden",
          Height: "auto",
          // paddingBottom: "20px",
        }}
      >
        <div>
          {!searchValue ? (
            <div style={{ position: "relative", zIndex: 1 }}>
              <Category
                style={{ zIndex: 2 }}
                setSearchValue={setSearchValue}
                setData={setSearchedData}
                cartData={cartData}
                setCartData={setCartData}
                data={searchedData}
                setUpdatecart={setUpdatecart}
                updatecart={updatecart}
                searchValue={searchValue}
                handleVoiceCommand={handleVoiceCommand}
              />
              <hr />
              <RenderUi />
            </div>
          ) : (
            <div>
              
              <Category
                style={{ zIndex: 2 }}
                setSearchValue={setSearchValue}
                setData={setSearchedData}
                cartData={cartData}
                setCartData={setCartData}
                data={searchedData}
                setUpdatecart={setUpdatecart}
                updatecart={updatecart}
                searchValue={searchValue}
                handleVoiceCommand={handleVoiceCommand}
              />
              <hr />
              <RenderUi />
            </div>
          )}
        </div>
        {/* {xyz_State && xyz_State.length > 0
          ? xyz_State.map((el) => <h1>{el.customer_party}</h1>)
          : ""} */}
        {/* <Category /> */}
        {/* <RenderUi /> */}
        {/* {searchedData && searchValue?.length > 0
          ? searchedData.map((item, index) => (
              <Product item={item} key={index} />
            ))
          : recommendedData &&
            recommendedData?.length > 0 &&
            recommendedData.map((item, index) => (
              <>
                <Product item={item} key={index} />
              </>
            ))} */}
      </ul>
      <div
        style={{
          // position: "absolute",
          bottom: "0",
          backgroundColor: "#fff",
          width: "100%",
          height: "50px",
          borderRadius: "5px",
        }}
      >
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
          }}
        >
          <div
            style={{
              color: "#eee",
              fontWeight: "bolder",
              color: "#8f0707",
              // display: "flex",
              // alignItems: "center",
              // justifyContent: "space-between",
              width: "100%",
            }}
          >
            {link_loyalty_detail && link_loyalty_detail.customer_name ? (
              <div
                className="d-flex flex-row text-center"
                style={{ width: "100%" }}
              >
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
            }}
          >
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
              }}
            >
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
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: 700,
                      textAlign: "center",
                    }}
                  >
                    Total Invoice Value: {Math.round(totalSum)}
                  </div>
                  <div className="mt-2">
                    <input
                      type="number"
                      className="input-style"
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (!val) {
                          console.log("this console", val)
                          setAmount("");
                        } else {
                          console.log("this else console", val)
                          if (val <= balanceDue) {
                            console.log("this else if console", val)
                            setAmount(val);
                          } else {
                            setAmount(balanceDue);
                            console.log("this else else console", balanceDue)
                          }
                        }
                      }}
                      disabled={balanceDue==0}
                      // disabled={Number(optionTickSum) === Number(sumValue)}
                      value={amount}
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
                }}
              >
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
                                  console.log(obj)
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
                                    // Swal.fire({ 
                                    //   text: 'You Want Change Payment Methode Click On Selected Method',
                                    //   timer: 1000});
                                    if(balanceDue==0)return Swal.fire({ 
                                      icon:"info",
                                      text: 'Your Due Balance is 0 Now if You Want Change Payment Methode Click On Selected Method',
                                      timer: 2000})
                                    if (Number(optionTickSum) <= sumValue) {
                                      const obj = { ...item, amount };
                                      console.log("this other method",obj)
                                      setOptionTick([...optionTick, obj]);
                                    }
                                  }
                                }

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
                              }}
                            >
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
                                }}
                              >
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
                }}
              >
                <div className="calculated_amount-container">
                  {optionTick && optionTick?.length > 0 && (
                    <>
                      {optionTick.map((item) => {
                        return (
                          <>
                            <div style={{ fontSize: "20px" }}>
                              {item.name} - {Math.round(item.amount)}
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
              <div className="text-center">
                <p className="text-sm text-black">{error}</p>
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
                    console.log("home me customer", search_customer_data)
                    handleToQR();
                    if(cartData.filter((item)=>item.actual_price>0).length>0){
                      cartData.map((itme)=>{
                        itme.discount =(itme.actual_price - itme.price) *itme.productQty
                        itme.price =itme.actual_price 
                      })
                    }
                    console.log("this Auctal data",cartData)
                    dispatch(
                      handleSaveTransactionRequest({
                        registerId: userData && userData.registerId,
                        storeId: userData && userData.storeId,
                        saasId: userData && userData.saasId,
                        tenderId: "TENDER1",
                        tender: handleTenderAmount(),
                        cartItems: cartData,
                        customerName:search_customer_data && search_customer_data.name,
                        customerNumber:search_customer_data && search_customer_data.mobile_number,
                        loyalty_id:
                          link_loyalty_detail && link_loyalty_detail.loyalty_id,
                      })
                    );
                    console.log("home me customer", search_customer_data)
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
                  }}
                >
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
                  }}
                >
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
        style={{ height: "100%" }}
      >
        <Modal.Header>
          <Modal.Title>Your Receipt! </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ height: "300px", width: "100%", margin: "auto" }}>
            {handle_saveTransaction_data?.pdf_file_name &&
              <>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                  <Viewer
                    // fileUrl={`${BASE_Url}/transaction/pdf/${handle_saveTransaction_data &&
                    //   handle_saveTransaction_data.pdf_file_name
                    //   }`}
                    fileUrl={`${handle_saveTransaction_data ?`${BASE_Url}/transaction/pdf/${handle_saveTransaction_data &&
                      handle_saveTransaction_data.pdf_file_name
                      }`:defaultPdfFile}`}
                    plugins={[defaultLayoutPluginInstance]}
                  />
                </Worker>
              </>
            }
          </div>
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-evenly",
                marginTop: "20px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
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
                    }}
                  >
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
                    }}
                  >
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
                    }}
                  >
                    SMS <FcSms size={25} />
                  </Button>
                </div>
              </div>
              {emailOpen ? (
                <form
                  onSubmit={handleNotifyEmail}
                  className="d-flex flex-row align-items-center"
                  style={{ width: "50%" }}
                >
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
                  style={{ width: "50%" }}
                >
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
                  style={{ width: "50%" }}
                >
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
                }}
              >
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
                }}
              >
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
  );
};

export default Home;
