
import { useDispatch, useSelector } from 'react-redux'
import { handleLedgerMisListRequest } from '../../../../redux/actions-reducers/ComponentProps/ComponentPropsManagement'
import { Button, Card, CardBody, Col, Input, Label, Row, FormGroup } from "reactstrap";
import { MdDelete, MdEdit, MdPlaylistAdd } from "react-icons/md";
//Added later
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import AddItem from "../../master/item-master/AddItem";
import "../../master/item-master/index.css"
import Flatpickr from "react-flatpickr";



const Ledger = () => {
  console.log("hello")
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { item_Ledger_list, user_data } = useSelector(
    (e) => e.ComponentPropsManagement
  );


  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [flag, setFlag] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  console.log("item_Ledger_list", item_Ledger_list);
  const id= localStorage.getItem('activeTab')
  useEffect(() => {
    if(id==6){
      dispatch(handleLedgerMisListRequest({ currentPage }))
    }
 
  }, [currentPage, flag,id])

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  //=================================================================================================================
  console.log("check", item_Ledger_list)
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
      name: "Date",
      center: true,
      selector: (row) => row.date
  },


    // {
    //     name: "Customer Party",
    //     center: true,
    //     selector: (row) => row.expense.map((element)=>{element.customer_party
    //       console.log("test",element.customer_party)}),

    // },

    // {
    //   name: "Customer Party",
    //   center: true,
    //   selector: (row) => row.debit_note.map((element)),


    // },
    //  {
    //   name: "DebitNote",
    //   center: true,
    //   selector: (row) => row.debit_note,
    // },
    //  {
    //   name: "DebitChalan",
    //   center: true,
    //   selector: (row) => row.debit_chalan,
    // },

    // {
    //   name: "Expense",
    //   center: true,
    //   selector: (row) => row.expense,
    // },
    // {
    //   name: "Bahikhata",
    //   center: true,
    //   selector: (row) => row.bahi_khata,
    // },


    // {
    //   name: "purchase",
    //   center: true,
    //   selector: (row) => row.purchase,
    // },



    {
      name: "Action",
      center: true,
      selector: (row) => {
        const [addUpdateItemModalIsOpen, setAddUpdateItemModalIsOpen] =
          useState(false);
        const handleDelete = async () => {
          
            const response = await fetch(
              `http://3.111.70.84:8088/test/api/v1/ledger/getledgerfromto/2023-07-27/2023-07-30/8/80001`,
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
              
            } /* else {
              toast.error("Something went wrong server side");
            } */
          } /* catch (err) {
            toast.error(err.message);
          }
        }; */

        console.log("from insdie Action", item_Ledger_list);

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

      {/* <DataTable
        columns={columns}
        responsive={true}
        // fixedHeader={true}
        // fixedHeaderScrollHeight="300px"

        data={item_Ledger_list ? item_Ledger_list?.list : []}
        // progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={item_Ledger_list ? item_Ledger_list.totalCount : 1}
        // onChangeRowsPerPage={10}
        // onChangePage={handlePageChange}
        onChangePage={handlePageChange}
      /> */}

      <DataTable
        columns={columns}
        responsive={true}
        // fixedHeader={true}
        // fixedHeaderScrollHeight="300px"

        data={item_Ledger_list && item_Ledger_list.length > 0 ? item_Ledger_list : ""}
        // progressPending={loading}
       // pagination
        paginationServer
        paginationTotalRows={item_Ledger_list ? item_Ledger_list.totalCount : 1}
        // onChangeRowsPerPage={10}
        // onChangePage={handlePageChange}
        onChangePage={handlePageChange}
      />


    </>
  );
};

export default Ledger
