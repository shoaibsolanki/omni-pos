import React, { useEffect, useState } from "react";
import { FaReceipt, FaFileInvoice } from "react-icons/fa";
import { BsCartFill } from "react-icons/bs";
import { RiSecurePaymentFill } from "react-icons/ri";
import { MdNoteAlt, MdOutlineHelp } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";
import { GiExpense, GiNotebook, GiStabbedNote } from "react-icons/gi";
import { IoDocumentTextSharp } from "react-icons/io5";
import { RiPriceTag3Fill, RiEditCircleFill } from "react-icons/ri";
import { SiHomeassistantcommunitystore, SiCoinmarketcap } from "react-icons/si";
// import { SiCoinmarketcap } from "react-icons/si";
import { MdEditSquare } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { TfiViewListAlt } from "react-icons/tfi";
import { AiFillHome, AiFillSetting } from "react-icons/ai";
import { AiFillBook } from "react-icons/ai";
import { AiFillDollarCircle } from "react-icons/ai";
import { AiFillBank } from "react-icons/ai";
import { BiGroup, BiCube } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { FaMoneyBillAlt } from "react-icons/fa";
import { AiOutlineAreaChart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import offer from "../assets/offer.jpeg";
import { BiUser } from "react-icons/bi";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Expense from "./expense";
import Bahikhata from "./Bahikhata";
import UpdateMoq from "./moq";
import UpdatePrice from "./update-price";
import ViewOrders from "./PendingOrders";
import video from "../assets/shop.mp4";
import { useDispatch, useSelector } from "react-redux";
import ViewOrdersCustomer from "./PendingOrders/ViewOrdersCustomer";
import {
  handleStoreNameRequest,
  handleViewOrderPendingRequest,
  handleRecommendedDataRequest,
  handleExpenseCategoryDropdownRequest,
  handleBahikhataPartyDropdownRequest
} from "../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import Swal from "sweetalert2";
import backgroundImage from '../assets/Background.png'
import { Grid, IconButton, Paper, Typography } from "@mui/material";
import Inovice from '../assets/ReceiptApproved.png'
import Paid from '../assets/Paid.png'
import Cash from '../assets/Cash.png'
import Return from '../assets/ReturnPurchase.png'
import Delivery from '../assets/Delivery.png'
import Expenses from '../assets/LowPrice.png'
import Visa from '../assets/Visa.png'
import BILL from '../assets/Bill.png'
import Supplier from '../assets/Supplier.png'
import Approval from '../assets/Approval.png'
import DashboardLayout from '../assets/DashboardLayout.png'
import Goal from '../assets/Goal.png'
const Main = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [viewOrderModalIsOpen, setViewOrderModalIsOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const navigate = useNavigate();

  useEffect(() => { });
  let { storeName, userType, saasId, storeId } = localStorage.getItem(
    "User_data"
  )
    ? JSON.parse(localStorage.getItem("User_data"))
    : {};
  console.log(userType);
  const checkCustomer = (userType === "CUSTOMER" || userType === "GUEST");
   const CeckhSaasid = (saasId !=="3"||userType === "CUSTOMER" || userType === "GUEST")
   const ThrillSaasid = (saasId =="14"||userType === "CUSTOMER" || userType === "GUEST")
  // useEffect(() => {}, [checkCustomer]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (checkCustomer) {
      navigate("/home");
    }
  }, [checkCustomer]);

  // console.log("TEST---", checkCustomer);
  
  const create_transaction_arr = [
    {
      id: 1,
      // label: "Invoice",
      label: checkCustomer ? "Order Now" : "Invoice",
      value: "retail_billing",
      icon:Inovice ,
     
      // <FaReceipt color="#ff6a00" size="25" />,
      // isActive: checkCustomer ? true : true,
      isActive: ThrillSaasid ? false : true,
    },
    {
      id: 2,
      label: "Purchase",
      value: "purchase",
      icon:Paid, 
      // <BsCartFill color="#ff6a00" size="25" />,
      // isActive: checkCustomer ? false : true,
      isActive: ThrillSaasid ? false : true,
    },
    {
      id: 3,
      label: "Payment",
      value: "payment",
      icon:Cash, 
      // <FaMoneyBillAlt color="#ff6a00" size="25" />,
      // isActive: checkCustomer ? false : true,
      isActive: ThrillSaasid ? false : true,
    },
    {
      id: 4,
      label: "Return",
      value: "return_credit_note",
      icon:Return,
      //  <MdNoteAlt color="ff6a00" size="25" />,
      // isActive: checkCustomer ? false : true,
      isActive: ThrillSaasid ? false : true,
    },
    {
      id: 5,
      label: "Delivery",
      value: "delivery_challan",
      icon:Delivery, 
      // <CiDeliveryTruck color="#ff6a00" size="25" />,
      // isActive: checkCustomer ? false : true,
      isActive: ThrillSaasid ? false : true,
    },
    {
      id: 6,
      label: "Expense",
      value: "expense",
      icon:Expenses, 
      // <GiExpense color="#ff6a00" size="25" />,
      // isActive: checkCustomer ? false : true,
      isActive: ThrillSaasid ? false : true,
    },
    {
      id: 7,
      label: "Debit",
      value: "debit_note",
      icon:Visa, 
      // <GiStabbedNote color="#ff6a00" size="25" />,
      // isActive: checkCustomer ? false : true,
      isActive: ThrillSaasid ? false : true,
    },
    {
      id: 8,
      label: "Bahikhata",
      value: "bahikhata",
      icon:BILL,
      //  <GiNotebook color="#ff6a00" size="25" />,
      // isActive: checkCustomer ? false : true,
      isActive: ThrillSaasid ? false : true,
    },
    {
      id: 9,
      label: "Order Mangement",
      value: "pending_orders",
      icon:Supplier, 
      // <TfiViewListAlt size="25" color="#ff6a00" />,
      // isActive: checkCustomer ? true : true,
      isActive: ThrillSaasid ? false : true,
    },
    {
      id: 10,
      label: "Payment Approval",
      value: "update_moq",
      icon:Approval, 
      // <RiEditCircleFill size="25" color="#ff6a00" />,
      // isActive: checkCustomer ? false : true,
      isActive: ThrillSaasid ? false : true,
    },
   
    {
      id: 11,
      label: "Dashboard",
      value: "dashboard",
      icon:DashboardLayout, 
      // <AiOutlineAreaChart color="#ff6a00" size="25" />,
      // isActive: checkCustomer ? false : true,
      isActive: ThrillSaasid ? true : false,
    },
    {
      id: 12,
      label: "Marketing",
      value: "marketing",
      icon:Goal, 
      // <SiCoinmarketcap color="#ff6a00" size="25" />,
      // isActive: checkCustomer ? false : true,
      isActive: ThrillSaasid ? false : true,
    },
    {
      id: 13,
      label: "Pay File Charges",
      value: "FileCharge",
      icon: <AiFillBook color="#ff6a00" size="25" />,
      isActive: CeckhSaasid ? false : true,
    },
    {
      id: 14,
      label: "Complete KYC",
      value: "LoanKYC",
      icon: <AiFillBank color="#ff6a00" size="25" />,
      isActive:  CeckhSaasid ? false : true,
    },
    {
      id: 15,
      label: "Request For Loan",
      value: "RequestLoan",
      icon: <AiFillDollarCircle color="#ff6a00" size="25" />,
      isActive: CeckhSaasid ? false : true,
    },
    
    // {
    //   id: 9,
    //   label: "View Order",
    //   value: "pending_orders",
    //   icon: <TfiViewListAlt size="25" color="#26cbaf" />,
    //   isActive: checkCustomer ? true : false,
    // },
  ];
  if (!ThrillSaasid) {
    create_transaction_arr.forEach(tab => {
      if (![13, 14, 15].includes(tab.id)) {
        tab.isActive = true;
      }
    });
  }
  const omni_channel_arr = [
  
    
    // {
    //   id: 3,
    //   label: "Price",
    //   value: "update_price",
    //   icon: <RiPriceTag3Fill size="25" color="#0405c3" />,
    //   isActive: checkCustomer ? false : true,
    // },
    // {
    //   id: 4,
    //   label: "UOM",
    //   value: "update_uom",
    //   icon: <MdEditSquare size="25" color="#19d413" />,
    //   isActive: checkCustomer ? false : true,
    // },
  ];

  const feature_arr = [
    // {
    //   id: 1,
    //   label: "Templates",
    //   value: "invoice_template",
    //   icon: <FaFileInvoice color="#41d796" size="25" />,
    //   isActive: checkCustomer ? false : true,
    // },
    // {
    //   id: 2,
    //   label: "Settings",
    //   value: "document_settings",
    //   icon: <AiFillSetting color="#495057" size="25" />,
    //   isActive: checkCustomer ? false : true,
    // },
    {
      id: 1,
      label: "Dashboard",
      value: "dashboard",
      icon: <AiOutlineAreaChart color="#ff6a00" size="25" />,
      isActive: checkCustomer ? false : true,
    },
    {
      id: 2,
      label: "Marketing",
      value: "marketing",
      icon: <SiCoinmarketcap color="#ff6a00" size="25" />,
      isActive: checkCustomer ? false : true,
    },
    {
      id: 3,
      label: "Pay File Charges",
      value: "FileCharge",
      icon: <AiFillBook color="#ff6a00" size="25" />,
      isActive: CeckhSaasid ? false : true,
    },
    {
      id: 4,
      label: "Complete KYC",
      value: "LoanKYC",
      icon: <AiFillBank color="#ff6a00" size="25" />,
      isActive:  CeckhSaasid ? false : true,
    },
    {
      id: 5,
      label: "Request For Loan",
      value: "RequestLoan",
      icon: <AiFillDollarCircle color="#ff6a00" size="25" />,
      isActive: CeckhSaasid ? false : true,
    },
    // {
    //   id: 5,
    //   label: "Store",
    //   value: "online_store",
    //   icon: <SiHomeassistantcommunitystore color="#dc3545" size="25" />,
    //   isActive: checkCustomer ? false : true,
    // },
    // {
    //   id: 6,
    //   label: "Help",
    //   value: "help",
    //   icon: <MdOutlineHelp color="#007bff80" size="25" />,
    //   isActive: checkCustomer ? false : true,
    // },
  ];
  // Customer loan ali wala code 

  // const customerloan_arr = [
  //   {
  //     id: 1,
  //     label: "Pay File Charges",
  //     value: "FileCharge",
  //     icon: <AiFillBook color="#41d796" size="25" />,
  //     isActive: checkCustomer ? false : true,
  //   },
  //   {
  //     id: 2,
  //     label: "Complete KYC",
  //     value: "LoanKYC",
  //     icon: <AiFillBank color="#1184ff" size="25" />,
  //     isActive: checkCustomer ? false : true,
  //   },
  //   {
  //     id: 3,
  //     label: "Request For Loan",
  //     value: "dashboard",
  //     icon: <AiFillDollarCircle color="rgb(4, 5, 195)" size="25" />,
  //     isActive: checkCustomer ? false : true,
  //   },

  // ];

  const footer_arr = [
    {
      id: 1,
      label: "Home",
      value: "home",
      icon: <AiFillHome color="#ff6a00" size="25" />,
      isActive: true,
    },
    {
      id: 2,
      label: "Product & Parties",
      value: "parties",
      icon: <BiGroup color="#ff6a00" size="25" />,
      isActive: true,
    },
    // {
    //   id: 3,
    //   label: "Online Store",
    //   value: "online_store",
    //   icon: <SiHomeassistantcommunitystore color="#17a2b8" size="25" />,
    //   isActive: true,
    // },
    {
      id: 4,
      label: "Product",
      value: "product",
      icon: <BiCube color="#28a745" size="25" />,
      // isActive: checkCustomer ? false : true,
      isActive: false,
    },
    {
      id: 5,
      label: "More",
      value: "more",
      icon: <RxDashboard color="blue" size="25" />,
      isActive: false,
    },
  ];

  const filterTransactionsForCustomer = (item) => {
  console.log(item)
    if (checkCustomer) {
      if (item.value === "retail_billing") {
        navigate("/home");
      }
    } else if (!checkCustomer) {
      if (item.value === "retail_billing") {
        navigate("/home");
      } else if (item.value === "purchase") {
        navigate("/add-purchase");
      } else if (item.value === "return_credit_note") {
        navigate("/return");
      } else if (item.value === "debit_note") {
        navigate("/debit-note");
      } else if (item.value === "expense") {
        navigate("/create-Expense");
        // dispatch(handleExpenseCategoryDropdownRequest());
        // setExpenseModalIsOpen(!expenseModalIsOpen);
      } else if (item.value === "bahikhata") {
        navigate("/Bahikhata");
        // dispatch(handleBahikhataPartyDropdownRequest());
        // setBahikhataModalIsOpen(!bahikhataModalIsOpen);
      } else if (item.value === "delivery_challan") {
        navigate("/delivery-challan");
      } else if (item.value === "marketing") {
        console.log(item);
        navigate("/marketing");
      }
    }
  };

  const filterOmniForCustomer = (item) => {
    console.log("onclick",item)
    if (checkCustomer) {
      if (item.value === "pending_orders") {

        setViewOrderModalIsOpen(!viewOrderModalIsOpen);
      }
    } else if (!checkCustomer) {
      if (item.value === "update_moq") {
        navigate("/UpdateMoq");
        // setUpdateMoqModalIsOpen(!updateMoqModalIsOpen);
      } else if (item.value === "update_price") {
        navigate("/UpdatePrice");
        // setUpdatePriceModalIsOpen(!updatePriceModalIsOpen);
        // dispatch(handleRecommendedDataRequest());
      } else if (item.value === "pending_orders") {
        // console.log("this new message",item.value)
        dispatch(handleViewOrderPendingRequest());
        setViewOrderModalIsOpen(!viewOrderModalIsOpen);
      } else if (item.value === "update_uom") {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", detectKeyDown);
  }, []);
  const detectKeyDown = (e) => {
    // console.log("CLICKED KEY :", e);
    if (e.keyCode === 49) {
      // navigate("/home");
    }
  };
  useEffect(() => {
    dispatch(handleStoreNameRequest({ saasId, storeId }));
  }, []);

  const handleRedirect = () => {
    window.location.href = "https://cpadvisordigital.in/loan-application/31/AG3894087";
  };
  const backgroundStyle = {
    minHeight: '80vh',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    padding: '20px',
    height: "fit-content", 
    overflow: "auto" 
  };
  const paperStyle = {
    padding: 16,
    textAlign: 'center',
  };
  const iconButtonStyle = {
    marginBottom: 8,
  };

  return (
    <>
      {/* <div style={{ height: "100vh", width: "100vw" }}> */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
        className=" min-vw-100"
         style={backgroundStyle}
        // onKeyPress={keyDownEvent}
        >
          <div style={{ minHeight: "60vh"}} >
            <div
              style={{
                // backgroundColor: "white",
                margin: "20px 20px",
                borderRadius: "10px",
                // boxShadow: "0px 4px 12px 0px rgba(133, 133, 133, 0.15)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                flexWrap: "wrap",
                userSelect: "none",
              }}
            >
              {/* <div
                style={{
                  fontSize: "25px",
                  fontWeight: "900",
                  paddingLeft: "20px",
                  color: "#230D4D",
                  margin: "10px 0",
                }}
              >
                {checkCustomer ? "Transactions" : "Create Transactions"}
              </div> */}
              <div
                // style={{
                //   margin: "0px 20px",
                //   borderRadius: "10px",
                //   display: "flex",
                //   flexWrap: "wrap",
                //   justifyContent: "space-between",
                //   // alignItems: "center",
                //   userSelect: "none",
                // }}
              >
                 <Grid container spacing={3} style={{padding: 24}}>
                {create_transaction_arr
                  .filter((io) => io.isActive === true)
                  .map((item,index) => {
                    return (
                      <>
                      <Grid  
                      // className="MainCard"
                      onClick={() => {
                        if (item.value === "dashboard") {
                          navigate("/retailer-dashboard");
                          const id= localStorage.getItem('activeTab')
                          if(!id){
                            localStorage.setItem('activeTab',1)
                          }
                        } 
                        else if (item.value === "FileCharge") {
                          navigate("/PayFileCharges");
                        } else if (item.value === "LoanKYC") {
                          navigate("/CompleteKYC");
                        }
                        else if (item.value === "RequestLoan") {
                          navigate("/");
                          Swal.fire({
                            title: 'Please Complete Your KYC',
                            text: 'If You Alredy Done Then Ignore For Some Time',
                            timer: 1000
                          })
                          // (handleRedirect());
                        }else if(item.value === "pending_orders" || item.value === "update_moq"){
                        filterOmniForCustomer(item)
                        }else{
                          filterTransactionsForCustomer(item)
                        }
                      }}
                      // onClick={() => filterTransactionsForCustomer(item)}
                      item xs={6} sm={4} md={2}  key={index}>
                      <Paper className="MainCard" style={paperStyle}>
                     <IconButton 
                     
                     style={iconButtonStyle}>
                      <img src={item.icon} alt="" />
                     </IconButton>
                  <Typography>{item.label}</Typography>
                  </Paper>
                  </Grid>
                        {/* <div
                          key={item.id}
                           className="MainCard"
                          style={{
                            width:"9rem",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            margin: "10px",
                            marginBottom: "20px",
                            cursor: "pointer",
                            color: "#3d2b2b",
                          }}
                          onClick={() => filterTransactionsForCustomer(item)}
                        >
                          <div>{item.icon}</div>
                          <div className="text-nowrap">{item.label}</div>
                        </div> */}
                      </>
                    );
                  })}
                  </Grid>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "white",
                margin: "20px 20px",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                flexWrap: "wrap",
                // justifyContent: "center",
                // alignItems: "center",
                // boxShadow: "0px 4px 12px 0px rgba(133, 133, 133, 0.15)",
                userSelect: "none",
              }}
            >
              {/* <div
                style={{
                  fontSize: "25px",
                  fontWeight: "900",
                  paddingLeft: "20px",
                  // marginTop: "30px",
                  color: "#230D4D",
                }}
              >
                Omni Channel Orders
              </div> */}
              {/* <div
                style={{
                  backgroundColor: "white",
                  margin: "0px 20px",
                  borderRadius: "10px",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  // alignItems: "center",
                  userSelect: "none",
                }}
              >
                {omni_channel_arr
                  .filter((io) => io.isActive === true)
                  .map((item) => {
                    return (
                      <>
                        <div 
                        className="MainCard"
                          style={{
                            width:"9rem",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            margin: "10px",
                            // marginBottom: "20px",
                            cursor: "pointer",
                            color: "#3d2b2b",
                          }}
                          onClick={() => filterOmniForCustomer(item)}
                        >
                          <div>{item.icon}</div>
                          <div className="text-nowrap">{item.label}</div>
                        </div>
                      </>
                    );
                  })}
              </div> */}
            </div>
            <div
              style={{
                backgroundColor: "white",
                margin: "20px 20px",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                flexWrap: "wrap",
                // boxShadow: "0px 4px 12px 0px rgba(133, 133, 133, 0.15)",

                userSelect: "none",
              }}
            >
              {/* <div
                style={{
                  fontSize: "25px",
                  fontWeight: "900",
                  paddingLeft: "20px",
                  color: "#230D4D",
                }}
              >
                Features And Loan
              </div> */}
              <div
              className="col-md-4"
                style={{
                  // width:"35%",
                  justifyContent:"space-between",
                  backgroundColor: "white",
                  margin: "0px 20px",
                  borderRadius: "10px",
                  display: "flex",
                  flexWrap: "wrap",
                  // justifyContent: "center",
                  // alignItems: "center",
                  userSelect: "none",
                }}
              >
                {/* {feature_arr
                  .filter((io) => io.isActive === true)
                  .map((item) => {
                    return (
                      <>
                        <div
                         className="MainCard "
                          style={{
                            width:"9rem",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            margin: "10px",
                            marginBottom: "20px",
                            cursor: "pointer",
                            color: "#3d2b2b",
                          }}
                          onClick={() => {
                            if (item.value === "dashboard") {
                              navigate("/retailer-dashboard");
                              const id= localStorage.getItem('activeTab')
                              if(!id){
                                localStorage.setItem('activeTab',1)
                              }
                            } else if (item.value === "marketing") {
                              navigate("/marketing");
                            }
                            else if (item.value === "FileCharge") {
                              navigate("/PayFileCharges");
                            } else if (item.value === "LoanKYC") {
                              navigate("/CompleteKYC");
                            }
                            else if (item.value === "RequestLoan") {
                              navigate("/");
                              Swal.fire({
                                title: 'Please Complete Your KYC',
                                text: 'If You Alredy Done Then Ignore For Some Time',
                                timer: 1000
                              })
                              // (handleRedirect());
                            }
                          }}
                        >
                          <div>{item.icon}</div>
                          <div className="text-nowrap">{item.label}</div>
                        </div>
                      </>
                    );
                  })} */}
              </div>
            </div>

            {/* loan wala bole to ali bhai */}

            <div
              style={{
                backgroundColor: "white",
                margin: "20px 20px",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                // padding: "10px",
                justifyContent: "flex-start",
                flexWrap: "wrap",
                boxShadow: "0px 4px 12px 0px rgba(133, 133, 133, 0.15)",

                userSelect: "none",
              }}
            >
              {/* <div
                style={{
                  fontSize: "25px",
                  fontWeight: "900",
                  paddingLeft: "20px",
                  color: "#230D4D",
                }}
              >
                Retailer And Loan
              </div> */}
              {/* <div className="mt-2"
               > */}
                {/* <div>{item.icon}</div>
                <div>{item.label}</div> */}
              {/* </div> */}
              {/* <div
                style={{
                  backgroundColor: "white",
                  margin: "0px 20px",
                  borderRadius: "10px",
                  display: "flex",
                  flexWrap: "wrap",
                  // justifyContent: "center",
                  // alignItems: "center",
                  userSelect: "none",
                }}
              >
                {customerloan_arr
                  .filter((io) => io.isActive === true)
                  .map((item) => {
                    return (
                      <>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            margin: "10px",
                            marginBottom: "20px",
                            cursor: "pointer",
                            color: "#3d2b2b",
                          }}
                          onClick={() => {
                            if (item.value === "FileCharge") {
                              navigate("/PayFileCharges");
                            } else if (item.value === "LoanKYC") {
                              navigate("/CompleteKYC");
                            }
                          }}
                        >
                          <div>{item.icon}</div>
                          <div>{item.label}</div>
                        </div>
                      </>
                    );
                  })}
              </div> */}
            </div>




            {/* ----- */}
            <div
              style={{
                fontSize: "25px",
                fontWeight: "900",
                paddingLeft: "20px",
                color: "#230D4D",
              }}
            >
              {checkCustomer ? "Customer Profile" : ""}
            </div>
            <div
              style={{
                backgroundColor: "white",
                margin: "0px 20px",
                borderRadius: "10px",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                userSelect: "none",
              }}
            >
              {checkCustomer ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    margin: "10px",
                    cursor: "pointer",
                    color: "#3d2b2b",
                  }}
                >
                  <BiUser size={25} />
                  <p>Profile</p>
                </div>
              ) : (
                ""
              )}
            </div>
            {/*  */}

            {checkCustomer ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "300px",
                    height: "300px",
                  }}
                >
                  <img
                    src={offer}
                    style={{ width: "100%", height: "100%" }}
                    alt=""
                  />
                </div>
              </div>
            ) : (
              ""
            )}

            {/*  */}
          </div>

          <div style={{position:"sticky",}}>
            <div
              style={{
                backgroundColor: "white",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                userSelect: "none",
                paddingLeft: "20px",
                paddingRight: "20px",
              }}
            >
              {footer_arr
                .filter((io) => io.isActive === true)
                .map((item) => {
                  return (
                    <>
                      <footer
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                          margin: "10px",
                          marginBottom: "20px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          if (item.value === "product") {
                            // navigate("/add-item");
                          }
                        }}
                      >
                        {item.value === "parties" ? (
                          <>
                            <Dropdown
                              isOpen={dropdownOpen}
                              toggle={toggle}
                              direction={"up"}
                            >
                              <DropdownToggle
                                style={{ textAlign: "center" }}
                                tag={"span"}
                              >
                                <div>{item.icon}</div>
                                <div>{item.label}</div>
                              </DropdownToggle>
                              <DropdownMenu>
                                <DropdownItem
                                  onClick={() => {
                                    navigate("/add-customer");
                                  }}
                                >
                                  Add Customer
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() => {
                                    navigate("/add-supplier");
                                  }}
                                >
                                  Add Supplier
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() => {
                                    navigate("/add-item");
                                  }}
                                >
                                  Add Item
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() => {
                                    navigate("/add-category");
                                  }}
                                >
                                  Add Category
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() => {
                                    navigate("/add-brand");
                                  }}
                                >
                                  Add Brand
                                </DropdownItem>
                              </DropdownMenu>
                            </Dropdown>
                          </>
                        ) : (
                          <>
                            <div onClick={() => { window.location.reload() }}>{item.icon}</div>
                            <div onClick={() => { window.location.reload() }}>{item.label}</div>
                          </>
                        )}
                      </footer>
                    </>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      {
        checkCustomer
          ? console.log("CUSTOMER")
          : // <ViewOrdersCustomer
          //   show={show}
          //   setShow={setShow}
          //   // viewOrderModalIsOpen={viewOrderModalIsOpen}
          //   // setViewOrderModalIsOpen={setViewOrderModalIsOpen}
          // />
          console.log("RETAILER")
        // <ViewOrders
        //   viewOrderModalIsOpen={viewOrderModalIsOpen}
        //   setViewOrderModalIsOpen={setViewOrderModalIsOpen}
        // />
      }

      {/* <ViewOrdersCustomer /> */}
      <ViewOrders
        viewOrderModalIsOpen={viewOrderModalIsOpen}
        setViewOrderModalIsOpen={setViewOrderModalIsOpen}
      />
      {/* <UpdatePrice
        updatePriceModalIsOpen={updatePriceModalIsOpen}
        setUpdatePriceModalIsOpen={setUpdatePriceModalIsOpen}
      /> */}

      {/* <UpdateMoq
        updateMoqModalIsOpen={updateMoqModalIsOpen}
        setUpdateMoqModalIsOpen={setUpdateMoqModalIsOpen}
      /> */}

      {/* <Expense
        expenseModalIsOpen={expenseModalIsOpen}
        setExpenseModalIsOpen={setExpenseModalIsOpen}
      /> */}
      {/* <Bahikhata
        bahikhataModalIsOpen={bahikhataModalIsOpen}
        setBahikhataModalIsOpen={setBahikhataModalIsOpen}
      /> */}
    </>
  );
};

