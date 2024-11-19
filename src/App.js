import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
// import Home from "./components/Home";
import Home from "./components/Home";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component, useCallback, useEffect, useState } from "react";
import Login from "./components/Login";
import ProtectedRoutingWhenLogin from "./ProtectedRoutingWhenLogin";
import ProtectedRoutingWhenLogout from "./ProtectedRoutingWhenLogout";
import { useDispatch } from "react-redux";
import { handleGetUserData } from "./redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import AddCustomer from "./components/Navbar Screens/AddCustomer";
import AddItem from "./components/Navbar Screens/AddItem";
import Navbar from "./components/Navbar";
import ReconciliationReport from "./components/ReconciliationReport";
import InventoryDashboard from "./components/InventoryDashboard ";
import SalesDashboard from "./components/SalesDashboard";
import GSTReport from "./components/Navbar Screens/GSTReport";
import LinkCustomer from "./components/Navbar Screens/LinkCustomer";
import AddPurchase from "./components/Navbar Screens/AddPurchase";
import Tax from "./components/Navbar Screens/Tax";
import Hsn from "./components/Navbar Screens/Hsn";
import AddParty from "./components/Navbar Screens/AddParty";
import AddSupplier from "./components/Navbar Screens/AddSupplier";
import Register from "./components/Register";
import Main from "./components/Main";
import Return from "./components/Navbar Screens/Return";
import RetailerDashboard from "./components/retailer-dashboard/home/index";
import RetailerDashboardNanbar from "./components/retailer-dashboard/navbar/index";
import LoyalityDashboard from "./components/Navbar Screens/LoyalityDashboard";
import DebitNote from "./components/Navbar Screens/DebitNote";
import MemberEnrollment from "./components/Navbar Screens/MemberEnrollment";
import LinkLoyalityCustomer from "./components/Navbar Screens/LinkLoyalityCustomer";
import MembePointRedemption from "./components/Navbar Screens/MembePointRedemption";
import "react-confirm-alert/src/react-confirm-alert.css";
import DeliveryChalan from "./components/DeliveryChalan";
import AddCategory from "./components/AddCategory/AddCategory";
import Marketing from "./components/Marketing/Marketing";
// import { CategoryData } from "./components/CategoryData";
import DataByCategory from "./components/DataByCategory/DataByCategory";
// import { Navbar } from "react-bootstrap";
import DataByCategorydupilicate from "./components/DataByCategory/DataByCategory";
import CustomerProfile from "./components/CustomerProfile/CustomerProfile";
import AddBrand from "./components/AddCategory/AddBrand";
import Expense from "./components/expense/index";
import Bahikhata from "./components/Bahikhata/index";
import UpdateMoq from "./components/moq/index";
import UpdatePrice from "./components/update-price/index";
import PayFileCharges from "./components/CustomerLoan/PayFileCharges";
import CompleteKYC from "./components/CustomerLoan/CompleteKYC";

import Privacy from "./Privacy";
import PaymentStepperForm from "./components/my-cart/PaymentStepperForm";
import Scanandbill from "./components/Scanandbill/Scanandbill";

