import React from "react";
import { TextField } from "@mui/material";
const Pricing = () => {
  return (
    <div>
      <TextField
        type="text"
        className="form-control my-2"
        id="customer-name"
        size="small"
        // required
        // value={partyName}
        // onChange={(e) => setPartyName(e.target.value)}
        label="Selling Price"
      />
      <TextField
        type="text"
        className="form-control my-2"
        id="customer-name"
        size="small"
        // required
        // value={phoneNumber}
        // onChange={(e) => {
        //   optimizedFn(e);
        //   setPhoneNumber(e.target.value);
        // }}
        label="Purchase Price"
      />
    </div>
  );
};

export default Pricing;
