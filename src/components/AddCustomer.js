import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { handleRegisterUserRequest } from "../redux/actions-reducers/ComponentProps/ComponentPropsManagement";

const AddCustomer = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [occupation, setOccupation] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const onOptionChange = (e) => {
    setGender(e.target.value);
    console.log("E TARGET VALUE", e.target.value);
  };

  const handleSubmit = (e) => {
    const { storeId, saasId } = JSON.parse(localStorage.getItem("User_data"));
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
        email: email,
        name: name,
        address: address,
        source_of_acq: "Source1",
        dob: startDate,
        gender: gender,
        occupation: occupation,
        income_level: 600000,
        saas_id: saasId,
        store_id: storeId,
      })
    );
    setName("");
    setMobile("");
    setEmail("");
    setAge("");
    setAddress("");
    setGender("");
    setOccupation("");
  };

  
  return (
    <section>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-5 col-md-10 col-sm-12">
            <form className="form-box" onSubmit={handleSubmit}>
              <h4>Add Customer</h4>
              <input
                type="text"
                className="form-control my-4"
                id="customer-name"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                id="customer-name"
                required
                placeholder="Mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <input
                type="email"
                className="form-control my-4"
                id="customer-name"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div
                className="my-4 d-flex flex-column items-center justify-content-center"
                // style={{ width: "100%" }}
              >
                <p>Date of Birth</p>
                <ReactDatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
              <input
                type="text"
                className="form-control"
                id="customer-name"
                placeholder="Delivery Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                type="text"
                className="form-control my-4"
                id="customer-name"
                placeholder="Age"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <div className="d-flex justify-content-center">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
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
                    className="form-check-input"
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
              </div>
              <input
                type="text"
                className="form-control my-4"
                id="customer-name"
                placeholder="Occupation"
                required
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddCustomer;
