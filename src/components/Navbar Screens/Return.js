import { Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Badge, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { handleSearchInvoiceRequest } from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";

const Return = () => {
  const dispatch = useDispatch();

  const [searchItem, setSearchItem] = useState("");
  const { get_return_invoice_data } = useSelector(
    (e) => e.ComponentPropsManagement
  );
  const handleFetchInvoice = () => {
    dispatch(handleSearchInvoiceRequest({ searchValue: searchItem }));
  };
  console.log("IN COMPONENT", get_return_invoice_data);
  return (
    <section>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-5 col-md-9 col-sm-12 px-5">
            {/* <div className="d-flex justify-content-center">
              <div class="form-check form-check-inline">
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
            </div> */}
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
                onClick={() => handleFetchInvoice()}
              >
                <Button variant="warning">Go</Button>
              </div>
            </div>

            {get_return_invoice_data && get_return_invoice_data.length > 0 ? (
              <>
                <table
                  class="table table-striped table-hover"
                  style={{ width: "100%" }}
                >
                  <thead className="">
                    <tr>
                      <th scope="col">Item Name</th>
                      <th scope="col">Item Qty</th>
                      <th scope="col">Item Price</th>
                      <th scope="col">Return Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {get_return_invoice_data.map((el) => (
                      <tr>
                        <td>{el.itemName}</td>
                        <td>{el.itemQty}</td>
                        <td>{el.itemPrice}</td>
                        <td>{el.itemPrice * el.itemQty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div>
                  <Button>Generate Credit Bill</Button>
                </div>
              </>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Return;
