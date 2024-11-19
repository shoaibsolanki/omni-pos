import React, { useEffect, useState } from "react";
import { Row, Col, FormGroup, Input, Button, Form } from "reactstrap";
import { FaUserAlt } from "react-icons/fa";
// import Billboard from "../../assets/images/logo.png";
// import Billboard from "../../assets/images/logo1.jpeg";
// import { handleLoginRequest } from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { handleLoginRequest } from "../../src/redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { useDispatch } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BASE_Url, isDev } from "../URL";

import AddToHomeScreenButton from "./AddToHome";
import axios from "axios";
import Swal from "sweetalert2";
import ForgotPasswordModal from "./CustomerProfile/ForgotPasswordModal";
import { Typography } from "@mui/material";
const Login = ({handleInstallClick,installButtonVisible}) => {
  const params = useParams();
  console.log("LOGIN PARAMS", params);
  const navigate = useNavigate();
  // console.log("NAVIGATE", navigate());
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (isDev === true) {
      setUsername("80001");
      setPassword("demo123");
    }
  }, [isDev]);

  const userData = async () => {
    axios
      .get(
        `${BASE_Url}/register/business-name/${params.BU}`
      )
      .then((res) => {
        console.log("RESPONSE STORE DATA", res);
        setUsername(res.data.data.username);
        setPassword(res.data.data.password);
        setData(res.data.data)
        // setStoreData(res.data.data.store_name);
      }).catch((error)=>{
        // console.log("error occure",error)
        Swal.fire("Not Allow", `Please Give Correct URL`, "error");
      });
  };

  useEffect(() => {
    if (params.BU) {
      console.log("INN");
      userData();
    }
  }, []);

  useEffect(() => {
    if(data){
      dispatch(
        handleLoginRequest({
          user_name: username,
          password: password,
        })
      );
    }
  }, [data])
  

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("USERNAME", username);
    console.log("PASSWORD", password);

    // const params = {
    //   username,
    //   password,
    // };
    localStorage.clear();
    dispatch(
      handleLoginRequest({
        user_name: username,
        password: password,
      })
    );
    // localStorage.setItem("token", "87xiuiu89udjw990");
    // setTimeout(() => {
    //   window.location.replace("/");
    // }, 500);
  };
  
  const { saasId, storeId, } = localStorage.getItem(
    "User_data"
  )
    ? JSON.parse(localStorage.getItem("User_data"))
    : {};
  const redirectLogin =()=>{
    navigate(`/${saasId}/${storeId}`)
 }


 const [isModalOpen, setIsModalOpen] = useState(false);

 const handleOpenModal = () => {
   setIsModalOpen(true);
 };
 const handleCloseModal = () => {
  setIsModalOpen(false);
};
  return (
    <>
    {!data ?
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
    <div className="container mt-5 mx-5">
      
      <div className="container">
    
              
        <div
          className="my-4"
          style={{
            textAlign: "center",
            // fontWeight: "bold",
            fontSize: "20px",
            // border: "1px solid black",
            fontFamily:"sans-serif",
            width:"50%"
          }}
        >
         Login
       
        </div>
        <Form onSubmit={handleSubmit}>
          
          <Row>
            <Col>
         
              <FormGroup>
                <Input
                  type="text"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  value={username}
                  required={true}
                  placeholder="Username"
                  style={{width:"50%"}}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Input
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                  required={true}
                  placeholder="Password"
                  style={{width:"50%"}}
                />
              </FormGroup>
         
            </Col>
            <Typography variant="body2" color="textSecondary" align="center" style={{  position:"relative",left:"-57px",marginTop: "-10px" }}>
            <Link component="button" onClick={handleOpenModal}>
              Forgot Password?
            </Link>
          </Typography>
          </Row>
          
          <Button
            color="primary"
            className="mt-2"
            type="submit"
            style={{
              backgroundColor: "#20b9e3",
              outline: "none",
              border: "none",
              fontSize: "20px",
              padding: "10px 20px",
              borderRadius: "8px",
              background: "#ECE447",
              width:"50%",
              color: "#000",
            }}
          >
            Login
          </Button>
        
        </Form>

        <ForgotPasswordModal isOpen={isModalOpen} onClose={handleCloseModal} />
        {/* <div style={{ marginTop: "10px" }}>
          <small>Forgot Password</small>
          <small>Don’t have an Account?  <span className="fw-bold" onClick={()=>redirectLogin()} style={{ textDecoration: "none", color:"blue", cursor:"pointer" }}>
                    SignUp
                  </span></small>
        </div> */}
        {/* <div className="mt-4">
          <Link to="/register">
            <h2>Sign Up</h2>
          </Link>
        </div> */}
        {/* <p
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
          Don’t have an account?
          <Link
            to="/register"
            // to={`/register/{}`}
            style={{ textDecoration: "none" }}
          >
            Signup
          </Link>
        </p> */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 10,
            justifyContent: "center",
          }}
        >
          {/* <AddToHomeScreenButton installButtonVisible={installButtonVisible} handleInstallClick={handleInstallClick} /> */}
        </div>
      </div>
    </div>
    </Col></Row>
     :<>
    <div>loding</div>
    </>}</>
  );
};

export default Login;
