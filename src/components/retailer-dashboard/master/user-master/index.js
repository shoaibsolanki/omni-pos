import React, { useState, useEffect } from "react";
import axios from 'axios';
import { BASE_Url, host } from "../../../../URL";
import DataTable from "react-data-table-component";
// import Table from 'react-bootstrap/Table';
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Row,
    Table,
    Badge,
    Button
  } from "reactstrap";
import { MdDelete, MdEdit, MdPlaylistAdd } from "react-icons/md";
import {
  handleItemMasterListRequest,
  handleSearchedDataRequest1,
  handleSalesReportRequest
} from "../../../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import UserModal from "./UserModal";


const UserMaster = () => {

    const [modalShow, setModalShow] = useState(false);
  const handleShow = () => setModalShow(true);

  const [data, setData] = useState([]);
  const [count, setCount] = useState('');
  const [currentPage, setNextpage] = useState(1);

  const getUserMaster =()=>{
 // Define the API URL
    // Make a GET request to the API
    axios.get(`${BASE_Url}/user-master/get-users/${currentPage}`)
      .then(response => {
        // Handle the successful response
        console.log("User Maste Data", response.data.data,response.data.count)
        setCount(response.data.count)
        setData(response.data.data);
      })
      .catch(error => {
        // Handle any errors
        console.error('Error:', error);
      });
  }
  const id= localStorage.getItem('activeTab')
  useEffect(() => {
  if(id==5){
    getUserMaster()
  }
  }, [currentPage,id]);


 // <-------------------data Table Clumen------------>
 const handlePageChange = (page) => {
  setNextpage(page);
};

const columns = [
  {
    name: "user_name",
    center: true,
    selector: (row) => row.party_name,
    cell: (row) => {
      return (
        <>
          <div style={{ fontWeight: "bolder" }}>{row.user_name}</div>
        </>
      );
    },
  },
 
  {
    name: "store_id",
    center: true,
    selector: (row) => row.store_id,
  },
  {
    name: "store_name",
    center: true,
    selector: (row) => row.store_name,
  },
  // {
  //     name: 'Discount',
  //     center: true,
  //     selector: row => row.discount,
  // },
  {
    name: "register_id",
    center: true,
    selector: (row) => row.register_id,
  },
  // {
  //   name: "credit limit amount",
  //   center: true,
  //   selector: (row) => row.credit_limit_amounts,
  // },
  {
    name: "country",
    center: true,
    selector: (row) => row.country,
  },
  {
    name: "Action",
    center: true,
    selector: (row) => {
      return (
        <>
          <div className="d-flex">
            {/* <div className="me-2">
              <MdPlaylistAdd
                size={22}
                color="green"
                className="mouse-pointer"
                onClick={() => navigate("/add-item")}
              />
            </div>

            <div className="me-2">
              <MdDelete
                size={22}
                color="red"
                className="mouse-pointer"
                onClick={() => handleDelete()}
              />
            </div> */}

            <div>
              <MdPlaylistAdd
               size={22}
               color="green"
               className="mouse-pointer"
                onClick={() => {
                  // setAddUpdateItemModalIsOpen(!addUpdateItemModalIsOpen);
                  setModalShow((state) => !state);
                }}
              />
            </div>
          </div>

          {/* <AddItem
            addUpdateItemModalIsOpen={addUpdateItemModalIsOpen}
            setAddUpdateItemModalIsOpen={setAddUpdateItemModalIsOpen}
            row={row}
            setFlag={setFlag}
            flag={flag}
          /> */}
        </>
      );
    },
  },
];


      return (
        <>
         <div  className=" d-block profile mt-3 py-2 px-2
    " style={{ height:"fit-content" }}>
      <DataTable
      columns={columns}
      responsive={true}
      // fixedHeader={true}
      // fixedHeaderScrollHeight="300px"

      data={data ? data : []}
      progressPending={data ? false : true}
      pagination
      paginationServer
      paginationTotalRows={data ? count : 1}
      // onChangeRowsPerPage={10}
      onChangePage={handlePageChange}
    />
  
    </div>
 <UserModal 
          show={modalShow}
          onHide={() => setModalShow(false)}/>
      
    </>
  );
};

export default UserMaster;
