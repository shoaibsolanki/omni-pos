import React, { useEffect, useState } from "react";
import {
  Button,
  CardText,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Card,
  CardTitle,
} from "reactstrap";
import ProductUpload from "../product-upload";
import SalesDashboard from "../sales-dashboard";
import InventoryDashboard from "../inventory-dashboard";
import Navbar from "../navbar";
import Master from "../master";
import SalesAndGstReport from "../sales-and-gst-report";
import Misreport from "../Mis-report/ReportMis";

function Home() {
  let { storeName, userType, saasId, storeId } = localStorage.getItem(
    "User_data"
  )
    ? JSON.parse(localStorage.getItem("User_data"))
    : {};

    const isThrillSaasid = (saasId === "14");
  const [activeTab, setActiveTab] = useState(() => {
    const storedTab = localStorage.getItem("activeTab");
    return storedTab ?isThrillSaasid?"5": storedTab : "1"; // Default to the first tab if not set
  });
  

const tabArray = [
  {
    id: "1",
    name: "Sales and GST Report",
    className: "active",
    isActive: !isThrillSaasid, // Inactive if isThrillSaasid is true
  },
  {
    id: "2",
    name: "Product Upload",
    className: "active",
    isActive: isThrillSaasid, // Inactive if isThrillSaasid is true
  },
  {
    id: "3",
    name: "Sales Dashboard",
    className: "active",
    isActive: !isThrillSaasid, // Inactive if isThrillSaasid is true
  },
  {
    id: "4",
    name: "Inventory Dashboard",
    className: "active",
    isActive: !isThrillSaasid, // Inactive if isThrillSaasid is true
  },
  {
    id: "5",
    name: "Master",
    className: "active",
    isActive: isThrillSaasid, // Active only if isThrillSaasid is true
  },
  {
    id: "6",
    name: "MIS Report",
    className: "active",
    isActive: !isThrillSaasid, // Inactive if isThrillSaasid is true
  },
];
if (!isThrillSaasid) {
  tabArray.forEach(tab => tab.isActive = true);
}

  const handleTabChange = (tabId) => {
    localStorage.setItem("activeTab", tabId);
    setActiveTab(tabId);
  };

  return (
    <>
      {/* <Navbar /> */}
      <div
        className="container"
        style={{ backgroundColor: "var(--primary2)", padding: "30px" }}
      >
        <Nav tabs className="mt-3">
          {tabArray
            .filter((io) => io.isActive === true)
            .map((item, index) => (
              <NavItem
                key={item.id}
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
                    item.id === activeTab ? "black" : "white",
                    fontWeight: "bold",
                    border: "none",
                  }}
                  className={`${
                    item.id === activeTab && "active"
                  } mouse-pointer`}
                  onClick={() => handleTabChange(String(item.id))}
                >
                  {item.name}
                </NavLink>
              </NavItem>
            ))}
        </Nav>
        <TabContent activeTab={activeTab}>
          {tabArray.map((item) => (
            <TabPane key={item.id} tabId={item.id}>
              {item.id === "1" && <SalesAndGstReport />}
              {item.id === "2" && <ProductUpload />}
              {item.id === "3" && <SalesDashboard />}
              {item.id === "4" && <InventoryDashboard />}
              {item.id === "5" && <Master />}
              {item.id === "6" && <Misreport />}
            </TabPane>
          ))}
        </TabContent>
      </div>
    </>
  );
}

export default Home;
