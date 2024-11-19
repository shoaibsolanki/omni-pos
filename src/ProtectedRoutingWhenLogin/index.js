import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

const ProtectedRoutingWhenLogin = (props) => {
  const { Component } = props;
  return (
    <>
      {localStorage.getItem("Token") ? (
        <>
          <Component />
        </>
      ) : (
        <>
          <Navigate to="/login" />
        </>
      )}
    </>
  );
};

export default ProtectedRoutingWhenLogin;
