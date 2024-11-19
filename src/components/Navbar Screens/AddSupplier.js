import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import CreditAndBalance from "../AddParty/CreditAndBalance";
import GSTAddress from "../AddParty/GSTAddress";
import AdditionalFields from "../AddParty/AdditionalFields";
import Select, { useStateManager } from "react-select";
import {
  handleCreateSupplierRequest,
  handleOpneMenuRequest,
  handleGetPatyNameRequest,
} from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { useDispatch, useSelector } from "react-redux";

const AddSupplier = () => {
  const dispatch = useDispatch();
  // const [partyName, setPatyName] = useState("");
  const { storeId, saasId } = JSON.parse(localStorage.getItem("User_data"));
  const [partyName, setPartyName] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [gstIn, setGstIn] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gstType, setGstType] = useState("");
  const [state, setState] = useState("");
  const [email, setEmail] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [openingBalance, setopeningBalance] = useState("");
  const [creditLimitAmount, setCreditLimitAmount] = useState("");

  // useEffect(() => {
  //   dispatch(handleGetPatyNameRequest());
  // }, []);

  const { get_party_name } = useSelector((e) => e.ComponentPropsManagement);
  console.log("IN COMPONENT", get_party_name);

  const [bahikhataArr, setBahikhataArr] = useState({
    party_name: "",
    payment_type: "",
    payment_date: "",
    payment_mode: "",
    amount: "",
    payment_notes: "",
  });

  const TabsData = [
    {
      id: 1,
      button: "GST & Address",
      component: <GSTAddress />,
    },
    {
      id: 2,
      button: "Credit & Balance",
      component: <CreditAndBalance />,
    },
  ];
  const [value, setValue] = useState(0);
  const [tabs] = useState(TabsData);

  const { component } = tabs[value];
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("IN DISPATCH", partyName);
    dispatch(
      handleCreateSupplierRequest({
        saas_id: saasId,
        store_id:storeId,
        // party_name: partyName,
        party_name: supplierName,
        gstin: gstIn,
        phone_number: phoneNumber,
        gst_type: gstType.toUpperCase(),
        state: state,
        email: email,
        billing_address: billingAddress,
        opening_balance: openingBalance,
        credit_limit_flag: false,
        creditLimitAmount: creditLimitAmount,
      })
    );
    setPartyName("");
    setGstIn("");
    setGstType("");
    setPartyName("");
    setPhoneNumber("");
    setState("");
    setEmail("");
    setCreditLimitAmount("");
    setopeningBalance("");
    setBillingAddress("");
    console.log(gstType.toUpperCase());
  };
  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-5 col-md-9 col-sm-12 px-5">
            <form className="form-box" onSubmit={handleSubmit}>
              <h4>Add Supplier</h4>
              {/* <div style={{ zIndex: 10 }}>
                <Select
                  options={get_party_name}
                  onChange={(e) => {
                    console.log("VALUE", e.value);
                    setPartyName(e.value);
                    const val = e.value;
                    setBahikhataArr({ ...bahikhataArr, party_name: val });
                  }}
                  value={get_party_name.filter(
                    (io) => io.value === bahikhataArr.party_name
                  )}
                  style={{ zIndex: 10 }}
                  required={true}
                  placeholder="Select Party"
                />
              </div> */}

              <TextField
                type="text"
                className="form-control my-2"
                id="customer-name"
                size="small"
                required
                // style={{ zIndex: 1 }}
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
                label="Supplier Name"
              />
              <TextField
                type="text"
                className="form-control my-2"
                id="customer-name"
                size="small"
                required
                // style={{ zIndex: 1 }}
                value={gstIn}
                onChange={(e) => setGstIn(e.target.value)}
                label="GSTIN"
              />
              <TextField
                type="number"
                className="form-control my-2"
                id="customer-name"
                size="small"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                label="Phone Number"
              />
              <TextField
                type="email"
                className="form-control my-2"
                id="customer-name"
                size="small"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
              />
              <TextField
                type="text"
                className="form-control my-2"
                id="customer-name"
                size="small"
                required
                value={billingAddress}
                onChange={(e) => setBillingAddress(e.target.value)}
                label="Billing Address"
              />
              <TextField
                type="number"
                className="form-control my-2"
                id="customer-name"
                size="small"
                required
                value={openingBalance}
                onChange={(e) => setopeningBalance(e.target.value)}
                label="Opening Amount"
              />
              <TextField
                type="number"
                className="form-control my-2"
                id="customer-name"
                size="small"
                required
                value={creditLimitAmount}
                onChange={(e) => setCreditLimitAmount(e.target.value)}
                label="Credit Limit Amount"
              />
              <TextField
                type="text"
                className="form-control my-2"
                id="customer-name"
                size="small"
                required
                value={gstType}
                onChange={(e) => setGstType(e.target.value)}
                label="Gst Type"
              />
              <TextField
                type="text"
                className="form-control my-2"
                id="customer-name"
                size="small"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                label="State"
              />

              <div className="mt-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    backgroundColor: "yellowgreen",
                    outline: "none",
                    border: "none",
                    fontSize: "20px",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    color: "#fff",
                  }}
                >
                  Save
                </button>
                <Link
                  to="/"
                  type="submit"
                  // onClick={()=>}
                  className="btn btn-primary"
                  style={{
                    backgroundColor: "gray",
                    outline: "none",
                    border: "none",
                    marginLeft: "20px",
                    fontSize: "20px",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    color: "#fff",
                  }}
                >
                  Close
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSupplier;
