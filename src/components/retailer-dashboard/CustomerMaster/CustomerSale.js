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
import CustomerUpdateModal from './CustomerUpdateModal';
import AddCustomerModal from './AddCustomerModal';
import { BASE_Url } from '../../../URL';
import { useNavigate } from 'react-router-dom';
function CustomerSale({customer, Getcustomer,handlePageChange,count,setCustomer}) {
  const [OpenUpdate, setOpenUpdate] = useState(false)
  const [SelectedRow, setSelectedRow] = useState("")
  const navigate =useNavigate()
 const [AddCustomer, setAddCustomer] = useState(false)
  const deleteAllCustomer = async (customer_id) => {
    try {
      const response = await DataService.deleteCustomer(customer_id); // Assuming you have this function in your DataService
      console.log("Delete Concept", response.data);
      if(response.data.status){
        Getcustomer()
        Swal.fire({
          title:'Customer Delete Successfully',
          icon:"success",
          timer:2000
        })
      }
      // Optionally, you can update the state or perform any other actions after successful deletion.
    } catch (error) {
      console.error("Error deleting concept", error);
    }
  };

  const [invoiceNumber, setInvoiceNumber] = useState("");
  const { saasId, storeId } = JSON.parse(localStorage.getItem("User_data"))

  const handleSubmit = (event) => {
    event.preventDefault();
    if (invoiceNumber) {
      axios
        .get(
          `${BASE_Url}/customer/search-customer/${storeId}/${saasId}/${invoiceNumber}`
        )
        .then((res) => {
          setCustomer(res.data.data);
        })
        .catch((err) => {
          console.log("ERR CUSTOMER INVOICE NO.", err);
        });
    } else {
      setCustomer(customer);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInvoiceNumber(value);

    if (!value || value.length === 0) {
      Getcustomer();
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
          selector: (row) => row.name,
          cell: (row) => {
            return (
              <>
                <div >{row.name}</div>
              </>
            );
          },
        },
       
        // {
        //   name: "Email",
        //   center: true,
        //   selector: (row) => row.email,
        // },
        {
          name: "Mobile Number",
          center: true,
          selector: (row) => row.mobile_number,
        },
     
        // {
        //     name: 'Discount',
        //     center: true,
        //     selector: row => row.discount,
        // },
        {
          name: "CustomerId",
          center: true,
          selector: (row) => row.customer_id,
        },
      
          {
            name: 'Wallet Balance',
            center: true,
            selector: row => row.income_level,
        },
      //   {
      //     name: 'Payment History',
      //     center: true,
      //     selector: row => row.discount,
      // },
        {
          name: "Action",
          center: true,
          selector: (row) => {
          
    
            return (
              <>
                <div className="d-flex">
                <div style={{cursor:'pointer'}}>
                    <MdPlaylistAdd
                      size={22}
                      color="green"
                      className="mouse-pointer"
                      onClick={() =>{navigate('/add-customer')}}
                    />
                  </div>
    
                  <div style={{cursor:'pointer'}}>
                    <MdDelete
                      size={22}
                      color="red"
                      className="mouse-pointer"
                      onClick={() => deleteAllCustomer(row.customer_id)}
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

       <div className='container mt-2' 
        style={{position:"relative", left:"80px"}}  >
        <Row className='m-1'>
          <Col xs={12} sm={8}
          >
            <InputGroup className="" 
            >
              <FormControl
                placeholder="Search Customer Name"
                aria-label="Search"
                aria-describedby="basic-addon2"
                value={invoiceNumber}
                onChange={handleInputChange}
              />
              <Button 
              onClick={handleSubmit} 
              style={{width: '77px',
  height: '40px',
  flexShrink: 0,
  background: '#565ADD',}}><FaSearch /> </Button>

            </InputGroup>
          </Col>
        </Row>

       


      </div>
 <hr/>
    <CustomerUpdateModal open={OpenUpdate} Getcustomer={Getcustomer}  setOpenUpdate={setOpenUpdate} row ={SelectedRow}/>
    <AddCustomerModal  open={AddCustomer} setAddCustomer={setAddCustomer} Getcustomer={Getcustomer} />
    <DataTable
  columns={columns}
  responsive={true}
  fixedHeader={true}
  paginationTotalRows={count}
  data={customer || []} // Add a conditional check here
  pagination
  paginationServer
  onChangePage={(page) => handlePageChange(page)}
/>

  </Container></div>
  )
}

export default CustomerSale