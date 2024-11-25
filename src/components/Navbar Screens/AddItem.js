import React, { useCallback, useEffect, useRef, useState } from "react";
import Select, { useStateManager } from "react-select";
import { Button, Col, FormGroup, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CreatableSelect from 'react-select/creatable';
import Checkbox from '@mui/material/Checkbox';
import Swal from 'sweetalert2';
import FormControlLabel from '@mui/material/FormControlLabel';
import {
  handleAddItemToStoreRequest,
  handleInventoryMasterRequest,
  handleUploadPicRequest,
  handelGetCategoryRequest,
  resetProductId,
  handleAddItemToStoreResponse
} from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { FcDepartment } from "react-icons/fc";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import { createMakeAndWithStyles } from "tss-react";
// import { PhotoCameraRoundedIcon } from "@material-ui/icons";
import { AiFillCamera } from "react-icons/ai";

// import { useHistory } from "react-router-dom";
import Webcam from "react-webcam";
import { Label } from "reactstrap";
import axios from "axios";
import { BASE_Url } from "../../URL";
import Modal from 'react-bootstrap/Modal';

const videoConstraints = {
  width: 200,
  facinMode: "enviorment",
};

const AddItem = () => {
  const navigate = useNavigate();
  const { makeStyles } = createMakeAndWithStyles({
    // useTheme:useTheme
    /*
      OR, if you have extended the default mui theme adding your own custom properties:
      Let's assume the myTheme object that you provide to the <ThemeProvider /> is of
      type MyTheme then you'll write:
      */
    //"useTheme": useTheme as (()=> MyTheme)
  });
  const useStyles = makeStyles((theme) => ({
    root: {
      height: "100%",
      textAlign: "center",
    },
    imgBox: {
      maxWidth: "80%",
      maxHeight: "80%",
      margin: "10px",
    },
    img: {
      height: "inherit",
      maxWidth: "inherit",
    },
    input: {
      display: "none",
    },
  }));
  function handleTakePhoto(dataUri) {
    // Do stuff with the photo...
    console.log("takePhoto");
  }
  const { save_product_id, category_list } = useSelector(
    (e) => e.ComponentPropsManagement
  );

  console.log("category_list CMP", category_list);
  const dispatch = useDispatch();
  //
  // const classes = useStyles();

  const [source, setSource] = useState("");
  //
  const [selectedOptionDiscount, setSelectedOptionDiscount] = useState(null);
  const [selectedOptionTax, setSelectedOptionTax] = useState(null);
  const [selectedHSNTax, setSelectedHSNTax] = useState(null);
  const [itemName, setItemName] = useState("");
  const [barcode, setBarcode] = useState("");
  const [spacildescription, setSpacildescription] = useState("");
  const [department, setDepartment] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [ItemTax, setItemTax] = useState("");
  const [itemPrice, setItemPrice] = useState("0.00");
  const [openCam, setOpenCam] = useState(false);
  const [productId, setProductId] = useState("");
  const [taxPercentage, setTaxPercentage] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [receivedQuantity, setReceivedQuantity] = useState("0.00");
  const [purchasePrice, setPurchasePrice] = useState("0.00");
  const [stockQty, setStockQty] = useState("");
  const [soldQuantity, setSoldQuantity] = useState("");
  const [image, setImage] = useState("");
  const [closingQuantity, setClosingQuantity] = useState("");
  const [openingQuantity, setOpeningQuantity] = useState("0.00");
  const [taxPercenatage, setTaxPercenatage] = useState("0.00");
  const [sellingPrice, setSellingPrice] = useState("");
  const [mrp, setMrp] = useState("0.00");
  const [ImageName, setImageName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [show, setShow] = useState(false);
  const [size, setSize] = useState([]);
  const [categoryArr, setCategoryArr] = useState({
    party_name: "",
    payment_type: "",
    payment_date: "",
    payment_mode: "",
    amount: "",
    payment_notes: "",
  });

  // console.log("UPLOAD ITEM", uploadItem);

  useEffect(() => {
    if (save_product_id) {
      setProductId(save_product_id);
      dispatch(
        handleInventoryMasterRequest({
          item_name: save_product_id.item_name,
          // item_code: Number(itemCode),
          item_code: save_product_id.item_id,
          description: itemName,
          price: Number(itemPrice),
          // discount: Number(selectedOptionDiscount.value),
          tax: Number(taxPercentage),
          tax_code: Number(taxPercentage),
          status: "active",
          saas_id: saasId,
          product_av_cost: purchasePrice,
          product_cost: purchasePrice,
          mrp: mrp,
          sold_qty: 0,
          // closing_qty: closingQuantity,
          closing_qty: 0,
          opening_qty: openingQuantity,
          received_qty: receivedQuantity,
          category: itemCategory,
          product_price: sellingPrice,
          stock_qty: stockQty,
          tax_percentage: taxPercenatage,
          store_id: storeId,
          department: itemName,
          // promo_id: saasId,
        })
      );
      setTimeout(() => {
        setItemPrice("0.00");
        setItemName("");
        setSelectedOptionDiscount(null);
        setTaxPercentage("");
        setSelectedHSNTax(null);
        setSelectedOptionTax(null);
        setItemCategory("");
        setTaxPercenatage("0.00");
        setPurchasePrice("0.00");
        setSellingPrice("");
        setStockQty("");
        setMrp("0.00");
        setOpeningQuantity("0.00");
        setReceivedQuantity("0.00");
        setClosingQuantity("");
      }, 3000);
    }
  }, [save_product_id]);

  // console.log("IMG SOURCE", source.name);

  const { saasId, storeId } = JSON.parse(localStorage.getItem("User_data"));
  const webcamRef = useRef(null);
  const [url, setUrl] = useState(null);

  // console.log(URL, url);

  const capturePhoto = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUrl(imageSrc);
  });

  // console.log(capturePhoto);

  const handleAddItem = async(e) => {
    e.preventDefault();
    console.log(itemCategory);
    console.log("categoryArr", categoryArr);
    const body = {
      barcode:barcode,
      item_name: itemName,
      item_code: Number(itemCode),
      description: spacildescription,
      special_description:spacildescription,
      price: Number(itemPrice),
      brand:brandName,
      UOM: "pieces",
      colorList: [    {
        "product_size": 10,
        "product_color": "Red",
        "saas_id": "6",
        "store_id": "60001"
      },
      {
        "product_size": 12,
        "product_color": "Blue",
        "saas_id": "6",
        "store_id": "60001"
      }],
      // discount: Number(selectedOptionDiscount.value),
      tax: Number(taxPercentage),
      tax_code: Number(taxPercentage),
      status: "active",
      saas_id: saasId,
      product_cost: purchasePrice,
      mrp: mrp,
      category: itemCategory,
      selling_price: sellingPrice,
      stock_qty: stockQty,
      tax_percentage: taxPercenatage,
      store_id: storeId,
      department: itemName,
    }
    try {
    const response = await axios.post(`${BASE_Url}/item/add-item`,body)
    console.log("this response",response.data.data,response.data.status)
    if(response.data.status){
      if (response.data.data.item_id) {
        console.log("this item id",response.data.data.item_id)
      const Data ={
        saas_id: saasId,
        store_id: storeId,
        item_id: response.data.data.item_id,
        sizes: size
      }
      if (size.length>0) {
        try {
          await axios.post(`${BASE_Url}/item/add-size-master`,Data)
          setSize([])
        } catch (error) {
          console.log(error)
        }
      }
      Swal.fire({
        icon: 'success',
        title: 'Item Added Successfully',

      });
      dispatch(handleAddItemToStoreResponse({data : response.data.data}))
      }
    }
   

    setItemName("");
    setItemCategory("");
    setSpacildescription("")
  
  }catch (error) {
    // Log the error to the console
    console.error('Error in handleAddItem:', error);

    // Show an error alert using Swal
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'An error occurred while adding the item. Please try again.',
    });
  }
};

  const onUserMedia = (e) => {
    console.log(e);
  };

  const handleCapture = (target) => {
    if (target.files) {
      if (target.files[0]) {
        console.log("ETF", target.files[0]);
        // const file = target.files[0];
        // const newUrl = URL.createObjectURL(file);
        // setSource(newUrl);
        setSource(target.files[0]);
      }
    }
  };

  const handleUploadImage = () => {
    var formdata = new FormData();
    formdata.append(
      "file",
      source
      // "/C:/Users/risha/OneDrive/Pictures/Screenshots/Screenshot 2023-05-23 161309.png"
    );
    console.log("FORM DATA", formdata);
    // dispatch(handleUploadPicRequest({ formdata, save_product_id }));
    // setProductId("");
  };

  useEffect(() => {
    dispatch(handelGetCategoryRequest());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image);
    console.log("ye dekho", formData)
    if (image) {
      dispatch(handleUploadPicRequest({ formData, save_product_id }));
    }
    setImage("");
    setImageName("");
    //setProductId(undefined)

    dispatch(resetProductId());
    // console.log("FORM DATA", formData);
    // setAddDeityModalIsOpen(!addDeityModalIsOpen);
  };

  // <------------------------Get Brand Name---------------->
  const [brands, setBrands] = useState([{ value: '', label: '' }])
  const GetBrandName = async () => {
    try {
      const { storeId, saasId } = JSON.parse(localStorage.getItem("User_data"));
      const response = await axios.get(`${BASE_Url}/brand/view/${saasId}/${storeId}`);
  
      if (response.data && response.data.data) {
        const arr = response.data.data.map((item) => ({
          label: item.brandName,
          value: item.brandName,
        }));
        console.log("this Brand Data", arr)
        setBrands(arr);
      }
  
      console.log("this Brand Data", response.data); // Access the data property from the response object
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  useEffect(() => {
    GetBrandName()
    console.log("this Bradsz💖💖🤷‍♀️", brands)
  }, [])


  // <-----------------------------ADD Size Functionlity------------>
  const handlSize=(item)=>{
    if (size.length == 0) {
      setSize([item])
    }else{
      if(size.filter((el)=>el.size_name == item.size_name).length>0){
        const RemoveSame = size.filter((el)=>el.size_name !== item.size_name)
        console.log("this is Selected",RemoveSame)
        setSize(RemoveSame)
      }else{
        setSize(size.concat(item))
      }
    }
  }
  useEffect(() => {
    console.log("this  Size Item",size)

  }, [size])
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const Sizes = [
    { size_no:"38",
      size_name:"S"},
    { size_no:"40",
    size_name:"M"},
    { size_no:"42",
    size_name:"L"},
    { size_no:"46",
    size_name:"XL"},
  ]
  return (
    <>
    <section>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-5 col-md-9 col-sm-12 px-5">
            {console.log("save_product_id", save_product_id)}
            {save_product_id ? (
              <Col md={12}>
                <div class="mb-3">
                  <label
                    for="formFile"
                    class="form-label"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "20px",
                      border: "2px dashed #222",
                    }}
                  >
                    Click Here to upload
                  </label>
                  <input
                    class="form-control"
                    type="file"
                    id="formFile"
                    onChange={(e) => {
                      // console.log("evfdcvfvfvc", e.target.files[0].name);
                      setImage(e.target.files[0]);
                      setImageName(e.target.files[0].name);
                    }}
                  />
                </div>
                {ImageName ? (
                  <div>
                    <div>
                      {ImageName}
                      <Button type="button" onClick={handleSubmit}>
                        Upload
                      </Button>
                    </div>
                    <button
                      onClick={() => {
                        dispatch(resetProductId(""));
                      }}
                      className="btn btn-danger"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </Col>
            ) : (
              <div className="form-box">
                <h4>Add Item *</h4>
                <div
                  className="d-flex flex-col"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  {/* <TextField
                    size="small"
                    type="text"
                    className="form-control mt-4"
                    id="customer-name"
                    value={itemCode}
                    onChange={(e) => setItemCode(e.target.value)}
                    label="Item Code"
                  /> */}
                  <div
                  // className="d-flex flex-column"
                  // style={{ borderBottom: "1px solid #000" }}
                  >
                    {/* <input type="file" /> */}
                    {/* WEBCAM  */}
                    {/* 
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                height: "100px",
                                width: "100px",
                                marginBottom: "30px",
                              }}
                            > */}
                    {/* <Webcam
                                ref={webcamRef}
                                audio="false"
                                screenshotFormat="image/png"
                                videoConstraints={videoConstraints}
                                onUserMedia={onUserMedia}
                                mirrored={true}
                              />
          
                              <button onClick={capturePhoto}>Capture</button>
                              <button onClick={() => setUrl(null)}>Refresh</button>
                              {url && (
                                <div>
                                  <img src={url} alt="Pic" />
                                </div>
                              )} */}
                    {/* </div> */}
                    {/* <button
                              type="button"
                              // style={{
                              //   // all: "unset",
                              //   fontSize: "12px",
                              //   borderBottom: "1px solid rgb(255, 255, 255)",
                              //   flex: 1,
                              // }}
                              className="btn btn-primary my-2"
                              onClick={() => setOpenCam}
                            >
                              Upload Item Pic
                            </button> */}
                  </div>
                </div>
                <div
                  className="d-flex flex-col"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <TextField
                    size="small"
                    type="text"
                    className="form-control my-2"
                    id="customer-name"
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                    label="Enter Barcode"
                    multiline
                    // required
                    rows={1}
                  />
                  <TextField
                    size="small"
                    type="text"
                    className="form-control my-2"
                    id="customer-name"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    label="Item Name"
                    multiline
                    // required
                    rows={1}
                  />
                  <TextField
                    size="small"
                    type="textarea"
                    className="form-control my-2"
                    id="customer-name"
                    value={spacildescription}
                    onChange={(e) => setSpacildescription(e.target.value)}
                    label="Description"
                    multiline
                    // required
                    rows={2}
                  />

                  {/*  */}

                  <div style={{ zIndex: "999" }}>
                    <Select
                      options={category_list}
                      onChange={(e) => {
                        const val = e.value;
                        console.log("CV", e.value);
                        setItemCategory(e.value);
                        setCategoryArr({ ...categoryArr, party_name: val });
                      }}
                      // value={category_list.filter(
                      //   (io) => io.value === categoryArr.party_name
                      // )}
                      defaultInputValue={category_list.party_name}
                      value={category_list.party_name}
                      required={true}
                      placeholder="Select Category"
                      styles={{
                        menu: (baseStyles, state) => ({
                          ...baseStyles,
                          // height: "50px",
                          overflow: "auto",
                          // fontWeight: "900",
                        }),
                        option: (baseStyles, state) => ({
                          ...baseStyles,
                          height: "50px",
                          // fontWeight: "300",
                          overflow: "auto",
                        }),
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          zIndex: 999,
                          // height: "50px",
                          // fontWeight: "800",
                          // overflow: "auto",
                        }),
                      }}
                    />
                  </div>
                  {/*  */}

                  {/* <TextField
                    size="small"
                    type="text"
                    className="form-control my-2"
                    id="customer-name"
                    value={itemCategory}
                    onChange={(e) => setItemCategory(e.target.value)}
                    label="Item Category"
                    required
                    multiline
                    rows={1}
                  /> */}
                  {/* <TextField
                    type="text"
                    className="form-control my-2"
                    id="customer-name"
                    size="small"
                    // required
                    value={mrp}
                    onChange={(e) => setMrp(e.target.value)}
                    label="MRP"
                  /> */}
                  <TextField
                    size="small"
                    type="text"
                    className="form-control my-2"
                    id="customer-name"
                    value={itemPrice}
                    // required
                    onChange={(e) => setItemPrice(e.target.value)}
                    label="Item Price"
                  />

                  <TextField
                    size="small"
                    type="number"
                    className="form-control my-2"
                    id="customer-name"
                    value={purchasePrice}
                    // required
                    onChange={(e) => setPurchasePrice(e.target.value)}
                    label="Purchase Price"
                  />
                </div>
                {/* <TextField
                  type="text"
                  className="form-control my-2"
                  id="customer-name"
                  size="small"
                  // required
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(e.target.value)}
                  label="Selling Price"
                /> */}
                {/* <TextField
                  type="text"
                  className="form-control my-2"
                  id="customer-name"
                  size="small"
                  // required
                  value={stockQty}
                  onChange={(e) => setStockQty(e.target.value)}
                  label="Stock Quantity"
                /> */}

                <TextField
                  type="text"
                  className="form-control my-2"
                  id="customer-name"
                  size="small"
                  // required
                  value={openingQuantity}
                  onChange={(e) => setOpeningQuantity(e.target.value)}
                  label="Opening Quantity"
                />
                <TextField
                  type="text"
                  className="form-control my-2"
                  id="customer-name"
                  size="small"
                  // required
                  value={receivedQuantity}
                  onChange={(e) => setReceivedQuantity(e.target.value)}
                  label="Received Quantity"
                />
                {/* <TextField
                  type="text"
                  className="form-control my-2"
                  id="customer-name"
                  size="small"
                  // required
                  value={closingQuantity}
                  onChange={(e) => setClosingQuantity(e.target.value)}
                  label="Clossing Quantity"
                /> */}
                <TextField
                  type="text"
                  className="form-control my-2"
                  id="customer-name"
                  size="small"
                  // required

                  value={taxPercenatage}
                  onChange={(e) => setTaxPercenatage(e.target.value)}
                  label="Tax Percentage"
                />
                <div style={{ zIndex: "999", marginBottom: "10px" }}>
                <CreatableSelect onChange={(e)=>{
                    setBrandName(e?.value)
                  }} placeholder="Selecte Brand Name" isClearable options={brands} />
                  {/* <select onChange={(e)=>{
                    setBrandName(e.target.value)
                  }} class="form-select" placeholder="Enter Brand name">
                    {brands?.map((item)=><option>{item.brandName}</option>)}
                  </select> */}
                  {/* <Select
                      options={brands}
                      onChange={(e) => {
                        const val = e.value;
                        console.log("CV", e.value);
                        setItemCategory(e.value);
                        setCategoryArr({ ...categoryArr, party_name: val });
                      }}
                      // value={category_list.filter(
                      //   (io) => io.value === categoryArr.party_name
                      // )}
                      defaultInputValue={brands.brandName}
                      value={brands.brandName}
                      required={true}
                      placeholder="Select Category"
                      styles={{
                        menu: (baseStyles, state) => ({
                          ...baseStyles,
                          // height: "50px",
                          overflow: "auto",
                          // fontWeight: "900",
                        }),
                        option: (baseStyles, state) => ({
                          ...baseStyles,
                          height: "50px",
                          // fontWeight: "300",
                          overflow: "auto",
                        }),
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          zIndex: 999,
                          // height: "50px",
                          // fontWeight: "800",
                          // overflow: "auto",
                        }),
                      }}
                    /> */}
                    <button
                    style={{
                      marginTop:"10px",
                      backgroundColor: "#fff",
                      // outline: "none",
                      // border: "none",
                      // fontSize: "20px",
                      // padding: "10px 10px",
                      // borderRadius: "10px",
                      // color: "#fff",
                    }}
                    onClick={handleShow}
                  >
                    ADD Size
                  </button>
                </div>
                <div className="">
                  <button
                    style={{
                      backgroundColor: "yellowgreen",
                      outline: "none",
                      border: "none",
                      fontSize: "20px",
                      padding: "10px 20px",
                      borderRadius: "10px",
                      color: "#fff",
                    }}
                    onClick={handleAddItem}
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
            )}
          </div>
        </div>
      </div>
    </section>
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Size</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
     
        {/* {Sizes.map((item)=>{
          <FormControlLabel
          // key={index}
          control={
            <Checkbox
              checked={size.includes(item.size_no)}
              onChange={() => handlSize(item)}
            />
          }
          label={item.size_name}
        />
        })} */}
      
      <FormGroup>
  {Sizes.map((item)=><FormControlLabel control={<Checkbox onClick={()=>handlSize(item)} defaultChecked={size.filter((el)=>el.size_no==item.size_no).length > 0? true :false} />} label={item.size_name} />)}
</FormGroup>
         {/* <div className="d-flex justify-content-around">{Sizes.map((item)=> <p><input type="checkbox" checked={size.includes(item.size_no)} onClick={()=>handlSize(item)} />{item.size_name}</p>) }</div> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{
            handleClose()
            Swal.fire({title: 'Size Selected Successfully',
            timer: 1000, showConfirmButton: false,}
            )
            }}>Add Size</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddItem;
