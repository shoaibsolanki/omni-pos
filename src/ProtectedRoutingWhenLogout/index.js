import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

const ProtectedRoutingWhenLogout = (props) => {
  const { Component,installButtonVisible,handleInstallClick } = props;
  return (
    <>
      {localStorage.getItem("Token") ? (
        <>
          <Navigate />
        </>
      ) : (
        <>
          <Component installButtonVisible={installButtonVisible} handleInstallClick={handleInstallClick}  to="/login" />
        </>
      )}
    </>
  );
};

export default ProtectedRoutingWhenLogout;
