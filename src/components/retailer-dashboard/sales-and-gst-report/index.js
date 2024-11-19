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
} from "reactstrap";
import SalesReport from "./sales-report";
import GSTReport from "./gst-report";
import GstReportItem from "./gst-report-item";
import { useDispatch } from "react-redux";
import {
  handleSalesReportRequest,
  handleGstReportRequest,
  handleGstReportItemRequest,
} from "../../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import TenderReport from "./tender-report";
import SalesSummary from "./sales-summary";

const SalesAndGstReport = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("1");

  const tabArray = [
    {
      id: "1",
      name: "Sales Report",
      className: "active",
      isActive: true,
    },
    {
      id: "2",
      name: "Sales Summary",
      className: "active",
      isActive: true,
    },
    
    {
      id: "3",
      name: "GST Report",
      className: "active",
      isActive: true,
    },
    {
      id: "4",
      name: "GST Report Item",
      className: "active",
      isActive: true,
    },
    {
      id: "5",
      name: "Tender Report",
      className: "active",
      isActive: true,
    },
  ];

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
    // dispatch(handleSalesReportRequest())
    dispatch(handleGstReportRequest());
    dispatch(handleGstReportItemRequest());
  };

  const optimizedFn = useCallback(debounce(handleFunCall), []);
  // useEffect(() => {
  //   if (id ==1) {
  //     optimizedFn();
  //   }
  // }, [id]);

  return (
    <>
      <Nav tabs className="mt-3">
        {tabArray
          .filter((io) => io.isActive === true)
          .map((item, index) => {
            return (
              <>
                <NavItem
                  style={{
                    backgroundColor: "var(--primary1)",
                    borderRadius:
                      String(index + 1) === activeTab ? "10px" : "0px",
                    border: "none",
                  }}
                >
                  <NavLink
                    style={{
                      color:
                        String(index + 1) === activeTab ? "black" : "white",
                      fontWeight: "bold",
                      border: "none",
                    }}
                    className={`${
                      String(index + 1) === activeTab && "active"
                    } mouse-pointer`}
                    onClick={() => {
                      setActiveTab(String(index + 1));
                      // handelApiData(item)
                    }}
                  >
                    {/* <span style={{ color: "white" }}> */}
                    {item.name}
                    {/* </span> */}
                  </NavLink>
                </NavItem>
              </>
            );
          })}
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <SalesReport />
        </TabPane>

        <TabPane tabId="2">
          <SalesSummary />
        </TabPane>

        <TabPane tabId="3" >
          <GSTReport />
        </TabPane>

        <TabPane tabId="4">
          <GstReportItem />
        </TabPane>

        <TabPane tabId="5">
          <TenderReport />
        </TabPane>
      </TabContent>
    </>
  );
};

export default SalesAndGstReport;
