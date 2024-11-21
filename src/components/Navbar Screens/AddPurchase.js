import { FormGroup, TextField } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import ReactDatePicker from "react-datepicker";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BiSearchAlt2 } from "react-icons/bi";
import { Link } from "react-router-dom";
import Select, { useStateManager } from "react-select";
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';


import {
  handleAddItemSearchRequest,
  handleAddPurchaseRequest,
  handleOpneMenuRequest,
  handleInventoryMasterRequest,
  handlePartyNameDataRequest,
  handleBahikhataPartyDropdownRequest,
} from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { useDispatch, useSelector } from "react-redux";
import { BASE_Url } from "../../URL";
import { Label } from "reactstrap";
import { toast } from "react-toastify";

const Pricing = () => {
  return (
    <div>
      <TextField
        type="text"
        className="form-control my-2"
        id="customer-name"
        size="small"
        // required
        // value={mrp}
        // onChange={(e) => set(e.target.value)}
        // label="MRP"
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
        label="Cost"
      />
      {/* <TextField
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
      /> */}
    </div>
  );
};
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
const AddPurchase = () => {
  const {
    bahikhata_party_name_dropdown,
    handle_party_name_data,
    handle_add_item_search,
  } = useSelector((e) => e.ComponentPropsManagement);

  console.log("bahikhata_party_name_dropdown", bahikhata_party_name_dropdown);
  const dispatch = useDispatch();

  const [bahikhataArr, setBahikhataArr] = useState({
    party_name: "",
    payment_type: "",
    payment_date: "",
    payment_mode: "",
    amount: "",
    payment_notes: "",
  });

  const TabsData = [
    {
      id: 1,
      button: "Pricing",
      component: <Pricing />,
    },
    {
      id: 2,
      button: "Stock",
      component: <Stock />,
    },
  ];
  const [startDate, setStartDate] = useState(new Date());
  const [addItem, setAddItem] = useState(false);
  const [billNumber, setBillnumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [partyName, setPartyName] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [mobile, setMobile] = useState("");
  const [value, setValue] = useState(0);
  const [tabs] = useState(TabsData);
  const [quantity, setQuantity] = useState();
  const [defaultItemData, setDefaultItemData] = useState([]);
  const [mrp, setMrp] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [cost, setCost] = useState("");
  const [itemId, setItemId] = useState("");
  const [openingQuantity, setOpeningQuantity] = useState("");
  const [recevedQty, setRecevedQty] = useState("");
  const [soldQuantity, setSoldQuantity] = useState("");
  const [closingQuantity, setClosingQuantity] = useState("");
  const [supplierName, setSupplierName] = useState({});
  const [barcode, setBarcode] = useState("");
  const [stockQty, setStockQty] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const { component } = tabs[value];
  const [itemObj, setItemObj] = useState({});
  const [updatePriceState, setUpdatePriceState] = useState({
    item_name: "",
    item_price: "",
    previous_price: "",
    effective_date: "",
    valid_upto: "",
  });

  console.log("UPDATE PRICE STATE", itemObj);

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
  // ------------
  console.log("ITEM ID", itemId);

  const handleItemFilter = async (inputValue) => {
    const { storeId, saasId } = JSON.parse(localStorage.getItem("User_data"));
    try {
      const response = await fetch(
        // `${BASE_Url}/customer/search-customer/${storeId}/${saasId}/${inputValue}`,
        // `${BASE_Url}/search/recommended-item/${storeId}/${saasId}`,
        `${BASE_Url}/search/get-result/${storeId}/${saasId}/${inputValue}`,
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
          console.log("object", d1);
          if (d1) {
            if (d1.length > 0) {
              const arr = [];
              d1.map((item) => {
                arr.push({
                  ...item,
                  label: item.item_name,
                  value: item.item_name,
                });
                setItemId(item.item_id);
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

  // ------------
  console.log(handle_party_name_data);
  console.log(handle_add_item_search);
  useEffect(() => {
    if (handle_add_item_search && handle_add_item_search[0]) {
      setItemCode(handle_add_item_search[0].productId);
      setItemCategory(handle_add_item_search[0].category);
    }
  }, [handle_add_item_search]);

  useEffect(() => {
    if (handle_party_name_data && handle_party_name_data.partyName) {
      setPartyName(handle_party_name_data && handle_party_name_data.partyName);
      setSupplierId(
        handle_party_name_data && handle_party_name_data.supplierId
      );
      // setQuantity(handle_party_name_data)
    }
  }, [handle_party_name_data]);
  // console.log("PARTY NAME", handle_party_name_data);

  const { saasId, storeId } = JSON.parse(localStorage.getItem("User_data"));

  // console.log("Supplier Id", supplierId);

  const handleSearch = (e) => {
    dispatch(handlePartyNameDataRequest({ phone_number: e.target.value }));
  };

  const handleSearchItem = (e) => {
    dispatch(handleAddItemSearchRequest({ searchValue: e.target.value }));
  };

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 1000);
    };
  };

  const optimizedFn = useCallback(debounce(handleSearch), []);
  const optimizedFnItemSearch = useCallback(debounce(handleSearchItem), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("SAAS ID", saasId);
    // console.log("STORE ID", storeId);
    // console.log("SUPPLIER ID", supplierId);
    // console.log("ITEM LIST", handle_add_item_search);
    // console.log("QUANTITY", quantity);
    dispatch(
      handleAddPurchaseRequest({
        saas_id: saasId,
        store_id: storeId,
        supplier_name: supplierName,
        item_list: [{ item_id: Number(itemId), productQty: quantity }],
      })
    );
    dispatch(
      handleInventoryMasterRequest({
        // saas_id: saasId,
        // store_id: storeId,
        // supplier_name: partyName,
        // item_list: [
        //   { productId: Number(itemId), productQty: Number(quantity) },
        // ],
        supplier_name: supplierName,
        saas_id: saasId,
        store_id: storeId,
        opening_qty: openingQuantity,
        item_code: itemObj.item_id,
        item_name: itemObj.category,
        received_qty: recevedQty,
        sold_qty: 0,
        closing_qty: closingQuantity,
        mrp: mrp,
        barcode: barcode,
        product_cost: purchasePrice,
        product_price: sellingPrice,
        product_av_cost: cost,
      })
    );
    setItemName("");
    setPhoneNumber("");
    setPartyName("");
    setItemName("");
    setQuantity("");
    setItemCode("");
    setItemCategory("");
    setMrp("");
    setPurchasePrice("");
    setCost("");
    setOpeningQuantity("");
    setClosingQuantity("");
    setBarcode("");
    setSellingPrice("");
    setRecevedQty("");
    setStockQty("");
  };

  useEffect(() => {
    dispatch(handleBahikhataPartyDropdownRequest());
  }, []);

   const [selectedOption, setSelectedOption] = useState('option1'); // Default selected option

  const handleOptionChange = (changeEvent) => {
    setSelectedOption(changeEvent.target.value);
  };
  const [selectedValue, setSelectedValue] = useState('option1');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <>
      <div className="container"
                style={{backgroundColor: "rgb(253, 238, 204)",height:"200vh"
                }}>
        <div className="row d-flex justify-content-center" styel={{height: "fit-content"}}>
          <div className="col-lg-5 col-md-10 col-sm-12 px-5">
            {/* <div className="row d-flex justify-content-center">
          <div className="col-lg-5 col-md-10 col-sm-12"> */}
            <form className="form-box" onSubmit={handleSubmit}>
             <div className="d-flex mt-3">
             <Link
                  to="/"
                  type="submit"
                  className="text-decoration-none"
                  onClick={() => dispatch(handleOpneMenuRequest(false))}
                  style={{
                    color: "black",}}
                
                > <i className="fa-solid fa-chevron-left mt-1"></i></Link> 
              <h4  style={{fontFamily:"bold", marginLeft: "10px"}}>Add Purchase</h4>
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
                    value={billNumber}
                    onChange={(e) => setBillnumber(e.target.value)}
                    // required
                    // disabled
                    label="Bill Number"
                  />
                </div>
                {/* <div
                  style={{
                    zIndex: 2,
                  }}
                >
                  <ReactDatePicker
                    style={{ width: "500px" }}
                    selected={startDate}
                    // style={{ zIndex: 2 }}
                    onChange={(date) => setStartDate(date)}
                  />
                </div> */}
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
              <TextField
                type="text"
                className="form-control my-2"
                id="customer-name"
                size="small"
                // required
                value={phoneNumber}
                onChange={(e) => {
                  optimizedFn(e);
                  setPhoneNumber(e.target.value);
                }}
                // style={{ zIndex: -2 }}
                label="Search by Phone Number"
              />
              <FormGroup>
                {/* <Label>
                  Select Party <span className="text-red"> * </span>
                </Label> */}
                <div styles={{ zIndex: 999 }}>
                  <Select
                    options={bahikhata_party_name_dropdown}
                    onChange={(e) => {
                      const val = e.value;
                      console.log("kjnbdskja", e.value);
                      setSupplierName(e.value);
                      setBahikhataArr({ ...bahikhataArr, party_name: val });
                    }}
                    value={bahikhata_party_name_dropdown.filter(
                      (io) => io.value === bahikhataArr.party_name
                    )}
                    required={true}
                    styles={{
                      menu: (baseStyles, state) => ({
                        ...baseStyles,
                        // height: "50px",
                        overflow: "auto",
                        fontWeight: "900",
                        zIndex: 999,
                      }),
                      option: (baseStyles, state) => ({
                        ...baseStyles,
                        height: "50px",
                        // zIndex: 999,
                        fontWeight: "300",
                        overflow: "auto",
                      }),
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        // zIndex: 999,
                        // height: "50px",
                        fontWeight: "800",
                        // overflow: "auto",
                      }),
                    }}
                    placeholder="Select Party"
                  />
                </div>
              </FormGroup>

              <div
                style={{ width: "100%" }}
                onClick={() => setAddItem((state) => !state)}
              >
                <button
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
                >
                  <AiOutlinePlusCircle />
                  Add Item (Optional)
                </button>
              </div>

              <div>
                {addItem ? (
                  <>
                    <div className="" style={{background: "#FFF", borderRadius:"11px",
                  padding: "10px",
                  marginTop: "10px" }}>
                      {/* <TextField
                        type="text"
                        className="form-control my-2"
                        id="customer-name"
                        size="small"
                        required
                        value={itemName}
                        onChange={(e) => {
                          optimizedFnItemSearch(e);
                          setItemName(e.target.value);
                        }}
                        label="Item Name"
                      /> */}

                      <div className="mt-3">
                        <div style={{ zIndex: 3 }}>
                          <AsyncSelect
                            cacheOptions
                            loadOptions={loadOptions}
                            isSearchable={true}
                            defaultOptions={defaultItemData}
                            onChange={(e) => {
                              const val = e.label;
                              setItemObj(e);
                              setMrp(e.price);
                              setUpdatePriceState({
                                ...updatePriceState,
                                item_name: val,
                              });
                            }}
                            // value={updatePriceState.item_name}
                            // value={loadOptions.filter(
                            //   (io) => io.value === loadOptions.party_name
                            // )}
                            required={true}
                            placeholder="Select Item"
                            styles={{
                              menu: (baseStyles, state) => ({
                                ...baseStyles,
                                // height: "50px",
                                overflow: "auto",
                                // fontWeight: "900",
                                zIndex: 900,
                              }),
                              option: (baseStyles, state) => ({
                                ...baseStyles,
                                height: "50px",
                                fontWeight: "900",
                                // overflow: "auto",
                                zIndex: 900,
                              }),
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                // height: "50px",
                                // fontWeight: "900",
                                // overflow: "auto",
                              }),
                            }}
                          />
                        </div>
                      </div>
                      <TextField
                        type="text"
                        className="form-control my-2"
                        id="customer-name"
                        size="small"
                        // required
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        label="Quantity"
                      />
                      {/* <TextField
                        type="text"
                        className="form-control my-2"
                        id="customer-name"
                        size="small"
                        required
                        value={itemCode}
                        onChange={(e) => setItemCode(e.target.value)}
                        label="Item Code / Barcode"
                      />
                      <TextField
                        type="text"
                        className="form-control my-2"
                        id="customer-name"
                        size="small"
                        required
                        value={itemCategory}
                        onChange={(e) => setItemCategory(e.target.value)}
                        label="Item Category"
                      />
                      <TextField
                        type="text"
                        className="form-control my-2"
                        id="customer-name"
                        size="small"
                        // required
                        // placeholder={`HSN/SAC Code ${(<BiSearchAlt2 />)}`}
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        label="Phone Number"
                      /> */}
                  
                    <div style={{ marginBottom: 0, paddingBottom: 0 }}>
                      <div
                      // style={{ width: "500px" }}
                      >
                        <ul
                          className="d-flex flex-row"
                          style={{
                            listStyle: "none",
                            marginRight: "40px",
                            // width: "500px",
                          }}
                        >
                          {/* {tabs.map((tab, index) => (
                            <li
                              key={tab.id}
                              // className="border-bottom border border-danger"
                              style={{
                                border: "none",
                                outline: "none",
                                flex: 1,
                                alignItems: "center",
                                display: "flex",
                                justifyContent: "center",
                                borderBottom:
                                  index === value && "2px solid red",
                              }}
                            >
                              <button
                                style={{ outline: "none", border: "none" }}
                                onClick={() => setValue(index)}
                                className={`btn mx-2`}
                              >
                                {tab.button}
                              </button>
                            </li>
                          ))} */}
                          {/* <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "100%",
                            }}
                          >
                            <p style={{ color: "red" }}>Pricing & Stocks</p>
                          </div> */}
      

                          
                        </ul>
                        <div className="d-flex justify-content-around">
           <div style={{ display: 'flex', alignItems: 'center' }}>
      {/* <Typography variant="h6">Select an Option:</Typography>y */}
      <FormControl component="fieldset" style={{ flex: 1 }}>
        <RadioGroup
          name="options"
          value={selectedValue}
          onChange={handleChange}
          style={{ display: 'flex', flexDirection: 'row' }}
        >
          <FormControlLabel
            value="option1"
            control={<Radio />}
            label="Price"
          />
          <FormControlLabel
            value="option2"
            control={<Radio />}
            label="Stock"
          />
        </RadioGroup>
      </FormControl>
    </div>
                  </div>
                        <div
                        // className="d-flex justify-content-center"
                        >
                          {/* ------------ */}

                          <TextField
                            type="text"
                            className="form-control my-2"
                            id="customer-name"
                            size="small"
                            // required
                            value={mrp}
                            onChange={(e) => setMrp(e.target.value)}
                            label="MRP"
                          />
                          <TextField
                            type="text"
                            className="form-control my-2"
                            id="customer-name"
                            size="small"
                            // required
                            value={purchasePrice}
                            onChange={(e) => setPurchasePrice(e.target.value)}
                            label="Purchase Price"
                          />
                          <TextField
                            type="text"
                            className="form-control my-2"
                            id="customer-name"
                            size="small"
                            // required
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                            label="Cost"
                          />
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
                          {/* <TextField
                            type="text"
                            className="form-control my-2"
                            id="customer-name"
                            size="small"
                            // required
                            value={soldQuantity}
                            onChange={(e) => setSoldQuantity(e.target.value)}
                            label="Sold Quantity"
                          /> */}
                          <TextField
                            type="text"
                            className="form-control my-2"
                            id="customer-name"
                            size="small"
                            // required
                            value={closingQuantity}
                            onChange={(e) => setClosingQuantity(e.target.value)}
                            label="Clossing Quantity"
                          />
                          <TextField
                            type="text"
                            className="form-control my-2"
                            id="customer-name"
                            size="small"
                            // required
                            value={barcode}
                            onChange={(e) => setBarcode(e.target.value)}
                            label="Barcode"
                          />
                          <TextField
                            type="text"
                            className="form-control my-2"
                            id="customer-name"
                            size="small"
                            // required
                            value={sellingPrice}
                            onChange={(e) => setSellingPrice(e.target.value)}
                            label="Selling Price"
                          />
                          <TextField
                            type="text"
                            className="form-control my-2"
                            id="customer-name"
                            size="small"
                            // required
                            value={recevedQty}
                            onChange={(e) => setRecevedQty(e.target.value)}
                            label="Received Qty"
                          />
                          <TextField
                            type="text"
                            className="form-control my-2"
                            id="customer-name"
                            size="small"
                            // required
                            value={stockQty}
                            onChange={(e) => setStockQty(e.target.value)}
                            label="Stock Quantity"
                          />

                          {/* <TextField
                            type="text"
                            className="form-control my-2"
                            id="customer-name"
                            size="small"
                            // required
                            value={productCost}
                            onChange={(e) => setProductCost(e.target.value)}
                            label="Cost"
                          />
                          <TextField
                            type="text"
                            className="form-control my-2"
                            id="customer-name"
                            size="small"
                            // required
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            label="Cost"
                          /> */}
                          {/* ------------ */}

                          {/* {component} */}
                        </div>
                        {/* <div
                          className="d-flex flex-row"
                          style={{ width: "100%" }}
                        >
                          <div style={{ flex: 1, width: "100%" }}>
                            <button
                              style={{
                                width: "100%",
                                outline: "none",
                                border: "none",
                                padding: "10px",
                                backgroundColor: "#e2e2e2",
                                color: "#000",
                              }}
                              className=""
                            >
                              Cancel
                            </button>
                          </div>
                          <div style={{ flex: 1 }}>
                            <button
                              style={{
                                width: "100%",
                                outline: "none",
                                border: "none",
                                padding: "10px",
                                backgroundColor: "red",
                                color: "#fff",
                              }}
                              className=""
                            >
                              Save
                            </button>
                          </div>
                        </div> */}
                      </div>
                    </div>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
              

              <div className="mt-5 d-flex justify-content-center">
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
            </form>
            {/* </div>
        </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPurchase;
