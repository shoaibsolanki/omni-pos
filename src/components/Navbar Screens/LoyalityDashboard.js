import { TextField } from "@mui/material";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const LoyalityDashboard = () => {
  const [searchValue, setSearchValue] = useState("");
  const [userName, setUsername] = useState("");
  const [userMobile, setUserMobile] = useState("");
  const [err, setErr] = useState("");
  // const TabsData = [
  //   {
  //     id: 1,
  //     button: "Tab 1",
  //     component: "Component 1",
  //   },
  //   {
  //     id: 2,
  //     button: "Tab 2",
  //     component: "Component 2",
  //   },
  //   {
  //     id: 3,
  //     button: "Tab 3",
  //     component: "Component 3",
  //   },
  // ];
  // const [value, setValue] = useState(0);
  // const [tabs] = useState(TabsData);
  // const { component } = tabs[value];

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-lg-5 col-md-10 col-sm-12 px-5">
          <form
            className="form-box"
            // onSubmit={handleSubmit}
          >
            <h2>Link Loyality</h2>
            <div>
              <TextField
                size="small"
                type="text"
                className="form-control my-2"
                id="customer-name"
                label="Mobile Number"
                // value={searchValue}
                // onChange={(e) => {
                //   optimizedFn(e);
                //   setSearchValue(e.target.value);
                // }}
              />
            </div>
            {searchValue && searchValue ? (
              <div>
                <div className="d-flex align-items-center justify-content-between">
                  <p style={{ padding: 0, margin: 0 }}>Customer Name</p>
                  <p
                    style={{
                      fontWeight: "900",
                      padding: 0,
                      margin: 0,
                      // fontSize: "20px",
                    }}
                  >
                    {userName}
                  </p>
                </div>
                <div className="d-flex align-items-center justify-content-between my-3">
                  <p style={{ padding: 0, margin: 0 }}>Mobile Number</p>
                  <p
                    style={{
                      fontWeight: "900",
                      padding: 0,
                      margin: 0,
                      // fontSize: "20px",
                    }}
                  >
                    {userMobile}
                  </p>
                </div>
                <div>
                  {userMobile && userName ? (
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
                        Link
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
                        Cancel
                      </Link>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : (
              err
            )}
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
                Link
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
  );
};

export default LoyalityDashboard;
