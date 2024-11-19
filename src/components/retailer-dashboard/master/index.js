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
import HSNMaster from "./hsn-master";
import SupplierMaster from "./supplier-master";
import TaxMaster from "./tax-master";
import ItemMaster from "./item-master";
import SaasMaster from "./saas-master";
import UserMaster from "./user-master";
import StoreMaster from "./store-master";
import CustomerSale from "../CustomerMaster/CustomerSale";
import DataService from '../../../services/requestApi'
import Category from "../../Category/Category";
import CategoryMaster from "../CategoryMaster/CategoryMaster";
import CustomerBysalesman from "./CustomerBysalesman/CustomerBysalesman";

const Master = () => {
  const { storeId, saasId } = JSON.parse(localStorage.getItem("User_data"));
  const isThrillSaasid = (saasId === "14");
  const [activeTab, setActiveTab] = useState(isThrillSaasid?"8":"1");
  
const tabArray = [
  {
    id: "1",
    name: "Item Master",
    className: "active",
    isActive: !isThrillSaasid, // Active only if isThrillSaasid is true
  },
  {
    id: "2",
    name: "Supplier Master",
    className: "active",
    isActive: !isThrillSaasid, // Inactive if isThrillSaasid is true
  },
  {
    id: "3",
    name: "Tax Master",
    className: "active",
    isActive: !isThrillSaasid, // Inactive if isThrillSaasid is true
  },
  {
    id: "4",
    name: "HSN Master",
    className: "active",
    isActive: !isThrillSaasid, // Inactive if isThrillSaasid is true
  },
  {
    id: "5",
    name: "Saas Master",
    className: "active",
    isActive: !isThrillSaasid, // Inactive if isThrillSaasid is true
  },
  {
    id: "6",
    name: "User Master",
    className: "active",
    isActive: !isThrillSaasid, // Inactive if isThrillSaasid is true
  },
  {
    id: "7",
    name: "Store Master",
    className: "active",
    isActive: !isThrillSaasid, // Inactive if isThrillSaasid is true
  },
  {
    id: "8",
    name: "Customer Master",
    className: "active",
    isActive: isThrillSaasid, // Active only if isThrillSaasid is true
  },
  {
    id: "9",
    name: "Category Master",
    className: "active",
    isActive: isThrillSaasid, // Inactive if isThrillSaasid is true
  },
  {
    id: "10",
    name: "Customer Added by Sales man",
    className: "active",
    isActive: isThrillSaasid, // Inactive if isThrillSaasid is true
  },
];

// If saasId is not "14", set all tabs to active
if (!isThrillSaasid) {
  tabArray.forEach(tab =>tab.id=='10'?tab.isActive: tab.isActive = true);
}
  // customer master
 
const [customer, setCustomer]= useState('')
const [count, setCount] = useState('')
const Getcustomer=async()=>{
  try {
    const response =await DataService.GetAllCustomer(saasId,storeId)
    console.log("Get Average Sales", response.data.data)
    setCustomer(response.data.data)
    setCount(response.data.count)
  } catch (error) {
    console.log("error", error)
  }

}

const [category, setCategory]= useState('')
const Getcategory=async()=>{
  try {
    const response =await DataService.GetAllCategory(saasId,storeId)
    console.log("Get Average Sales", response.data.data)
    setCategory(response.data.data)
    setCount(response.data.count)
  } catch (error) {
    console.log("error", error)
  }

}
const [currentPage, setCurrentPage]= useState('1')
const handlePageChange = (page) => {
  setCurrentPage(page);
};
useEffect(() => {

    Getcustomer()
    Getcategory()
  
  }, [currentPage])
  return (
    <>
      <div style={{ backgroundColor: "var(--primary2)", marginTop: "20px" }}>
        <Nav tabs>
          {tabArray.filter((io) => io.isActive === true).map((item, index) => {
            return (
              <>
                <NavItem
                  style={{
                    backgroundColor: "var(--primary1)",
                    borderRadius:
                      String(item.id) === activeTab ? "10px" : "0px",
                    border: "none",
                  }}
                >
                  <NavLink
                    style={{
                      color:
                        String(item.id) === activeTab ? "black" : "white",
                      fontWeight: "bold",
                      border: "none",
                    }}
                    className={`${
                      String(item.id) === activeTab && "active"
                    } mouse-pointer`}
                    onClick={() => {
                      console.log("active",String(index + 1))
                      setActiveTab(String(item.id));
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
            <ItemMaster />
          </TabPane>

          <TabPane tabId="2">
            <SupplierMaster />
          </TabPane>

          <TabPane tabId="3">
            <TaxMaster />
          </TabPane>

          <TabPane tabId="4">
            <HSNMaster />
          </TabPane>

          <TabPane tabId="5">
            <SaasMaster />
          </TabPane>

          <TabPane tabId="6">
            <UserMaster />
          </TabPane>

          <TabPane tabId="7">
            <StoreMaster />
          </TabPane>
          <TabPane tabId="8">
            <CustomerSale  Getcustomer={Getcustomer} setCustomer={setCustomer} count={count} customer={customer} handlePageChange={handlePageChange}/>
          </TabPane>
          <TabPane tabId="9">
            <CategoryMaster Getcategory={Getcategory}  setCustomer={setCustomer} count={count} category={category} handlePageChange={handlePageChange}/>
          </TabPane>
          <TabPane tabId="10">
          {/* <ItemMaster /> */}
          <CustomerBysalesman/>
          </TabPane>
        </TabContent>
      </div>
    </>
  );
};

export default Master;
