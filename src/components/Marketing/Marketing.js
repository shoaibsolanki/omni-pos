import React, { useEffect, useState } from "react";
import { Checkbox, TextField } from "@mui/material";
import Flatpickr from "react-flatpickr";
import { CardBody, Input, Label } from "reactstrap";
import { Button, Card, Col, Table } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import {
  handelCustomerListRequest,
  handelCreateDigitalPromotionRequest,
  handelPromotionAssetsRequest,
} from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { host } from "../../URL";
import EmailSend from "./EmailSend";
const Marketing = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState();
  const [promotionName, setPromotionName] = useState("");
  const [promotionText, setPromotionText] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [video, setVideo] = useState("");
  const [videoName, setVideoName] = useState("");
  const { customer_list } = useSelector((e) => e.ComponentPropsManagement);
  console.log("CUSTOMER_LIST", customer_list);
  const [key, setKey] = useState('Permotion');
  const { storeId, saasId, userName } = JSON.parse(
    localStorage.getItem("User_data")
  );
  console.log("STARTDATE", startDate);
  useEffect(() => {
    if (customer_list && customer_list.length > 0) {
      setUserData(customer_list);
    }
  }, [customer_list]);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    // console.log(checked);
    if (name === "allSelect") {
      let tempUser = userData.map((el) => {
        return { ...el, isChecked: checked };
      });
      setUserData(tempUser);
    } else {
      const tempUser = userData.map((el) =>
        el.customer_name === name ? { ...el, isChecked: checked } : el
      );
      setUserData(tempUser);
    }
  };
  console.log("USERDATA", userData);
  const sendPromotion = (user) => {
    if (
      promotionName &&
      startDate &&
      endDate &&
      video &&
      image &&
      promotionText
    ) {
      var formdata = new FormData();
      formdata.append("promotional_video", video);
      formdata.append("promotional_image", image);
      formdata.append("promotional_text", promotionText);
      formdata.append("saas_id", saasId);
      formdata.append("store_id", storeId);
      formdata.append("promotion_name", promotionName);
      formdata.append("start_date", startDate);
      formdata.append("end_date", endDate);

      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch(
        `${host}digital-promotion/create-digital-promotion-master`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    }
    dispatch(
      handelCreateDigitalPromotionRequest({
        customer_id: user.customer_id,
        customer_name: user.customer_name,
        mobile_number: user.mobile_number,
        saas_id: saasId,
        email: user.email,
        whatsapp: user.mobile_number,
        sms: user.mobile_number,
      })
    );
  };

  useEffect(() => {
    dispatch(handelCustomerListRequest());
  }, []);

  const allSelect = (user) => {
    console.log("USER", user);
    const selectedUser = user.filter((el) => el.isChecked === true);
    console.log("SELECTEDUSER", selectedUser);
    selectedUser.map((el) => {
      if (
        promotionName &&
        startDate &&
        endDate &&
        video &&
        image &&
        promotionText
      ) {
        var formdata = new FormData();
        formdata.append("promotional_video", video);
        formdata.append("promotional_image", image);
        formdata.append("promotional_text", promotionText);
        formdata.append("saas_id", saasId);
        formdata.append("store_id", storeId);
        formdata.append("promotion_name", promotionName);
        formdata.append("start_date", startDate);
        formdata.append("end_date", endDate);

        var requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };

        fetch(
          `${host}digital-promotion/create-digital-promotion-master`,
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
        dispatch(
          handelCreateDigitalPromotionRequest({
            customer_id: el.customer_id,
            customer_name: el.customer_name,
            mobile_number: el.mobile_number,
            saas_id: saasId,
            email: el.email,
            whatsapp: el.mobile_number,
            sms: el.mobile_number,
          })
        );
      }
    });
  };

  return (
    <>
     <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
      fill
    >
      <Tab eventKey="Permotion" title="Permotion">
      <div className="container">
      <div className="d-flex justify-content-center">
        <h3 className="my-3">Digital marketing Promotion setup</h3>
      </div>
      <div class="row">
        <div class="col-6">
          <div class="p-2 border bg-light">
            <TextField
              size="small"
              type="text"
              className="form-control my-2"
              id="customer-name"
              value={promotionName}
              onChange={(e) => setPromotionName(e.target.value)}
              label="Promotion Name"
            />
          </div>
        </div>
        <div class="col-6">
          <div class="p-3 border bg-light d-flex">
            <Flatpickr
              className="form-control"
              onChange={(e) => {
                // handleSubmit(e[0]);
                setStartDate(e[0]);
              }}
              options={{ allowInput: true, dateFormat: "d-M-Y" }}
              value={startDate}
              required={true}
              placeholder="Start Date"
            />
            <Flatpickr
              className="form-control"
              onChange={(e) => {
                // handleSubmit(e[0]);
                setEndDate(e[0]);
              }}
              options={{ allowInput: true, dateFormat: "d-M-Y" }}
              value={endDate}
              required={true}
              placeholder="End Date"
            />
          </div>
        </div>
      </div>
      <div className="row mt-5">
        {/* <div className="col-4">
          <div className="d-flex flex-wrap my-auto">
            <div className="mb-3 me-4">
              <Label>
                Upload Promotional Video<span className="text-red"> * </span>
              </Label>
              <div>
                <label htmlFor="movie" className="upload-doc">
                  Upload
                </label>
                <input
                  type="file"
                  accept="video/*"
                  id="movie"
                  onChange={(e) => {
                    setVideo(e.target.files[0]);
                    setVideoName(e.target.files[0].name);
                  }}
                />
                {videoName ? <div>{videoName} </div> : ""}
                {/* <small className="ms-1">{csvFile.name}</small> */}
              {/* </div>
            </div>
            <div className="my-auto">
              <Button
                type="button"
                onClick={() => {}}
                style={{
                  backgroundColor: "var(--primary2)",
                  border: "none",
                }}
              >
                {" "}
                Submit{" "}
              </Button>
            </div>
          </div> */}
        {/* </div> */} 
        <div className="col-4">
          <div className="d-flex flex-wrap my-auto">
            <div className="mb-3 me-4">
              <Label>
                Upload Promotional Image<span className="text-red"> * </span>
              </Label>
              <div>
                <label htmlFor="poster" className="upload-doc">
                  Upload
                </label>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  id="poster"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    setImageName(e.target.files[0].name);
                  }}
                />
                {imageName ? <div>{imageName} </div> : ""}
              </div>
            </div>
            <div className="my-auto">
              <Button
                type="button"
                // onClick={(e) => handleUploadFile()}
                style={{
                  backgroundColor: "var(--primary2)",
                  border: "none",
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div
          //  className="d-flex flex-wrap my-auto"
          >
            <div className="mb-3 me-4 d-flex align-items-center justify-content-between">
              <div>
                <TextField
                  size="small"
                  type="text"
                  className="form-control my-2"
                  id="customer-name"
                  value={promotionText}
                  onChange={(e) => setPromotionText(e.target.value)}
                  label="Promotion Text"
                />
              </div>
              <div>
                <Button
                  type="button"
                  // onClick={(e) => handleUploadFile()}
                  style={{
                    backgroundColor: "var(--primary2)",
                    border: "none",
                  }}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-4">
        <Col md={12}>
          <Card>
            <CardBody>
              <Table bordered hover variant="light">
                <thead>
                  <tr>
                    <th
                      style={{ display: "flex", flexDirection: "column" }}
                      className="align-items-center justify-content-center"
                    >
                      <h5 className="mr-2" style={{ margin: 0, padding: 0 }}>
                        All
                      </h5>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="allSelect"
                        checked={
                          userData &&
                          userData.filter((el) => el?.isChecked !== true)
                            .length < 1
                        }
                        onChange={handleChange}
                      />
                    </th>
                    <th className="text-center">Customer Name</th>
                    <th className="text-center">Mobile No.</th>
                    {/* <th className="text-center">Whatsapp</th> */}
                    <th className="text-center">SMS</th>
                    <th className="text-center">Email</th>
                    {/* <th className="text-center">ACTION</th> */}
                  </tr>
                </thead>
                <tbody>
                  {userData &&
                    userData.map((user) => (
                      <tr>
                        <td className="text-center">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            name={user.customer_name}
                            checked={user?.isChecked || false}
                            onChange={handleChange}
                          />
                        </td>
                        <td className="text-center">{user.customer_name}</td>
                        <td className="text-center">{user.mobile_number}</td>
                        <td className="text-center">
                          {user.mobile_number}
                          {/* <input
                            type="checkbox"
                            className="form-check-input"
                            name={user.customer_name}
                            checked={user?.isChecked || false}
                            onChange={handleChange}
                          /> */}
                        </td>
                        {/* <td className="text-center"> */}
                          {/* {user.mobile_number} */}
                          {/* <input
                            type="checkbox"
                            className="form-check-input"
                            name={user.customer_name}
                            checked={user?.isChecked || false}
                            onChange={handleChange}
                          /> */}
                        {/* </td> */}
                        <td className="text-center">
                          {user.email}
                          {/* <input
                            type="checkbox"
                            className="form-check-input"
                            name={user.customer_name}
                            checked={user?.isChecked || false}
                            onChange={handleChange}
                          /> */}
                        </td>
                        {/* <td className="text-center">
                          <Button
                            onClick={() =>
                              // dispatch(
                              //   handelCreateDigitalPromotionRequest({
                              //     customer_id: user.customer_id,
                              //     customer_name: user.customer_name,
                              //     mobile_number: user.mobile_number,
                              //     saas_id: saasId,
                              //     email: user.email,
                              //     whatsapp: user.mobile_number,
                              //     sms: user.mobile_number,
                              //   })
                              // )
                              sendPromotion(user)
                            }
                          >
                            Send
                          </Button>
                        </td> */}
                      </tr>
                    ))}{" "}
                </tbody>
              </Table>
              <div className="d-flex justify-content-start">
                <Button onClick={() => allSelect(userData)}>Send</Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      </div>
    </div>
      </Tab>
      <Tab eventKey="Email" title="Email">
      <EmailSend/>
      </Tab>
      {/* <Tab eventKey="contact" title="Contact" disabled>
        Tab content for Contact
      </Tab>  */}
    </Tabs>
   
    </>
  );
};

export default Marketing;
