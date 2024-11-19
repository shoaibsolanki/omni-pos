import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
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
} from "reactstrap";
import GSTandAddress from "./gst-and-address";
import CreditAndBalance from "./credit-and-balance";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import { AiFillInfoCircle } from "react-icons/ai";
import Toggle from "react-toggle";
import {
  handleGstTypeDropdownRequest,
  handleAddPartyRequest,
} from "../../../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { useDispatch, useSelector } from "react-redux";

import Modal from 'react-bootstrap/Modal';

function SuplierModal(props) {
    const dispatch = useDispatch();
    const { user_data, state_dropdown, gst_type_dropdown } = useSelector(
      (state) => state.ComponentPropsManagement
    );
    console.log(gst_type_dropdown);
    const [limitFlag, setLimitFlag] = useState(false);
    // const [activeTab, setActiveTab] = useState("1")
  
    const [partyName, setPartyName] = useState("");
    const [gstin, setGstin] = useState("");
    const [phone, setPhone] = useState("");
    const [gstType, setGstType] = useState("");
    const [state, setState] = useState("");
    const [email, setEmail] = useState("");
    const [openingBalance, setOpeningBalance] = useState("");
    const [creditLimitAmount, setCreditLimitAmount] = useState("");
    const [billingAddress, setBillingAddress] = useState("");
  
    // const tabArray = [
    //     {
    //         id: "1",
    //         name: "GST & Address",
    //         className: "active"
    //     },
    //     {
    //         id: "2",
    //         name: "Credit & Balance",
    //         className: "active"
    //     }
    // ]
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const obj = {
        saas_id: user_data.saasId,
        store_id:user_data.storeId,
        party_name: partyName,
        gstin: gstin,
        phone_number: phone,
        gst_type: gstType,
        state: state,
        email: email,
        billing_address: billingAddress,
        opening_balance: openingBalance,
        credit_limit_flag: limitFlag,
        creditLimitAmount: creditLimitAmount,
      };
      // const formData = new FormData();
      // console.log(formData)
  
      dispatch(handleAddPartyRequest(obj));
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
    const id = localStorage.getItem('activeTab')
    const handleFunCall = () => {
      dispatch(handleGstTypeDropdownRequest());
    };
  
    const optimizedFn = useCallback(debounce(handleFunCall), []);
    useEffect(() => {
      if(id==5){
        optimizedFn();
      }
    }, [id]);

  
  return (
    <>
  

    <Modal   {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title>Supplier</Modal.Title>
      </Modal.Header>
      <Card>
          <CardBody >
            {/* <div style={{ fontSize: "22px", fontWeight: "bold" }}>Supplier</div> */}
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
                      Party Name <span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setPartyName(e.target.value);
                      }}
                      value={partyName}
                      required={true}
                      placeholder="Enter Party Name" 
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
                      GSTIN <span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setGstin(e.target.value);
                      }}
                      value={gstin}
                      required={true}
                      placeholder="Enter GSTIN"
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
                      Phone <span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="number"
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                      value={phone}
                      required={true}
                      placeholder="Enter Phone"
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
                      Select GST Type <span className="text-red"> * </span>
                    </Label>
                    <Select
                      options={gst_type_dropdown}
                      onChange={(e) => {
                        setGstType(e.value);
                      }}
                      value={gst_type_dropdown.filter(
                        (io) => io.value === gstType
                      )}
                      required={true}
                      placeholder="Select Gst Type"
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
                      Email<span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      value={email}
                      required={true}
                      placeholder="Enter Email"
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
                      Opening Balance <span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="number"
                      required={true}
                      onChange={(e) => {
                        setOpeningBalance(e.target.value);
                      }}
                      value={openingBalance}
                      placeholder="Enter Balance"
                      style={{boxShadow: "0 2px 12px rgba(36, 36, 39, .12)",
                      borderRadius: ".75rem",
                      overflow: "hidden"}}
                    />
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label   style={{color: "#000",

fontFamily: "Segoe UI",
fontSize: "24px",
fontStyle: "normal",
fontWeight: "600",
lineHeight: "normal",
marginLeft: "-5px",
textWrap: "nowrap"}}> 
                      Credit Limit Amount <span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="number"
                      onChange={(e) => {
                        setCreditLimitAmount(e.target.value);
                      }}
                      value={creditLimitAmount}
                      required={true}
                      placeholder="Enter Amount"
                      style={{boxShadow: "0 2px 12px rgba(36, 36, 39, .12)",
                      borderRadius: ".75rem",
                      overflow: "hidden"}}
                    />
                  </FormGroup>
                </Col>

                <Col md={12}>
                  <FormGroup>
                    <Label       style={{color: "#000",

fontFamily: "Segoe UI",
fontSize: "24px",
fontStyle: "normal",
fontWeight: "600",
lineHeight: "normal"}}>
                      Billing Address<span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setBillingAddress(e.target.value);
                      }}
                      value={billingAddress}
                      required={true}
                      placeholder="Enter Address"
                      style={{boxShadow: "0 2px 12px rgba(36, 36, 39, .12)",
                      borderRadius: ".75rem",
                      overflow: "hidden"}}
                    />
                  </FormGroup>
                </Col>

                <Col md={12}>
                  <div>
                    <span>Credit Limit</span>
                    <span className="ms-1">
                      <AiFillInfoCircle color="#979797" />
                    </span>
                  </div>
                </Col>

                <Col md={12} className="mt-3">
                  <div className="d-flex flex-wrap">
                    <Label
                          style={{color: "#000",

                          fontFamily: "Segoe UI",
                          fontSize: "24px",
                          fontStyle: "normal",
                          fontWeight: "600",
                          lineHeight: "normal"}}
                      onClick={() => {
                        setLimitFlag(false);
                      }}
                      className="mouse-pointer"
                    >
                      No Limit
                    </Label>
                    <div style={{ position: "relative", top: "1px" }}>
                      <Toggle
                        // defaultChecked={contentToggle}
                        className="mx-2 "
                        onChange={() => {
                          setLimitFlag(!limitFlag);
                        }}
                        checked={limitFlag === true}
                        icons={false}
                      />
                    </div>
                    <Label
                          style={{color: "#000",

                          fontFamily: "Segoe UI",
                          fontSize: "24px",
                          fontStyle: "normal",
                          fontWeight: "600",
                          lineHeight: "normal"}}
                      onClick={() => {
                        setLimitFlag(true);
                      }}
                      className="mouse-pointer"
                    >
                      Custom Limit
                    </Label>
                  </div>
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
                        <Button
                        style={{
                          borderRadius:" 8px;",
                          background:" #0067CE"
                        }}
                        >
                          Submit
                        </Button>
                      </div>
                    </FormGroup>
                  </div>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>

    </Modal>
  </>
  )
}

export default SuplierModal