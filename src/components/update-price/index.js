import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  handleRecommendedDataRequest,
  handleUpdatePriceRequest,
  handleOpneMenuRequest
} from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import AsyncSelect from "react-select/async";
import { BASE_Url } from "../../URL";
import { toast } from "react-toastify";

const UpdatePrice = ({ updatePriceModalIsOpen, setUpdatePriceModalIsOpen }) => {
  const dispatch = useDispatch();
  const { get_recommended_items, user_data } = useSelector(
    (e) => e.ComponentPropsManagement
  );
  const [defaultItemData, setDefaultItemData] = useState([]);
  const [itemObj, setItemObj] = useState({});
  useEffect(() => {
    if (get_recommended_items) {
      if (get_recommended_items.data && get_recommended_items.data.length > 0) {
        const d1 = get_recommended_items.data;
        if (d1) {
          if (d1.length > 0) {
            const arr = [];
            d1.map((item) => {
              arr.push({
                ...item,
                label: item.itemName,
                value: item.productId,
              });
            });
            setDefaultItemData(arr);
          }
        }
      }
    }
  }, [get_recommended_items]);

  const {
    createdAt,
    password,
    registerId,
    status,
    saasId,
    storeId,
    storeName,
    userId,
    userName,
  } = user_data ? user_data : {};
  const [updatePriceState, setUpdatePriceState] = useState({
    item_name: "",
    item_price: "",
    previous_price: "",
    effective_date: "",
    valid_upto: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...updatePriceState,
      effective_date: moment(updatePriceState.effective_date).format("Y-MM-DD"),
      valid_upto: moment(updatePriceState.valid_upto).format("Y-MM-DD"),
    };

    dispatch(handleUpdatePriceRequest(payload));
    setTimeout(() => {
      setUpdatePriceState({
        item_name: "",
        item_price: "",
        previous_price: "",
        effective_date: "",
        valid_upto: "",
      });
      // setUpdatePriceModalIsOpen(!updatePriceModalIsOpen);
    }, 1000);
  };

  useEffect(() => {
    if (itemObj) {
      setUpdatePriceState({
        ...updatePriceState,
        previous_price: itemObj.price,
      });
    }
  }, [itemObj]);

  const handleItemFilter = async (inputValue) => {
   
      const response = await fetch(
        `${BASE_Url}/search/get-result/${storeId}/${saasId}/${inputValue}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const jsonData = await response.json();
      if (jsonData) {
        if (jsonData.status === true) {
          const d1 = jsonData.data;
          if (d1) {
            if (d1.length > 0) {
              const arr = [];
              d1.map((item) => {
                arr.push({
                  ...item,
                  label: item.itemName,
                  value: item.productId,
                });
              });
              return arr;
            }
          }
          return [];
        }
        /* toast.error(jsonData.message); */
      } /* else {
        toast.error("Something went wrong server side");
      } */
    } /* catch (err) {
      console.log(err);
    }
  }; */

  // const handleRecommendedDataRequest = async () => {
  //     try {
  //         const response = await fetch(
  //             `${BASE_Url}/search/recommended-items/${storeId}/${saasId}`,
  //             {
  //                 method: "GET",
  //                 headers: {
  //                     "Content-Type": "application/json",
  //                 }
  //             }
  //         );
  //         const jsonData = await response.json();
  //         if (jsonData) {
  //             if (jsonData.data && jsonData.data?.length > 0) {
  //                 const d1 = jsonData.data;
  //                 if (d1) {
  //                     if (d1.length > 0) {
  //                         const arr = []
  //                         d1.map(item => {
  //                             arr.push({ ...item, label: item.itemName, value: item.productId })
  //                         })
  //                         return arr;
  //                     }
  //                 }
  //                 return []
  //             }
  //         } else {
  //             toast.error("Something went wrong")
  //         }
  //     } catch (err) {
  //         console.log(err)
  //     }
  // }

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

  useEffect(() => {
    dispatch(handleRecommendedDataRequest());
  }, []);

  return (
    <>
      {/* <Modal
        isOpen={updatePriceModalIsOpen}
        toggle={() => setUpdatePriceModalIsOpen(!updatePriceModalIsOpen)}
      > */}
        {/* <ModalHeader>
          <div>
            <HiOutlineArrowSmallLeft
              className="mouse-pointer"
              onClick={() => {
                setUpdatePriceModalIsOpen(!updatePriceModalIsOpen);
              }}
            />
            &nbsp; Update Price
          </div>
        </ModalHeader> */}
       
       <div className="container"
                style={{backgroundColor: "rgb(253, 238, 204)",height:"200vh"
                }}>
            
        <div className="row d-flex justify-content-center" styel={{height: "fit-content"}}>
          <div className="col-lg-5 col-md-10 col-sm-12 px-5">
        <Form onSubmit={handleSubmit}>
        <div className="d-flex mt-3">
             <Link
                  to="/"
                  type="submit"
                  className="text-decoration-none"
                  onClick={() => dispatch(handleOpneMenuRequest(false))}
                  style={{
                    color: "black",}}
                
                > <i className="fa-solid fa-chevron-left mt-1"></i></Link> 
              <h4  style={{fontFamily:"bold", marginLeft: "10px"}}> Update Price</h4>
             </div>
          <ModalBody>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label>
                    Item Name <span className="text-red"> * </span>
                  </Label>
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
                    placeholder="Select Item"
                  />
                </FormGroup>
              </Col>

              <Col md={12}>
                <FormGroup>
                  <Label>
                    Item Price <span className="text-red"> * </span>
                  </Label>
                  <Input
                    type="number"
                    onChange={(e) => {
                      const val = e.target.value;
                      setUpdatePriceState({
                        ...updatePriceState,
                        item_price: val,
                      });
                    }}
                    value={updatePriceState.item_price}
                    required={true}
                    placeholder="Enter Price"
                  />
                </FormGroup>
              </Col>

              <Col md={12}>
                <FormGroup>
                  <Label>
                    Previous Price <span className="text-red"> * </span>
                  </Label>
                  <Input
                    type="number"
                    onChange={(e) => {
                      const val = e.target.value;
                      setUpdatePriceState({
                        ...updatePriceState,
                        previous_price: val,
                      });
                    }}
                    value={updatePriceState.previous_price}
                    required={true}
                    placeholder="Enter Previous Price"
                  />
                </FormGroup>
              </Col>

              <Col md={12}>
                <FormGroup>
                  <Label>
                    Effective Date <span className="text-red"> * </span>
                  </Label>
                  <Flatpickr
                    className="form-control"
                    onChange={(e) => {
                      const val = e[0];
                      setUpdatePriceState({
                        ...updatePriceState,
                        effective_date: val,
                      });
                    }}
                    value={updatePriceState.effective_date}
                    options={{ allowInput: true, dateFormat: "d-M-Y" }}
                    required={true}
                    placeholder="Select Date"
                  />
                </FormGroup>
              </Col>

              <Col md={12}>
                <FormGroup>
                  <Label>
                    Valid Upto <span className="text-red"> * </span>
                  </Label>
                  <Flatpickr
                    className="form-control"
                    onChange={(e) => {
                      const val = e[0];
                      setUpdatePriceState({
                        ...updatePriceState,
                        valid_upto: val,
                      });
                    }}
                    value={updatePriceState.valid_upto}
                    options={{ allowInput: true, dateFormat: "d-M-Y" }}
                    required={true}
                    placeholder="Select Date"
                  />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <div className="w-100">
              <div className="d-flex justify-content-end">
              <Button color='primary' className='w-100 mt-2' type='submit'
                              style={{
                                backgroundColor:"var(--Acc-1, #457FD4)",
                                outline: "none",
                                border: "none",
                                fontSize: "14px",
                                padding: "10px ",
                                borderRadius: "10px",
                                color: "#fff",
                              }}>
                  Update
                </Button>
              </div>
            </div>
          </ModalFooter>
        </Form>
        </div>
        </div>
        </div>
      {/* </Modal> */}
    </>
  );
};

export default UpdatePrice;
