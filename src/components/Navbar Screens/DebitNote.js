import React, { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import {
  AiFillInfoCircle,
  AiOutlineEdit,
  AiOutlinePercentage,
  AiOutlinePlusCircle,
  
} from "react-icons/ai";
import { PiBookOpenLight } from "react-icons/pi";
import { BsBank2 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { GiBlackBook } from "react-icons/gi";
import { Button } from "react-bootstrap";
import { TextField } from "@mui/material";

// import {
//   handleGstTypeDropdownRequest,
//   handleDeliveryNoteRequest,
// } from "../../src/redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import {
  handleGstTypeDropdownRequest,
  handleDeliveryNoteRequest,
  handleOpneMenuRequest
} from "../../../src/redux/actions-reducers/ComponentProps/ComponentPropsManagement";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_Url } from "../../URL";

const DebitNote = () => {
  const dispatch = useDispatch();
  const { storeId, saasId } = JSON.parse(localStorage.getItem("User_data"));

  useEffect(() => {
    dispatch(handleGstTypeDropdownRequest());
  }, []);

  useEffect(() => {
    // console.log("GST COLLECTION", gst_type_dropdown);
    // dispatch(handleTaxRatesRequest());
  }, []);
  const { gst_type_dropdown, handle_user_dropdown } = useSelector(
    (state) => state.ComponentPropsManagement
  );
  const [selectedOptionSellPrice, setSelectedOptionSellPrice] = useState(null);
  const [charges, setCharges] = useState("");
  const [gstType, setGstType] = useState("");
  const [amount, setAmount] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [productName, setProductName] = useState("");
  const [sellingPrice, setsellingPrice] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  // const [selectedOptionCustomer, setSelectedOptionCustomer] = useState(null);
  const [gstTax, setGstTax] = useState("");
  const [selectedOptionUnit, setSelectedOptionUnit] = useState(null);
  const [items, setItems] = useState([]);
  // const [selectedOptionPurchasePrice, setSelectedOptionPurchasePrice] =
  //   useState("");
  const [purchaseTax, setPurchaseTax] = useState("");
  const [priceTax, setPriceTax] = useState("");
  const [selectedOptionGST, setSelectedOptionGST] = useState(null);
  const [itemObj, setItemObj] = useState({});
  const [defaultItemData, setDefaultItemData] = useState([]);

  // console.log(selectedOptionCustomer);
  // console.log(selectedOptionSellPrice);
  // console.log(selectedOptionPurchasePrice);
  // console.log(selectedOptionUnit);

  const [edit, setEdit] = useState(false);
  const [openCustomer, setOpenCustomer] = useState(false);
  const [type, setType] = useState("");
  const [addProduct, setAddProduct] = useState(false);

  const onOptionChange = (e) => {
    setType(e.target.value);
    // console.log("E TARGET VALUE", e.target.value);
  };
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  // const optionsSellPrice = [
  //   { value: "21.00", label: "21.00" },
  //   { value: "22.00", label: "22.00" },
  //   { value: "23.00", label: "23.00" },
  // ];
  // const optionsPurchasePrice = [
  //   { value: "Tax A", label: "Tax A" },
  //   { value: "Tax B", label: "Tax B" },
  // ];

  const [updatePriceState, setUpdatePriceState] = useState({
    item_name: "",
    item_price: "",
    previous_price: "",
    effective_date: "",
    valid_upto: "",
  });

  console.log("updatePriceState.item_name", updatePriceState.item_name);

  const optionsforUnit = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
  ];
  const optionsGST = [
    { value: "18", label: "18" },
    { value: "19", label: "19" },
  ];
  // const optionsCustomer = [{ value: "Customer ABC", label: "Customer ABC" }];

  const handleAddItemSubmit = () => {
    // e.preventDefault();
    // console.log("PRODUCT NAME", type);
    // console.log("PRODUCT TYPE", itemType);
    // console.log("SELLING PRICE", sellingPrice);
    // console.log("SELLING PRICE OPTION", selectedOptionSellPrice);
    // console.log("PURCHASE PRICE", purchasePrice);
    // console.log("PURCHASE PRICE OPTION", selectedOptionSellPrice);
    // console.log("GST OPTION", selectedOptionGST);
    // console.log("UNITS", selectedOptionUnit);

    setItems((state) => [
      ...state,
      {
        type: type,
        name: productName,
        selling_price: sellingPrice,
        selling_price_tax: priceTax,
        purchase_price: 20.0,
        purchase_price_tax: purchaseTax,
        gst: gstTax,
        quantity: selectedOptionUnit,
      },
    ]);
    // setProductName("");
    // setItemType("");
    // setsellingPrice("");
    // setPurchasePrice("");
    // setPriceTax("");
    // setSelectedOptionUnit("");
    // setGstTax("");
  };
  // console.log(items);
  // console.log(taxable);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      handleDeliveryNoteRequest({
        customer_party: updatePriceState.item_name,
        charges: charges,
        amount: amount,
        add_chalan: items,
      })
    );
    setProductName("");
    setsellingPrice("");
    setPriceTax("");
    setPurchasePrice("");
    setPurchaseTax("");
    setGstTax("");
    setAmount("");
    setCharges("");
    setCustomerName("");
  };

  const handleItemFilter = async (inputValue) => {
    const { storeId, saasId } = JSON.parse(localStorage.getItem("User_data"));
    try {
      const response = await fetch(
        `${BASE_Url}/customer/search-customer/${storeId}/${saasId}/${inputValue}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const jsonData = await response.json();
      // console.log("IN DELIVERY", jsonData);
      if (jsonData) {
        if (jsonData.status === true) {
          const d1 = jsonData.data;
          if (d1) {
            if (d1.length > 0) {
              const arr = [];
              d1.map((item) => {
                arr.push({
                  ...item,
                  label: item.name,
                  value: item.name,
                });
              });
              return arr;
            }
          }
          return [];
        }
        toast.error(jsonData.message);
      } else {
        toast.error("Something went wrong server side");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loadOptions = (inputValue) => {
    if (inputValue.length > 0) {
      return new Promise((resolve, reject) => {
        resolve(handleItemFilter(inputValue));
      });
    } else {
      // return new Promise((resolve, reject) => {
      //     resolve(handleRecommendedDataRequest(inputValue));
      // });
    }
  };

  // const loadOptions = (searchValue, callback) => {
  //   const { storeId, saasId } = JSON.parse(localStorage.getItem("User_data"));
  //   axios
  //     .get(
  //       `http://3.111.70.84:8088/test/api/v1/customer/search-customer/${storeId}/EEEE/${searchValue}`
  //     )
  //     .then((data) => {
  //       // data.map((item) => {});
  //       console.log(data);
  //     });
  //   // if (searchValue) {
  //   //   dispatch(handleDelGetUserRequest({ searchValue }));
  //   // }
  //   // const { label, value } = handle_user_dropdown;
  //   // callback(label, value);
  // };

  // console.log(handle_user_dropdown);

  const handleChange = (selectedOption) => {
    console.log("SELECTED OPTION", selectedOption);
  };
  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
      <div className="container"
                style={{backgroundColor: "rgb(253, 238, 204)",height:"200vh"
                }}>
            
        <div className="row d-flex justify-content-center" styel={{height: "fit-content"}}>
          <form
            className="col-lg-5 col-md-10 col-sm-12 px-5"
            onSubmit={handleSubmit}
          >
             <div className="d-flex mt-3">
 <Link
      to="/"
      type="submit"
      className="text-decoration-none"
      onClick={() => dispatch(handleOpneMenuRequest(false))}
      style={{
        color: "black",}}
    
    > <i className="fa-solid fa-chevron-left mt-1"></i></Link> 
  <h4  style={{fontFamily:"bold", marginLeft: "10px"}}>Debit note</h4>
  
 </div>
          
  <div
    className=""
    style={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      justifyContent: "space-between",
    }}
  >
    <div
    //  style={{ flex: 1 }}
    >
      <TextField
        type="text"
        className="form-control my-2"
        id="customer-name"
        size="small"
        // value={billNumber}
        // onChange={(e) => setBillnumber(e.target.value)}
        // required
        // disabled
        label="Debit Node#"
      />
    </div>
 
     <div className="container p-0">
<div className="input-group">
<input
type="date"
className="form-control"
selected={startDate}
onChange={(date) => setStartDate(date)}
/>

</div>
</div>
  </div>
            <div>
              <p className="mb-1 fw-bold mt-2">
                Party 
                <AiFillInfoCircle  className="mx-2"  />
              </p>
              {/* <p
                className="text-primary bg-white"
                style={{ fontSize: "20px" }}
                onClick={() => {
                  setOpenCustomer((state) => !state);
                }}
              >
                <AiOutlinePlusCircle className="mx-2" />
                Select Customer
              </p> */}
              {/* {openCustomer ? ( */}
                <div>
                  <div className="my-1">
                    {/* <TextField
                      size="small"
                      type="text"
                      className="form-control mt-2"
                      id="customer-name"
                      label="Customer Name"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    /> */}
                    <div>
                      <AsyncSelect
                        cacheOptions
                        loadOptions={loadOptions}
                        isSearchable={true}
                        defaultOptions={defaultItemData}
                        onChange={(e) => {
                          const val = e.label;
                          setItemObj(e);
                          setUpdatePriceState({
                            ...updatePriceState,
                            item_name: val,
                          });
                        }}
                        // value={updatePriceState.item_name}
                        required={true}
                        placeholder="Select Customer"
                      />
                    </div>
                  </div>
                </div>
              {/* ) : ( */}
                {/* "" */}
              {/* )} */}
            </div>
            <div>
              

              <p className="mb-1 fw-bold mt-2">
                Products
                <AiFillInfoCircle className="mx-2" />
              </p>

                 
                {addProduct ? (
                <div className="rounded-3" style={{background:" white",
                padding:" 15px",
                marginTop: "10px"}}>
                  <div className="">
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-TextField mx-2"
                        type="radio"
                        name="inlineRadioOptions"
                        value={"Type 1"}
                        required
                        onChange={onOptionChange}
                        id="inlineRadio4"
                        // value="option1"
                      />
                      <label className="form-check-label" for="inlineRadio4">
                        Product
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-TextField mx-2"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio5"
                        value={"Type 2"}
                        required
                        onChange={onOptionChange}
                      />
                      <label className="form-check-label" for="inlineRadio5">
                        Service
                      </label>
                    </div>
                  </div>
                  <TextField
                    size="small"
                    type="text"
                    className="form-control mt-2"
                    id="customer-name"
                    label="Product Name"
                    required
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                  <div
                    className=""
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div className="" style={{ flex: 1 }}>
                      <p>Selling Price</p>
                      <TextField
                        size="small"
                        type="text"
                        className="form-control mt-2"
                        id="customer-name"
                        value={sellingPrice}
                        onChange={(e) => setsellingPrice(e.target.value)}
                        label="₹ 0"
                        required
                      />
                    </div>
                    <div
                      className="d-flex flex-col mt-1"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                      }}
                    >
                      <div className="mb-3" styles={{fontSize: "15px"}}>Sell Price Tax </div>
                      <div  >
                        <Select
                       
                          options={gst_type_dropdown}
                          onChange={(e) => {
                            setPriceTax(e.value);
                          }}
                          value={gst_type_dropdown.filter(
                            (io) => io.value === priceTax
                          )}
                          required={true}
                          className=""
                          placeholder="Gst Type"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className=""
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div className="" style={{ flex: 1 }}>
                      <p>Purchase Price</p>
                      <TextField
                        size="small"
                        type="text"
                        className="form-control mt-2"
                        id="customer-name"
                        value={purchasePrice}
                        onChange={(e) => setPurchasePrice(e.target.value)}
                        label="₹ 0"
                        required
                      />
                    </div>
                    <div
                      className="d-flex flex-col"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                      }}
                    >
                      <p style={{ textWrap: "nowrap"}} >Purchase PriceTax </p>
                      <div className="mt-1"  >
                        <Select
                          options={gst_type_dropdown}
                          onChange={(e) => {
                            setPurchaseTax(e.value);
                          }}
                          value={gst_type_dropdown.filter(
                            (io) => io.value === purchaseTax
                          )}
                          required={true}
                          className=""
                          placeholder="Gst Type"
                        />
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div className="my-3">
                    <p className="my-1">GST %</p>
                    <div>
                      <Select
                        options={gst_type_dropdown}
                        onChange={(e) => {
                          setGstTax(e.value);
                        }}
                        value={gst_type_dropdown.filter(
                          (io) => io.value === gstTax
                        )}
                        required={true}
                        placeholder="Select Gst Type"
                      />
                    </div>
                  </div>
                  <div className="my-3">
                    <p className="my-1">Units</p>
                    <Select
                      // defaultValue={selectedOption}
                      // onChange={setSelectedOption}
                      options={optionsforUnit}
                      required
                      onChange={(e) => setSelectedOptionUnit(e.value)}
                      placeholder="Select Unit"
                    />
                  </div>
                  <Button
                    // type="submit"
                    className="w-100"
                    // className="btn btn-primary btn-lg btn-block"
                    style={{
                      backgroundColor:"var(--Acc-1, #457FD4)",
                      outline: "none",
                      border: "none",
                      fontSize: "14px",
                      padding: "10px 120px",
                      borderRadius: "10px",
                      color: "#fff",
                    }}
                    onClick={() => handleAddItemSubmit()}
                  >
                    Add
                  </Button>
                </div>
              ) : (
                ""
              )}


              <p
                 className="btn btn-outline-primary mt-3"
                 style={{
                   width: "100%",
                   display: "flex",
                   alignItems: "center",
                   justifyContent: "center",
                   padding: "30px",
                   backgroundColor: "white",
                   color: "silver",
                   border: "aliceblue"
                 }}
                onClick={() => setAddProduct((state) => !state)}
              >
                <AiOutlinePlusCircle />
                Add Products
              </p>
             
            </div>
            {/* <div className="d-flex justify-content-between bg-white">
              <h5 className="text-primary fw-bold">
              <AiOutlinePlusCircle className="mx-2" />
              Additional Charges
              </h5>
            </div> */}

            <div className="rounded">
              {/*  */}
            <p className="fw-bold mt-3">Optional</p>
              <div className="d-flex align-items-center justify-content-between">
                <TextField
                  size="small"
                  type="number"
                  className="form-control mt-2"
                  id="customer-name"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  label="Amount"
                  required
                />
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <TextField
                  size="small"
                  type="number"
                  className="form-control mt-2"
                  id="customer-name"
                  value={charges}
                  onChange={(e) => setCharges(e.target.value)}
                  label="Charges"
                  required
                />
              </div>
              {/*  */}
          
  <div className="mt-4 d-flex justify-content-center">
    <button
      type="submit"
      className="btn btn-primary btn-lg btn-block"
      style={{
        backgroundColor:"var(--Acc-1, #457FD4)",
        outline: "none",
        border: "none",
        fontSize: "14px",
        padding: "10px 140px",
        borderRadius: "10px",
        color: "#fff",
      }}
    >
      Save
    </button>

  </div>
  <div className="mt-2 d-flex justify-content-center"> 
  <Link
      to="/"
      type="submit"
      // onClick={()=>}
      className="text-decoration-none"
      onClick={() => dispatch(handleOpneMenuRequest(false))}
      style={{
        // backgroundColor: "gray",
        // outline: "none",
        // border: "none",
        // marginLeft: "20px",
        // fontSize: "20px",
        // padding: "10px 20px",
        // borderRadius: "10px",
        color: "black",
      }}
    >
      Cancel
    </Link>
    </div>
    </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DebitNote;
