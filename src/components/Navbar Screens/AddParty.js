import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import CreditAndBalance from "../AddParty/CreditAndBalance";
import GSTAddress from "../AddParty/GSTAddress";
import AdditionalFields from "../AddParty/AdditionalFields";
import {
  handleAddPartyRequest,
  handleOpneMenuRequest,
} from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { useDispatch } from "react-redux";

const AddParty = () => {
  const dispatch = useDispatch();
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
    {
      id: 3,
      button: "Additional Fields",
      component: <AdditionalFields />,
    },
  ];

  const { saasId } = JSON.parse(localStorage.getItem("Store_data"));
  useEffect(() => {}, [saasId]);
  const [value, setValue] = useState(0);
  const [tabs] = useState(TabsData);
  const [partyName, setPartyName] = useState("");
  const [email, setEmail] = useState("");
  const [GSTIN, setGSTIN] = useState("");
  const [mobile, setMobile] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [GSTType, setGSTType] = useState("");
  const [state, setState] = useState("");
  const [openingBalance, setOpeningBalance] = useState("");
  const [creditLimitAmount, setCreditLimitAmount] = useState("");
  const { component } = tabs[value];

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(GSTType.toUpperCase());
    dispatch(
      handleAddPartyRequest({
        saas_id: saasId,
        party_name: partyName,
        gstin: GSTIN,
        phone_number: mobile,
        gst_type: GSTType.toUpperCase(),
        state: state,
        email: email,
        billing_address: billingAddress,
        opening_balance: Number(openingBalance),
        credit_limit_flag: false,
        creditLimitAmount: Number(creditLimitAmount),
      })
    );
    setPartyName("");
    setGSTIN("");
    setMobile("");
    setGSTType("");
    setState("");
    setEmail("");
    setBillingAddress("");
    setOpeningBalance("");
    setCreditLimitAmount("");
  };

  return (
    <section>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-5 col-md-10 col-sm-12 px-5">
            <form className="form-box" onSubmit={handleSubmit}>
              <h2>Add Party</h2>

              <div
                className=""
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                  //   justifyContent: "space-evenly",
                }}
              ></div>
              <TextField
                type="text"
                className="form-control my-2"
                id="customer-name"
                size="small"
                required
                value={partyName}
                onChange={(e) => setPartyName(e.target.value)}
                label="Party Name"
              />
              <TextField
                type="text"
                className="form-control my-2"
                id="customer-name"
                size="small"
                required
                value={GSTIN}
                onChange={(e) => setGSTIN(e.target.value)}
                label="GSTIN"
              />
              <TextField
                type="text"
                className="form-control my-2"
                id="customer-name"
                size="small"
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
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
                type="text"
                className="form-control my-2"
                id="customer-name"
                size="small"
                required
                value={GSTType}
                onChange={(e) => setGSTType(e.target.value)}
                label="GST Type"
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
              <TextField
                type="text"
                className="form-control my-2"
                id="customer-name"
                size="small"
                required
                value={openingBalance}
                onChange={(e) => setOpeningBalance(e.target.value)}
                label="Opening Balance"
              />
              <TextField
                type="text"
                className="form-control my-2"
                id="customer-name"
                size="small"
                required
                value={creditLimitAmount}
                onChange={(e) => setCreditLimitAmount(e.target.value)}
                label="Credit Limit Amount"
              />

              <div style={{ marginBottom: 0, paddingBottom: 0 }}>
                <div style={{ width: "100%" }}>
                  <ul
                    className="d-flex flex-row"
                    style={{
                      listStyle: "none",
                      flex: 1,
                      marginRight: "40px",
                    }}
                  >
                    {tabs.map((tab, index) => (
                      <li
                        key={tab.id}
                        // className="border-bottom border border-danger"
                        style={{
                          border: "none",
                          outline: "none",
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flex: 1,
                          borderBottom: index === value && "2px solid red",
                        }}
                      >
                        <button
                          style={{
                            outline: "none",
                            border: "none",
                            fontSize: "15px",
                            width: "100%",
                          }}
                          onClick={() => setValue(index)}
                          className={`btn mx-2`}
                        >
                          {tab.button}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div>{component}</div>
                </div>
              </div>
              <div className="mt-3">
                <button
                  // type="submit"
                  className="btn btn-primary"
                  style={{
                    backgroundColor: "#fc0202",
                    outline: "none",
                    border: "none",
                    fontSize: "20px",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    color: "#fff",
                  }}
                  onClick={() => {}}
                >
                  Save
                </button>
                <Link
                  to="/"
                  type="submit"
                  onClick={() => dispatch(handleOpneMenuRequest(false))}
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
    </section>
  );
};

export default AddParty;
