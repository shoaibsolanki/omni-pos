import React, { useEffect } from "react";
import { TextField } from "@mui/material";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { BiSearchAlt2 } from 'react-icons/bi';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  handleUpdateAddressforUserRequest,
  handleUpdateAddressforUserResponse,
} from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import axios from "axios";
import { BASE_Url } from "../../URL";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function EditAdrdresModal(props) {
    const navigate = useNavigate();
    const { storeId, saasId } = JSON.parse(localStorage.getItem("User_data"));
    const { id } = JSON.parse(localStorage.getItem("Customer_data"));
  const {setModalShow,fetchAddressData} =props
    const dispatch = useDispatch();
    const [city, setCity] = useState(saasId == 6 ? "Varanasi" : '');
    const [state, setState] = useState(saasId ==6 ?"Uttar Pradesh": '');
    const [street, setStreet] = useState("");
    const [pincode, setPincode] = useState("");
    const [address, setAddress] = useState("");
    const [type, setType] = useState("");
    const onOptionChange = (e) => {
      setType(e.target.value);
  
    };
    const handleSubmit = (e) => {
      e.preventDefault();
   
      axios
        .post(`${BASE_Url}/customer/create-address/${id}`, {
          address: address,
          address_type: type,
          street: street,
          store_id: storeId,
          saas_id: saasId,
          pincode: pincode,
          city: city,
          state: state,
        })
        .then((res) => {
          if (res.data) {
            console.log(res.data.message);
            toast.success(res.data.message);
            fetchAddressData()
            handleClose()
            dispatch(handleUpdateAddressforUserResponse(res.data.data));
          
          }
        })
        .catch((err) => console.log(err));
  
    };

    const handleClose = () => setModalShow(false)
    const [selectedRole, setSelectedRole] = useState('');
    const [areas, setAreas] = useState([]);
  
    useEffect(() => {
      const fetchAreaData = async () => {
        try {
          const response = await axios.get(`${BASE_Url}/areamaster/get-all-area-master`);
          setAreas(response.data.data); 
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchAreaData();
    }, []);
  
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
          <Modal.Header>
          <ArrowBackIcon className="mx-2"  onClick={handleClose}/><Modal.Title>Edit Address! </Modal.Title>
        </Modal.Header>
                    <Modal.Body>
                   

                    <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="">
              <form className="form-box" onSubmit={handleSubmit}>
               
                <div>
                  <TextField
                    size="small"
                    type="text"
                    className="form-control my-2"
                    id="customer-name"
                    label="Address"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                </div>
                <div>
                <input
  type="text"
  list="areas"
  id="street"
  name="street"
  placeholder='Street'
  value={street}
  onChange={(e) => setStreet(e.target.value)}
  className="form-control my-2"
/>
    <datalist id="areas">
  {areas.map((area, index) => (
    <option key={index} value={area.area_name} />
  ))}
</datalist>
                </div>
           
                <div
                  className="my-3"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-TextField mx-2"
                      type="radio"
                      name="inlineRadioOptions"
                      value={"OFFICE"}
                    
                      onChange={onOptionChange}
                      id="inlineRadio4"
                  
                    />
                    <label className="form-check-label" for="inlineRadio4">
                      Office
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-TextField mx-2"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio5"
                      value={"HOME"}
                
                      onChange={onOptionChange}
                    />
                    <label className="form-check-label" for="inlineRadio5">
                      Home
                    </label>
                  </div>
                </div>

                <div>
                  <TextField
                    size="small"
                    type="text"
                    className="form-control my-2"
                    id="customer-name"
                    label="Pincode"
                    value={pincode}
                    onChange={(e) => {
                      setPincode(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <TextField
                    size="small"
                    type="text"
                    className="form-control my-2"
                    id="customer-name"
                    label="City"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <TextField
                    size="small"
                    type="text"
                    className="form-control my-2"
                    id="customer-name"
                    label="State"
                    value={state}
                    onChange={(e) => {
                      setState(e.target.value);
                    }}
                  />
                </div>

                <div className="mt-3">
                  <Button
                  
                    type="submit"
                    className="btn btn-primary"
                    style={{
                   
                      outline: "none",
                      border: "none",
                      fontSize: "20px",
                      padding: "10px 20px",
                      borderRadius: "10px",
                      color: "#fff",
                    }}
                  >
                    Save
                  </Button>
                  {/* <Button
                  onClick={handleClose}
                    type="submit"
                  
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
                  </Button> */}
                </div>
              </form>
            </div>
          </div>
        </div>



                 </Modal.Body>
    </Modal>
  )
}

export default EditAdrdresModal