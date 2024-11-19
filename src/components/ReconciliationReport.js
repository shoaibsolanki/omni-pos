import { Select, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const ReconciliationReport = () => {
  const { storeName, saasId } = JSON.parse(localStorage.getItem("User_data"));
  useEffect(() => {}, [storeName, saasId]);
  return (
    <section>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-5 col-md-10 col-sm-12">
            <form className="form-box">
              <h2>Your Reconciliation Report</h2>

              <div>
                <div>
                  <p>Business Date</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Store Name</p>
                  <p style={{ fontSize: "20px", fontWeight: "900" }}>
                    {storeName}
                  </p>
                </div>
                {/*  */}
                <div className="d-flex justify-content-between">
                  <p>Cash</p>
                  <p style={{ fontSize: "20px", fontWeight: "900" }}>_____</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Paytm</p>
                  <p style={{ fontSize: "20px", fontWeight: "900" }}>_____ </p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Google Pay</p>
                  <p style={{ fontSize: "20px", fontWeight: "900" }}>_____ </p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>UPI</p>
                  <p style={{ fontSize: "20px", fontWeight: "900" }}>_____ </p>
                </div>
                <div className="d-flex justify-content-evenly">
                  <p style={{ fontSize: "20px", fontWeight: "900" }}>
                    Total Payment
                  </p>
                  <p style={{ fontSize: "20px", fontWeight: "900" }}>309</p>
                </div>
              </div>
              <div className="mt-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    backgroundColor: "#fc0202",
                    outline: "none",
                    border: "none",
                    fontSize: "20px",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    color: "#fff",
                  }}
                >
                  Save
                </button>
                <Link
                  to="/"
                  type="submit"
                  // onClick={()=>}
                  className="btn btn-primary"
                  style={{
                    backgroundColor: "gray",
                    outline: "none",
                    border: "none",
                    marginLeft: "20px",
                    fontSize: "20px",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    color: "#fff",
                  }}
                >
                  Close
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReconciliationReport;
