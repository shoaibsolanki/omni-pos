import React from "react";
import { Link } from "react-router-dom";
import { handleOpneMenuRequest } from "../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { useDispatch } from "react-redux";

const NavTab2 = () => {
  const dispatch = useDispatch();
  return (
    <div
      //   className="d-flex flex-column align-items-center justify-content-center"
      style={{
        listStyle: "none",
        position: "relative",
        float: "right",
      }}
    >
      <Link
        to="/add-item"
        style={{ textDecoration: "none", color: "#20b9e3" }}
        onClick={() => dispatch(handleOpneMenuRequest(false))}
      >
        <p>Add Item</p>
      </Link>
      <Link
        to="/loyality-dashboard"
        style={{ textDecoration: "none", color: "#20b9e3" }}
        onClick={() => dispatch(handleOpneMenuRequest(false))}
      >
        <p>Loyality Dashboard</p>
      </Link>
      <Link
        to="/tax"
        style={{ textDecoration: "none", color: "#20b9e3" }}
        onClick={() => dispatch(handleOpneMenuRequest(false))}
      >
        <p>Tax</p>
      </Link>
      <Link
        to="/HSN"
        style={{ textDecoration: "none", color: "#20b9e3" }}
        onClick={() => dispatch(handleOpneMenuRequest(false))}
      >
        <p>HSN</p>
      </Link>
      <Link
        to="/add-customer"
        onClick={() => dispatch(handleOpneMenuRequest(false))}
        style={{ textDecoration: "none", color: "#20b9e3" }}
      >
        <p>Add Customer</p>
      </Link>
    </div>
  );
};

export default NavTab2;
