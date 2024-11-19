
import { useDispatch, useSelector } from 'react-redux'
import { handleDaySaleMisListRequest } from '../../../../redux/actions-reducers/ComponentProps/ComponentPropsManagement'
import { Button, Card, CardBody, Col, Input, Label, Row, FormGroup } from "reactstrap";
import { MdDelete, MdEdit, MdPlaylistAdd } from "react-icons/md";
//Added later
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import AddItem from "../../master/item-master/AddItem";
import "../../master/item-master/index.css"
import Flatpickr from "react-flatpickr";



 const DaySale = () => {
     console.log("hello")
     const dispatch= useDispatch()
     const navigate = useNavigate();
     const { item_DaySale_list, user_data } = useSelector(
             (e) => e.ComponentPropsManagement
           );

           const [date, setDate] = useState(new Date());
           const [loading, setLoading] = useState(false);
           const [currentPage, setCurrentPage] = useState(1);
           const [flag, setFlag] = useState(false);
           const [searchVal, setSearchVal] = useState("");

           console.log("item_DaySale_list", item_DaySale_list );
           const id= localStorage.getItem('activeTab')
     useEffect(()=>{
      if(id==6){
        dispatch(handleDaySaleMisListRequest({currentPage}))
      }
     },[currentPage, flag,id])

     const handlePageChange = (page) => {
      setCurrentPage(page);
    };
   
    
//=================================================================================================================
console.log("check",item_DaySale_list)     
const columns = [

    {
        name: "Store ID",
        center: true,
        selector: row => row.store_id,
    },
     {
      name: "Business Date",
      center: true,
      selector: (row) => row.business_date,
    },
     {
      name: "Net Value",
      center: true,
      selector: (row) => row.net_value,
    },
     
    {
      name: "DiscountTotal",
      center: true,
      selector: (row) => row.discount_total,
    },
    {
      name: "Tax Total",
      center: true,
      selector: (row) => row.tax_total,
    },
   
   
  ];

  const handleSearch = () => {
    if (searchVal) {
      dispatch(handleSearchedDataRequest1({ searchValue: searchVal }));
    } else {
      setFlag(!flag);
    }
  };
//=================================================================================================================
   return (
    <>
    
 

<Card className="mb-3">
        <CardBody>
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label className="m-0 p-0">
                  Select Date <span className="text-red"> * </span>
                </Label>
                <Flatpickr
                  className="form-control"
                  onChange={(e) => {
                    setDate(e[0]);
                  }}
                  options={{ allowInput: true, dateFormat: "d-M-Y" }}
                  value={date}
                  required={true}
                  placeholder="Select Date"
                />
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>

    <DataTable
        columns={columns}
        responsive={true}
        // fixedHeader={true}
        // fixedHeaderScrollHeight="300px"

        data={item_DaySale_list ? item_DaySale_list?.list : []}
        // progressPending={loading}
        //pagination
        paginationServer
        paginationTotalRows={item_DaySale_list ? item_DaySale_list.totalCount : 1}
        // onChangeRowsPerPage={10}
        // onChangePage={handlePageChange}
        onChangePage={handlePageChange}
      />

     
  </>
  );
 };

 export default DaySale
