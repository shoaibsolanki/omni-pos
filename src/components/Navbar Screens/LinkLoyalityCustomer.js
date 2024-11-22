import { TextField } from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_Url } from "../../URL";
// import { handleLinkLoyaltyRequest } from "../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { handleLinkLoyaltyRequest } from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
const LinkLoyalityCustomer = () => {
  const { saasId } = JSON.parse(localStorage.getItem("User_data"));
  const { scan_bill } = JSON.parse(localStorage.getItem("Store_data"));
  console.log("STORAGE DATA", saasId);

  const { link_loyalty_detail } = useSelector(
    (e) => e.ComponentPropsManagement
  );
  console.log("LINK LOYLTY DATA", link_loyalty_detail);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [userName, setUsername] = useState("");
  const [userMobile, setUserMobile] = useState("");
  const [loyltyAmount, setLoyltyAmount] = useState("");
  const [err, setErr] = useState("");
  // const [dataRes, setDataRes] = useState({});

  console.log("LINK LOYALITY DATA", link_loyalty_detail);

  useEffect(() => {
    if (
      link_loyalty_detail &&
      link_loyalty_detail.customer_name &&
      link_loyalty_detail.email_id
    ) {
      //     setUsername(data.data.customer_name);
      // setUserMobile(data.data.mobile_number);
      setUsername(link_loyalty_detail.customer_name);
      setUserMobile(link_loyalty_detail.email_id);
      setLoyltyAmount(link_loyalty_detail.converted_cash);
    }
  }, [link_loyalty_detail]);
  // console.log(userName, userMobile);
  const handleSearch = (e) => {
    dispatch(
      handleLinkLoyaltyRequest({
        mobile_number: e.target.value,
        email_id: "",
        customer_id: "",
        client_id: saasId,
        base_currency: "INR",
      })
    );
    // axios
    //   .post(`http://3.111.70.84:8091/test/v1/loyalty/customer-details`, {
    //     base_currency: "AED",
    //     mobile_number: e.target.value,
    //     email_id: "",
    //     customer_id: "",
    //     client_id: saasId,
    //     // mobile_number: e.target.value,
    //   })
    //   // .then((res) => res.json())
    //   .then((data) => {
    //     console.log("DATA", data);
    //     localStorage.setItem("Loyalty_data", JSON.stringify(data));
    //     setUsername(data.data.customer_name);
    //     setUserMobile(data.data.mobile_number);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setErr(err.message);
    //   });
  };
  useEffect(() => {}, [handleSearch]);

  // console.log(dataRes);
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

  const optimizedFn = useCallback(debounce(handleSearch), []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-lg-5 col-md-10 col-sm-12 px-5">
          <form className="form-box" onSubmit={handleSubmit}>
            <h4>Link Loyalty</h4>
            {/* <div>
              <div>NanoPos Loyalty</div>
            </div> */}
            <div>
              <TextField
                size="small"
                type="text"
                className="form-control my-2"
                id="customer-name"
                label="Mobile Number"
                value={searchValue}
                onChange={(e) => {
                  optimizedFn(e);
                  setSearchValue(e.target.value);
                }}
              />
            </div>
            {searchValue && searchValue ? (
              <div
                style={{
                  background: "#ffae00",
                  padding: "20px",
                  borderRadius: "20px",
                }}
              >
                <p
                  style={{
                    fontSize: "30px",
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  Nano Loyalty
                </p>

                <div className="d-flex align-items-center justify-content-between">
                  <p style={{ padding: 0, margin: 0 }}>Loyality Customer</p>
                  <p
                    style={{
                      fontWeight: "900",
                      padding: 0,
                      margin: 0,
                      // fontSize: "20px",
                    }}
                  >
                    {userName}
                  </p>
                </div>
                <div className="d-flex align-items-center justify-content-between my-3">
                  <p style={{ padding: 0, margin: 0 }}>Email Number</p>
                  <p
                    style={{
                      fontWeight: "900",
                      padding: 0,
                      margin: 0,
                      // fontSize: "20px",
                    }}
                  >
                    {userMobile}
                  </p>
                </div>

                <div className="d-flex align-items-center justify-content-between my-3">
                  <p style={{ padding: 0, margin: 0 }}>Loyalty Amount</p>
                  <p
                    style={{
                      fontWeight: "900",
                      padding: 0,
                      margin: 0,
                      // fontSize: "20px",
                    }}
                  >
                    {loyltyAmount}
                  </p>
                </div>
                <div>
                  {userMobile && userName ? <div className="mt-3"></div> : ""}
                </div>
              </div>
            ) : (
              err
            )}
            <div className="mt-3">
              <Link
                to={`${scan_bill? "/scanscreen" : "/home"  }`}
                type="submit"
                className="btn btn-primary"
                style={{
                  // backgroundColor: "yellowgreen",
                  outline: "none",
                  border: "none",
                  fontSize: "20px",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  color: "#fff",
                }}
              >
                Home
              </Link>
              {/* <Link
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
              </Link> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LinkLoyalityCustomer;
