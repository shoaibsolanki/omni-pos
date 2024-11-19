import React, { useState } from 'react';
import { Button, CardText, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane, Card, CardTitle } from 'reactstrap';
import ProductUpload from '../product-upload';
import SalesDashboard from '../sales-dashboard';
import InventoryDashboard from '../inventory-dashboard';
import Navbar from '../navbar';
import Master from '../master';

function Home() {
    const [activeTab, setActiveTab] = useState("1")

    const tabArray = [
        // {
        //     id: "1",
        //     name: "Product Upload",
        //     className: "active",
        //     isActive: true
        // },
        {
            id: "1",
            name: "Sales Dashboard",
            className: "active",
            isActive: true
        },
        {
            id: "2",
            name: "Inventory Dashboard",
            className: "active",
            isActive: true
        },
        {
            id: "3",
            name: "Master",
            className: "active",
            isActive: true
        }
    ]

    return (<>
        {/* <Navbar /> */}
        <div className='container' style={{ backgroundColor: "var(--primary2)", padding: "30px" }}>
            <Nav tabs>
                {tabArray.filter(io => io.isActive === true).map((item, index) => {
                    return (<>
                        <NavItem style={{ backgroundColor: "var(--primary1)" }}>
                            <NavLink
                                style={{ color: String(index + 1) === activeTab ? "black" : "white", fontWeight: "bold" }}
                                className={`${String(index + 1) === activeTab && "active"} mouse-pointer`}
                                onClick={() => {
                                    setActiveTab(String(index + 1))
                                }}
                            >
                                {/* <span style={{ color: "white" }}> */}
                                {item.name}
                                {/* </span> */}
                            </NavLink>
                        </NavItem>
                    </>)
                })}
            </Nav>
            <TabContent activeTab={activeTab}>

                {/* <TabPane tabId="1">
                    <ProductUpload />
                </TabPane> */}


                <TabPane tabId="1">
                    <SalesDashboard />
                </TabPane>

                <TabPane tabId="2">
                    <InventoryDashboard />
                </TabPane>

                <TabPane tabId="3">
                    <Master />
                </TabPane>
            </TabContent>
        </div>
    </>);
}

export default Home;
