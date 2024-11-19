import React from 'react'
import '../CustomerLoan/CsutomerLoan.css'; 
import { BASE_Url } from '../../URL';
import {
  handleBahikhataPartyDropdownRequest,
  handleBahikhataCreateRequest,
  handleOpneMenuRequest
} from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import F5 from "../../assets/QRImageRetailer.jpg"
import {
  
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  CustomInput
} from "reactstrap";
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';
function PayFileCharges() {
  const dispatch = useDispatch();
  const { storeId,userType ,saasId,userId,id} = JSON.parse(localStorage.getItem("User_data"));
 const navigate = useNavigate()
  const inputStyle = {
    width: '100%',
    maxWidth: '300px', // Adjust the max-width as needed
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
  };

  // Use a media query in JavaScript to modify the inline styles for smaller screens
  if (window.innerWidth <= 768) {
    inputStyle.maxWidth = '100%'; // Use full width on smaller screens
  }
  const location = useLocation()
  const TabeName =[
    {
      name:"Pay File Charges",
      isActive: location.pathname =='/PayFileCharges'? true:false
    },
    {
      name:"Complete KYC",
      isActive:location.pathname =='/CompleteKYC' ?true:false
    },
    {
      name:"Request For Loan",
      isActive: location.pathname =='/Requestforloan'? true:false
    }
  ]
 const [RefNo, setRefNo] = useState('')
  const PayFileCharges =async()=>{
    try {
      
      const response =await axios.post(`${BASE_Url}/kyc/add-payment-reference/${saasId}/${storeId}/${userType=="CUSTOMER"?id:userId}/${RefNo}`)
      if(response.data.status){
        if(userType =="CUSTOMER"){
          navigate('/CompleteKYC')

        }
        Swal.fire({
          title: 'Pyamnet Done',
          timer: 1000
        })
      }
    } catch (error) {
      console.log(error)
      
    }
  }

  return (
    <section >
     <div className="container"
    style={{backgroundColor: "rgb(253, 238, 204)",height:"fit-content"
    }}>

<div className="row d-flex justify-content-center" >
<div className="d-flex mt-3 justify-content-center">
             <Link
                  to="/"
                  type="submit"
                  className="text-decoration-none"
                  onClick={() => dispatch(handleOpneMenuRequest(false))}
                  style={{
                    color: "black",}}
                
                > <i className="fa-solid fa-chevron-left mt-1"></i></Link> 
             {userType === "CUSTOMER"? TabeName.map((item)=>{return(<h4 className='text-nowrap fs-6'  style={{fontFamily:"bold", marginLeft: "3px", color:item.isActive?"blue":""}}>{item.name}{item.name=="Request For Loan"?"":<i class="fa-solid fa-arrow-right"></i>}</h4>)}):<h4  style={{fontFamily:"bold", marginLeft: "10px"}}>Pay File Charges</h4>}
             </div>
<div className="col-lg-5 col-md-10 col-sm-12 px-5">



 <div style={{
                                            boxShadow: "0 2px 12px rgba(36, 36, 39, .12)",
                                            borderRadius: ".75rem",
                                            overflow: "hidden",
                                            background:"white",
                                            padding: "10px"
                                        }}>
  <div className=" d-flex justify-content-center mt-2"    >

  <img src={F5} style={{width:"300px"}} alt="" />

   
   
  </div>
  <div  className=" d-flex justify-content-center mt-2"> 
  <p className="TEXT_855_90">sahnnmck34@icici</p>

  </div>
  <div  className=" d-flex justify-content-center" >  <p className="TEXT_855_91">Scan and pay with any BHIM UPI app</p>
  </div>

  <div className=" d-flex justify-content-center mt-2">
      <svg
        className="mt-2"
        width={70}
        height="17.56443214416504"
        viewBox="0 0 70 27.56443214416504"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="d3598f993fe1c417ba049dfa7f060748545a62b2"
            patternUnits="userSpaceOnUse"
            width={70}
            height="27.56443214416504"
          >
            <image
              href="https://s3-alpha-sig.figma.com/img/d359/8f99/3fe1c417ba049dfa7f060748545a62b2?Expires=1699833600&Signature=fzA5f0hRbYHni5-elMNppIPoY~deFVPpeFAGuK0TCZfmAKgufCrLgBLpQFjKDExwDhX4rsTazz6748ZcXesTHKuMbo2VAPQTasuSsSkPyKvvpLAfjTKXVr4zmgRVJsJqYXRLY07MnBbzH2Zn56qQvAL4pfw5ubUDoOa20bopz51WRaelqI~RTX7b1bsu8KU4mCO1Fuqd~hgiCiNxelEAvCRH7zEY6SinPAVDbhUnNy9zWpoORWGfWlsHLUgW9p65MUfos~bMr1DMlwCva8ZjpzRWlrCTNaTmJ8NpZ9zCO2sQ1YMD~xU8CGTRPc0VEwF4HBkYBqIoSWdIGq2kj1W0vw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
              x={0}
              y={0}
              width={70}
              height="37.56443214416504"
            />
          </pattern>
        </defs>
        <path
          d="M0 0L70 0L70 27.5644L0 27.5644L0 0Z"
          fill="url(#d3598f993fe1c417ba049dfa7f060748545a62b2)"
        />
      </svg>
      <svg
        className=""
        width={70}
        height="37.658466339111328"
        viewBox="0 0 70 17.658466339111328"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="567ea3bb27fb4a7ecd27cbec081ddcad8c94f453"
            patternUnits="userSpaceOnUse"
            width={70}
            height="17.658466339111328"
          >
            <image
              href="https://s3-alpha-sig.figma.com/img/567e/a3bb/27fb4a7ecd27cbec081ddcad8c94f453?Expires=1699833600&Signature=qAbh7B~ffdUoELXv4BOa4cw912BDHbwlJoHiPFikEDLX2TDMYVuEG-lCVu5r3SnUyZWeg8iD9lOnZnMSDu~pLIizTMp7jFdqINY8DhFLBBKc4PrBuUDJGinhq8JFoIw20ZKs~4RaLJGmWjM3YSuI5QNekOIdkW3medrIgfocI9Lyf31Jw27mE~ix78mrTcvR7nt-j1Y0QKk26d~b4iDXwEUjvzckeps8UhDhQOY5dXuMfEF9W7WOZQBFevsrtSKMTeU47pr4opO6Lx8~Gje36i~LAd6aCbIq9uPWZtTFT6rvE0OvsgwaVjktXnvfNty1KyBY5RYudtJPsfnaM60-Kw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
              x={0}
              y={0}
              width={70}
              height="17.658466339111328"
            />
          </pattern>
        </defs>
        <path
          d="M0 0L70 0L70 17.6585L0 17.6585L0 0Z"
          fill="url(#567ea3bb27fb4a7ecd27cbec081ddcad8c94f453)"
        />
      </svg>
      <svg
        className=""
        width={70}
        height="38.68692398071289"
        viewBox="0 0 70 38.68692398071289"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="b7dcf16c0d08773468958e928177bebe9fcd341b"
            patternUnits="userSpaceOnUse"
            width={70}
            height="38.68692398071289"
          >
            <image
              href="https://s3-alpha-sig.figma.com/img/b7dc/f16c/0d08773468958e928177bebe9fcd341b?Expires=1699833600&Signature=TB~VUbX8UcpEgbY~j3bI9VbGJ8i-e~HilsB9zO0~9agY8Qp0nII4k8E0EZun6w8prYQD8oLllPZXPoBOQaa6ni6qaBGwbjT1wMQ88PaxK~aowuszvkP-x87UIxDObHDKMNaagfc7A4nc8O-alHZWLVHOFJ5arTldi~X6F59IJqXnSl~SFMvuV5LRAGeaYQGiEozoQBbGM0FXW3L5cpvcXDjd7VDEOypgRhLVqPrrettWQE2gERvBwhNv~EbFqwL~K4ain48qjwoL2DgxRYmQ00EPk3vHnpuDcAvJugULIixuTLXvDA~GlTbuq4Yial8gbaS1v730PynkPE3ydgUu9w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
              x={0}
              y={0}
              width={70}
              height="38.68692398071289"
            />
          </pattern>
        </defs>
        <path
          d="M0 0L70 0L70 38.6869L0 38.6869L0 0Z"
          fill="url(#b7dcf16c0d08773468958e928177bebe9fcd341b)"
        />
      </svg>
      <svg
      style={{marginTop:" -25px"
      }}
      className=""
      width="127.43243408203125"
      height="90.97195434570312"
      viewBox="0 0 207.43243408203125 128.97195434570312"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="dd5f7bcd691eec31e3230877c2fd1c0d071733d2"
          patternUnits="userSpaceOnUse"
          width="207.43243408203125"
          height="128.97195434570312"
        >
          <image
            href="https://s3-alpha-sig.figma.com/img/dd5f/7bcd/691eec31e3230877c2fd1c0d071733d2?Expires=1699833600&Signature=n-NYQRYR2a-Sit5IMWwWmOI~BOmo41h80S8PhNyDHmMZ4tmwRIaQPcK9P5jqJYiv1c6ak~ILYZeZct78Tv3VM1yvyXJL3cidaRsuUqIdb0YPlNuDZjWDdmA9bA1mxmHpdvV3lyqc4WCMbVGt9tadEmd9gJAatAnhSEz1GwTmpc9afWZFsgC5u2QtaMlGPwfAP0ep8vo0HuUgqZFe~Ps3ZdP8sdqM4yVT3GDfybAfDLADV704m2pihH1~00UV5qSHUb68eCGsCx4Ya9Uwy6q-TBzYkTI~X6h1Z8lLxOzOu0WOeBA3HiBwJCUEi2Vhs~sgrvuEW2q24Ip6rqQJXEuuJA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            x={0}
            y={0}
            width="207.43243408203125"
            height="128.97195434570312"
          />
        </pattern>
      </defs>
      <path
        d="M0 0L207.432 0L207.432 128.972L0 128.972L0 0Z"
        fill="url(#dd5f7bcd691eec31e3230877c2fd1c0d071733d2)"
      />
    </svg>
    </div>
  </div>
 
  <Form >
              <Row className="mt-2">
                <Col md={12}>
                  <FormGroup>
                    <Label       style={{color: "#000",

fontFamily: "Segoe UI",
fontSize: "24px",
fontStyle: "normal",
fontWeight: "600",
lineHeight: "normal"}}>
                      Payment Reffrence <span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setRefNo(e.target.value);
                      }}
                      value={RefNo}
                      required={true}
                      placeholder="Enter Payment Reffrence "
                      style={{boxShadow: "0 2px 12px rgba(36, 36, 39, .12)",
                      borderRadius: ".75rem",
                      overflow: "hidden"}}
                    />
                  </FormGroup>
                </Col> </Row>
            </Form>
  <div className="mt-2 mb-5 d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-block"
                  style={{
                    backgroundColor:"var(--Acc-1, #457FD4)",
                    outline: "none",
                    border: "none",
                    fontSize: "14px",
                    padding: "10px 140px",
                    borderRadius: "10px",
                    color: "#fff",
                  }}
                  onClick={PayFileCharges}
                >
                  Submit
                </button>
           
              </div>
</div></div></div>

        </section>
  )
}

export default PayFileCharges