export default Main;



// src/App.js

// src/App.js

// import React from 'react';
// import { AppBar, Toolbar, Typography, Grid, Paper, IconButton } from '@mui/material';
// import HomeIcon from '@mui/icons-material/Home';
// import PeopleIcon from '@mui/icons-material/People';
// import MenuIcon from '@mui/icons-material/Menu';
// import InvoiceIcon from '@mui/icons-material/Description'; // Placeholder icon
// import PurchaseIcon from '@mui/icons-material/ShoppingCart'; // Placeholder icon
// import PaymentIcon from '@mui/icons-material/Payment';
// import ReturnIcon from '@mui/icons-material/AssignmentReturn'; // Placeholder icon
// import DeliverIcon from '@mui/icons-material/LocalShipping'; // Placeholder icon
// import ExpenseIcon from '@mui/icons-material/AttachMoney'; // Placeholder icon
// import DebitIcon from '@mui/icons-material/CreditCard'; // Placeholder icon
// import BahiKhataIcon from '@mui/icons-material/Book'; // Placeholder icon
// import OrderManagementIcon from '@mui/icons-material/Assignment'; // Placeholder icon
// import PaymentApprovalIcon from '@mui/icons-material/Verified'; // Placeholder icon
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import MarketingIcon from '@mui/icons-material/Campaign'; // Placeholder icon
// import backgroundImage from '../assets/Background.png'
// const App = () => {
//   const filterOmniForCustomer = (item) => {
//     if (checkCustomer) {
//       if (item.value === "pending_orders") {

