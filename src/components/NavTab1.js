import React from "react";
import { Link } from "react-router-dom";
import { handleOpneMenuRequest } from "../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { useDispatch } from "react-redux";

const NavTab1 = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <Link
        to="/add-item"
        style={{ textDecoration: "none", color: "#20b9e3" }}
        onClick={() => dispatch(handleOpneMenuRequest(false))}
      >
        <p>Add Item</p>
      </Link>
      {/* <Link
        to="/add-purchase"
        onClick={() => dispatch(handleOpneMenuRequest(false))}
        style={{ textDecoration: "none", color: "#20b9e3" }}
      >
        <p>Add Purchase</p>
      </Link>
      <Link
        to="/add-party"
        onClick={() => dispatch(handleOpneMenuRequest(false))}
        style={{ textDecoration: "none", color: "#20b9e3" }}
      >
        <p>Add Party</p>
      </Link>
      <Link
        to="/add-supplier"
        onClick={() => dispatch(handleOpneMenuRequest(false))}
        style={{ textDecoration: "none", color: "#20b9e3" }}
      >
        <p>Add Supplier</p>
      </Link> */}
      <Link
        to="/link-customer"
        onClick={() => dispatch(handleOpneMenuRequest(false))}
        style={{ textDecoration: "none", color: "#20b9e3" }}
      >
        <p>Link Customer</p>
      </Link>
      <Link
        to="/reconciliation-report"
        onClick={() => dispatch(handleOpneMenuRequest(false))}
        style={{ textDecoration: "none", color: "#20b9e3" }}
      >
        <p>Reconsciliation Report</p>
      </Link>
      {/* <Link
        to="/sales-dashboard"
        onClick={() => dispatch(handleOpneMenuRequest(false))}
        style={{ textDecoration: "none", color: "#20b9e3" }}
      >
        <p>Sales Dashbord</p>
      </Link>

      <Link
        to="/inventory-dashboard"
        onClick={() => dispatch(handleOpneMenuRequest(false))}
        style={{ textDecoration: "none", color: "#20b9e3" }}
      >
        <p>Inventory Dashboard</p>
      </Link>
      <Link
        to="/GST-Report"
        onClick={() => dispatch(handleOpneMenuRequest(false))}
        style={{ textDecoration: "none", color: "#20b9e3" }}
      >
        <p>GST Report</p>
      </Link> */}
    </div>
  );
};

export default NavTab1;
