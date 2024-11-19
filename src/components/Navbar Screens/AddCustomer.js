import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { handleRegisterUserRequest } from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";


const AddCustomer = ({ openMenu, setOpenMenu }) => {
  const { storeId,saasId } = JSON.parse(localStorage.getItem("User_data"));
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [cardNo, setCardNo] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [occupation, setOccupation] = useState("");
  const [Wallet, setWallet] = useState("");
  const [salesmanid, setsalesmanid] = useState();
  const onOptionChange = (e) => {
    setGender(e.target.value);
    console.log("E TARGET VALUE", e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("NAME", name);
    // console.log("MOBILE", mobile);
    // console.log("EMAIL", email);
    // console.log("ADDRESS", address);
    // console.log("AGE", age);
    // console.log("DOB", startDate);
    // console.log("GENDER", gender);
    // console.log("AGE", age);
    // console.log("OCCUPATION", occupation);
    dispatch(
      handleRegisterUserRequest({
        mobile_number: mobile,
        email: "",
        name: name,
        address_1: address,
        customer_type:"CUSTOMER",
        sales_representative:salesmanid,
        card_number:cardNo,
        // source_of_acq: "Source1",
        // dob: startDate,
        // gender: gender,
        // occupation: occupation,
        income_level: Wallet,
        saas_id: saasId,
        store_id: storeId,
      })
    );
    setName("");
    setMobile("");
    setCardNo("");
    setAge("");
    setAddress("");
    setGender("");
    setOccupation("");
  };
   
  // const getSalesMan= async()=>{
  //   try {
  //     const response = await DataService.GetSaleman(saasId,storeId,salesmanid)
  //     console.log(response)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  return (
    <>
      {/* // <section>
    //   <div className="container">
    //     <div className="row d-flex justify-content-center">
    //       <div className="col-lg-5 col-md-10 col-sm-12"> */}
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-5 col-md-9 col-sm-12 px-5">
            <form className="form-box" onSubmit={handleSubmit}>
              <h4>Add Customer</h4>
              <TextField
                type="text"
                className="form-control my-2"
                id="customer-name"
                size="small"
                label="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                type="text"
                className="form-control my-2"
                id="customer-name"
                size="small"
                required
                label="Mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <TextField
                type="text"
                className="form-control my-2"
                id="customer-name"
                required
                size="small"
                label="Enter Card Number"
                value={cardNo}
                onChange={(e) => setCardNo(e.target.value)}
              />

              {/* <div className="my-2 d-flex flex-column items-center justify-content-center">
                <p>Date of Birth</p>
                <ReactDatePicker
                  selected={startDate}
                  style={{ zIndex: 2 }}
                  onChange={(date) => setStartDate(date)}
                />
              </div> */}
              <TextField
                size="small"
                type="text"
                className="form-control my-2"
                id="customer-name"
                label="Delivery Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <TextField
                size="small"
                type="text"
                className="form-control my-2"
                id="customer-name"
                label="Sales Man Id"
                required
                value={salesmanid}
                onChange={(e) => setsalesmanid(e.target.value)}
              />
              <TextField
                size="small"
                type="number"
                className="form-control my-2"
                id="customer-name"
                label="Wallet Amount"
                required
                value={Wallet}
                onChange={(e) => setWallet(e.target.value)}
              />
              {/* <div style={{ width: "200px" }}> */}
                {/* <TextField
                  type="number"
                  className="form-control my-2"
                  id="customer-name"
                  label="Age"
                  size="small"
                  required
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                /> */}
              {/* </div> */}
              {/* <div className="d-flex justify-content-center">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-TextField mx-2"
                    type="radio"
                    name="inlineRadioOptions"
                    value={"Male"}
                    onChange={onOptionChange}
                    id="inlineRadio1"
                    // value="option1"
                  />
                  <label className="form-check-label" for="inlineRadio1">
                    Male
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-TextField mx-2"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value={"Female"}
                    onChange={onOptionChange}
                  />
                  <label className="form-check-label" for="inlineRadio2">
                    Female
                  </label>
                </div>
              </div> */}
              {/* <TextField
                type="text"
                className="form-control my-2"
                id="customer-name"
                label="Occupation"
                required
                size="small"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
              /> */}
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
                  Submit
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
      {/* 
    //   </div>
    // </section> */}
    </>
  );
};

export default AddCustomer;
