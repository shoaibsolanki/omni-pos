







import React, { useState,useCallback,useEffect } from 'react'
import Purchase from './Purchase/Purchase'
import Ledger from './Ledger/Ledger'
import Expenses from './Expenses/Expenses';
// import DebitNote from './DebitNote/DebitNote'
import DebitNote from './DebitNote/DebitNote'
import Baikhata from './Baikhata/Baikhata';
import Challan from './Challan/Challan';
import DaySale from './Day-sales/DaySale';
import { useDispatch } from 'react-redux'
import { TabContent,Nav,NavItem,NavLink, TabPane } from 'reactstrap';
import { handleSalesReportRequest, handleGstReportRequest, handleGstReportItemRequest } from "../../../redux/actions-reducers/ComponentProps/ComponentPropsManagement"


const ReportMis=()=>{
  console.log("REPORT MIS")

    const [activeTab, setActiveTab] = useState("1");
    const dispatch = useDispatch();

    const tabArray = [
        {
         id: "1",
         name: "Purchase",
         className: "active",
         isActive: true
        },
     
        {
         id: "2",
         name: "Expenses",
         className: "active",
         isActive: true
        },
     
        {
         
         id: "3",
         name: "DebitNote",
         className: "active",
         isActive: true
        },
     
        {
         
         id: "4",
         name: "Challan",
         className: "active",
         isActive: true
        },
     
        {
         
         id: "5",
         name: "Baikhata",
         className: "active",
         isActive: true
        },
        {
         
         id: "6",
         name: "DaySale",
         className: "active",
         isActive: true
        },
        {
         
            id: "7",
            name: "Ledger",
            className: "active",
            isActive: true
           
           }
     ];

    //  const debounce = (func) => {
    //     let timer;
    //     return function (...args) {
    //         const context = this; 
    //         if (timer) clearTimeout(timer);
    //         timer = setTimeout(() => {
    //             timer = null;
    //             func.apply(context, args); 
    //         }, 1000);
    //     };
    //   };
      
    //   const handleFunCall = () => {
    //       // dispatch(handleSalesReportRequest())
    //       dispatch(handleGstReportRequest())
    //       dispatch(handleGstReportItemRequest())
    //   }
      
    //   const optimizedFn = useCallback(debounce(handleFunCall), []);
    //   useEffect(() => {
    //       optimizedFn()
    //   }, [])

    return(
        // <>
        // <Nav tabs className='mt-3' >
        //     {tabArray.filter(io => io.isActive === true).map((item, index) => {
        //         return (<>
        //             <NavItem style={{ backgroundColor: "var(--primary1)", borderRadius: String(index + 1) === activeTab ? "10px" : "0px", border: "none" }} >
        //                 <NavLink
        //                     style={{ color: String(index + 1) === activeTab ? "black" : "white", fontWeight: "bold", border: "none" }}
        //                     className={`${String(index + 1) === activeTab && "active"} mouse-pointer`}
        //                     onClick={() => {
        //                         setActiveTab(String(index + 1))
        //                     }}
        //                 >
        //                     {/* <span style={{ color: "white" }}> */}
        //                     {item.name}
        //                     {/* </span> */}
        //                 </NavLink>
        //             </NavItem>
        //         </>)
        //     })}
        // </Nav>

        // <TabContent>

        //     <TabPane tabId='1'>
        //         <Purchase/>
        //     </TabPane>

            
       
        // </TabContent>
        // </>


        <>
      <div style={{ backgroundColor: "var(--primary2)", marginTop: "20px" }}>
        <Nav tabs>
          {tabArray.map((item, index) => {
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
            <Purchase />
          </TabPane>

          <TabPane tabId="2">
            <Expenses />
          </TabPane>

           <TabPane tabId="3">
           <DebitNote />
           </TabPane>

          <TabPane tabId="4">
            <Challan />
          </TabPane>

          <TabPane tabId="5">
            <Baikhata />
          </TabPane>

          <TabPane tabId="6">
            <DaySale />
          </TabPane>

          <TabPane tabId="7">
            <Ledger />
          </TabPane>
        </TabContent>
      </div>
    </>




    )
}

export default ReportMis;