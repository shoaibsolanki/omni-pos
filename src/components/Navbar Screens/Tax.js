import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  handleTaxRatesRequest,
  handleCreateRowTaxMasterRequest,
} from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";

import Select from "react-select";
import ReactDatePicker from "react-datepicker";
const Tax = () => {
  const dispatch = useDispatch();
  const { handle_tax_rate } = useSelector((e) => e.ComponentPropsManagement);

  // const [hsnCode, setHsnCode] = useState("");
  const [taxRates, setTaxRates] = useState([]);
  const [hsnCode, setHsnCode] = useState("");
  const [taxDesc, setTaxDesc] = useState("");
  const [id, setId] = useState("");
  const [taxCode, setTaxCode] = useState("");
  const [options, setOptions] = useState("");
  const [startDateEffective, setStartDateEffective] = useState(new Date());
  const [startDateEnd, setStartDateEnd] = useState(new Date());

  // console.log("EFFECTIVE", startDateEffective.toJSON().slice(0, 10));
  // console.log("END", startDateEnd.toJSON().slice(0, 10));
  // console.log("handle_tax_rate", taxRates);

  const tabid = localStorage.getItem('activeTab')
  // useEffect(() => {
  //   dispatch(handleTaxRatesRequest());
  // }, []);
  console.log("handle_tax_rate", handle_tax_rate)
  useEffect(() => {
    if (handle_tax_rate) {
      setTaxRates(handle_tax_rate);
    }
  }, [handle_tax_rate]);

  const handleChange = (e) => {
    console.log("HANDLE CHANGE", e.id);
    setId(e.id);
    setTaxCode(e.taxCode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      handleCreateRowTaxMasterRequest({
        id: Number(id),
        hsn_code: hsnCode,
        tax_desc: taxDesc,
        effective_from: startDateEffective.toJSON().slice(0, 10),
        end_date: startDateEnd.toJSON().slice(0, 10),
      })
    );
  };

  // console.log(id);
  return (
    <section>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-5 col-md-10 col-sm-12">
            <form className="form-box" onSubmit={handleSubmit}>
              <h2>Tax</h2>
              <div
                className="d-flex flex-col"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <TextField
                  size="small"
                  type="text"
                  className="form-control mt-2"
                  id="customer-name"
                  label="HSN Code"
                  value={hsnCode}
                  onChange={(e) => setHsnCode(e.target.value)}
                  required
                />
                <TextField
                  size="small"
                  type="text"
                  className="form-control mt-2"
                  id="customer-name"
                  value={taxDesc}
                  onChange={(e) => setTaxDesc(e.target.value)}
                  label="Tax Description"
                  required
                />
                <div className="my-3">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      // alignItems: "center",
                      justifyContent: "",
                    }}
                  >
                    <p style={{ padding: 0, margin: 0 }}>Effective From</p>
                    <div style={{ window: "200px", zIndex: 200 }}>
                      <ReactDatePicker
                        style={{ width: "100%" }}
                        selected={startDateEffective}
                        onChange={(date) => setStartDateEffective(date)}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      // alignItems: "center",
                      justifyContent: "",
                      marginTop: "20px",
                    }}
                  >
                    <p style={{ padding: 0, margin: 0 }}>End Date</p>
                    <div style={{ window: "200px", zIndex: 200 }}>
                      <ReactDatePicker
                        style={{ width: "100%" }}
                        selected={startDateEnd}
                        onChange={(date) => setStartDateEnd(date)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {/* <Select
                  className="my-4"
                  options={taxRates}
                  onChange={(e) => {
                    setOptions(e.taxRate);
                  }}
                  value={taxRates.filter((e) => e.taxRate === options.taxRate)}
                  placeholder="GSTIN"
                  styles={{
                    menu: (baseStyles, state) => ({
                      ...baseStyles,
                      // height: "50px",
                      // overflow: "auto",
                      // fontWeight: "900",
                      zIndex: 4,
                    }),
                    option: (baseStyles, state) => ({
                      ...baseStyles,
                      // height: "50px",
                      // fontWeight: "900",
                      zIndex: 4,
                      // overflow: "auto",
                    }),
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      // height: "50px",
                      zIndex: 4,
                      // fontWeight: "900",
                      // overflow: "auto",
                    }),
                  }}
                /> */}
                <Select
                  className="my-4"
                  options={taxRates}
                  onChange={handleChange}
                  // value={taxRates.filter((e) => e.taxRate === options.taxRate)}
                  placeholder="GSTIN"
                  styles={{
                    menu: (baseStyles, state) => ({
                      ...baseStyles,
                      // height: "50px",
                      // overflow: "auto",
                      // fontWeight: "900",
                      zIndex: 4,
                    }),
                    option: (baseStyles, state) => ({
                      ...baseStyles,
                      // height: "50px",
                      // fontWeight: "900",
                      zIndex: 4,
                      // overflow: "auto",
                    }),
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      // height: "50px",
                      zIndex: 4,
                      // fontWeight: "900",
                      // overflow: "auto",
                    }),
                  }}
                />
              </div>

              <div className="">
                <button
                  style={{
                    backgroundColor: "#20b9e3",
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
                    backgroundColor: "#fc0202",
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

export default Tax;
