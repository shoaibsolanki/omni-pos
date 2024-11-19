// File: CustomerProfile.jsx
import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Avatar,
  Button,
  Link,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { BASE_Url } from '../../URL';
import axios from 'axios';
import ForgotPasswordModal from './ForgotPasswordModal';
import EditAdrdresModal from './EditAdrdresModal';

const CustomerProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const EditOpenmodal = () => {
    setModalShow(true);
  };
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/home");
  };

  const handleForgotPassword = () => {
    // Handle the "Forgot Password" logic
    // (This function may be updated based on your specific requirements)
    handleCloseModal();
  };

  const userData = JSON.parse(localStorage.getItem("Customer_data"));
  const { id } = userData;
  const [getAddressData, setgetAddressData] = useState(null);
  const { saasId, storeId } = localStorage.getItem("User_data")
    ? JSON.parse(localStorage.getItem("User_data"))
    : {};

  const fetchAddressData = async () => {
    try {
      const response = await axios.get(
        `${BASE_Url}/customer/get-all-customer-address-app/${id}/${saasId}/${storeId}`
      );
      const lastIndex = response.data.data?.length - 1;
      console.log("new address", response.data.data[lastIndex]);
      setgetAddressData(response.data.data[lastIndex]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchAddressData();
    console.log("first");
  }, []);

  return (
    <>
      <ArrowBackIcon onClick={handleNavigate} className='mx-5 mt-2'/>
      <Container style={{ marginTop: "-30px" }} maxWidth="sm">
        <Paper elevation={3} style={{ padding: '20px', marginTop: '50px' }}>
          <Avatar sx={{ width: 100, height: 100, margin: 'auto' }}>
            <PersonIcon style={{ width: 60, height: 60 }} />
          </Avatar>
          <Typography variant="h5" align="center" gutterBottom>
            Customer Name: {userData?.userName}
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom>
            Address: {getAddressData && getAddressData?.address} {getAddressData && getAddressData?.pincode}
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom>
            Phone Number: {userData?.mobileNumber}
          </Typography>
          <Button variant="contained" fullWidth color="primary" style={{ marginTop: '20px' }}
          onClick={EditOpenmodal}>
            Edit Address
          </Button>
          <Typography variant="body2" color="textSecondary" align="center" style={{ marginTop: '10px' }}>
            <Link component="button" onClick={handleOpenModal}>
              Forgot Password?
            </Link>
          </Typography>
        </Paper>

        {/* Forgot Password Modal */}
        <ForgotPasswordModal isOpen={isModalOpen} onClose={handleCloseModal} />
        <EditAdrdresModal show={modalShow} fetchAddressData={fetchAddressData} setModalShow={setModalShow} onHide={() => setModalShow(false)} />
      </Container>
    </>
  );
};

export default CustomerProfile;


















































































































// import { TextField } from "@mui/material";
// import Button from "react-bootstrap/Button";
// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import {
//   handleUpdateAddressforUserRequest,
//   handleUpdateAddressforUserResponse,
// } from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
// import axios from "axios";
// import { BASE_Url } from "../../URL";
// import { MenuItem } from "@material-ui/core";

// const CustomerProfile = () => {
//   const navigate = useNavigate();
//   const { storeId, saasId } = JSON.parse(localStorage.getItem("User_data"));
//   const { id } = JSON.parse(localStorage.getItem("Customer_data"));

//   const dispatch = useDispatch();
//   const [city, setCity] = useState("");
//   const [street, setStreet] = useState("");
//   const [pincode, setPincode] = useState("");
//   const [address, setAddress] = useState("");
//   const [state, setState] = useState("");
//   const [type, setType] = useState("");
//   const onOptionChange = (e) => {
//     setType(e.target.value);

//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
 
//     axios
//       .post(`${BASE_Url}/customer/create-address/${id}`, {
//         address: address,
//         address_type: type,
//         street: street,
//         store_id: storeId,
//         saas_id: saasId,
//         pincode: pincode,
//         city: city,
//         state: state,
//       })
//       .then((res) => {
//         if (res.data) {
//           console.log(res.data.message);
//           toast.success(res.data.message);
//           dispatch(handleUpdateAddressforUserResponse(res.data.data));
//           setTimeout(() => {
//             navigate("/home");
//           }, 1000);
//         }
//       })
//       .catch((err) => console.log(err));

