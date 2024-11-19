import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import RetailerQRCode from "../../assets/KhamasQrCode.jpeg";
import QRCode from "../../assets/QRImageRetailer.jpg";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataService from '../../services/requestApi';
import Swal from 'sweetalert2';
import { BASE_Url } from "../../URL";
import axios from "axios";
function MoneyWalletStep2(props) {
  const modalStyle = {
    borderRadius: 0,
    color: "#333",
    height: "100%",
    width: "100%",
  };

  const { paymentShow, setPaymentShow, transactionAmount,setTransactionAmount } = props;

  const modalBodyStyle = {
    width: "100%",
  };

  const buttonStyle = {
    width: "100%",
    height: "54px",
    borderRadius: "8px",
  };

  const paymentOptions = [
    {
      id: 1,
      title: "Paytm Payment Bank",
      description: "Saving A/c Balance",
      imageSrc:
        "https://cdn.freelogovectors.net/wp-content/uploads/2023/09/paytm-logo-freelogovectors.net_.png",
    },
    {
      id: 2,
      title: "Payment QR Code",
      description: "Scan QR",
      imageSrc: QRCode,
    },
    // Add more payment options as needed
  ];

  const [selectedPayment, setSelectedPayment] = useState(null);

  const handleRadioChange = (paymentId) => {
    setSelectedPayment(paymentId);
  };

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   setSelectedFile(file);
  // };

    // API call for Payment Approvak
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };
    const { id, userName } = JSON.parse(localStorage.getItem("Customer_data")) ?? {};
    const { saasId, storeId} = localStorage.getItem(
      "User_data"
    )
      ? JSON.parse(localStorage.getItem("User_data"))
      : {};
    const Data = {
      customer_id: id,
      customer_name: userName,
      saas_id: saasId, 
      store_id: storeId,
      amount_recieved: transactionAmount,
      status: "confirm", // Assuming this is a constant value
    };
  
    const submitPayment = async () => {
      try {
        // Make a POST request to add money
        if(!file){
          Swal.fire({
            title: "Plz Upload Payment Transection ScreenShot",
            text: ".",
            icon: "error", 
            timer: 2000
          });
return
        }
        console.log("Second",Data)
       const response= await axios.post(
          `${BASE_Url}/paymentReference/save-customer-details`,
          Data
        );
   
        setPaymentShow(false)
        FileUplode(response.data.data.id)
        setTransactionAmount('')
        Swal.fire({
          title: "Pending Wallet Payment",
          text: "Your wallet will be automatically updated once the retailer confirms the payment.",
          icon: "info", 
          timer: 3000
        });
        console.log("Payment added successfully!");
    
        
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    // const handleInputChange = (e) => {
    //   const { name, value } = e.target;
    //   setCustomerData((prevData) => ({ ...prevData, [name]: value }));
    // };

 
    const FileUplode =async(ID)=>{
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response= await axios.post(`${BASE_Url}/paymentReference/save-image-by-Id/${ID}`,formData)
  } catch (error) {
    console.log(error)
  }
    }
  return (
    <div>
      <Modal show={paymentShow} onHide={() => setPaymentShow(false)} style={modalStyle}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontWeight: "600", fontSize: "18px" }}>
            Add Money To Wallet {transactionAmount}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={modalBodyStyle}>
          {paymentOptions.map((paymentOption) => (
            <div
              key={paymentOption.id}
              style={{
                width: "100%",
                height: "53px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <div style={{ display: "flex", gap: "15px" }}>
                <input
                  type="radio"
                  name="PaymentOption"
                  style={{
                    width: "25px",
                    height: "25px",
                  }}
                  onChange={() => handleRadioChange(paymentOption.id)}
                />
                <div>
                  <h4 style={{ fontWeight: "600", fontSize: "18px" }}>
                    {paymentOption.title}
                  </h4>
                  <p
                    style={{
                      fontWeight: "600",
                      fontSize: "16px",
                      color: "#59727a",
                    }}
                  >
                    {paymentOption.description}
                  </p>
                </div>
              </div>
              <div>
                <img
                  style={{ width: "40px", height: "40px" }}
                  src={paymentOption.imageSrc}
                  alt="payment"
                />
              </div>
            </div>
          ))}

          {/* Conditionally render the image based on the selectedPayment */}
          {selectedPayment === 2 && (
            <>
            <div className="d-flex justify-content-center">
           {saasId==="6" &&  <img
                className="m-2"
                style={{ height: "400px" }}
                src={RetailerQRCode}
                alt="Add payment QR"
              />} 
            </div>
             <div className="wraaapper">
             <p>
               please Take Your transactione Payment <code>Screenshot</code> .
             </p>
         
             <div className="d-flex justify-content-around m-3" id="wrap">
              <div>
              <Button className="btn btn-primary">
             <Form.Group controlId="formFile" className="">
                    <Form.Label>Take Your Screenshot</Form.Label>
                    <Form.Control type="file" onChange={handleFileChange} />
                  </Form.Group>
                  </Button></div>
                  <div>
             <a href={RetailerQRCode} download>
           <CloudDownloadIcon style={{fontSize:"36px"}}/>
  
             </a>
             </div>
           </div>
 </div>
        
           </>
          )}

          <Button onClick={submitPayment} style={buttonStyle} variant="warning" disabled={!selectedPayment}>
            <span
              style={{
                fontWeight: "700",
                fontSize: "24px",
              }}
            >
              Pay Now
            </span>
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default MoneyWalletStep2;
