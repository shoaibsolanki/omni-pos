import React, { useState, useEffect } from "react";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import Select, { useStateManager } from "react-select";
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button';
import f7 from "../../assets/QR.jpeg";
import { BASE_Url } from "../../URL";
// import {
//   Button,
//   Col,
//   Form,
//   FormGroup,
//   Input,
//   Label,
//   Modal,
//   ModalBody,
//   ModalFooter,
//   ModalHeader,
//   Row,
// } from "reactstrap";

function OnlineUserPayment(props) {
    const { Barcode, setModalIsOpen } = props;
    const handleClose = () => setModalIsOpen(false);
    
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
    const { storeId } = JSON.parse(localStorage.getItem("User_data"));
  
    const imagedownlod = `${BASE_Url}/store-master/get-QR/${storeId}`
      
    
    
  return (
    <Modal
        show={Barcode}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{    fontFamily: 'Merriweather'}}>OnlinePayMent</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center"  >
          <div style={{height:"fit-content"}}>
         <img src={`${BASE_Url}/store-master/get-QR/${storeId}`} style={{width:"300px"}} alt="" />
         

<div className="d-flex">
         <Button className="mb-2" component="label" variant="contained" style={{ fontFamily: 'Merriweather',width: "-webkit-fill-available"}} >
      Upload Payment SS
      <VisuallyHiddenInput type="file" 
      // onChange={(e) => {
      //                 console.log("evfdcvfvfvc", e.target.files[0].name);
      //                 setImage(e.target.files[0]);
      //                 setImageName(e.target.files[0].name);
      //               }} 
                     />
    </Button>
    <a href={imagedownlod} download='image.jpg'>
    <i class="fa-solid fa-circle-down fa-2x m-1">
    </i>
      </a>
    </div>
   
          </div>

        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>
            Close
          </button>
          <button className="btn btn-primary">Save</button>
        </Modal.Footer>
      </Modal>
  )
}

export default OnlineUserPayment