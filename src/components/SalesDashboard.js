import { Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const SalesDashboard = () => {
  //   const { storeName, saasId } = JSON.parse(localStorage.getItem("User_data"));
  //   useEffect(() => {}, [storeName, saasId]);
  const [searchItem, setSearchItem] = useState("");
  //   console.log(searchItem);
  return (
    <section>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-5 col-md-10 col-sm-12 py-4">
            <div className="d-flex justify-content-center">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  value={"Male"}
                  //   onChange={onOptionChange}
                  id="inlineRadio1"
                // value="option1"
                />
                <label className="form-check-label" for="inlineRadio1">
                  With Invoice
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  value={"Female"}
                //   onChange={onOptionChange}
                />
                <label className="form-check-label" for="inlineRadio2">
                  With Invoice
                </label>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="my-3"
            >
              <p style={{ flex: 2, margin: 0, padding: 0 }}>
                Enter Invoice No.
              </p>
              <div style={{ flex: 1 }}>
                <TextField
                  size="small"
                  type="text"
                  className="form-control mt-2"
                  id="customer-name"
                  value={searchItem}
                  onChange={(e) => setSearchItem(e.target.value)}
                  label="Search"
                />
              </div>
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ flex: 1 }}
                onClick={() => alert(searchItem)}
              >
                <Button variant="dark">Go</Button>
              </div>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center">
              <div className="border p-3 bg-light" style={{ width: "100%" }}>
                <div className="d-flex align-items-center justify-content-evenly">
                  <Button variant="outline-dark" size="sm">
                    Item Name
                  </Button>
                  <Button variant="outline-dark" size="sm">
                    Item Qty
                  </Button>
                  <Button variant="outline-dark" size="sm">
                    Item Price
                  </Button>
                </div>
                <div className="d-flex align-items-center justify-content-evenly py-3">
                  <Button size="sm" variant="outline-dark">
                    Calculate Return
                  </Button>
                  <Button size="sm" variant="outline-dark">
                    Calculate Amount
                  </Button>
                </div>
              </div>
              <Button size="sm" variant="outline-dark" className="mt-3">
                Generate Credit Note
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SalesDashboard;
