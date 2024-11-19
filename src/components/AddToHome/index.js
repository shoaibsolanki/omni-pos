import React, {useState,useEffect} from "react";
import { Button } from "react-bootstrap";

const AddToHomeScreenButton = ({handleInstallClick,installButtonVisible}) => {

  return (
   <> {installButtonVisible && (<Button variant="success" onClick={handleInstallClick}>
      Click here to Download App
    </Button>  )}</>
  );
};

export default AddToHomeScreenButton;
