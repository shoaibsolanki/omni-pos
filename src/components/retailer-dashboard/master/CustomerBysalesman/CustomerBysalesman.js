import React, { useState } from "react";
import {
  Button,
  Col,
  FormControl,
  InputGroup,
  Row,
  Container,
} from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import DataService from "../../../../services/requestApi";
import DataTable from "react-data-table-component";
import moment from "moment/moment";
const CustomerBysalesman = () => {
  const [salesmanid, setsalesmanid] = useState();
  const [customer, setCustomer] = useState();
  const { storeId, saasId } = JSON.parse(localStorage.getItem("User_data"));
  const getSalesMan = async () => {
    try {
      const response = await DataService.GetSaleman(
        saasId,
        storeId,
        salesmanid
      );
      console.log(response.data.data);
      setCustomer(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    {
      name: "Custome Name",
      // center: true,
      selector: (row) => row.name,
      cell: (row) => {
        return (
          <>
            <div>{row.name}</div>
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
      name: "Wallet Balance",
      center: true,
      selector: (row) => row.income_level,
    },
    //   {
    {
      name: "SalesMan Id",
      center: true,
      selector: (row) => row.sales_representative,
    },
    {
      name: "Date",
      center: true,
      selector: (row) => row.created_at,
      cell: (row) => {
        return (
          <>
            <div>{moment(row.created_at).format('YY-MM-DD hh:mm')}</div>
          </>
        );
      },
    },
    //   {
    //     name: 'Payment History',
    //     center: true,
    //     selector: row => row.discount,
    // },
    // {
    //   name: "Action",
    //   center: true,
    //   selector: (row) => {

    //     return (
    //       <>
    //         <div className="d-flex">
    //         <div style={{cursor:'pointer'}}>
    //             <MdPlaylistAdd
    //               size={22}
    //               color="green"
    //               className="mouse-pointer"
    //               onClick={() => setAddCustomer(true)}
    //             />
    //           </div>

    //           <div style={{cursor:'pointer'}}>
    //             <MdDelete
    //               size={22}
    //               color="red"
    //               className="mouse-pointer"
    //               onClick={() => deleteAllCustomer(row.customer_id)}
    //             />
    //           </div>

    //           <div style={{cursor:'pointer'}}>
    //             <MdEdit
    //               size={22}
    //               color="var(--primary1)"
    //               className="mouse-pointer"
    //               onClick={() => {
    //                 setOpenUpdate(true)
    //                 setSelectedRow(row)
    //               }}
    //             />
    //           </div>
    //         </div>

    //       </>
    //     );
    //   },
    // },
  ];
  return (
    <div>
      {" "}
      <Container>
        <div
          className="container mt-2"
          style={{ position: "relative", left: "80px" }}
        >
          <Row className="m-1">
            <Col xs={12} sm={8}>
              <InputGroup className="">
                <FormControl
                  placeholder="Search by Sales Man id"
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                  value={salesmanid}
                  onChange={(e) => {
                    setsalesmanid(e.target.value);
                  }}
                />
                <Button
                  onClick={getSalesMan}
                  style={{
                    width: "77px",
                    height: "40px",
                    flexShrink: 0,
                    background: "#565ADD",
                  }}
                >
                  <FaSearch />{" "}
                </Button>
              </InputGroup>
            </Col>
          </Row>
        </div>
        <hr />
        <DataTable
          columns={columns}
          responsive={true}
          fixedHeader={true}
          // paginationTotalRows={count}
          data={customer || []} // Add a conditional check here
          pagination
          paginationServer
          // onChangePage={(page) => handlePageChange(page)}
        />
      </Container>
    </div>
  );
};

export default CustomerBysalesman;
