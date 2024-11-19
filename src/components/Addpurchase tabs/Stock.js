import React from "react";
import { TextField } from "@mui/material";

const Stock = () => {
  return (
    <div>
      <div>
        <TextField
          type="text"
          className="form-control my-2"
          id="customer-name"
          size="small"
          required
          // value={partyName}
          // onChange={(e) => setPartyName(e.target.value)}
          label="Inventory"
        />
      </div>
    </div>
  );
};

export default Stock;
