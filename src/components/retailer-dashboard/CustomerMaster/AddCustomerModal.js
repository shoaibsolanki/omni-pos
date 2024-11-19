import React, { useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Col } from "react-bootstrap";
import { BsArrowLeft } from 'react-icons/bs';
import { TextField } from '@mui/material';
import DataService from '../../../services/requestApi';
import Swal from 'sweetalert2';

const AddCustomerModal = ({ open, setAddCustomer, Getcustomer }) => {
    const { saasId, storeId } = JSON.parse(localStorage.getItem("User_data"))
  const [data, setData] = useState({
  "mobile_number": "",
  "email": "",
  "name": "",
  "discount_percent": "",
  "customer_type": "",
  "saas_id": saasId,
  "store_id": storeId,
  })

  // API call for update department
  const AddSalesMan = async () => {
    try {
      if(data.mobile_number && data.email && data.name && data.discount_percent){

        const response = await DataService.AddCutomer(data);
        console.log(response)
        if (response.data.status) {
          Getcustomer();
          setAddCustomer(false);
          Swal.fire({
              title:"New Customer Added Successfully",
              icon:"success",
              timer:2000
          })
        }
      }else{
        Swal.fire({
          title:"Please Fill All Field",
          icon:"info",
          timer:2000
        })
      }
      setData('')
    } catch (error) {
      console.log("Error:", error);
      Swal.fire({
        title:"New customer have to Unique mobail number",
        icon:"error",
        timer:2000
    })
    }
  };
  


  const handleonchange=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
   }
  return (
    <div>
      <Modal isOpen={open} toggle={() => setAddCustomer(!open)}>
        <ModalHeader>
          <BsArrowLeft
            onClick={() => setAddCustomer(!open)}
            className="mouse-pointer"
          />
          Add Customer*
        </ModalHeader>
        <ModalBody>
          <div className="row d-flex justify-content-center">
            <div className="">
              <form className="form-box" encType="Content-Type">
                <div className="d-flex flex-col" style={{ display: "flex", flexDirection: "column" }}>
                  <Col md={12}></Col>
                  <TextField
                size="small"
                type="text"
                className="form-control my-2"
                value={data.name}
                name='name'
                onChange={handleonchange }
                label="Enter Customer Name"
                multiline
                required
                rows={1}
              />
                  <TextField
                  required
                  id="outlined-number"
                  type="number"
                size="small"
                className="form-control my-2"
                value={data.mobile_number}
                name='mobile_number'
                onChange={handleonchange }
                label="Mobail Number"
                // rows={1}
              />
              <TextField
                size="small"
                type="email"
                className="form-control my-2"
                value={data.email}
                name='email'
                onChange={handleonchange }
                label="Email"
                multiline
                required
                rows={1}
              />
              <TextField
                size="small"
                type="number"
                className="form-control my-2"
                value={data.discount_percent}
                name='discount_percent'
                onChange={handleonchange }
                label="Enter Discount Percentge"
                multiline
                required
                rows={1}
              />
                </div>
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
                    onClick={AddSalesMan}
                  >
                    Add Customer
                  </button>
                  <span
                    onClick={() => setAddCustomer(!open)}
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

export default AddCustomerModal;
