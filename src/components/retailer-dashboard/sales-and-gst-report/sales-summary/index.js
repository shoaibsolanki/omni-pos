import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Col,
  FormGroup,
  Row,
  Button,
} from "reactstrap";
import moment from "moment";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";
import Flatpickr from "react-flatpickr";
import axios from "axios";
import { BASE_Url } from "../../../../URL";

const SalesSummary = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [salesData, setSalesData] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const { storeId, saasId } = JSON.parse(localStorage.getItem("User_data"));


  const handleFunCall = async () => {
    try {
      const formattedStartDate = moment(startDate).format("YYYY-MM-DD");
      const formattedEndDate = moment(endDate).format("YYYY-MM-DD");
      
      const response = await axios.get(
        `${BASE_Url}/dashboard/get-invoices-detatils/${saasId}/${formattedStartDate}/${formattedEndDate}`
      );
      setSalesData(response.data.data);
      console.log("Fetched Sales Data:", response.data.data);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };
  
  const id= localStorage.getItem('activeTab')
  useEffect(() => {
    if (id==1) {
      handleFunCall();
    }
  }, [startDate, endDate,id]);

  const columns = [
    {
      name: "Business Date",
      maxWidth: "400px", // Set a default maxWidth for larger screens
      center: true,
      selector: (row) => row.business_date,
     
    },
    {
      name: "Invoice Total",
      maxWidth: "400px",
      center: true,
      selector: (row) => row.invoice_total,
    },
    {
      name: "Net Value",
      maxWidth: "400px",
      center: true,
      selector: (row) => row.net_value,
    },
    
    {
      name: "Tax Total",
      maxWidth: "400px",
      center: true,
      selector: (row) => row.tax_total,
    },
    {
      name: "Discount Total",
      maxWidth: "400px",
      center: true,
      selector: (row) => row.discount_total,
    },
  ];

  const actionsMemo = (
    <CSVLink data={salesData}>
      <Button
        className="btn btn-sm"
        style={{ backgroundColor: "var(--primary1)", border: "none" }}
      >
        Export
      </Button>
    </CSVLink>
  );

 
    const handleSum = (arr) => {
      if (arr) {
        if (arr.length > 0) {
          let sum = 0;
          arr.map((item) => {
            sum = sum + Number(item);
          });
          return sum;
        }
      }
      return 0;
    };

    useEffect(() => {
      const sum = handleSum(salesData.map((row) => row.net_value));
      setTotalSales(sum);
    }, [salesData]);

  return (
    <>
      <Card className="my-3">
        <CardBody>
          {`Sales Summary (Business Date: ${moment(new Date()).format(
            "DD-MMM-Y"
          )})`}
        </CardBody>
      </Card>

      <Card className="mb-3">
        <CardBody>
          <Row>
            <Col md={4}>
              <FormGroup>
              <label htmlFor="end-date">From Date</label>

                <Flatpickr
                  id="Start-date"
                  className="form-control"
                  onChange={(selectedDates) => {
                    if (selectedDates.length > 0) {
                      setStartDate(selectedDates[0]);
                    }
                  }}
                  options={{
                    mode: "single",
                    dateFormat: "d-M-Y",
                    defaultDate: startDate,
                  }}
                  value={startDate}
                  required={true}
                  placeholder="Select Start Date"
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
              <label htmlFor="end-date">To Date</label>
                <Flatpickr
                  id="end-date"
                  className="form-control"
                  onChange={(selectedDates) => {
                    if (selectedDates.length > 0) {
                      setEndDate(selectedDates[0]);
                    }
                  }}
                  options={{
                    mode: "single",
                    dateFormat: "d-M-Y",
                    defaultDate: endDate,
                  }}
                  value={endDate}
                  required={true}
                  placeholder="Select End Date"
                />
              </FormGroup>
            </Col>
           {/*  <Col md={4}>
              <Button color="primary" onClick={handleFunCall}>
                Apply Dates
              </Button>
            </Col> */}
          </Row>
        </CardBody>
      </Card>

      <DataTable
        columns={columns}
        responsive={true}
        data={salesData}
        title={`Total Sales: ${totalSales.toFixed(2)}`}
        fixedHeader={true}
        fixedHeaderScrollHeight="500px"
        actions={actionsMemo}
      />
    </>
  );
};

export default SalesSummary;
