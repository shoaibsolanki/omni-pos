import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import Logo from "../assets/logo.jpeg";
import Logo2 from "../assets/logo2.png";
import Logo3 from "../assets/logo3.png";
import Logo4 from "../assets/logo6.png";
import { Link, useLocation } from "react-router-dom";
import NavTab2 from "./NavTab2";
import NavTab1 from "./NavTab1";
import { GrLogout } from "react-icons/gr";
import { BiArrowBack, BiGroup } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  handleOpneMenuRequest,
  handleShowModal,
  handlecartCount,
} from "../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { BiCart } from "react-icons/bi";
import cart from "../assets/cart.jpeg";
import cart2 from "../assets/cart2.jpeg";
import cart3 from "../assets/cart3.jpeg";
import cart4 from "../assets/cart4.jpeg";
import logout from "../assets/logout.jpeg";
import logout2 from "../assets/logout2.jpeg";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AddMoneyWalletModal from "./my-cart/AddMoneyWalletModal";
const Navbar = () => {
  // console.log("HISTORY", history);
  const loaction = useLocation()
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
    userType,
  } = localStorage.getItem("User_data")
    ? JSON.parse(localStorage.getItem("User_data"))
    : {};
  console.log("NAVBAR Store name", typeof saasId);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const { open_menu, cart_data, show_cart_modal, product_count } = useSelector(
    (e) => e.ComponentPropsManagement
  );

  useEffect(() => {
    if (open_menu) {
      setOpenMenu(open_menu);
    }
  }, open_menu);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log("NAVIGATE", navigate);
  useEffect(() => {
    const el = JSON.parse(localStorage.getItem("my-cart"));
    if (el) {
      dispatch(handlecartCount(el?.length));
    } else {
      dispatch(handlecartCount(0));
    }
  }, []);
  const TabsData = [
    {
      id: 1,
      button: "Dashboard",
      component: <NavTab1 />,
    },
    {
      id: 2,
      button: "Master",
      component: <NavTab2 />,
    },
    {
      id: 3,
      button: "Master",
      component: <NavTab2 />,
    },
  ];
  const [openMenu, setOpenMenu] = useState(false);
  // const [storeName, setStoreName] = useState("");

  const [value, setValue] = useState(0);
  const [tabs] = useState(TabsData);
  const [cartCount, setCartCount] = useState(0);
  // const token = JSON.parse(localStorage.getItem("Token"));
  const data = localStorage.getItem("login_data");

  const { component } = tabs[value];

  // const allData = JSON.parse(localStorage.getItem("Store_data"));
  // console.log("ALL DATA", allData);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  useEffect(() => {}, [handleLogout]);


  const footer_arr = [
    {
      id: 1,
      // label: "Parties",
      value: "parties",
      icon: <FaBars color="black" size="25" />,
      isActive: true,
    },
  ];
  const handleShowCart = () => {
    dispatch(handleShowModal({ bagModalIsOpne: !show_cart_modal }));
  };

  useEffect(() => {
    setCartCount(product_count);
  }, [product_count]);

  const navigateback = useNavigate();
 
  const handleGoBack = () => {
    navigateback("/"); // This will go back one step in the navigation stack
  };
  const handleRegisterClick = () => {
    navigateback(`/${saasId}/${storeId}`);
  };
  const style={
    boxShadow:"4px 4px 10px 0px rgba(0, 0, 0, 0.25)",
    borderRadius:"4px",
    background:"white",
    color:"black",
    border:"0px",
    
  }
  const location = useLocation();

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const conditionalStyles = location.pathname === '/login'  ? { } :  { marginTop: isDesktop ? '-25px' : '10px' };

  const userData = JSON.parse(localStorage.getItem("Customer_data"));

  const commonLinkStyles = {
    height: "65px",
    width: "100%",
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
  };

  const [modalShow, setModalShow] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  useEffect(() => {
    setShowGreeting(true);

    const timer = setTimeout(() => {
      setShowGreeting(false);
    }, 20000000);

    return () => clearTimeout(timer); // Clear the timer on component unmount
  }, []); // Empty dependency array ensures this effect runs only once


  // cart 
  const isNotHomePage = location.pathname !== "/";

  return (
    <>
 
    <div
    
    style={style}
    >

 
    {userData?.addedPaymentReference &&<div className="container-fluid">
      <div className="row">
        <div className="col-12" style={{ backgroundColor: '#fbd681', height: '35px', position: 'relative' }}>
          <p className="text-center mt-2 fw-bold" style={{ color: '#000000', fontFamily: 'Segoe UI-Semibold, Helvetica', fontSize: '16px', fontWeight: 400, letterSpacing: 0, lineHeight: 'normal', margin: 0 }}>
       <marquee behavior="scroll" direction="left" >
          {userData?.addedPaymentReference}
    </marquee>
          </p>
        </div>
      </div>
    </div>}
    <div style={{ width: "100%" }}>
      {userType === "RETAILER" ? (
        <Link
          to="/"
          className=""
          onClick={() => {
            // handle any click logic
          }}
          style={commonLinkStyles}
        >
          {saasId === "13" ? null : (
            <img
              src={Logo4}
              alt="Logo"
              style={{
                height: "64px",
                objectFit: "cover",
                width: "83px",
              }}
            />
          )}
        </Link>
      ) : (
        <Link
          to="/Home"
          className=""
          onClick={() => {
            // handle any click logic
          }}
          style={commonLinkStyles}
        >
          {saasId === "13" ? null : (
            <img
              src={Logo4}
              alt="Logo"
              style={{
                height: "64px",
                objectFit: "cover",
                width: "83px",
              }}
            />
          )}
        </Link>
      )}
    </div>
      <div style={{ textAlign: "center" }}>
      <p
      className="fw-bold mt-1 m-0"
     
    >
   { userType == "CUSTOMER" &&  <span> Welcome To </span>} {storeName} 

    </p>
    {showGreeting && userType === "CUSTOMER" && (
        <p className="m-0">Hi {userData?.userName} Thanks for Shopping With Us!</p>
      )}
      </div>

        <div
        className="justify-content-end mx-4 "
        style={{
          display: "flex",
          ...conditionalStyles
        }}
        >
          
      
     { userType == "RETAILER" && location.pathname!=="/" &&  < ArrowBackIcon onClick={handleGoBack} style={{position: "relative",
    right: "1100px"}}/> }
     
           
 {isNotHomePage && localStorage.getItem("User_data") && <IconButton
              aria-label="cart"
              onClick={() =>  handleShowCart()}
              className="cart-icon "
              style={{  position: "relative",
                top: "-6px"}}
            >
              <Badge
                badgeContent={cartCount}
                color="error"
              >
                <ShoppingCartIcon style={{ fontSize: "27px" }} />
              </Badge>
            </IconButton>}
          { userType == "CUSTOMER" || userType == "GUEST" ?
 (
            
             <>
              
             
            <AccountBalanceWalletIcon style={{
              color: 'gray', 
              fontSize: 28, 
              cursor:"pointer"
            }}  onClick={()=>setModalShow(true)}/>
            </>
            
          ) : (
            ""
          )}
         
           
              {localStorage.getItem("User_data") &&
              localStorage.getItem("Token") ? (
               
                  
                  <ExitToAppIcon className="mx-2" style={{ fontSize: "27px" }}  onClick={() => {
                    handleLogout();
                    setOpenMenu(false);
                  }}/>
               
              ) : (
                // <GrLogout
                //   size={25}
                //   color="#fff"
                //   onClick={() => {
                //     handleLogout();
                //     setOpenMenu(false);
                //   }}
                // />
                ""
              )}
              
              {userType === "GUEST" && (
        <PersonAddIcon style={{cursor:"pointer"}} onClick={handleRegisterClick} />
      )}
  

            {userType == "RETAILER" ? footer_arr
              .filter((io) => io.isActive === true)
              .map((item, i) => {
                return (
                  <>
                    <div
                      style={{
                        
                        // background:"black",
                    
                        cursor: "pointer",
                      }}
                      key={i}
                      onClick={() => {
                        if (item.value === "product") {
                          navigate("/add-item");
                        }
                      }}
                    >
                      {item.value === "parties" ? (
                        <>
                          <Dropdown
                            isOpen={dropdownOpen}
                            toggle={toggle}
                            direction={"down"}
                           
                          >
                            {location.pathname !== "/login" && (
                              <>
                                <DropdownToggle
                                  style={{ textAlign: "center" }}
                                  tag={"span"}
                                >
                                  <div>{item.icon}</div>
                                  <div>{item.label}</div>
                                </DropdownToggle>
                              </>
                            )}
                            <DropdownMenu>
                              <DropdownItem
                                onClick={() => {
                                  navigate("/link-customer");
                                }}
                              >
                                Link Customer
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => {
                                  // navigate("/link-customer");
                                  navigate("/member-enrollment");
                                }}
                              >
                                Member Enrollment
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => {
                                  navigate("/link-loyality-customer");
                                }}
                              >
                                Link Loyality
                              </DropdownItem>
                              {/* <DropdownItem
                                onClick={() => {
                                  navigate("/member-point-redemption");
                                }}
                              >
                                Member Point Redemption
                              </DropdownItem> */}
                            </DropdownMenu>
                          </Dropdown>
                        </>
                      ) : (
                        <>
                          <div>{item.icon}</div>
                          <div>{item.label}</div>
                        </>
                      )}
                    </div>
                  </>
                );
              }): localStorage.getItem("User_data") &&
              localStorage.getItem("Token") && <span className="text-white" style={{
                display: "flex",
                justifyContent: "flex-end",
                cursor: "pointer",
                // color: "#fff",
              }}
                onClick={() => {
                handleLogout();
                setOpenMenu(false);
              }}>Logout</span>  }
        
        </div>
       
    
      </div>
      <div className="nevbar-menu">
        {open_menu ? (
          <div
            style={{
              position: "absolute",
              right: "20px",
              border: "1px solod #eee",
              backgroundColor: "#fff",
              //   opacity: 0.1,
              top: "80px",
              border: "1px solid #e1e117",
              borderRadius: "20px",
              padding: "20px",
              zIndex: 999,
            }}
          >
            <div style={{ marginBottom: 0, paddingBottom: 0 }}>
              <div>
                <div>{component}</div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <AddMoneyWalletModal show={modalShow}  onHide={() => setModalShow(false)}/>
    </>
  );
};

export default Navbar;
