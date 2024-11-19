import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Button, Card, CardBody, Col, Input, Label, Row } from "reactstrap";
import { BASE_Url, host } from "../../../../URL";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { MdDelete, MdEdit, MdPlaylistAdd } from "react-icons/md";
import {
  handleItemMasterListRequest,
  handleSearchedDataRequest1,
} from "../../../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { toast } from "react-toastify";
import AddItem from "./AddItem";
import "./index.css";
import { useNavigate } from "react-router-dom";
import {Image} from 'antd'
const ItemMaster = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { item_master_list, user_data } = useSelector(
    (e) => e.ComponentPropsManagement
  );
  const {
    createdAt,
    password,
    registerId,
    status,
    saasId,
    storeId,
    storeName,
    userId,
    userName,
  } = localStorage.getItem("User_data")
    ? JSON.parse(localStorage.getItem("User_data"))
    : {};
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [flag, setFlag] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const id= localStorage.getItem('activeTab')
  
  useEffect(() => {
   console.log("this id",id)
   if(id == 5){
     setLoading(true);
     dispatch(handleItemMasterListRequest({ currentPage }));
     setTimeout(() => {
       setLoading(false);
     }, 500);
   }
  }, [currentPage, flag,id]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const columns = [
    {
      name: "Item Name",
      center: true,
      selector: (row) => row.item_name,
      cell: (row) => {
        return (
          <>
            <div style={{ fontWeight: "bolder" }}>{row.item_name}</div>
          </>
        );
      },
      width:'200px'
    },
    {
      name: "Image",
      center: true,
      selector: (row) => row.image_name,
      cell: (row) => {
        return (
          <>
          <Image width={40} height={40} src={`${BASE_Url}/item/get-image/${row && row.item_id}`} alt="" />
            {/* <div style={{ fontWeight: "bolder" }}>{row.item_name}</div> */}
          </>
        );
      },
       width:'200px'
    },
    {
      name: "Category",
      center: true,
      selector: (row) => row.category,
       width:'200px'
    },
    {
      name: "Description",
      center: true,
      selector: (row) => row.description,
       width:'200px'
    },
    // {
    //     name: 'Discount',
    //     center: true,
    //     selector: row => row.discount,
    // },
    {
      name: "Price",
      center: true,
      selector: (row) => row.price,
       width:'200px'
    },
    // {
    //   name: "HSN Code",
    //   center: true,
    //   selector: (row) => row.hsn_code,
    // },
    // {
    //   name: "Tax",
    //   center: true,
    //   selector: (row) => row.tax,
    // },
    // {
    //     name: 'Tax Code',
    //     center: true,
    //     selector: row => row.tax_code,
    // },
    // {
    //     name: 'Tax Percent',
    //     center: true,
    //     selector: row => row.tax_percent,
    // },
    // {
    //     name: 'Tax Rate',
    //     center: true,
    //     selector: row => row.tax_rate,
    // },
    {
      name: "Action",
      center: true,
      selector: (row) => {
        const [addUpdateItemModalIsOpen, setAddUpdateItemModalIsOpen] =
          useState(false);
        const handleDelete = async () => {
          const response = await fetch(
            `${host}item/inactive-item/${row.item_id}/${saasId}`,
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
            /* toast.error(jsonData.message);
              setFlag(!flag); */
          } /*  else {
              toast.error("Something went wrong server side");
            } */
        }; /* catch (err) {
            toast.error(err.message);
          } */

        console.log("ITEM", item_master_list);

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
                    // setAddUpdateItemModalIsOpen(!addUpdateItemModalIsOpen);
                    setAddUpdateItemModalIsOpen((state) => !state);
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
  // const data = []
  return (
    <>
      <Card className="my-3">
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
      </Card>

      <DataTable
        columns={columns}
        responsive={true}
        // fixedHeader={true}
        // fixedHeaderScrollHeight="300px"

        data={item_master_list ? item_master_list?.list : []}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={item_master_list ? item_master_list.totalCount : 1}
        // onChangeRowsPerPage={10}
        onChangePage={handlePageChange}
      />
    </>
  );
};

export default ItemMaster;
