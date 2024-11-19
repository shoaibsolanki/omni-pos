
import { useDispatch, useSelector } from 'react-redux'
import { handleBaikhataMisListRequest } from '../../../../redux/actions-reducers/ComponentProps/ComponentPropsManagement'
import { Button, Card, CardBody, Col, Input, Label, Row, FormGroup } from "reactstrap";
import { MdDelete, MdEdit, MdPlaylistAdd } from "react-icons/md";
//Added later
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import AddItem from "../../master/item-master/AddItem";
import "../../master/item-master/index.css"
import Flatpickr from "react-flatpickr";



 const Baikhata = () => {
     console.log("hello")
     const dispatch= useDispatch()
     const navigate = useNavigate();
     const { item_Baikhata_list, user_data } = useSelector(
             (e) => e.ComponentPropsManagement
           );

           const [date, setDate] = useState(new Date());
           const [loading, setLoading] = useState(false);
           const [currentPage, setCurrentPage] = useState(1);
           const [flag, setFlag] = useState(false);
           const [searchVal, setSearchVal] = useState("");

           console.log("item_Baikhata_list", item_Baikhata_list );
           const id= localStorage.getItem('activeTab')
     useEffect(()=>{
      if(id==6){
        dispatch(handleBaikhataMisListRequest({currentPage}))
      }
     },[currentPage, flag,id])

     const handlePageChange = (page) => {
      setCurrentPage(page);
    };
   
    
//=================================================================================================================
console.log("check",item_Baikhata_list)     
const columns = [

  // {
  //   name: "Customer Party",
  //   center: true,
  //   selector: (row) => row.customer_party,
  //   cell: (row) => {
  //     console.log("customer party")
     
  //     return (
  //       <>
       
         
  //         {/* <div style={{ fontWeight: "bolder" }}>{row.customer_party}</div> */}
          
  //       </>
  //     );
  //   },
  // },
    {
        name: "PartyName",
        center: true,
        selector: row => row.party_name,
    },
     {
      name: "PaymentDate",
      center: true,
      selector: (row) => row.payment_date,
    },
    //  {
    //   name: "ID",
    //   center: true,
    //   selector: (row) => row.id,
    // },
     
    {
      name: "Amount",
      center: true,
      selector: (row) => row.amount,
    },
    // {
    //   name: "Charges",
    //   center: true,
    //   selector: (row) => row.charges,
    // },
   
   
    // {
    //   name: "Saas ID",
    //   center: true,
    //   selector: (row) => row.saas_id,
    // },
   
    
    
    /* {
      name: "Action",
      center: true,
      selector: (row) => {
        const [addUpdateItemModalIsOpen, setAddUpdateItemModalIsOpen] =
          useState(false);
        const handleDelete = async () => {
          
            const response = await fetch(
              `http://3.111.70.84:8088/test/api/v1/bahikhata/view-bahikhata-details/8/2022-05-25`,
              {
                method: "PUT",
              }
            );
            const jsonData = await response.json();
            if (jsonData) {
              if (jsonData.status === true) {
                toast.success(jsonData.message);
                setFlag(!flag);
                return;
              }
               toast.error(jsonData.message);
              setFlag(!flag); 
            }  else {
              toast.error("Something went wrong server side");
            } 
            catch (err) {
            toast.error(err.message);
          } 
        }

        console.log("from insdie Action", item_Baikhata_list);

        return (
          <>
            <div className="d-flex">
              <div className="me-2">
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
              </div>

              <div>
                <MdEdit
                  size={22}
                  color="var(--primary1)"
                  className="mouse-pointer"
                  onClick={() => {
                    setAddUpdateItemModalIsOpen(!addUpdateItemModalIsOpen);
                  }}
                />
              </div>
            </div>

            <AddItem
              addUpdateItemModalIsOpen={addUpdateItemModalIsOpen}
              setAddUpdateItemModalIsOpen={setAddUpdateItemModalIsOpen}
              row={row}
              setFlag={setFlag}
              flag={flag}
            />
          </>
        );
      },
    }, */
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
    
    {/* <Card className="my-3">
      <CardBody>
        <Row>
          <Col md={5}>
            <Input
              type="text"
              onChange={(e) => {
                setSearchVal(e.target.value);
              }}
              value={searchVal}
              placeholder="Search..."
            />
          </Col>
          <Col md={3}>
            <Button
              style={{ backgroundColor: "var(--primary1)" }}
              onClick={() => {
                handleSearch();
              }}
            >
              Search
            </Button>
          </Col>
        </Row>
      </CardBody>
    </Card> */}

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

        data={item_Baikhata_list ? item_Baikhata_list?.list : []}
        // progressPending={loading}
        //pagination
        paginationServer
        paginationTotalRows={item_Baikhata_list ? item_Baikhata_list.totalCount : 1}
        // onChangeRowsPerPage={10}
        // onChangePage={handlePageChange}
        onChangePage={handlePageChange}
      />

     
  </>
  );
 };

 export default Baikhata
