import { Box, Button, Input, InputAdornment, LinearProgress, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Flatpickr from "react-flatpickr";
import DataService from "../../services/requestApi"
import moment from "moment";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Dataset } from "@mui/icons-material";
import Swal from "sweetalert2";
const EmailSend = () => {
    const { storeId, saasId } = JSON.parse(localStorage.getItem("User_data"));
    const [EndDate, setEndDate] = useState()
    const [isSubmetting, setIsSubmeeting] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
  const [userData, setUserData] = useState([]);

  const UploadFile=async(file)=>{
    try {
      setIsUploading(true)
      var formdata = new FormData();
      formdata.append("file",file)
      const UploadFileForEmail=await DataService.UploadCsv(storeId,formdata) 
      console.log("upload hua",UploadFileForEmail)
     if(!UploadFileForEmail.data.status){ 
      Swal.fire({
        text:UploadFileForEmail.data.message,
        icon:"error",
      })
    }else{
      Swal.fire({
        text:UploadFileForEmail.data.message,
        icon:"success",
      })
      }
      GetDataForsendEmail()
      setIsUploading(false)
    } catch (error) {
      console.log(error)
      setIsUploading(true)
    }
  }
  const GetDataForsendEmail=async()=>{
    try {
        const response=await DataService.GetUploadData(moment(EndDate).format('yyyy-MM-DD'),storeId) 
        setUserData(response.data.data)
    } catch (error) {
        console.log(error)
    }
  }

  const handleChange = (e,id) => {
    const { name, checked } = e.target;
    // console.log(checked);
    if (name === "allSelect") {
      let tempUser = userData.map((el) => {
        return { ...el, isChecked: checked };
      });
      setUserData(tempUser);
    } else {
      const tempUser = userData.map((el) =>
        el.id === id ? { ...el, isChecked: checked } : el
      );
      setUserData(tempUser);
    }
  };

  useEffect(() => {
  //  console.log(userData.filter((el) => el?.isChecked == true))
   GetDataForsendEmail()
  }, [EndDate])
  
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const SendBulkEmail=async()=>{
    setIsSubmeeting(true)
    try {
      const data = userData.filter(item => item.isChecked)
      .map(item => item.email);
      const result = {
        email: data
    };
    console.log(data.length>0)
    if(data.length>0){
      const response = await DataService.SendEmail(result)
      Swal.fire({
        title:response.data.message,
      })
      GetDataForsendEmail()
      setIsSubmeeting(false)
    }else{
      setIsSubmeeting(false)
      Swal.fire({
        title:"Please Select At least One Email"
      })
    }
    
    } catch (error) {
      setIsSubmeeting(false)
      console.log(error)
      Swal.fire({
        title:"something is wrong please try again",
      })
    }
  }

  return (
    <div>
      {" "}
      <div class="row">
        <div class="col-6">
        <Box display="flex" alignItems="center">
      <TextField
        size="small"
        type="text"
        className="form-control my-2"
        id="customer-name"
        label="CSV"
        value={file ? file.name : ''}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <input
                type="file"
                style={{ display: 'none' }}
                id="file-upload"
                accept=".csv"
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload">
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                >
                  Choose File
                </Button>
              </label>
            </InputAdornment>
          ),
        }}
      />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isUploading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
     <Button
        variant="contained"
        color="secondary"
        onClick={() => UploadFile(file)}
        disabled={!file}
        style={{ marginLeft: '10px' }}
      >
        Upload
      </Button>
    </Box>
        </div>
        <div class="col-6">
          <div class="p-3 border bg-light d-flex">
            
            <Flatpickr
              className="form-control"
              onChange={(e) => {
                // handleSubmit(e[0]);
                setEndDate(e[0]);
              }}
              options={{ allowInput: true, dateFormat: "d-M-Y" }}
            //   value={endDate}
              required={true}
              placeholder="End Date"
            />
          </div>
        </div>
      </div>
      <Table striped bordered hover>
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
                  userData.filter((el) => el?.isChecked !== true).length < 1
                }
                onChange={handleChange}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {userData &&
            userData.map((el) => {
              return (
                <tr>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name={el.name}
                      checked={el?.isChecked || false}
                      onChange={(e)=>handleChange(e,el.id)}
                    />
                  </td>
                  <td>{el.name}</td>
                  <td>{el.email}</td>
                  <td>{el.status}</td>
                  {/* <td>@mdo</td> */}
                </tr>
              );
            })}
        </tbody>
      </Table>
     { isSubmetting ?<Stack
                        sx={{ width: "100%", color: "grey.500" }}
                        className="my-4"
                        spacing={2}
                      >
                        <span>Email Sending...</span>
                        <LinearProgress
                          sx={{ height: "10px", borderRadius: "10px" }}
                          color="primary"
                        />
                      </Stack>:<Button  
     onClick={SendBulkEmail}
     variant="contained"
        color="secondary">Send Email</Button>}
    </div>
  );
};

export default EmailSend;
