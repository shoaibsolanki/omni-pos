import React, { useState, useEffect, useCallback } from "react";
import { Card, CardBody, Col, FormGroup, Row } from "reactstrap";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import "./index.css";
import DashChart from "./DashChart";
import { useDispatch, useSelector } from "react-redux";
import {
  handleLastWeekSalesRequest,
  handleLastMonthSalesRequest,
  handleLastSixtyDaysSalesRequest,
  handleTodaySalesRequest,
  handleLastFourteenDaysSalesRequest,
  handleYesterdaySalesRequest,
} from "../../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";

const SalesDashboard = () => {
  const dispatch = useDispatch();
  const {
    last_week_sales,
    yesterday_sales,
    last_month_sales,
    today_sales,
    last_fourteen_days,
    last_sixty_days,
  } = useSelector((state) => state.ComponentPropsManagement);

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 1000);
    };
  };
  const id= localStorage.getItem('activeTab')
  const handleFunCall = () => {
    dispatch(handleLastWeekSalesRequest());
    dispatch(handleLastMonthSalesRequest());
    dispatch(handleTodaySalesRequest());
    dispatch(handleLastFourteenDaysSalesRequest());
    dispatch(handleLastSixtyDaysSalesRequest());
    dispatch(handleYesterdaySalesRequest());
  };

  const optimizedFn = useCallback(debounce(handleFunCall), []);
  useEffect(() => {
    if (id == 3) {
      optimizedFn();
    }
  }, [id]);

  return (
    <>
      <div className="">
        <Row>
          {/* <Col md={12} className='mt-3'>
                    <FormGroup>
                        <h3>
                            <b>
                                Sales Dashboard
                            </b>
                        </h3>
                    </FormGroup>
                </Col>

                <Col md={12}>
                    <div style={{ fontSize: "20px" }}>
                        Sale -----------------------
                    </div>
                </Col> */}

          <Col md={12} className="mt-4">
            <div className="d-flex justify-content-center">
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flexWrap: "wrap",
                }}
              >
                <div
                  className="card-container-style"
                  style={{
                    marginRight: "20px",
                    minWidth: "300px",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  <div className="d-flex justify-content-between">
                    <div className="me-4 h6">
                      {today_sales !== null && today_sales !== 0 && (
                        <>
                          <BsArrowDown className="me-1" size={25} />
                        </>
                      )}
                      Today's
                    </div>
                    <div>{today_sales}</div>
                  </div>
                </div>

                <div
                  className="card-container-style"
                  style={{
                    marginRight: "20px",
                    minWidth: "300px",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  <div className="d-flex justify-content-between">
                    <div className="me-4 h6">
                      {yesterday_sales !== null && yesterday_sales !== 0 && (
                        <>
                          <BsArrowDown className="me-1" size={25} />
                        </>
                      )}
                      Yesterdays's
                    </div>
                    <div>{yesterday_sales}</div>
                  </div>
                </div>

                <div
                  className="card-container-style"
                  style={{
                    minWidth: "300px",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  <div className="d-flex justify-content-between">
                    <div className="me-4 h6">
                      {last_week_sales !== null && last_week_sales !== 0 && (
                        <>
                          <BsArrowUp className="me-1" size={25} />
                        </>
                      )}
                      Last Week
                    </div>
                    <div>{last_week_sales}</div>
                  </div>
                </div>
              </div>
            </div>
          </Col>

          <Col md={12}>
            <div className="d-flex justify-content-center">
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flexWrap: "wrap",
                }}
              >
                <div
                  className="card-container-style"
                  style={{
                    marginRight: "20px",
                    minWidth: "300px",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  <div className="d-flex justify-content-between">
                    <div className="me-4 h6">
                      {last_fourteen_days !== null &&
                        last_fourteen_days !== 0 && (
                          <>
                            <BsArrowUp className="me-1" size={25} />
                          </>
                        )}
                      Last 14 Days
                    </div>
                    <div>{last_fourteen_days}</div>
                  </div>
                </div>

                <div
                  className="card-container-style"
                  style={{
                    marginRight: "20px",
                    minWidth: "300px",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  <div className="d-flex justify-content-between">
                    <div className="me-4 h6">
                      {last_month_sales !== null && last_month_sales !== 0 && (
                        <>
                          <BsArrowDown size={25} className="me-1" />
                        </>
                      )}
                      Last Month
                    </div>
                    <div>{last_month_sales}</div>
                  </div>
                </div>

                <div
                  className="card-container-style"
                  style={{
                    minWidth: "300px",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  <div className="d-flex justify-content-between">
                    <div className="me-4 h6">
                      {last_sixty_days !== null && last_sixty_days !== 0 && (
                        <>
                          <BsArrowDown size={25} className="me-1" />
                        </>
                      )}
                      Last 60 Days
                    </div>
                    <div>{last_sixty_days}</div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <DashChart />
      </div>
    </>
  );
};

export default SalesDashboard;
