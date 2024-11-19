import React, { useState, useEffect } from "react";

import { AiOutlineArrowLeft, AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import God from "../assets/god.jpeg";
import noImg1 from "../assets/noImg1.png";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import noImg2 from "../assets/noImg2.png";
import { BsCreditCardFill, BsFillCheckCircleFill } from "react-icons/bs";
import {
  handleAddCartData,
  handleAddCartDataRequest,
  handlecartCount,
  handleRecommendedDataRequest,
} from "../redux/actions-reducers/ComponentProps/ComponentPropsManagement";

import { useDispatch, useSelector } from "react-redux";
import { BASE_Url } from "../URL";
import { Button } from "react-bootstrap";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import { toast } from "react-toastify";
import PaginationComponent from "../PaginationComponent";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {Image} from 'antd'
const Product = ({
  setSearchValue,
  data,
  setData,
  setUpdatecart,
  updatecart,
}) => {
  const { storeId, saasId ,userType} = JSON.parse(localStorage.getItem("User_data"));
  const { cart_data ,page_number} = useSelector((e) => e.ComponentPropsManagement);
  const [myPrice, setMyPrice] = useState({ productId: "", price: "" });
  const [showButton, setShowButton] = useState(true);
  const [pcsPrice, setpcsPrice] = useState(false)
  const [price, setPrice] = useState(false)
  const [selecteditem, setSelecteditem] = useState()
  // const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  // console.log("PRODUCT CART DATA", item);
  const navigate = useNavigate();
  useEffect(() => {
    const el = JSON.parse(localStorage.getItem("my-cart"));
    if (el) {
      dispatch(handlecartCount(el?.length));
    } else {
      dispatch(handlecartCount(0));
    }
    console.log("this is element from product.js", el)
  }, []);


  // useEffect(() => {

  // });

  // console.log("USER DATA", userData.userId);
  const handlePcsprice =(item)=>{
    setSelecteditem(item)
    setPrice(false)
    setpcsPrice(true)
  }
  const handlePrice =(item)=>{
    setSelecteditem(item)
   setpcsPrice(false)
   setPrice(true)
  }
  // <-------------Modal work ------------->
  const [open, setopen] = useState(false)
  const [description, setDescriptio] = useState("")
  const style = {
    position: 'absolute',
    overflow:"scroll",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height:"fit-content",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const titleStyle = {
    fontSize: '10px',
    fontWeight: 'bold',
    color: 'blue',
    textTransform: 'uppercase',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', // Add a shadow
    backgroundColor: 'lightgray', // Add a background color
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: "pointer"
  };

  const stylecss={
    boxShadow:"4px 4px 10px 0px rgba(0, 0, 0, 0.25)",
    borderRadius:"4px",
    background:"white",
    color:"black",
    border:"0px"
  }
  return (
    <>
      {" "}
      <h5
        // className="my-3"
        style={{
          fontWeight: "bold",
          padding: 0,
          margin: 0,
          // display: searchValue?.length ? "none" : "block",s
        }}
        onClick={() => { console.log("this is producte page 🤷‍♀️🤷‍♀️🤷‍♀️") }}
      >
        Recommended Items
      </h5>
      <div 
        className="Repeatcard d-grid"
        style={{
          // display: "flex",
          // display: "grid",
          // gridTemplateColumns: "repeat(3,1fr)",
          // placeItems: "center",
          // alignItems: "center",
          // justifyContent: "center",
          // flexDirection: "row",
          // flexWrap: "wrap",
        }}
      >
        {data?.map((item) => (
          <div
            class="card  m-2"
            style={
              stylecss}
          >
            <div className="d-flex justify-content-center"
              style={{
                height: "200px",
                width: "100%",
                backgroundAttachment: "fixed",
                backgroundRepeat: "no-repeat",
                objectFit: "cover",
                backgroundPosition: "center",
              }}
            >
              <Image
                style={{
                  height: "100%",
                  width: "100%",
                  backgroundPosition: "center",
                  // borderTopRightRadius:"20px",
                  // borderTopLeftRadius:"20px"
                }}
                className="cardCategory"
                src={`${BASE_Url}/item/get-image/${item && item.item_id}`}
                // class="card-img-top"
                alt="..."
              />
            </div>
            <div class="card-body p-0" >
             {item.special_description&& <span className="m-2" style={titleStyle} onClick={()=>{setopen(true);setDescriptio(item.special_description)}}>*Detail*</span>}
              <h5 class="card-title m-2 fw-bold" style={{  fontFamily: "Roboto",
                        fontSize: "17px",
                        fontStyle: "normal",
                        fontWeight: "700",
                        lineHeight: "normal",
                
                      }}>{item.item_name}</h5>
              {Number(item.price) === 0 ? (
                <>
                  <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                    <InputLabel>Amount</InputLabel>
                    <OutlinedInput
                      type="number"
                      size="small"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          item.price = item.new_price;
                          setData([...data]);
                        }
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                          disabled={!item.new_price}
                            // aria-label="toggle password visibility"
                            onClick={() => {
                              if(userType==="GUEST"){
                                navigate(`/${saasId}/${storeId}`)
                                localStorage.clear();
                              }else{
                              // toast.success("Item Added");
                              item.price = item.new_price;
                              setData([...data]);
                              const el = JSON.parse(localStorage.getItem("my-cart"));
                              if (el) {
                                if (el?.length > 0) {
                                  let flag = 0;
                                  el.map((el1) => {
                                    console.log("this is el1", el1)
                                    if (
                                      el1.productId === item.productId &&
                                      el1.item_name === item.item_name
                                    ) {
                                      if (el1.price === item.price) {
                                        el1.productQty = el1.productQty + 1;
                                        flag = 1;
                                      } else {
                                        item["discount_menu_is_open"] = false;
                                        item["discount_value"] = "";
                                        item["amount_value"] = "";
                                        item["new_price"] =
                                          Number(item.price) * Number(item.productQty);
                                        item["zero_price"] =
                                          Number(item.price) * Number(item.productQty);
                                        const c = localStorage.setItem(
                                          "my-cart",
                                          JSON.stringify([...el, item])
                                        );
                                      }
                                    }
                                  });
                                  el.map((item) => {
                                    item["discount_menu_is_open"] = false;
                                    item["discount_value"] = "";
                                    item["amount_value"] = "";
                                    item["new_price"] =
                                      Number(item.price) * Number(item.productQty);
                                    item["zero_price"] =
                                      Number(item.price) * Number(item.productQty);
                                  });
                                  localStorage.setItem("my-cart", JSON.stringify(el));
                                  if (flag === 0) {
                                    item["discount_menu_is_open"] = false;
                                    item["discount_value"] = "";
                                    item["amount_value"] = "";
                                    item["new_price"] =
                                      Number(item.price) * Number(item.productQty);
                                    item["zero_price"] =
                                      Number(item.price) * Number(item.productQty);
                                    localStorage.setItem(
                                      "my-cart",
                                      JSON.stringify([...el, item])
                                    );
                                  }
                                  dispatch(handlecartCount([...el, item]?.length));
                                } else {
                                  item["discount_menu_is_open"] = false;
                                  item["discount_value"] = "";
                                  item["amount_value"] = "";
                                  item["new_price"] =
                                    Number(item.price) * Number(item.productQty);
                                  item["zero_price"] =
                                    Number(item.price) * Number(item.productQty);
                                  localStorage.setItem("my-cart", JSON.stringify([item]));
                                  dispatch(handlecartCount(1));
                                }
                              } else {
                                item["discount_menu_is_open"] = false;
                                item["discount_value"] = "";
                                item["amount_value"] = "";
                                item["new_price"] =
                                  Number(item.price) * Number(item.productQty);
                                item["zero_price"] =
                                  Number(item.price) * Number(item.productQty);
                                localStorage.setItem("my-cart", JSON.stringify([item]));
                                dispatch(handlecartCount(1));
                              }

                              setUpdatecart(!updatecart);
                              setSearchValue("");
                              // window.location.reload();
                            }

                              // console.log("this is new pice",item.new_price)
                          }

                            }
                            edge="end"
                          >
                            <BsFillCheckCircleFill
                              color={
                                item.new_price === "" || item.new_price === 0
                                  ? "#979797"
                                  : "green"
                              }
                            />
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Amount"
                      className="w-50"
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val) {
                          console.log("this is value of inpute", val)
                          setMyPrice({
                            productId: item.productId,
                            price: Number(val),

                          });
                          item.new_price = Number(val);
                          // setMyPrice(Number(val))
                        } else {
                          item.new_price = "";
                          setMyPrice({
                            productId: item.productId,
                            price: val,
                          });
                          // setMyPrice(val)
                        }
                        // setData([...data])
                      }}
                      value={
                        item.productId === myPrice.productId
                          ? myPrice.price
                          : ""
                      }
                    />
                  </FormControl>
                </>
              ) : (
                <>
                   {item.price_pcs==0||null? 
                  <p  style={{ fontWeight: "400" }} className="m-2">
                   <span>{saasId !== 15 ? "Rs." : "रु."}</span>
                    <span className="fw-bold" style={{ fontFamily: "Archivo, serif",
                        fontSize: "17px",
                       
                       }}>{item.price}</span>
                   {item.actual_price && <> <span  style={{  textDecorationLine: "line-through",marginLeft: 5,fontSize: 10, fontWeight: "100" }}>{saasId !== 15 ? "Rs." : "रु."}</span>
                    <span style={{  textDecorationLine: "line-through" ,fontWeight: "100",fontSize: 10 }}>{item.actual_price}</span>
                    <span style={{ marginLeft: 5, fontWeight: "600",fontSize: 10,
                  background: "#b2ebb2",
                  padding:"3px",
                  borderRadius: "5px"
                  }}>{item.discount}% OFF</span></>}
                    </p>
                    :
                    <div className="fw-bold" >
                      <div>
                    <input type="checkbox" key={item.productId} checked={item.item_id ==selecteditem?.item_id?pcsPrice:false} onChange={()=>{handlePcsprice(item)}} ></input>
                    <span className="fw-bold text-nowrap" style={{fontFamily: "Roboto",
                    fontSize: "15px",
                    fontStyle: "normal",
                    fontWeight: "700",
                    lineHeight: "normal",}}>Add by Piece({item.price_pcs}/Piece )</span>
                      </div>
                      <div>
                    <input type="checkbox" key={item.productId} checked={item.item_id ==selecteditem?.item_id?price:false} onChange={()=>{handlePrice(item)}}></input>
                    <span className="fw-bold text-nowrap"  style={{fontFamily: "Roboto",
                    fontSize: "15px",
                    fontStyle: "normal",
                    fontWeight: "700",
                    lineHeight: "normal",}}>Add by {item?.UOM} ({item.price}/{item?.UOM})</span>
                      </div>
                    </div>

                    }
                </>
              )}
              {/* <a href="#" class="btn btn-sm btn-warning">
                Add to Cart
              </a> */}
              
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  alignItems: "center",
                  // justifyContent: "flex-end",
                }}
              >
                <div
                  style={{
                    display:
                      item.price === 0 || item.price === 0 ? "none" : "block",
                      width:"100%"
                  }}
                  onClick={() => {
                    
                        if(item.price_pcs !== 0 || undefined){
                          console.log("ye true kese askta h bhai saab ",item.price_pcs)
                        if (selecteditem) {
                          if (pcsPrice) {
                            console.log("selected item", selecteditem)
                          // toast.success("Item Added");
                          Swal.fire({
                            icon: 'success',
                            title: 'Item Added',
                            showConfirmButton: false,
                            timer: 1500
                          })
                          const el = JSON.parse(localStorage.getItem("my-cart"));
                          if (el) {
                            console.log("cart me kuch toh pada hai", el)
                            if (el?.length > 0) {
                              let flag = 0;
                              el.map((el1) => {
                                console.log("this add to cart 😘😘😘😘😘😘", el1)
                                if (
                                  el1.productId === selecteditem.productId &&
                                  el1.item_name === selecteditem.item_name
                                ) {
                                  if (el1.price === selecteditem.price_pcs ) {
                                    el1.productQty = el1.productQty + 1;
                                    flag = 1;
                                  } else {
                                    selecteditem["discount_menu_is_open"] = false;
                                    selecteditem["discount_value"] = "";
                                    selecteditem["amount_value"] = "";
                                    selecteditem["new_price"] =
                                      Number(selecteditem.price_pcs) * Number(selecteditem.productQty);
                                    selecteditem["price"] =
                                      Number(selecteditem.price_pcs) * Number(selecteditem.productQty);
                                      selecteditem["zero_price"] =
                                      Number(selecteditem.price_pcs) * Number(selecteditem.productQty);
                                    const c = localStorage.setItem(
                                      "my-cart",
                                      JSON.stringify([...el, selecteditem])
                                    );
                                  }
                                }
                              });
                              el.map((item) => {
                                
                                item["discount_menu_is_open"] = false;
                                item["discount_value"] = "";
                                item["amount_value"] = "";
                                item["new_price"] =
                                  Number(item.price) * Number(item.productQty);
                                  selecteditem["price"] =
                                  Number(selecteditem.price_pcs) * Number(selecteditem.productQty);
                                item["zero_price"] =
                                  Number(item.price) * Number(item.productQty);
                                  
                                  localStorage.setItem("my-cart", JSON.stringify(el));
                              });
                              if (flag === 0) {
                                
                                selecteditem["discount_menu_is_open"] = false;
                                selecteditem["discount_value"] = "";
                                selecteditem["amount_value"] = "";
                                selecteditem["new_price"] =
                                  Number(selecteditem.price_pcs) * Number(selecteditem.productQty);
                                selecteditem["price"] =
                                  Number(selecteditem.price_pcs) * Number(selecteditem.productQty);
                                  selecteditem["zero_price"] =
                                  Number(selecteditem.price_pcs) * Number(selecteditem.productQty);
                                localStorage.setItem(
                                  "my-cart",
                                  JSON.stringify([...el, selecteditem])
                                );
                                console.log("this run" , selecteditem)
                              }
                              dispatch(handlecartCount([...el, selecteditem]?.length));
                              dispatch(handleRecommendedDataRequest(page_number))
                            } else {
                              selecteditem["discount_menu_is_open"] = false;
                              selecteditem["discount_value"] = "";
                              selecteditem["amount_value"] = "";
                              selecteditem["new_price"] =
                                Number(selecteditem.price_pcs) * Number(selecteditem.productQty);
                                selecteditem["zero_price"] =
                                Number(selecteditem.price_pcs) * Number(selecteditem.productQty);
                              localStorage.setItem("my-cart", JSON.stringify([selecteditem]));
                              dispatch(handlecartCount(1));
                              dispatch(handleRecommendedDataRequest(page_number))
                            }
                          } else {
                            console.log("this item 🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️", selecteditem)
                            selecteditem["discount_menu_is_open"] = false;
                            selecteditem["discount_value"] = "";
                            selecteditem["amount_value"] = "";
                            selecteditem["new_price"] =
                              Number(selecteditem.price_pcs) * Number(selecteditem.productQty);
                            selecteditem["price"] =
                              Number(selecteditem.price_pcs) * Number(selecteditem.productQty);
                              selecteditem["zero_price"] =
                              Number(selecteditem.price_pcs) * Number(selecteditem.productQty);
                            localStorage.setItem("my-cart", JSON.stringify([selecteditem]));
                            dispatch(handlecartCount(1));
                            dispatch(handleRecommendedDataRequest(page_number))
                          }
      
                          setUpdatecart(!updatecart);
                          setSearchValue("");
                          }else if (price) {
                            console.log("selected item", selecteditem)
                          // toast.success("Item Added");
                          Swal.fire({
                            icon: 'success',
                            title: 'Item Added',
                            showConfirmButton: false,
                            timer: 1500
                          })
                          const el = JSON.parse(localStorage.getItem("my-cart"));
                          if (el) {
                            console.log("cart me kuch toh pada hai", el)
                            if (el?.length > 0) {
                              let flag = 0;
                              el.map((el1) => {
                                console.log("this add to cart 😘😘😘😘😘😘", el1)
                                if (
                                  el1.productId === selecteditem.productId &&
                                  el1.item_name === selecteditem.item_name
                                ) {
                                  if (el1.price === selecteditem.price ) {
                                    el1.productQty = el1.productQty + 1;
                                    flag = 1;
                                  } else {
                                    selecteditem["discount_menu_is_open"] = false;
                                    selecteditem["discount_value"] = "";
                                    selecteditem["amount_value"] = "";
                                    selecteditem["new_price"] =
                                      Number(selecteditem.price) * Number(selecteditem.productQty);
                                      selecteditem["zero_price"] =
                                      Number(selecteditem.price) * Number(selecteditem.productQty);
                                    const c = localStorage.setItem(
                                      "my-cart",
                                      JSON.stringify([...el, selecteditem])
                                    );
                                  }
                                }
                              });
                              el.map((item) => {
                                item["discount_menu_is_open"] = false;
                                item["discount_value"] = "";
                                item["amount_value"] = "";
                                item["new_price"] =
                                  Number(item.price) * Number(item.productQty);
                                item["zero_price"] =
                                  Number(item.price) * Number(item.productQty);
                              });
                              localStorage.setItem("my-cart", JSON.stringify(el));
                              if (flag === 0) {
                                selecteditem["discount_menu_is_open"] = false;
                                selecteditem["discount_value"] = "";
                                selecteditem["amount_value"] = "";
                                selecteditem["new_price"] =
                                  Number(selecteditem.price) * Number(selecteditem.productQty);
                                  selecteditem["zero_price"] =
                                  Number(selecteditem.price) * Number(selecteditem.productQty);
                                localStorage.setItem(
                                  "my-cart",
                                  JSON.stringify([...el, selecteditem])
                                );
                              }
                              dispatch(handlecartCount([...el, selecteditem]?.length));
                              dispatch(handleRecommendedDataRequest(page_number))
                            } else {
                              selecteditem["discount_menu_is_open"] = false;
                              selecteditem["discount_value"] = "";
                              selecteditem["amount_value"] = "";
                              selecteditem["new_price"] =
                                Number(selecteditem.price) * Number(selecteditem.productQty);
                                selecteditem["zero_price"] =
                                Number(selecteditem.price) * Number(selecteditem.productQty);
                              localStorage.setItem("my-cart", JSON.stringify([selecteditem]));
                              dispatch(handlecartCount(1));
                              dispatch(handleRecommendedDataRequest(page_number))
                            }
                          } else {
                            console.log("this item 🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️", selecteditem)
                            selecteditem["discount_menu_is_open"] = false;
                            selecteditem["discount_value"] = "";
                            selecteditem["amount_value"] = "";
                            selecteditem["new_price"] =
                              Number(selecteditem.price) * Number(selecteditem.productQty);
                              selecteditem["zero_price"] =
                              Number(selecteditem.price) * Number(selecteditem.productQty);
                            localStorage.setItem("my-cart", JSON.stringify([selecteditem]));
                            dispatch(handlecartCount(1));
                            dispatch(handleRecommendedDataRequest(page_number))
                          }
      
                          setUpdatecart(!updatecart);
                          setSearchValue("");
                          }
                          
                        } else{
                          Swal.fire({
                            icon: 'error',
                            title: 'Please selecte right price',
                            showConfirmButton: false,
                            timer: 1500
                          })
                          // toast.error("Please selecte right price");
                        }
                      } else {
                          // toast.success("Item Added");
                          Swal.fire({
                            icon: 'success',
                            title: 'Item Added',
                            showConfirmButton: false,
                            timer: 1500
                          })
                          const el = JSON.parse(localStorage.getItem("my-cart"));
                          if (el) {
                            console.log("cart me kuch toh pada hai", el)
                            if (el?.length > 0) {
                              let flag = 0;
                              el.map((el1) => {
                                console.log("this add to cart 😘😘😘😘😘😘", el1)
                                if (
                                  el1.productId === item.productId &&
                                  el1.item_name === item.item_name
                                ) {
                                  if (el1.price === item.price) {
                                    el1.productQty = el1.productQty + 1;
                                    flag = 1;
                                    
                                  } else {
                                    
                                    item["discount_menu_is_open"] = false;
                                    item["discount_value"] = "";
                                    item["amount_value"] = "";
                                    item["new_price"] =
                                      Number(item.price) * Number(item.productQty);
                                    item["zero_price"] =
                                      Number(item.price) * Number(item.productQty);
                                    const c = localStorage.setItem(
                                      "my-cart",
                                      JSON.stringify([...el, item])
                                    );
                                  }
                                }
                              });
                              el.map((item) => {
                               
                                item["discount_menu_is_open"] = false;
                                item["discount_value"] = "";
                                item["amount_value"] = "";
                                item["new_price"] =
                                  Number(item.price) * Number(item.productQty);
                                item["zero_price"] =
                                  Number(item.price) * Number(item.productQty);
                              });
                              localStorage.setItem("my-cart", JSON.stringify(el));
                              if (flag === 0) {
                                console.log("add NEW ITEM")
                                item["discount_menu_is_open"] = false;
                                item["discount_value"] = "";
                                item["amount_value"] = "";
                                item["new_price"] =
                                  Number(item.price) * Number(item.productQty);
                                item["zero_price"] =
                                  Number(item.price) * Number(item.productQty);
                                localStorage.setItem(
                                  "my-cart",
                                  JSON.stringify([...el, item])
                                );
                              }
                              dispatch(handlecartCount([...el, item]?.length));
                            } else {
                              
                              item["discount_menu_is_open"] = false;
                              item["discount_value"] = "";
                              item["amount_value"] = "";
                              item["new_price"] =
                                Number(item.price) * Number(item.productQty);
                              item["zero_price"] =
                                Number(item.price) * Number(item.productQty);
                              localStorage.setItem("my-cart", JSON.stringify([item]));
                              dispatch(handlecartCount(1));
                            }
                          } else {
                            console.log("this item 🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️", item)
                            item["discount_menu_is_open"] = false;
                            item["discount_value"] = "";
                            item["amount_value"] = "";
                            item["productQty"] = Number(item.product_qty);
                            item["new_price"] =
                              Number(item.price) * Number(item.productQty);
                            item["zero_price"] =
                              Number(item.price) * Number(item.productQty);
                            localStorage.setItem("my-cart", JSON.stringify([item]));
                            dispatch(handlecartCount(1));
                          }
      
                          setUpdatecart(!updatecart);
                          setSearchValue("");
                        }
                    
                    // window.location.reload();
                  }
                  }
                >
                  <Button
                    size="sm"
                    // variant={`${item.price === 0 ? "secondary" : "warning"}`}
                    variant={`warning`}
                    style={{
                    
                      display: item.price === 0 ? "hidden" : "block",
                      position: "relative",
                     
                      appearance: "none",
                      overflow: "hidden",
                      outline: "0px",
                      borderWidth: "1px",
                      borderStyle: "solid",
                      cursor: "pointer",
                      fontFamily: "sans-serif",
                      fontWeight: "bold",
                      backgroundColor: "#ffc107",
                      color: "black",
                      border: "1px solid transparent",
                      padding: "10px",
                      fontSize: "14px",
                      lineHeight: "20px",
                      textTransform: "uppercase",
                      width: "100%"
                    }}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <PaginationComponent filterdetails={data} /> */}
      <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={()=>setopen(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
        <p>{description}</p>
{/* <Button className="mt-8 mb-2 items-center px-1 ml-3 fw-bold"
 onClick={()=>
  {handlePrint();
 handleClose();}}>Print</Button> */}
<Button className="mt-8 mb-2 items-center px-1 ml-3 fw-bold" onClick={()=>setopen(false)}>Close</Button>

        </Box>
      </Fade>
    </Modal>
    </>
  );
};

export default Product;