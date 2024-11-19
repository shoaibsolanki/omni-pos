import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardBody,
  Col,
  FormGroup,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
} from "reactstrap";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEye } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { handleSalesReportRequest } from "../../../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import moment from "moment";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";
import Flatpickr from "react-flatpickr";
import axios from "axios";
import { BASE_Url } from "../../../../URL";

const SalesReport = () => {
  const { saasId, storeId } = localStorage.getItem("User_data")
    ? JSON.parse(localStorage.getItem("User_data"))
    : {};
  const dispatch = useDispatch();
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  // const dispatch = useDispatch()
  // const { sales_report_table_data } = useSelector(
  //   (state) => state.ComponentPropsManagement
  // );
  const [sales_report_table_data, setSales_report_table_data] = useState([]);
  const [date, setDate] = useState(new Date());

  // const debounce = (func) => {
  //   let timer;
  //   return function (...args) {
  //     const context = this;
  //     if (timer) clearTimeout(timer);
  //     timer = setTimeout(() => {
  //       timer = null;
  //       func.apply(context, args);
  //     }, 1000);
  //   };
  // };
  // // console.log(date);
  // const handleFunCall = (date) => {
  //   const t1 = moment(date).format("Y-MM-DD");
  //   // console.log(t1);
  //   dispatch(handleSalesReportRequest(t1));
  // };

  // const optimizedFn = useCallback(debounce(handleFunCall), []);

  // useEffect(() => {
  //   if (date) {
  //     const t1 = moment(date).format("Y-MM-DD");
  //     dispatch(handleSalesReportRequest(t1));
  //   }
  // }, [date]);

  const getReport = () => {
    const t1 = moment(date).format("Y-MM-DD");
    axios
      .get(`${BASE_Url}/tax/get-sales-report/${t1}/${storeId}/${saasId}`)
      .then((res) => {
        console.log("--0", res);
        if (res.status === 200) {
          setSales_report_table_data(res.data.list_sales_report);
        }
      });
  };
  const id= localStorage.getItem('activeTab')
  useEffect(() => {
    console.log("this sale")
    if (id==1) {
      getReport()
    }
  }, [date, id])
  

  // const debounce = (func) => {
  //     let timer;
  //     return function (...args) {
  //         const context = this;
  //         if (timer) clearTimeout(timer);
  //         timer = setTimeout(() => {
  //             timer = null;
  //             func.apply(context, args);
  //         }, 1000);
  //     };
  // };

  // const handleFunCall = () => {
  //     dispatch(handleLastWeekSalesRequest())
  //     dispatch(handleLastMonthSalesRequest())
  //     dispatch(handleTodaySalesRequest())
  //     dispatch(handleLastFourteenDaysSalesRequest())
  //     dispatch(handleLastSixtyDaysSalesRequest())
  //     dispatch(handleYesterdaySalesRequest())
  // }

  // const optimizedFn = useCallback(debounce(handleFunCall), []);
  // useEffect(() => {
  //     optimizedFn()
  // }, [])

  const columns = [
    {
      name: "Invoice Number",
      center: true,
      selector: (row) => row.invoice_no,
    },
    // {
    //     name: 'Business Date',
    //     selector: row => row.business_date,
    // },
    {
      name: "Invoice Total",
      maxWidth: "100px",
      center: true,
      selector: (row) => row.invoice_total,
    },
    {
      name: "Tax Total",
      maxWidth: "100px",
      center: true,
      selector: (row) => row.tax_total,
    },
    {
      name: "Pdf Name",
      center: true,
      selector: (row) => row.pdf_name,
    },
    {
      name: "Action",
      center: true,
      selector: (row) => row.pdf_url,
      cell: (row) => {
        const [modalIsOpen, setModalIsOpen] = useState(false);
        return (
          <>
            <AiOutlineEye
              size={20}
              className="mouse-pointer"
              onClick={() => setModalIsOpen(true)}
            />

            <Modal
              isOpen={modalIsOpen}
              toggle={() => {
                setModalIsOpen(!modalIsOpen);
              }}
              className="modal-lg"
            >
              <ModalHeader>
                <BsArrowLeft
                  className="mouse-pointer"
                  onClick={() => setModalIsOpen(!modalIsOpen)}
                />{" "}
                View Pdf
              </ModalHeader>
              <ModalBody>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                  <Viewer
                    fileUrl={row.pdf_url}
                    plugins={[defaultLayoutPluginInstance]}
                  />
                </Worker>

                {/* <iframe
                                src={row.pdf_url}
                                frameborder="0"
                                height="400px"
                                width={"100%"}
                            /> */}
              </ModalBody>
              <ModalFooter></ModalFooter>
            </Modal>
          </>
        );
      },
    },
  ];

  const actionsMemo = React.useMemo(() => {
    return (
      <>
        <CSVLink data={sales_report_table_data}>
          <Button
            className="btn btn-sm"
            style={{ backgroundColor: "var(--primary1)", border: "none" }}
          >
            Export
          </Button>
        </CSVLink>
      </>
    );
  }, []);

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

  return (
    <>
      <Card className="my-3">
        <CardBody>
          {`Sales Report (Business Date: ${moment(date).format("DD-MMM-Y")})`}
        </CardBody>
      </Card>

      <Card className="mb-3">
        <CardBody>
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label className="m-0 p-0">
                  Select Date <span className="text-red"> * </span>
                </Label>
                <div
                  style={{
                    width: "500px",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <div>
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
                  </div>
                  <div>
                    {/* <Button
                      onClick={() => {
                        // const t1 = moment(date).format("Y-MM-DD");
                        // dispatch(handleSalesReportRequest(t1));
                        getReport();
                      }}
                    >
                      Send
                    </Button> */}
                  </div>
                </div>
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <DataTable
        columns={columns}
        responsive={true}
        data={sales_report_table_data}
        title={`Total Sales: ${parseFloat(
          handleSum(sales_report_table_data.map((io) => io.invoice_total))
        ).toFixed(2)}`}
        fixedHeader={true}
        fixedHeaderScrollHeight="500px"
        actions={actionsMemo}
      />
    </>
  );
};

export default SalesReport;
