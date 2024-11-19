import React, { useState, useEffect, useCallback } from "react";
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
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button';
// import { FormGroup, Label, CustomInput } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

import Select from "react-select";
import Flatpickr from "react-flatpickr";
import { AiFillInfoCircle } from "react-icons/ai";
import Toggle from "react-toggle";

import { useDispatch, useSelector } from "react-redux";
import UploadQr from "./UploadQr";
import Modal from 'react-bootstrap/Modal';
import { handleAddPartyRequest } from "../../../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import axios from "axios";
import { BASE_Url } from "../../../../URL";

function StoreModal(props) {
    const dispatch = useDispatch();
  
    const { user_data, state_dropdown } = useSelector(
    (state) => state.ComponentPropsManagement
  );
  
  const [userId, setUserId] = useState(false);
  const [storeId, setStoreId] = useState("");
  const [saasId, setSaasId] = useState("");
  const [storeName, setStoreName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [taxable, setTaxable] = useState("");
  const [gstCode, setGstCode] = useState("");
  const [hsnCode, setHsnCode] = useState("");
  const [storeType, setStoreType] = useState("");
  const [exclusiveTax, setExclusiveTax] = useState("");
  const [inclusiveTax, setInclusiveTax] = useState("");
  const [storeLogo, setStoreLogo] = useState('');
  const [bankAccount, setBankAccount] = useState("");
  const [bankIfsc, setBankIfsc] = useState("");
  const [bankBranch, setBankBranch] = useState("");
  const [paymentQrCode, setPaymentQrCode] = useState("");
  const [receiptFormat, setReceiptFormat] = useState("");
  const [tnc, setTnc] = useState("");
  const [e_mail, setE_mail] = useState("");
  const [phone_no, setPhone_no] = useState("");
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    // const obj = {
    //   user_id: userId,
    //   store_id: storeId,
    //   saas_id: user_data.saasId,
    //   store_name: storeName,
    //   city: city,
    //   state: state,
    //   country: country,
    //   address: address,
    //   taxable: taxable,
    //   gst_code: gstCode,
    //   hsn_code: hsnCode,
    //   store_type: storeType,
    //   exclusive_tax: exclusiveTax,
    //   inclusive_tax: inclusiveTax,
    //   store_logo: storeLogo,
    //   bank_account: bankAccount,
    //   bank_ifsc: bankIfsc,
    //   bank_branch: bankBranch,
    //   payment_qr_code: paymentQrCode,
    //   receipt_format: receiptFormat,
    //   tnc: tnc,
    //   e_mail:e_mail,
    //   phone_no:phone_no
    // };
    
    try {
      const formData = new FormData();
      formData.append('user_id',userId)
      formData.append('store_id',storeId)
      formData.append('saas_id',user_data.saasId)
      formData.append('store_name',storeName)
      formData.append('city',city)
      formData.append('state',state)
      formData.append('country',country)
      formData.append('address',address)
      formData.append('taxable',taxable)
      formData.append('gst_code',gstCode)
      formData.append('hsn_code',hsnCode)
      formData.append( "store_type", storeType)
      formData.append('exclusive_tax',exclusiveTax)
      formData.append('inclusive_tax',inclusiveTax)
      formData.append('store_logo',storeLogo)
      formData.append('bank_account',bankAccount)
      formData.append('bank_ifsc',bankIfsc)
      formData.append('bank_branch',bankBranch)
      formData.append('payment_qr_code',paymentQrCode)
      formData.append('receipt_format',receiptFormat)
      formData.append('tnc',tnc)
      formData.append('e_mail',e_mail)
      formData.append('phone_no',phone_no)
      console.log("ye dekho", formData.get('store_logo'))
      const response = await axios.post(`${BASE_Url}/store-master/create-store`,formData)
      console.log("this store data",response)
      
    } catch (error) {
      console.log("this Catch error",error)
    }
    // dispatch(handleAddPartyRequest(obj));

  };

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
  
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const [imageSelected, setImageSelected] = useState('');

  const handleImageChange = (e) => {
    console.log(e.target.files[0])
    setStoreLogo(e.target.files[0])
  };
// useEffect(() => {
//   console.log(imageSelected, "imageSelected" )
// }, [imageSelected])
const [show, setShow] = useState(false);
  return (
    <>
 

 <Modal   {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered>
    <Modal.Header closeButton>
      <Modal.Title>Store Master</Modal.Title>
    </Modal.Header>
    <div className="">
        <Card>
          <CardBody>
            {/* <div style={{ fontSize: "22px", fontWeight: "bold" }}>User</div> */}
            <Form onSubmit={handleSubmit}>
              <Row className="mt-2">
                <Col md={6}>
                  <FormGroup>
                    <Label       style={{color: "#000",

fontFamily: "Segoe UI",
fontSize: "24px",
fontStyle: "normal",
fontWeight: "600",
lineHeight: "normal"}}>
                      User ID <span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setUserId(e.target.value);
                      }}
                      value={userId}
                      required={true}
                      placeholder="Enter User ID"
                      style={{boxShadow: "0 2px 12px rgba(36, 36, 39, .12)",
                      borderRadius: ".75rem",
                      overflow: "hidden"}}
                    />
                  </FormGroup>
                </Col>                

                <Col md={6}>
                  <FormGroup>
                    <Label       style={{color: "#000",

fontFamily: "Segoe UI",
fontSize: "24px",
fontStyle: "normal",
fontWeight: "600",
lineHeight: "normal"}}>
                    Store ID<span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setStoreId(e.target.value);
                      }}
                      value={storeId}
                      required={true}
                      placeholder="Enter Store ID"
                      style={{boxShadow: "0 2px 12px rgba(36, 36, 39, .12)",
                      borderRadius: ".75rem",
                      overflow: "hidden"}}
                    />
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label       style={{color: "#000",

fontFamily: "Segoe UI",
fontSize: "24px",
fontStyle: "normal",
fontWeight: "600",
lineHeight: "normal"}}>
                    Store Name <span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setStoreName(e.target.value);
                      }}
                      value={storeName}
                      required={true}
                      placeholder="Enter Store Name"
                      style={{boxShadow: "0 2px 12px rgba(36, 36, 39, .12)",
                      borderRadius: ".75rem",
                      overflow: "hidden"}}
                    />
                  </FormGroup>
                </Col>               

                <Col md={6}>
                  <FormGroup>
                    <Label       style={{color: "#000",

fontFamily: "Segoe UI",
fontSize: "24px",
fontStyle: "normal",
fontWeight: "600",
lineHeight: "normal"}}>
                      State<span className="text-red"> * </span>
                    </Label>
                    <Select
                      options={state_dropdown}
                      onChange={(e) => {
                        setState(e.value);
                      }}
                      value={state_dropdown.filter((e) => e.value === state)}
                      required={true}
                      placeholder="Select State"
                      style={{boxShadow: "0 2px 12px rgba(36, 36, 39, .12)",
                      borderRadius: ".75rem",
                      overflow: "hidden"}}
                    />
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label       style={{color: "#000",

fontFamily: "Segoe UI",
fontSize: "24px",
fontStyle: "normal",
fontWeight: "600",
lineHeight: "normal"}}>
                    Saas ID<span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setSaasId(e.target.value);
                      }}
                      value={saasId}
                      required={true}
                      placeholder="Enter Saas ID"
                      style={{boxShadow: "0 2px 12px rgba(36, 36, 39, .12)",
                      borderRadius: ".75rem",
                      overflow: "hidden"}}
                    />
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label       style={{color: "#000",

fontFamily: "Segoe UI",
fontSize: "24px",
fontStyle: "normal",
fontWeight: "600",
lineHeight: "normal"}}>
                    City<span className="text-red"> * </span>
                    </Label>
                    <Input
                      // options={state_dropdown}
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                      value={city}
                      required={true}
                      placeholder="Select City"
                      style={{boxShadow: "0 2px 12px rgba(36, 36, 39, .12)",
                      borderRadius: ".75rem",
                      overflow: "hidden"}}
                    />
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label       style={{color: "#000",

fontFamily: "Segoe UI",
fontSize: "24px",
fontStyle: "normal",
fontWeight: "600",
lineHeight: "normal"}}>
                    Country<span className="text-red"> * </span>
                    </Label>
                    <Input
                      options={state_dropdown}
                      onChange={(e) => {
                        setCountry(e.target.value);
                      }}
                      value={country}
                      required={true}
                      placeholder="Select Country"
                      style={{boxShadow: "0 2px 12px rgba(36, 36, 39, .12)",
                      borderRadius: ".75rem",
                      overflow: "hidden"}}
                    />
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label       style={{color: "#000",

fontFamily: "Segoe UI",
fontSize: "24px",
fontStyle: "normal",
fontWeight: "600",
lineHeight: "normal"}}>
                    Address  <span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                      value={address}
                      required={true}
                      placeholder="Enter Address"
                      style={{boxShadow: "0 2px 12px rgba(36, 36, 39, .12)",
                      borderRadius: ".75rem",
                      overflow: "hidden"}}
                    />
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label       style={{color: "#000",

fontFamily: "Segoe UI",
fontSize: "24px",
fontStyle: "normal",
fontWeight: "600",
lineHeight: "normal"}}>
                    Taxable  <span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setTaxable(e.target.value);
                      }}
                      value={taxable}
                      required={true}
                      placeholder="Enter Taxable"
                      style={{boxShadow: "0 2px 12px rgba(36, 36, 39, .12)",
                      borderRadius: ".75rem",
                      overflow: "hidden"}}

                    />
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label       style={{color: "#000",

fontFamily: "Segoe UI",
fontSize: "24px",
fontStyle: "normal",
fontWeight: "600",
lineHeight: "normal"}}>
                    GST Code  <span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setGstCode(e.target.value);
                      }}
                      value={gstCode}
                      required={true}
                      placeholder="Enter GST Code"
                      style={{boxShadow: "0 2px 12px rgba(36, 36, 39, .12)",
                      borderRadius: ".75rem",
                      overflow: "hidden"}}
                    />
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label       style={{color: "#000",

fontFamily: "Segoe UI",
fontSize: "24px",
fontStyle: "normal",
fontWeight: "600",
lineHeight: "normal"}}>
                    HSN Code  <span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setHsnCode(e.target.value);
                      }}
                      value={hsnCode}
                      required={true}
                      placeholder="Enter  HSN Code"
                      style={{boxShadow: "0 2px 12px rgba(36, 36, 39, .12)",
                      borderRadius: ".75rem",
                      overflow: "hidden"}}
                    />
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label       style={{color: "#000",

fontFamily: "Segoe UI",
fontSize: "24px",
fontStyle: "normal",
fontWeight: "600",
lineHeight: "normal"}}>
                    Store Type   <span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setStoreType(e.target.value);
                      }}
                      value={storeType}
                      required={true}
                      placeholder="Enter Store Type"
                      style={{boxShadow: "0 2px 12px rgba(36, 36, 39, .12)",
                      borderRadius: ".75rem",
                      overflow: "hidden"}}
                    />
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label       style={{color: "#000",

fontFamily: "Segoe UI",
fontSize: "24px",
fontStyle: "normal",
fontWeight: "600",
lineHeight: "normal"}}>
                    Exclusive Tax  <span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setExclusiveTax(e.target.value);
                      }}
                      value={exclusiveTax}
                      required={true}
                      placeholder="Enter Exclusive Tax"
                      style={{boxShadow: "0 2px 12px rgba(36, 36, 39, .12)",
                      borderRadius: ".75rem",
                      overflow: "hidden"}}
                    />
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label       style={{color: "#000",

fontFamily: "Segoe UI",
fontSize: "24px",
fontStyle: "normal",
fontWeight: "600",
lineHeight: "normal"}}>
                    Inclusive Tax  <span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setInclusiveTax(e.target.value);
                      }}
                      value={inclusiveTax}
                      required={true}
                      placeholder="Enter Inclusive Tax"
                      style={{boxShadow: "0 2px 12px rgba(36, 36, 39, .12)",
                      borderRadius: ".75rem",
                      overflow: "hidden"}}
                    />
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label       style={{color: "#000",

fontFamily: "Segoe UI",
fontSize: "24px",
fontStyle: "normal",
fontWeight: "600",
lineHeight: "normal"}}>
                    Store Logo  <span className="text-red"> * </span>
                    </Label>
                    <Button
          className="mb-2"
          component="label"
          variant="contained"
          style={{ width: "-webkit-fill-available" }}
        >
       Selecte Store Logo
          <VisuallyHiddenInput
            type="file"
            onChange={handleImageChange}
          />
        </Button>
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label       style={{color: "#000",

fontFamily: "Segoe UI",
fontSize: "24px",
fontStyle: "normal",
fontWeight: "600",
lineHeight: "normal"}}>
                    Bank Account  <span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setBankAccount(e.target.value);
                      }}
                      value={bankAccount}
                      required={true}
                      placeholder="Enter Bank Account"
                      style={{boxShadow: "0 2px 12px rgba(36, 36, 39, .12)",
                      borderRadius: ".75rem",
                      overflow: "hidden"}}
                    />
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label       style={{color: "#000",

fontFamily: "Segoe UI",
fontSize: "24px",
fontStyle: "normal",
fontWeight: "600",
lineHeight: "normal"}}>
                    Bank IFSC <span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setBankIfsc(e.target.value);
                      }}
                      value={bankIfsc}
                      required={true}
                      placeholder="Enter Bank IFSC"
                      style={{boxShadow: "0 2px 12px rgba(36, 36, 39, .12)",
                      borderRadius: ".75rem",
                      overflow: "hidden"}}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label       style={{color: "#000",

fontFamily: "Segoe UI",
fontSize: "24px",
fontStyle: "normal",
fontWeight: "600",
lineHeight: "normal"}}>
                    Bank Branch  <span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setBankBranch(e.target.value);
                      }}
                      value={bankBranch}
                      required={true}
                      placeholder="Enter Bank Branch "
                      style={{boxShadow: "0 2px 12px rgba(36, 36, 39, .12)",
                      borderRadius: ".75rem",
                      overflow: "hidden"}}
                    />
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label       style={{color: "#000",

fontFamily: "Segoe UI",
fontSize: "24px",
fontStyle: "normal",
fontWeight: "600",
lineHeight: "normal"}}>
                    Payment QR Code  <span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setPaymentQrCode(e.target.value);
                      }}
                      value={paymentQrCode}
                      required={true}
                      placeholder="Enter Payment QR Code "
                      style={{boxShadow: "0 2px 12px rgba(36, 36, 39, .12)",
                      borderRadius: ".75rem",
                      overflow: "hidden"}}
                    />
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label       style={{color: "#000",

fontFamily: "Segoe UI",
fontSize: "24px",
fontStyle: "normal",
fontWeight: "600",
lineHeight: "normal"}}>
                    Receipt Format   <span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setReceiptFormat(e.target.value);
                      }}
                      value={receiptFormat}
                      required={true}
                      placeholder="Enter Receipt Format "
                      style={{boxShadow: "0 2px 12px rgba(36, 36, 39, .12)",
                      borderRadius: ".75rem",
                      overflow: "hidden"}}
                    />
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label       style={{color: "#000",

fontFamily: "Segoe UI",
fontSize: "24px",
fontStyle: "normal",
fontWeight: "600",
lineHeight: "normal"}}>
                    T&C  <span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setTnc(e.target.value);
                      }}
                      value={tnc}
                      required={true}
                      placeholder="Enter T&C "
                      style={{boxShadow: "0 2px 12px rgba(36, 36, 39, .12)",
                      borderRadius: ".75rem",
                      overflow: "hidden"}}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label       style={{color: "#000",

fontFamily: "Segoe UI",
fontSize: "24px",
fontStyle: "normal",
fontWeight: "600",
lineHeight: "normal"}}>
                    Email<span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="email"
                      onChange={(e) => {
                        setE_mail(e.target.value);
                      }}
                      value={e_mail}
                      required={true}
                      placeholder="Enter email "
                      style={{boxShadow: "0 2px 12px rgba(36, 36, 39, .12)",
                      borderRadius: ".75rem",
                      overflow: "hidden"}}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label       style={{color: "#000",

fontFamily: "Segoe UI",
fontSize: "24px",
fontStyle: "normal",
fontWeight: "600",
lineHeight: "normal"}}>
                    Phone Number<span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="number"
                      onChange={(e) => {
                        setPhone_no(e.target.value);
                      }}
                      value={phone_no}
                      required={true}
                      placeholder="Enter T&C "
                      style={{boxShadow: "0 2px 12px rgba(36, 36, 39, .12)",
                      borderRadius: ".75rem",
                      overflow: "hidden"}}
                    />
                  </FormGroup>
                </Col>
                   
                         
          <Col md={6}>
        <Label       style={{color: "#000",

fontFamily: "Segoe UI",
fontSize: "24px",
fontStyle: "normal",
fontWeight: "600",
lineHeight: "normal"}}>
          Retailer QrCode <span className="text-red"> * </span>
        </Label>
        <Button
          className="mb-2"
          component="label"
          variant="contained"
          style={{ width: "-webkit-fill-available" }}
      onClick={()=>setShow(true)}   >
          Add Qr Image
        </Button>
      </Col>
      <Col md={6} >
      
      
      </Col>
                
                <Col md={12}>
                  <div className="d-flex justify-content-end">
                    <FormGroup>
                      <Label       style={{color: "#000",

fontFamily: "Segoe UI",
fontSize: "24px",
fontStyle: "normal",
fontWeight: "600",
lineHeight: "normal"}}>&nbsp;</Label>
                      <div>
                        <button 
                        className="btn btn-secondary"
                        style={{
                          borderRadius:" 8px;",
                          background:" #0067CE"
                        }}
                        >
                          Submit
                        </button>
                      </div>
                    </FormGroup>
                  </div>
                </Col>
              </Row>
            </Form>
            <div>
          { imageSelected?.length!==0  && (
            
            <button
              className="btn btn-primary" onClick={()=>SaveImage()} style={{marginTop:"29px"}}
            >
              Save Qr
            </button>
          )}
        </div>
          </CardBody>
        </Card>
        <UploadQr show={show} setShow={setShow}/>
      </div>
  </Modal>
  </>
  )
}

export default StoreModal