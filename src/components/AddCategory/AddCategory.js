import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { handelAddcategoryRequest } from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { Button, Col,Form  } from "react-bootstrap";
import DataService from '../../services/requestApi';
import axios from "axios";
import { BASE_Url } from "../../URL";
import Swal from "sweetalert2";
const AddCategory = () => {
  const { saasId, storeId } = JSON.parse(localStorage.getItem("User_data"));
  const [categoryImage, setCategoryImage] = useState(null);

  const [category, setCategory] = useState(''); // State to hold the category value
  const [MasterCatogoryId, setMAsterCatogoyrID] = useState(''); // State to hold the category value
  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
        const data = {
          saas_id: saasId,
          store_id: storeId,
          category: category,
          master_category_id:saasId == 14?1244058:MasterCatogoryId
        };
     
          const response = await DataService.CategoryAdd(data);
          console.log(" category",response.data)
          
          FileUplode(response.data.data.category_id)
          Swal.fire({
            title:"Add Category Successfully",
            icon:"success",
            timer:500
          })

        
        }
      
      catch (error) {
        console.log("Error:", error);
      }
    };



  const handleCategoryChange = (event) => {
    setCategory(event.target.value); // Update the category state on input change
  };
 
  const handleFileChange = (event) => {
      setCategoryImage(event.target.files[0]);
    };
  const FileUplode =async(ID)=>{
      try {
        const formData = new FormData();
        formData.append('file', categoryImage);
        const response= await axios.post(`${BASE_Url}/category/save-image-by-category/${ID}`,formData)
      } catch (error) {
        console.log(error)
      }
        }

  return (
    <div>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-5 col-md-10 col-sm-12 px-5">
            <form className="form-box" onSubmit={handleSubmit}>
              <h4>Add Category</h4>

              <div>
              <TextField
                    size="small"
                    type="text"
                    className="form-control my-2"
                      onChange={handleCategoryChange}
                    name="CategoryName"
                    label="Category Name"
                    multiline
                    required
                  
                  />
             { saasId != "14" && <TextField
                    size="small"
                    type="text"
                    className="form-control my-2"
                      onChange={(e)=>{setMAsterCatogoyrID(e.target.value)}}
                    name="MasterCatogory"
                    label="Enter Master Category id"
                    multiline
                    required
                  
                  />}
              </div>
              <div>
              <Button className="btn btn-primary">
             <Form.Group onChange={handleFileChange} controlId="formFile" className="">
                    <Form.Label> Upload Category Image</Form.Label>
                    <Form.Control type="file"  />
                  </Form.Group>
                  </Button></div>
              <div className="mt-3">
                <Button
                  //   to={"/home"}
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
                  }}>
                  Save
                </Button>
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
                  }}>
                  Close
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