//         setViewOrderModalIsOpen(!viewOrderModalIsOpen);
//       }
//     } else if (!checkCustomer) {
//       if (item.value === "update_moq") {
//         navigate("/UpdateMoq");
//         // setUpdateMoqModalIsOpen(!updateMoqModalIsOpen);
//       } else if (item.value === "update_price") {
//         navigate("/UpdatePrice");
//         // setUpdatePriceModalIsOpen(!updatePriceModalIsOpen);
//         // dispatch(handleRecommendedDataRequest());
//       } else if (item.value === "pending_orders") {
//         // console.log("this new message",item.value)
//         dispatch(handleViewOrderPendingRequest());
//         setViewOrderModalIsOpen(!viewOrderModalIsOpen);
//       } else if (item.value === "update_uom") {
//         navigate("/");
//       }
//     }
//   };
//   const appBarStyle = {
//     flexGrow: 1,
//   };

//   const gridContainerStyle = {
//     padding: 24,
//   };

//   const paperStyle = {
//     padding: 16,
//     textAlign: 'center',
//   };

//   const iconButtonStyle = {
//     marginBottom: 8,
//   };

//   const backgroundStyle = {
//     minHeight: '100vh',
//     backgroundImage: `url(${backgroundImage})`,
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     backgroundRepeat: 'no-repeat',
//     padding: '20px',
//   };

