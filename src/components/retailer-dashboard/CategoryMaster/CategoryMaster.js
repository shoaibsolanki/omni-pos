import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { MdDelete,MdEdit, MdPlaylistAdd } from "react-icons/md";
import DataTable from "react-data-table-component";
import Swal from 'sweetalert2';
import DataService from '../../../services/requestApi'
// import AddCustomerModal from './StoreinsightsModals/AddCustomerModal';
// import CustomerUpdateModal from './StoreinsightsModals/CustomerUpdateModal';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
// import { BASEURL } from '../../../services/http-common';

import { BASE_Url } from '../../../URL';
import { Image } from 'antd';
import UpdateCategory from './UpdateCategory';
import { Link } from 'react-router-dom';
function CategoryMaster({category, Getcategory,handlePageChange,count,setCustomer}) {
  const [OpenUpdate, setOpenUpdate] = useState(false)
  const [SelectedRow, setSelectedRow] = useState("")
 const [AddCustomer, setAddCustomer] = useState(false)
 
  const deletecategorybyId = async (category_id) => {
    try {
      const response = await DataService.deleteCategory(category_id); // Assuming you have this function in your DataService
      console.log("Delete Concept", response.data);
      if(response.data.status){
        Getcategory()
        Swal.fire({
          title:'Category Delete Successfully',
          icon:"success",
          timer:2000
        })
      }
      // Optionally, you can update the state or perform any other actions after successful deletion.
    } catch (error) {
      console.error("Error deleting concept", error);
    }
  };

  
  


  
    const style={
        boxShadow:"4px 4px 10px 0px rgba(0, 0, 0, 0.25)",
        borderRadius:"4px",
        background:"white",
        color:"black",
        border:"0px"
      }
      const columns = [
        {
          name: "Custome Name",
          // center: true,
          selector: (row) => row.category_name,
          cell: (row) => {
            return (
              <>
                <div >{row.category_name}</div>
              </>
            );
          },
        },
     
        // {
        //   name: "Saas Id",
        //   center: true,
        //   selector: (row) => row.saas_id,
        // },
     
        // {
        //     name: 'Discount',
        //     center: true,
        //     selector: row => row.discount,
        // },
        {
          name: "Category id",
          center: true,
          selector: (row) => row.category_id,
        },
      
          {
      name: 'Category Image',
      center: true,

      cell: (row) => (
        <div>
          <Image src={row.image_path} alt="Wallet Balance" style={{ width: '30px', height: '30px' }} />
        </div>
      ),
    },
     
        {
          name: "Action",
          center: true,
          selector: (row) => {
          
    
            return (
              <>
                <div className="d-flex">
              <Link to="/add-category" style={{ cursor: 'pointer' }}>
              <MdPlaylistAdd size={22} color="green" className="mouse-pointer" />
            </Link>
    
                  <div style={{cursor:'pointer'}}>
                    <MdDelete
                      size={22}
                      color="red"
                      className="mouse-pointer"
                      onClick={() => deletecategorybyId(row.category_id)}
                    />
                  </div>
    
                  <div style={{cursor:'pointer'}}>
                    <MdEdit
                      size={22}
                      color="var(--primary1)"
                      className="mouse-pointer"
                      onClick={() => {
                        setOpenUpdate(true)
                        setSelectedRow(row)
                      }}
                    />
                  </div>
                </div>
    
           
              </>
            );
          },
        },
      ];
  return (
    <div>  <Container>


    <DataTable
  columns={columns}
  responsive={true}
  fixedHeader={true}
  paginationTotalRows={count}
  data={category || []} // Add a conditional check here
  pagination
  paginationServer
  onChangePage={(page) => handlePageChange(page)}
/>

  </Container>
    <UpdateCategory row ={SelectedRow} Getcategory={Getcategory} open={OpenUpdate} setOpenUpdate={setOpenUpdate}/>
  </div>
  )
}

export default CategoryMaster