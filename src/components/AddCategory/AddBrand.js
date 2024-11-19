import { TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BASE_Url } from "../../URL";
import Swal from "sweetalert2";
const AddBrand = () => {
    const navigate = useNavigate()
    const { saasId, storeId } = JSON.parse(localStorage.getItem("User_data"));
    const [brand, setBrand] = useState("");
    const Body ={
        saas_id: saasId,
        store_id: storeId,
        brand_name: brand
      }
    const handleSubmit =async(e)=>{
        e.preventDefault();
        if(brand){
            const data =await axios.post(`${BASE_Url}/brand/create`,Body)
            console.log("this Brand",data.data.data.brandName)
            Swal.fire({ 
              text: `New Brand Added ${data.data.data.brandName}`,
              timer: 1000});
            navigate('/')
        }else{
            Swal.fire({
                title:"Error",text:'Please fill all the fields',icon:'error'
            })
        }
    }
  return (
    <div>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-5 col-md-10 col-sm-12 px-5">
            <form className="form-box" 
            onSubmit={handleSubmit}
            >
              <h4>Add Brand</h4>

              <div>
                <TextField
                  size="small"
                  type="text"
                  className="form-control my-2"
                  id="customer-name"
                  label="Enter Brand Name"
                  value={brand}
                  onChange={(e) => {
                    setBrand(e.target.value);
                  }}
                />
              </div>

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
  )
}

export default AddBrand