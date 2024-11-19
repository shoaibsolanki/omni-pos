import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    Button,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
  } from "reactstrap";
  import Flatpickr from "react-flatpickr";
  import {
    handleBahikhataPartyDropdownRequest,
    handleBahikhataCreateRequest,
    handleOpneMenuRequest
  } from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_Url } from '../../URL';
import { useState } from 'react';
import moment from 'moment';
import Swal from 'sweetalert2';
function CompleteKYC() {
    const [kyc, setKyc] = useState(
        {applicant_name:"",father_name:"",mobile_number:"",
        addhaar_number:"",pan_no:"",nationality:"",user_name:"",email:"",bank_name:"",accountNo:"",ifsccode:"",acc_holder_name:""})
const { storeId, saasId,userId ,userType} = JSON.parse(localStorage.getItem("User_data"));
const [date, setdate] = useState()
const navigate = useNavigate()
console.log(saasId,storeId)
    const dispatch = useDispatch();
     const Body ={
        customer_id: userId,
        applicant_name: kyc.applicant_name,
        father_name: kyc.father_name,
        mobile_number: kyc.mobile_number,
        addhaar_number: kyc.addhaar_number,
        // communication_address: "123 Main St, City, Country",
        // permanent_addres: "456 Elm St, City, Country",
        email:kyc.email,
        bank_name:kyc.bank_name,
        account_holder_name:kyc.acc_holder_name,
        account_number:kyc.accountNo,
        ifsc_code:kyc.ifsccode,
        pan_no: kyc.pan_no,
        date_of_birth: moment(date).format('yyyy MM DD'),
        nationality: kyc.nationality,
        user_name: kyc.user_name,
        date_of_application: new Date(),
        store_id: storeId,
        saas_id: saasId
      }
    const HanldeSubitKyc= async (e)=>{
        e.preventDefault()
        try {
          const response=await axios.post(`${BASE_Url}/kyc/create`,Body)
          if(response.data.status){
            navigate('/')
          }
          console.log("this kyc", response)
        } catch (error) {
            console.log(error.response.data.message)
            Swal.fire({title: `${error.response.data.message}`,
            icon:"info",
            timer: 1000})
        }
    }
    const onChange = (e) => {
        setKyc({ ...kyc, [e.target.name]: e.target.value })
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
  return (
    <div className="container"
    style={{backgroundColor: "rgb(253, 238, 204)",height:"fit-content"
    }}>

<div className="row d-flex justify-content-center" styel={{height: "fit-content"}}>
<div className="col-lg-5 col-md-10 col-sm-12 ">
    
<Form >
        <div className="d-flex mt-3 justify-content-center">
             <Link
                  to="/"
                  type="submit"
                  className="text-decoration-none"
                  onClick={() => dispatch(handleOpneMenuRequest(false))}
                  style={{
                    color: "black",}}
                
                > <i className="fa-solid fa-chevron-left mt-1"></i></Link> 
                {/* <div className=''> */}
{userType === "CUSTOMER"? TabeName.map((item)=>{return(<h4 className='text-nowrap fs-6'  style={{fontFamily:"bold", marginLeft: "3px", color:item.isActive?"blue":""}}>{item.name}{item.name=="Request For Loan"?"":<i class="fa-solid fa-arrow-right"></i>}</h4>)}):<h4  style={{fontFamily:"bold", marginLeft: "10px"}}>CompleteKYC</h4>}
                {/* </div> */}
             </div>

          <ModalBody>
            <Row className='px-4'>
           
           

            
              <Col md={12}>
                <FormGroup>
                  <Label>
                  User Name <span className="text-red"> * </span>
                  </Label>
                  <Input
                    style={{
                      fontStyle: "italic",
                      fontFamily: "Arial, sans-serif",
                    }}
                    type="text"
                    name='user_name'
                    onChange={onChange}
                    // rows={4}
                    placeholder="User Name "
                  />
                </FormGroup>
              </Col>

              <Col md={12}>
                <FormGroup>
                  <Label>
                  Mobail Number <span className="text-red"> * </span>
                  </Label>
                  <Input
                    style={{
                      fontStyle: "italic",
                      fontFamily: "Arial, sans-serif",
                    }}
                    type="number"
                    name='mobile_number'
                    onChange={onChange}
                    // onChange={(e) => {
                    //   const val = e.target.value;
                    //   setBahikhataArr({ ...bahikhataArr, amount: val });
                    // }}
                    // value={bahikhataArr.amount}
                    // required={true}
                    // rows={4}
                    placeholder="Enter Your Mobail Number"
                  />
                </FormGroup>
              </Col>

             
              <Col md={12}>
                <FormGroup>
                  <Label>
                  Email<span className="text-red"> * </span>
                  </Label>
                  <Input
                    style={{
                      fontStyle: "italic",
                      fontFamily: "Arial, sans-serif",
                    }}
                    type="email"
                    name='email'
                    onChange={onChange}
                    // onChange={(e) => {
                    //   const val = e.target.value;
                    //   setBahikhataArr({ ...bahikhataArr, amount: val });
                    // }}
                    // value={bahikhataArr.amount}
                    // required={true}
                    // rows={4}
                    placeholder="Enter Your Email"
                  />
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
                  <Label>
                  Bank Name<span className="text-red"> * </span>
                  </Label>
                  <Input
                    style={{
                      fontStyle: "italic",
                      fontFamily: "Arial, sans-serif",
                    }}
                    type="text"
                    name='bank_name'
                    onChange={onChange}
                    // onChange={(e) => {
                    //   const val = e.target.value;
                    //   setBahikhataArr({ ...bahikhataArr, amount: val });
                    // }}
                    // value={bahikhataArr.amount}
                    // required={true}
                    // rows={4}
                    placeholder="Enter Your Bank Name"
                  />
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
                  <Label>
                  Account Number<span className="text-red"> * </span>
                  </Label>
                  <Input
                    style={{
                      fontStyle: "italic",
                      fontFamily: "Arial, sans-serif",
                    }}
                    type="number"
                    name='accountNo'
                    onChange={onChange}
                    // onChange={(e) => {
                    //   const val = e.target.value;
                    //   setBahikhataArr({ ...bahikhataArr, amount: val });
                    // }}
                    // value={bahikhataArr.amount}
                    // required={true}
                    // rows={4}
                    placeholder="Enter Your Account Number"
                  />
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
                  <Label>
                  IFSC Code<span className="text-red"> * </span>
                  </Label>
                  <Input
                    style={{
                      fontStyle: "italic",
                      fontFamily: "Arial, sans-serif",
                    }}
                    type="text"
                    name='ifsccode'
                    onChange={onChange}
                    // onChange={(e) => {
                    //   const val = e.target.value;
                    //   setBahikhataArr({ ...bahikhataArr, amount: val });
                    // }}
                    // value={bahikhataArr.amount}
                    // required={true}
                    // rows={4}
                    placeholder="Enter IFSC Code"
                  />
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
                  <Label>
                  Account Holder Name<span className="text-red"> * </span>
                  </Label>
                  <Input
                    style={{
                      fontStyle: "italic",
                      fontFamily: "Arial, sans-serif",
                    }}
                    type="text"
                    name='acc_holder_name'
                    onChange={onChange}
                    // onChange={(e) => {
                    //   const val = e.target.value;
                    //   setBahikhataArr({ ...bahikhataArr, amount: val });
                    // }}
                    // value={bahikhataArr.amount}
                    // required={true}
                    // rows={4}
                    placeholder="Enter acc_holder_name"
                  />
                </FormGroup>
              </Col>

              <Col md={12}>
                <FormGroup>
                  <Label>
                  Applicant Name <span className="text-red"> * </span>
                  </Label>
                  <Input
                    style={{
                      fontStyle: "italic",
                      fontFamily: "Arial, sans-serif",
                    }}
                    type="text"
                    name='applicant_name'
                    onChange={onChange}
                    // onChange={(e) => {
                    //   const val = e.target.value;
                    //   setBahikhataArr({ ...bahikhataArr, amount: val });
                    // }}
                    // value={bahikhataArr.amount}
                    // required={true}
                    // rows={4}
                    placeholder="Applicant Name"
                  />
                </FormGroup>
              </Col>


                  <Col md={12}>
                <FormGroup>
                  <Label>
                  Father Name <span className="text-red"> * </span>
                  </Label>
                  <Input
                    style={{
                      fontStyle: "italic",
                      fontFamily: "Arial, sans-serif",
                    }}
                    type="text"
                    name='father_name'
                    onChange={onChange}
                    // onChange={(e) => {
                    //   const val = e.target.value;
                    //   setBahikhataArr({ ...bahikhataArr, amount: val });
                    // }}
                    // value={bahikhataArr.amount}
                    // required={true}
                    // rows={4}
                    placeholder="Father Name"
                  />
                </FormGroup>
              </Col>



              <Col md={12}>
                <FormGroup>
                  <Label>
                  DOB<span className="text-red"> * </span>
                  </Label>
                  <Flatpickr
                    style={{
                      fontStyle: "italic",
                      fontFamily: "Arial, sans-serif",
                    }}
                    className="form-control"
                    name='date_of_birth'
                    onChange={(e) => {
                        setdate(e[0]);
                      }}
                    // onChange={(e) => {
                    //   const d = e[0];
                    //   setBahikhataArr({ ...bahikhataArr, payment_date: d });
                    // }}
                    options={{ allowInput: true, dateFormat: "d-M-Y" }}
                    // value={bahikhataArr.payment_date}
                    required={true}
                    placeholder="DOB"
                  />
                </FormGroup>
              </Col>
                 
              <Col md={12}>
                <FormGroup>
                  <Label>
                  Nationality<span className="text-red"> * </span>
                  </Label>
                  <Input
                    style={{
                      fontStyle: "italic",
                      fontFamily: "Arial, sans-serif",
                    }}
                    type="text"
                    name='nationality'
                    onChange={onChange}
                    // onChange={(e) => {
                    //   const val = e.target.value;
                    //   setBahikhataArr({ ...bahikhataArr, amount: val });
                    // }}
                    // value={bahikhataArr.amount}
                    // required={true}
                    // rows={4}
                    placeholder="Nationality"
                  />
                </FormGroup>
              </Col>
           

              <Col md={12}>
                <FormGroup>
                  <Label>
                  Adhar Number <span className="text-red"> * </span>
                  </Label>
                  <Input
                    style={{
                      fontStyle: "italic",
                      fontFamily: "Arial, sans-serif",
                    }}
                    type="number"
                    name='addhaar_number'
                    onChange={onChange}
                    // onChange={(e) => {
                    //   const val = e.target.value;
                    //   setBahikhataArr({ ...bahikhataArr, amount: val });
                    // }}
                    // value={bahikhataArr.amount}
                    // required={true}
                    // rows={4}
                    placeholder="Adhar Number"
                  />
                </FormGroup>
              </Col>

              <Col md={12}>
                <FormGroup>
                  <Label>
                  Pan card <span className="text-red"> * </span>
                  </Label>
                  <Input
                    style={{
                      fontStyle: "italic",
                      fontFamily: "Arial, sans-serif",
                    }}
                    type="text"
                    name='pan_no'
                    onChange={onChange}
                    // onChange={(e) => {
                    //   const val = e.target.value;
                    //   setBahikhataArr({ ...bahikhataArr, amount: val });
                    // }}
                    // value={bahikhataArr.amount}
                    // required={true}
                    // rows={4}
                    placeholder="Pan card"
                  />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <div className="mt-4 d-flex justify-content-center">
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
                  onClick={HanldeSubitKyc}
                >
                  Save
                </button>
           
              </div>
              <div className="mt-2 d-flex justify-content-center"> 
              <Link
                  to="/"
                  type="submit"
                  // onClick={()=>}
                  className="text-decoration-none"
                //   onClick={() => dispatch(handleOpneMenuRequest(false))}
                  style={{
                    // backgroundColor: "gray",
                    // outline: "none",
                    // border: "none",
                    // marginLeft: "20px",
                    // fontSize: "20px",
                    // padding: "10px 20px",
                    // borderRadius: "10px",
                    color: "black",
                  }}
                >
                  Cancel
                </Link>
                </div>
        </Form>
    
    
    
    </div></div></div>
  )
}

export default CompleteKYC