//   };
//   const [selectedRole, setSelectedRole] = useState('');
//   const [areas, setAreas] = useState([]);

//   useEffect(() => {
//     const fetchAreaData = async () => {
//       try {
//         const response = await axios.get(`${BASE_Url}/areamaster/get-all-area-master`);
//         setAreas(response.data.data); 
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchAreaData();
//   }, []);

//   return (
//     <>
//       <div>
//         <div className="container">
//           <div className="row d-flex justify-content-center">
//             <div className="col-lg-5 col-md-10 col-sm-12 px-5">
//               <form className="form-box" onSubmit={handleSubmit}>
//                 <h4>Profile</h4>
//                 <h1>Add Address</h1>
//                 <div>
//                   <TextField
//                     size="small"
//                     type="text"
//                     className="form-control my-2"
//                     id="customer-name"
//                     label="Address"
//                     value={address}
//                     onChange={(e) => {
//                       setAddress(e.target.value);
//                     }}
//                   />
//                 </div>
//                 <div>
//                 <TextField
//       size="small"
//       select
//       className="form-control my-2"
//       id="customer-name"
//       label="Street"
//       value={street}
//       onChange={(e) => setStreet(e.target.value)}
//     >
//       {areas.map((area, index) => (
//         <MenuItem key={index} value={area.area_name}>
//           {area.area_name}
//         </MenuItem>
//       ))}
//     </TextField>
//                 </div>
           
//                 <div
//                   className="my-3"
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <div className="form-check form-check-inline">
//                     <input
//                       className="form-check-TextField mx-2"
//                       type="radio"
//                       name="inlineRadioOptions"
//                       value={"OFFICE"}
                    
//                       onChange={onOptionChange}
//                       id="inlineRadio4"
                  
//                     />
//                     <label className="form-check-label" for="inlineRadio4">
//                       Office
//                     </label>
//                   </div>
//                   <div className="form-check form-check-inline">
//                     <input
//                       className="form-check-TextField mx-2"
//                       type="radio"
//                       name="inlineRadioOptions"
//                       id="inlineRadio5"
//                       value={"HOME"}
                
//                       onChange={onOptionChange}
//                     />
//                     <label className="form-check-label" for="inlineRadio5">
//                       Home
//                     </label>
//                   </div>
//                 </div>

//                 <div>
//                   <TextField
//                     size="small"
//                     type="text"
//                     className="form-control my-2"
//                     id="customer-name"
//                     label="Pincode"
//                     value={pincode}
//                     onChange={(e) => {
//                       setPincode(e.target.value);
//                     }}
//                   />
//                 </div>
//                 <div>
//                   <TextField
//                     size="small"
//                     type="text"
//                     className="form-control my-2"
//                     id="customer-name"
//                     label="City"
//                     value={city}
//                     onChange={(e) => {
//                       setCity(e.target.value);
//                     }}
//                   />
//                 </div>
//                 <div>
//                   <TextField
//                     size="small"
//                     type="text"
//                     className="form-control my-2"
//                     id="customer-name"
//                     label="State"
//                     value={state}
//                     onChange={(e) => {
//                       setState(e.target.value);
//                     }}
//                   />
//                 </div>

//                 <div className="mt-3">
//                   <Button
                  
//                     type="submit"
//                     className="btn btn-primary"
//                     style={{
                   
//                       outline: "none",
//                       border: "none",
//                       fontSize: "20px",
//                       padding: "10px 20px",
//                       borderRadius: "10px",
//                       color: "#fff",
//                     }}
//                   >
//                     Save
//                   </Button>
//                   <Link
//                     to="/"
//                     type="submit"
                  
//                     className="btn btn-primary"
//                     style={{
//                       backgroundColor: "gray",
//                       outline: "none",
//                       border: "none",
//                       marginLeft: "20px",
//                       fontSize: "20px",
//                       padding: "10px 20px",
//                       borderRadius: "10px",
//                       color: "#fff",
//                     }}
//                   >
//                     Close
//                   </Link>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CustomerProfile;
