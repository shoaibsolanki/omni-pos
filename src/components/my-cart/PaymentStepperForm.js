import React, { useEffect, useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
} from '@mui/material';
import { Col, Row } from 'reactstrap';
import axios from "axios";
import Paytm from "../../assets/Paytm.png";
import AddMoneyWalletModal from './AddMoneyWalletModal';
import { BASE_Url } from '../../URL';
import { handleCreateOrderRequest, handleUpdateAddressforUserResponse, handlecartCount } from '../../redux/actions-reducers/ComponentProps/ComponentPropsManagement';
import {useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { MenuItem } from '@material-ui/core';
import DataService from '../../services/requestApi'

const steps = ['Cart', 'Mobile Number', 'Address', 'Payment'];

const StepperForm = () => {
  const [activeStep, setActiveStep] = useState(2);
  const [formData, setFormData] = useState({
    bag: '',
    mobileNumber: '',
    address: '',
    payment: '',
  });
  const navigate = useNavigate();
  const handleNext = () => {
   

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
  
      // If on any other step, navigate to "/home"
      navigate('/home');
    
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [modalShow, setModalShow] = useState(false);

  const cardData = JSON.parse(localStorage.getItem("my-cart"));
  const invoiceValue = JSON.parse(localStorage.getItem("invoiceValue"));
  const {
    show_cart_modal,
    dispatch_address,
    customers_all_addresses,
    dispatch_temp_address,
  } = useSelector((e) => e.ComponentPropsManagement);
  const dispatch = useDispatch();
  const { saasId, storeId, userType, userId, userName,promoCaseCheck,mobileNumber } = localStorage.getItem(
    "User_data"
  )
    ? JSON.parse(localStorage.getItem("User_data"))
    : {};
  
  const [paymentMethod, setPaymentMethod] = useState('');
  const userAddressData=JSON.parse(localStorage.getItem("userAddressData"));

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };
  const userData = JSON.parse(localStorage.getItem("Customer_data"));

  const GetSMS=async()=>{
    try {
      const response =await DataService.GetSMS(saasId,storeId)
      console.log("Get Average Sales", response.data.data)
    } catch (error) {
      console.log("error", error)
    }
  
  }

  const handlePlaceOrder = async () => {
    try {
      // Check if the payment method is "WALLET"
      if (paymentMethod === "WALLET") {
        const { incomeLevel } = userData;
  
        const newIncome = incomeLevel - Number(invoiceValue);
  
        // Check if the new income level is sufficient
        if (newIncome < Number(invoiceValue)) {
          Swal.fire({
            icon: 'error',
            title: 'Insufficient balance. Please update your wallet.!',
            // text: res.data.message,
            timer: 1000
          })
          return; // Stop further execution
        }
  
        // Dispatch the API call to create the order
        await dispatch(
          handleCreateOrderRequest({
            address_id: getAddressData.id,
            customer_id: userId,
            customer_name: userName,
            mobile_number: mobileNumber,
            saas_id: saasId,
            store_id: storeId,
            order_qty: cardData.length,
            order_tax: 0.0,
            order_value: Number(invoiceValue),
            order_discount: 0.0,
            status: "pending",
            payment_type: paymentMethod,
            item_list: cardData,
          })
        );
  
        GetSMS()
  
        // Navigate to the "/home" route after a delay
        setTimeout(() => {
          navigate("/home");
        }, 1000);
        const updatedUser = { ...userData, incomeLevel: newIncome };
        localStorage.setItem('Customer_data', JSON.stringify(updatedUser));
      } else {
       // Dispatch the API call to create the order
       await dispatch(
        handleCreateOrderRequest({
          address_id: getAddressData.id,
          customer_id: userId,
          customer_name: userName,
          mobile_number: mobileNumber,
          saas_id: saasId,
          store_id: storeId,
          order_qty: cardData.length,
          order_tax: 0.0,
          order_value: Number(invoiceValue),
          order_discount: 0.0,
          status: "pending",
          payment_type: paymentMethod,
          item_list: cardData,
        })
      );

      GetSMS()

      // Navigate to the "/home" route after a delay
      setTimeout(() => {
        navigate("/home");
      }, 1000);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      // Handle error as needed
    }
  };
  


  // add adress api 
  // const userData = JSON.parse(localStorage.getItem("Customer_data"));
  const { id } = JSON.parse(localStorage.getItem("Customer_data"));

  const [city, setCity] = useState(saasId == 6 ? "Varanasi" : '');
  const [state, setState] = useState(saasId ==6 ?"Uttar Pradesh": '');
  const [street, setStreet] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState("");
  const onOptionChange = (e) => {
    setType(e.target.value);
    // console.log("E TARGET VALUE", e.target.value);
  };



  const [getAddressData, setgetAddressData] = useState(null);

  const fetchAddressData = async () => {
    try {
      const response = await axios.get(`${BASE_Url}/customer/get-all-customer-address-app/${id}/${saasId}/${storeId}`);
      const lastIndex= response.data.data?.length-1
      console.log("new adress", response.data.data[lastIndex])
      setgetAddressData(response.data.data[lastIndex]); // Set the fetched data in the state
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchAddressData();
  }, []);



  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(type);
    axios
      .post(`${BASE_Url}/customer/create-address/${id}`, {
        address: address,
        address_type: type,
        street: street,
        store_id: storeId,
        saas_id: saasId,
        pincode: pincode,
        city: city,
        state: state,
        customer_type:userType,
      })
      .then((res) => {
        if (res.data) {
          fetchAddressData()
         
          console.log(res.data.message);
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: res.data.message,
            timer: 1000
          }).then(() => {
            console.log("handleUpdateAddressforUserResponse",res.data.data)
            localStorage.setItem('userAddressData', JSON.stringify(res.data.data));
            dispatch(handleUpdateAddressforUserResponse(res.data.data));
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An error occurred while processing your request.',
        });
      });
  };
 
 
  useEffect(() => {
    if(activeStep==2){
     if(getAddressData){
       setActiveStep(3)
     }
    }
   }, [activeStep,getAddressData])

  const [phoneNumber, setPhoneNumber] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const resendOtp = async () => {
    try {
      const response = await axios.get(`${BASE_Url}/otp/resend-otp/${phoneNumber}`);
      console.log(response.data);
      if(response.data.status){

        setShowOtpInput(true);
      }
      // Handle the response or update your component state here
    } catch (error) {
      console.error('Error:', error);
      // Handle errors here
    }
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleVerifyClick = () => {
    resendOtp();
  };
  const [otp, setOtp] = useState('');
  // const [verificationStatus, setVerificationStatus] = useState('');
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };
  const handleVerifyOtpClick = async () => {
    try {
      const response = await axios.post(`${BASE_Url}/otp/validate-otp`, {
        mobile_no: phoneNumber,
        otp: otp
      });
      console.log(response.data);
      if(response.data.status){
        setTimeout(() => {
          handleNext();
        }, 1000);
 
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: response.data.message,
          timer: 1000
        })
      }
      // setVerificationStatus(response.data.status);
      // Handle the response or update your component state here
    } catch (error) {
      console.error('Error:', error);
      // Handle errors here
    }
  };

  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const fetchAreaData = async () => {
      try {
        const response = await axios.get(`${BASE_Url}/areamaster/get-all-area-master`);
        setAreas(response.data.data); // Assuming the API response is an array of areas
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAreaData();
  }, []); // Empty dependency array ensures useEffect runs only once on mount
  return (
    <>
    <div>
    <Row>
      <Col xs={12} className='mt-3' sm={1} style={{ marginLeft: "70px" }}>
      <ArrowBackIcon onClick={handleBack}/> </Col>
      <Col >
      <Stepper className='mt-3' activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      </Col>
     </Row>
      <Row>
      <Col xs={12} sm={4} style={{ marginLeft: "70px" }}>
      <Row className="mt-2">
      {cardData && cardData.length > 0 && (
  <div className="card mx-3 mt-3" style={{ width: '18rem' }}>
    <img
      className="card-img-top img-fluid w-75"
      src={`${BASE_Url}/item/get-image/${cardData[0].item_id || cardData[0].productId}`}
      alt="Card image 1"
    />
  </div>
)}
      </Row>
    </Col>
        <Col  >
          <div>
            {activeStep === steps.length ? (
              <div>
                <Typography>All steps completed</Typography>
              </div>
            ) : (
              <div>
                {/* <Typography>{`Step ${activeStep + 1}`}</Typography> */}
                {activeStep === 0 && (
                  <TextField
                    label="Bag"
                    name="bag"
                    value={formData.bag}
                    onChange={handleChange}
                  />
                )}
                {activeStep === 1 && (
                  <>
                   <div className='mt-5'>
                    <Row>
      <TextField
        label="Mobile Number"
        name="mobileNumber"
        style={{ width: "40%" }}
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
      />  </Row>
      <Row> {showOtpInput && (
       
       <TextField
         label="Enter OTP"
         name="otp"
         className='mt-2'
         style={{ width: '40%' }}
         value={otp}
         onChange={handleOtpChange}
       />
    
   )}</Row>   </div>
   <Row>
      <Button
        type="button"
        className="fw-bold mt-3"
        style={{
          width: "40%",
          // float: "left",
          backgroundColor: "#ffc107",
          color: "black",
          outline: "none",
          border: "none",
          fontSize: "16px",
          fontFamily: "Roboto"
        }}
        onClick={showOtpInput ? handleVerifyOtpClick : handleVerifyClick}
      >
       {showOtpInput ? 'Verify OTP' : 'Verify Mobile Number'}
      </Button>
      </Row>
                 
                  </>
                )}
                {activeStep === 2 && (
                  <>
               
            <div className="container p-3 col-lg-5 col-md-10 col-sm-12 px-2">
              <form className="form-box" onSubmit={handleSubmit}>
              
                <div>
                  <TextField
                    size="small"
                    type="text"
                    className="form-control my-2"
                    id="customer-name"
                    label="Address"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                </div>
                <div>
                <input
  type="text"
  list="areas"
  id="street"
  name="street"
  placeholder='Street'
  value={street}
  onChange={(e) => setStreet(e.target.value)}
  className="form-control my-2"
/>
    <datalist id="areas">
  {areas.map((area, index) => (
    <option key={index} value={area.area_name} />
  ))}
</datalist>
  
                </div>
                <div
                  className="my-3"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-TextField mx-2"
                      type="radio"
                      name="inlineRadioOptions"
                      value={"OFFICE"}
                      // required
                      onChange={onOptionChange}
                      id="inlineRadio4"
                      // value="option1"
                    />
                    <label className="form-check-label" for="inlineRadio4">
                      Office
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-TextField mx-2"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio5"
                      value={"HOME"}
                      // required
                      onChange={onOptionChange}
                    />
                    <label className="form-check-label" for="inlineRadio5">
                      Home
                    </label>
                  </div>
                </div>

                <div>
                  <TextField
                    size="small"
                    type="text"
                    className="form-control my-2"
                    id="customer-name"
                    label="Pincode"
                    value={pincode}
                    onChange={(e) => {
                      setPincode(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <TextField
                    size="small"
                    type="text"
                    className="form-control my-2"
                    id="customer-name"
                    label="City"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <TextField
                    size="small"
                    type="text"
                    className="form-control my-2"
                    id="customer-name"
                    label="State"
                    value={state}
                    onChange={(e) => {
                      setState(e.target.value);
                    }}
                  />
                </div>

                <div className="d-flex justify-content-center">
                  <Button
                    //   to={"/home"}
                    type="submit"
                    className="fw-bold " style={{
                      width: "50%",
                      float: "feft",
                      backgroundColor: "#ffc107",
                      color: "black",
                      outline: "none",
                      border: "none",
                      fontSize: "18px",
                      fontFamily: "Roboto"
                    }} 
                    >
                    Save
                  </Button>
                
                </div>
              </form>
            </div>
       
                    {/* <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            <Button variant="contained" color="primary" onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button> */}
            </>
                )}
                {activeStep === 3 && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {/* --------------- */}

                    {/* --------------- */}
                    <div className="card w-50 border-black d-flex justify-content-center ">
                      <ul
                        className="m-2"
                        style={{ listStyle: "none" }}

                      >
    {/* <input
                          type="radio"
                          id="onlinePayment"
                          name="paymentMethod"
                          value="onlinePayment"
                          className="btn btn-warning m-1"
                        />
                        <label htmlFor="onlinePayment">Pay Online</label> */}

                    <input
  type="radio"
  id="onlinePayment"
  name="paymentMethod"
  value="onlinePayment"
  className="btn btn-warning m-1"
  disabled  // Add the disabled attribute here
/>
<label htmlFor="onlinePayment" style={{ color: 'gray' }}>
 {saasId==="6" ? "Cash On delivery" : "Pay Online"} 
</label>


                        {/* <img
                          className="rounded-pill"
                          src={Paytm} 
                          alt="Paytm Icon"
                          width="30"
                          height="20"
                        /> */}
                      </ul>
                      <span className='mx-4 fw-semibold'> **Most Trusted Maxim Rider</span>
                    </div>
                    <div className="card border-black mt-2 w-50 d-flex justify-content-center ">
                      <ul
                        className="m-2"
                        style={{ marginLeft: "0px" }}

                      >
                        <input
      type="radio"
      id="cashOnDelivery"
      name="paymentMethod"
      value="COD"
      className="btn btn-warning m-1"
      onChange={handlePaymentMethodChange}
    />
                        <label htmlFor="cashOnDelivery">{saasId=="6"?"Pay by Credit":"Pay COD"}</label>
                      </ul>
                    </div>
                    <div className=" card border-black mt-2 w-50 d-flex justify-content-center ">
                      <ul className="m-2">
                      <input
      type="radio"
      id="WALLET"
      name="paymentMethod" 
      value="WALLET"
      className="btn btn-warning m-1"
      onChange={handlePaymentMethodChange}
    />
                        <label htmlFor="PayWallet">Pay Wallet <span className='fw-bold' style={{color:"green", fontSize:"20px"}}> (₹{userData.incomeLevel}) </span></label><br/>
                        <Button className='fw-bold rounded-pill' style={{
                      width: "40%",
                      float: "feft",
                      height:"22px",
                      backgroundColor: "#ffc107",
                      color: "black",
                      outline: "none",
                      border: "none",
                      fontSize: "11px",
                      fontFamily: "Roboto"
                    }} onClick={()=>setModalShow(true)}>Add Amount</Button>
                      </ul>
                    </div>

                    <div
                      className="mt-3"
                      style={{
                        width: "50%",
                        display: "flex",
                        flexDirection: "column",
                        // alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <p className="fw-bold"

                        style={{
                          color: "black",
                          outline: "none",
                          border: "none",
                          fontSize: "18px",
                          fontFamily: "Roboto"
                        }}
                      >
                        Bill Details
                      </p>
                      <Row className="fw-bold">
                        <Col>ITEMS</Col>
                        <Col> {cardData?.length > 0 ? cardData?.length  : ""}</Col>
                      </Row>
                      <Row className="fw-bold">
                        <Col>  Total Amount :</Col>
                    <Col> 
                   { invoiceValue}
    </Col> 
                      </Row>
                      <Row className="fw-bold">
                        <Col>  Billing Address :</Col>
                    <Col> 
                   { getAddressData && getAddressData?.address  } { getAddressData && getAddressData?.pincode  }
    </Col> 
                      </Row>
                    </div>

                    <Button className="fw-bold mt-5" style={{
                      width: "50%",
                      float: "feft",
                      backgroundColor: "#ffc107",
                      color: "black",
                      outline: "none",
                      border: "none",
                      fontSize: "18px",
                      fontFamily: "Roboto"
                    }}  onClick={handlePlaceOrder}> PLACED ORDER </Button>
                
                  </div>

                )}

              </div>
            )}
          </div>
        
        </Col>
      </Row>
    </div>
    <AddMoneyWalletModal show={modalShow}  onHide={() => setModalShow(false)}/>
  
    </>
  );
};

export default StepperForm;