//   return (
//     <div style={backgroundStyle}>
//       {/* <AppBar position="static">
//         <Toolbar>
//           <IconButton edge="start" color="inherit" aria-label="menu">
//             <HomeIcon />
//           </IconButton>
//           <Typography variant="h6" style={{ flexGrow: 1 }}>
//             KBAZAAR Supper Store
//           </Typography>
//           <IconButton edge="end" color="inherit">
//             <PeopleIcon />
//           </IconButton>
//           <IconButton edge="end" color="inherit">
//             <MenuIcon />
//           </IconButton>
//         </Toolbar>
//       </AppBar> */}

//       <Grid container spacing={3} style={gridContainerStyle}>
//         {[
//           { icon: <InvoiceIcon />, label: 'Invoice' },
//           { icon: <PurchaseIcon />, label: 'Purchase' },
//           { icon: <PaymentIcon />, label: 'Payment' },
//           { icon: <ReturnIcon />, label: 'Return' },
//           { icon: <DeliverIcon />, label: 'Deliver' },
//           { icon: <ExpenseIcon />, label: 'Expense' },
//           { icon: <DebitIcon />, label: 'Debit' },
//           { icon: <BahiKhataIcon />, label: 'BahiKhata' },
//           { icon: <OrderManagementIcon />, label: 'Order Management' },
//           { icon: <PaymentApprovalIcon />, label: 'Payment Approval' },
//           { icon: <DashboardIcon />, label: 'Dashboard' },
//           { icon: <MarketingIcon />, label: 'Marketing' },
//         ].map((item, index) => (
//           <Grid item xs={6} sm={4} md={3}  key={index}>
//             <Paper style={paperStyle}>
//               <IconButton 
//               onClick={() => filterOmniForCustomer(item)}
//               style={iconButtonStyle}>{item.icon}</IconButton>
//               <Typography>{item.label}</Typography>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>
//     </div>
//   );
// };

// export default App;
