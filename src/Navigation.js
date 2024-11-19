import React from "react";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();

  return <div>{navigate("/add-item")}</div>;
};

export default Navigation;
