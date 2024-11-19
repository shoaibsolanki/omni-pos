import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Col } from "react-bootstrap";
import { BsArrowLeft } from 'react-icons/bs';
import { TextField } from '@mui/material';
import DataService from '../../../services/requestApi';
import Swal from 'sweetalert2';

const CustomerUpdateModal = ({ open, setOpenUpdate, row, Getcustomer }) => {
  const { saasId, storeId } = JSON.parse(localStorage.getItem("User_data"));

  // State variables
//   const [salesManName, setSalesManName] = useState("");
  const [concId, setConcId] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle changes for each field
    if (name === 'mobileNumber') {
      setMobileNumber(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'name') {
      setName(value);
    } else if (name === 'discountPercent') {
      setDiscountPercent(value);
    } 
  };
  useEffect(() => {
    if(row){
      setMobileNumber(row.mobile_number )
      setEmail(row.email);
      setName(row.name);
      setDiscountPercent(row.discount_percent)
    }
  }, [row])
  

  // Function to update concept data
  const UpdateConcept = async () => {
    try {
      const data = {
        saas_id: saasId,
        store_id: storeId,
        mobile_number: mobileNumber,
        email: email,
        name: name,
        discount_percent: discountPercent,
        customer_type: '',
      };
      if (mobileNumber && email && name && discountPercent) {
        const response = await DataService.CustomerUpdate(row.customer_id, data);
        if (response.data.status) {
          Getcustomer();
          setOpenUpdate(false);
        }
      }else{
        Swal.fire({
          title:"Please Fill All Feild",
          icon:"info",
          timer:2000
        })
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
      <Modal isOpen={open} toggle={() => setOpenUpdate(!open)}>
        <ModalHeader>
          <BsArrowLeft
            onClick={() => setOpenUpdate(!open)}
            className="mouse-pointer"
          />
          Update Customer *
        </ModalHeader>
        <ModalBody>
          <div className="row d-flex justify-content-center">
            <div className="">
              <form className="form-box" encType="Content-Type">
                <div className="d-flex flex-col" style={{ display: "flex", flexDirection: "column" }}>
                  <Col md={12}></Col>
                 
                  {/* <TextField
                    size="small"
                    type="text"
                    className="form-control my-2"
                    value={concId}
                    name="concId"
                    onChange={handleChange}
                    label="Concept id"
                    multiline
                    required
                    rows={1}
                  /> */}
                  <TextField
                    size="small"
                    type="text"
                    className="form-control my-2"
                    value={mobileNumber}
                    name="mobileNumber"
                    onChange={handleChange}
                    label="Mobile Number"
                    multiline
                    required
                    rows={1}
                  />
                  <TextField
                    size="small"
                    type="text"
                    className="form-control my-2"
                    value={email}
                    name="email"
                    onChange={handleChange}
                    label="Email"
                    multiline
                    required
                    rows={1}
                  />
                  <TextField
                    size="small"
                    type="text"
                    className="form-control my-2"
                    value={name}
                    name="name"
                    onChange={handleChange}
                    label="Name"
                    multiline
                    required
                    rows={1}
                  />
            
                  <TextField
                    size="small"
                    type="text"
                    className="form-control my-2"
                    value={discountPercent}
                    name="discountPercent"
                    onChange={handleChange}
                    label="Discount Percent"
                    multiline
                    required
                    rows={1}
                  />
                  {/* <TextField
                    size="small"
                    type="text"
                    className="form-control my-2"
                    value={customerType}
                    name="customerType"
                    onChange={handleChange}
                    label="Customer Type"
                    multiline
                    required
                    rows={1}
                  /> */}
                </div>
                {/* ... other form fields ... */}
                <div className="mt-2">
                  <button
                    className=''
                    type="button"
                    style={{
                      backgroundColor: "rgb(46, 69, 175)",
                      outline: "none",
                      border: "none",
                      fontSize: "20px",
                      padding: "10px 20px",
                      borderRadius: "10px",
                      color: "#fff",
                    }}
                    onClick={UpdateConcept}
                  >
                    Update
                  </button>
                  <span
                    onClick={() => setOpenUpdate(!open)}
                    className="btn btn-primary mb-2"
                    style={{
                      backgroundColor: "grey",
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
                  </span>
                </div>
              </form>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>{/* <h1>FOOTER</h1> */}</ModalFooter>
      </Modal>
    </div>
  );
};

export default CustomerUpdateModal;
