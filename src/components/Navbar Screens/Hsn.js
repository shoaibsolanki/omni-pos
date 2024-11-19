import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsJustify } from "react-icons/bs";
import { handleHSNCODERequest } from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
const Hsn = () => {
  // handle_hsn_codes
  const { handle_hsn_codes } = useSelector((e) => e.ComponentPropsManagement);
  const [hsnCodes, setHsnCodes] = useState(handle_hsn_codes);

  const customStyles = {
    rows: {
      style: {
        // minHeight: '72px', // override the row height
        // border: "1px solid var(--secondary2) !important",
        borderBottom: "1px solid var(--secondary2) !important",
        marginBottom: "5px",
        // wordWrap: "break-word",
        whiteSpace: "unset !important",
      },
    },
    headCells: {
      style: {
        backgroundColor: "var(--secondary3)",
        fontWeight: "bold",
        fontSize: "14px",
        textTransform: "uppercase",
        marginBottom: "10px",
        // wordWrap: "break-word",
        padding: "15px 20px",
        whiteSpace: "unset !important",
        // paddingLeft: '8px', // override the cell padding for head cells
        // paddingRight: '8px',
      },
    },
    cells: {
      style: {
        whiteSpace: "unset !important",
        // wordWrap: "break-word",
        // paddingLeft: '8px', // override the cell padding for data cells
        // paddingRight: '8px',
        // border: "1px solid var(--secondary2)",
        // borderBottom: "1px solid var(--secondary2)"
      },
    },
    headRow: {
      style: {
        whiteSpace: "unset !important",
      },
    },
    header: {
      style: {
        whiteSpace: "unset !important",
      },
    },
  };
  useEffect(() => {
    if (handle_hsn_codes) {
      setHsnCodes(handle_hsn_codes);
    }
  }, [handle_hsn_codes]);

  const columns = [
    {
      name: "Id",
      center: true,
      minWidth: "150px",
      // wrap: true,
      selector: (row) => row.hsnCodes,
      cell: (row) => {
        return (
          <>
            <span
            // style={{ color: "var(--primary)", fontWeight: "bold" }}
            >
              {row.id}
            </span>
          </>
        );
      },
    },
    {
      name: "HSN Name",
      center: true,
      minWidth: "120px",
      selector: (row) => row.hsn_name,
    },
    {
      name: "HSN Code",
      center: true,
      minWidth: "120px",
      selector: (row) => row.hsn_code,
    },
  ];

  console.log("----", handle_hsn_codes);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(handleHSNCODERequest());
  // }, []);

  return (
    <section>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-5 col-md-10 col-sm-12">
            <form className="form-box">
              <h2>HSN</h2>
              <div>
                <TextField
                  size="small"
                  type="text"
                  className="form-control mt-4"
                  id="customer-name"
                  // value={itemName}
                  // size="small"
                  // onChange={(e) => setItemName(e.target.value)}
                  label="Item Name"
                />
                <TextField
                  size="small"
                  type="text"
                  className="form-control mt-2"
                  id="customer-name"
                  label="Item HSN"
                />
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
                    Select HSN/SAC Code
                  </p>
                  <div style={{ flex: 1 }}>
                    <TextField
                      size="small"
                      type="text"
                      className="form-control mt-2"
                      id="customer-name"
                      label="Search Name"
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <DataTable
                    responsive={true}
                    columns={columns}
                    data={hsnCodes}
                    style={{
                      whiteSpace: "unset !important",
                    }}
                    fixedHeader={true}
                    fixedHeaderScrollHeight="600px"
                    customStyles={customStyles}
                  />
                </div>
              </div>
            </form>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hsn;
