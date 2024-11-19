import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, json, useParams } from "react-router-dom";
import {
  handleRegisterRequest,
  handleStoreNameRequest,
  handleLoginRequest
} from "../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { toast } from "react-toastify";
// import { Email } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_Url } from "../URL";
import AddToHomeScreenButton from "./AddToHome";
import Swal from "sweetalert2";
import { Button, Col, Row } from "reactstrap";
const Register = ({handleInstallClick,installButtonVisible}) => {
  const navigate = useNavigate();
  const [storeData, setStoreData] = useState("");
  const params = useParams();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [storeName, setStoreName] = useState("");
  const [storeId, setStoreId] = useState("");
  const [saasId, setSaasId] = useState("");
  const [registerId, setRegisterId] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [brandLogo, setBrandLogo] = useState("");
  const [taxable, setTaxable] = useState("");
  const [gstCode, setGstCode] = useState("");
  const [hsnCode, setHsnCode] = useState("");
  const [storeType, setStoreType] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");


  const [phoneNumber, setPhoneNumber] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showNamePassword, setshowNamePassword] = useState(false);
  const resendOtp = async () => {
    try {
      const response = await axios.get(`${BASE_Url}/otp/resend-otp/${phoneNumber}`);
      console.log("firstapply",response.data);
      if(response.data.status){

        setShowOtpInput(true);
      }
      
      // Handle the response or update your component state here
    } catch (error) {
      if(error.response.data.message== "User Already Registered"){

        Swal.fire({
          icon: 'error',
          title:'User Already Exist',
          timer: 2000
        })

        setTimeout(() => {
          navigate("/login");
        }, 2000);
   
      }
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
       
        setshowNamePassword(true)
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




  const onOptionChange = (e) => {
    setTaxable(e.target.value);
    console.log("E TARGET VALUE", e.target.value);
  };
  const onOptionStoreChange = (e) => {
    setStoreType(e.target.value);
    console.log("E TARGET VALUE", e.target.value);
  };

  console.log("PARAMS", params);

  // useEffect(() => {
  //   if (params.saasId && params.storeId) {
  //     navigate("/login");
  //   }
  // }, [saasId, storeId]);

  const handleSubmit = (e) => {
    e.preventDefault();
  
      if (phoneNumber.length === 10) {
        dispatch(
          handleRegisterRequest({
            mobile_number: phoneNumber,
            password: password,
            customer_name: userName,
            store_id: params.storeId,
            
            saas_id: params.saasId,
          })
        );

        // Redirect to login after successful registration
        setTimeout(() => {
          dispatch(
            handleLoginRequest({
              user_name: phoneNumber,
              password: password,
            })
          );
        }, 500); // Adjust the timeout duration as needed

        setMobile('');
        setPassword('');
        setConfirmPassword('');
        setUserName('');
        setEmail('');
      } else {
        toast.error('Invalid Mobile Number!');
      
    } 
  };
 

  const userData = async () => {
    axios
      .get(
        `${BASE_Url}/user-master/get-retailer-store-name/${params.saasId}/${params.storeId}`
      )
      .then((res) => {
        console.log("RESPONSE STORE DATA", res.data.data.store_name);
        setStoreData(res.data.data.store_name);
      });
  };

  useEffect(() => {
    userData();
  }, []);

 
const redirectLogin =()=>{
   localStorage.clear();
  navigate("/login")
}
  return (
    <>
    <section>
      <Row>
        <Col  xs={12} sm={4}> <div style={{  backgroundColor: "#ad8fec",
  height: "524px",
  overflow: "hidden",
  // position: "relative",
  }}>
    <div className="d-flex justify-content-around" style={{marginTop:"100px"}}><img 
  style={{width:"200px"}}
          className="nanoomnipos-logo "
          alt="Nanoomnipos logo"
          src="https://cdn.animaapp.com/projects/65c32e74b22a476955a95f3a/releases/65c32e95a111d9ebe1d3013d/img/nanoomnipos-logo-1.png"
        /></div></div> </Col>
        <Col xs={12} sm={8}>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-5 col-md-10 col-sm-12">
            <form className="form-box" >
             <Row>
              <h5 className="mt-5 fw-bold" style={{ textAlign: "center" }}>SignUp</h5></Row>
              <div className='mt-2'>
                    <Row>
      <TextField
        label="Mobile Number"
        name="mobileNumber"
     
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
      />  </Row>
      <Row> {showOtpInput && (
       
       <TextField
         label="Enter OTP"
         name="otp"
         className='mt-2'
      
         value={otp}
         onChange={handleOtpChange}
       />
    
   )}</Row>   </div>
   {/* <Row>
      <Button
        type="button"
        className="fw-bold mt-3"
        style={{
         
          
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
      </Row> */}

              {showNamePassword && <>
                <Row> 
                <TextField
                 
                  type="text"
                  className="form-control mt-2"
                  id="customer-name"
                  label="Customer Name"
                  value={userName}
                  required
                  onChange={(e) => setUserName(e.target.value)}
                />
           

              
              </Row>
              <div
                className="d-flex mt-2 flex-col"
                style={{ display: "flex", flexDirection: "column" }}
              >
                {/* <TextField
                  size="small"
                  type="number"
                  inputProps={{ maxLength: 10 }}
                  className="form-control my-2"
                  id="customer-name"
                  label="Enter Your Mobile Number"
                
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
              
                /> */}

             

                <Row
                
                >
                  <TextField
                   
                    type="password"
                    className="form-control mt-2"
                    id="customer-name"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    label="Password"
                  />
              
                </Row>
              </div>
           

             </> }
             <div className="mt-2">
                <Button
                  style={{
                    backgroundColor: "#20b9e3",
                    outline: "none",
                    border: "none",
                    fontSize: "20px",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    background: "#ECE447",
                    width: "100%",
                    color:"black"
                  }}
                  onClick={showNamePassword ? handleSubmit : (showOtpInput ? handleVerifyOtpClick : handleVerifyClick)}
>
  {showNamePassword ? 'SignUp' : (showOtpInput ? 'Verify OTP' : 'Verify Mobile Number')}
</Button>
          
                <p
                  className="mt-3"
                  style={{
                    color: "#808080",
                    fontFamily: "Segoe UI",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHight: "normal",
                    textAlign: "center",
                  }}
                >
                  Already have an account?{" "}
                  <span className="fw-bold" onClick={()=>redirectLogin()} style={{ textDecoration: "none", color:"blue", cursor:"pointer" }}>
                    Login
                  </span>
                </p>
              </div>
            </form>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AddToHomeScreenButton installButtonVisible={installButtonVisible} handleInstallClick={handleInstallClick} />
            </div>
          </div>
        </div>
      </div></Col>
      </Row>
    </section>
    </>
  );
};

export default Register;
