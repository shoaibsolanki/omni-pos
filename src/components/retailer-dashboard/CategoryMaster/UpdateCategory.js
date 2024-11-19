import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Button, Col,Form  } from "react-bootstrap";
import { BsArrowLeft } from 'react-icons/bs';
import { Input, TextField } from '@mui/material';
import { BASE_Url } from '../../../URL';
import axios from 'axios';
import DataService from '../../../services/requestApi';

const UpdateCategory = ({row, open, setOpenUpdate, Getcategory }) => {

    const [categoryImage, setCategoryImage] = useState(null);
    const [category, setCategory] = useState(''); // State to hold the category value
    useEffect(() => {
      setCategory(row.category_name)
    }, [row])
    
    const { saasId, storeId } = JSON.parse(localStorage.getItem("User_data"));
    const UpdatebyCategory = async () => {
        try {
          const data = {
            saas_id: saasId,
            store_id: storeId,
            category: category,
          };
       
            const response = await DataService.CategoryUpdate(row.category_id, data);
            if(response.data.status){
               if(categoryImage){
                 FileUplode(row.category_id)
               }else{
                Getcategory();
               }
             
              setOpenUpdate(false);
            
            }
          
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
          if(response.data.status){
            Getcategory();
          }
        } catch (error) {
          console.log(error)
        }
          }
  return (
    <div>
      <Modal isOpen={open} toggle={() => setOpenUpdate(!open)}>
        <ModalHeader>
          <BsArrowLeft
            onClick={() => setOpenUpdate(!open)}
            className="mouse-pointer"
          />
          Update Category*
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
                      onChange={handleCategoryChange}
                      value={category}
                    name="CategoryName"
                    label="Category Name"
                    multiline
                    required
                  
                  />
                  <div >
              <div>
              <Button className="btn btn-primary">
             <Form.Group onChange={handleFileChange} controlId="formFile" className="">
                    <Form.Label> Upload Category Image</Form.Label>
                    <Form.Control type="file"  />
                  </Form.Group>
                  </Button></div>
                  <div>
           
             </div>
           </div>
            
             
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
                 
                    onClick={UpdatebyCategory}  >
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

export default UpdateCategory;