const App = () => {
  const dispatch = useDispatch();
  const {
    
    storeName,
    
  } = localStorage.getItem("User_data")
    ? JSON.parse(localStorage.getItem("User_data"))
    : {};
  const login_data = localStorage.getItem("login_data");
  const location = useLocation();
  // console.log("llo", location);

  useEffect(() => {
    if (login_data) {
      dispatch(handleGetUserData(login_data));
      // dispatch(handleGetLanguageRequest());
      // dispatch(handleGetNationalityRequest());
      // dispatch(handleGetCountryDropdownRequest());
    }
  }, [login_data]);
  // "/add-category"




  // ali pwa code start
  
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installButtonVisible, setInstallButtonVisible] = useState(false);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setInstallButtonVisible(true);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleInstallClick);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the PWA installation');
        }
        setDeferredPrompt(null);
        setInstallButtonVisible(false);
      });
    }
  };
 // ali pwa code end


  return (
    <>
        {installButtonVisible && (
      <div>
          <div class="row">
            <div >
              <div class="card  p-2 mb-lg-0 "
                data-tor="inview:bg(primary) , hover:bg(danger)" style={{backgroundColor:"rgb(253, 238, 204)"}}>
                <div class="hstack gap-3">
                  <div class="p-2">

                    <strong class="fs-5 lh-1">{storeName}</strong>
                  </div>
                  <div class=" ms-auto ">
                    <button className="btn btn-dark rounded-3" id="install-button" onClick={handleInstallClick}>
                      Download App
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
        )}
      {location.pathname === "/retailer-dashboard" ? (
        <>
          <RetailerDashboardNanbar />
        </>
      ) : (
        <>
          <Navbar />
        </>
      )}
      <Routes>
        <Route
          path="/"
          element={<ProtectedRoutingWhenLogin Component={Main} />}
        />
         <Route path ='/scanscreen' element={<ProtectedRoutingWhenLogin Component={Scanandbill} />} />
        <Route
          path="/home"
          element={<ProtectedRoutingWhenLogin Component={Home} />}
        />
         <Route
          path="/PaymentStepperForm"
          element={<ProtectedRoutingWhenLogin Component={PaymentStepperForm} />}
        />
        <Route
          path="/retailer-dashboard"
          element={<ProtectedRoutingWhenLogin Component={RetailerDashboard} />}
        />
        <Route
          path="/login"
          element={<ProtectedRoutingWhenLogout installButtonVisible={installButtonVisible} handleInstallClick={handleInstallClick}   Component={Login} />}
        />

        {/* <Route path="/register" Component={Register} />

        <Route path="/:saasId/:storeId" Component={Register} /> */}
        <Route
          path="/loyality-dashboard"
          element={<ProtectedRoutingWhenLogin Component={LoyalityDashboard} />}
        />
        <Route
          path="/link-customer"
          element={<ProtectedRoutingWhenLogin Component={LinkCustomer} />}
        />
        <Route
          path="/member-enrollment"
          element={<ProtectedRoutingWhenLogin Component={MemberEnrollment} />}
        />
        <Route
          path="/add-customer"
          element={<ProtectedRoutingWhenLogin Component={AddCustomer} />}
        />
        <Route
          path="/add-party"
          element={<ProtectedRoutingWhenLogin Component={AddParty} />}
        />
        <Route
          path="/add-supplier"
          element={<ProtectedRoutingWhenLogin Component={AddSupplier} />}
        />
        <Route
          path="/add-item"
          element={<ProtectedRoutingWhenLogin Component={AddItem} />}
        />
        <Route
          path="/add-category"
          element={<ProtectedRoutingWhenLogin Component={AddCategory} />}
        />
         <Route
          path="/add-brand"
          element={<ProtectedRoutingWhenLogin Component={AddBrand} />}
        />
        <Route
          path="/return"
          element={<ProtectedRoutingWhenLogin Component={Return} />}
        />
        <Route
          path="/debit-note"
          element={<ProtectedRoutingWhenLogin Component={DebitNote} />}
        />
        <Route
          path="/delivery-challan"
          element={<ProtectedRoutingWhenLogin Component={DeliveryChalan} />}
        />
          <Route
          path="/create-Expense"
          element={<ProtectedRoutingWhenLogin Component={Expense} />}
        />
          <Route
          path="/Bahikhata"
          element={<ProtectedRoutingWhenLogin Component={Bahikhata} />}
        />
           <Route
          path="/UpdateMoq"
          element={<ProtectedRoutingWhenLogin Component={UpdateMoq} />}
        />
            <Route
          path="/UpdatePrice"
          element={<ProtectedRoutingWhenLogin Component={UpdatePrice} />}
        />
        <Route
          path="/inventory-dashboard"
          element={<ProtectedRoutingWhenLogin Component={InventoryDashboard} />}
        />
        <Route
          path="/GST-report"
          element={<ProtectedRoutingWhenLogin Component={GSTReport} />}
        />
        <Route
          path="/marketing"
          element={<ProtectedRoutingWhenLogin Component={Marketing} />}
        />
        <Route
          path="/link-loyality-customer"
          element={
            <ProtectedRoutingWhenLogin Component={LinkLoyalityCustomer} />
          }
        />
        <Route
          path="/add-party"
          element={<ProtectedRoutingWhenLogin Component={AddParty} />}
        />
        <Route
          path="/add-purchase"
          element={<ProtectedRoutingWhenLogin Component={AddPurchase} />}
        />
        <Route
          path="/reconciliation-report"
          element={
            <ProtectedRoutingWhenLogin Component={ReconciliationReport} />
          }
        />
        <Route
          path="/tax"
          element={<ProtectedRoutingWhenLogin Component={Tax} />}
        />
        <Route
          path="/HSN"
          element={<ProtectedRoutingWhenLogin Component={Hsn} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoutingWhenLogin Component={CustomerProfile} />}
        />
        <Route
          path="/inventory-dashboard"
          element={<ProtectedRoutingWhenLogin Component={InventoryDashboard} />}
        />
        <Route
          path="/member-point-redemption"
          element={
            <ProtectedRoutingWhenLogin Component={MembePointRedemption} />
          }
        />
        <Route path="/register" Component={Register} />

        <Route path="/:saasId/:storeId" element={<Register installButtonVisible={installButtonVisible}
        handleInstallClick={handleInstallClick}/>} />

        <Route path="/:BU" Component={Login} />

        <Route
          path="/DataByCategory/:catname"
          element={<ProtectedRoutingWhenLogin Component={DataByCategory} />}
        />
      <Route
          path="/PayFileCharges"
          element={<ProtectedRoutingWhenLogin Component={PayFileCharges} />}
        />
         <Route
          path="/CompleteKYC"
          element={<ProtectedRoutingWhenLogin Component={CompleteKYC} />}
        />
        <Route
          path="/hello/"
          element={
            <ProtectedRoutingWhenLogin Component={DataByCategorydupilicate} />
          }
        />
        <Route
          path="/Privacy/Policy"
          element={<Privacy/>} 
        />
      </Routes>
      {/* </BrowserRouter> */}
    </>
  );
};

export default App;
