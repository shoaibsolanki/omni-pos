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
import Select, { useStateManager } from "react-select";
import { AiOutlineDelete, AiOutlinePlus,AiOutlinePlusCircle } from "react-icons/ai";
import Flatpickr from "react-flatpickr";
import AddExpense from "./AddExpense";
import { BiEdit } from "react-icons/bi";
import UpdateExpense from "./UpdateExpense";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  handleExpenseCategoryDropdownRequest,
  handleExpenseCreateRequest,
  handleOpneMenuRequest,
} from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import moment from "moment";

const Expense = () => {
  const dispatch = useDispatch();
  const { expense_category_dropdown } = useSelector(
    (e) => e.ComponentPropsManagement
  );
  // const { expenseModalIsOpen, setExpenseModalIsOpen } = props;
  const [addExpenseModalIsOpen, setAddExpenseModalIsOpen] = useState(false);
  const [updateExpenseModalIsOpen, setUpdateExpenseModalIsOpen] =
    useState(false);
  const [updateItem, setUpdateItem] = useState("");
  const [updateIndexNumber, setUpdateIndexNumber] = useState("");
  const [addExpenseArr, setAddExpenseArr] = useState([]);
  const [expenseArr, setExpenseArr] = useState({
    category_name: "",
    expense_date: "",
    payment_mode: "",
    expense_notes: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...expenseArr,
      expense_date: moment(expenseArr.expense_date).format("Y-MM-DD"),
      add_expenses: addExpenseArr,
    };
    dispatch(handleExpenseCreateRequest(payload));
    setTimeout(() => {
      setExpenseArr({
        category_name: "",
        expense_date: "",
        payment_mode: "",
        expense_notes: "",
      });
      setAddExpenseArr([]);
      // setExpenseModalIsOpen(!expenseModalIsOpen);
    }, 500);
  };

  useEffect(() => {
    dispatch(handleExpenseCategoryDropdownRequest());
  }, []);

  return (
    <>
  <div className="container"
                style={{backgroundColor: "rgb(253, 238, 204)",height:"200vh"
                }}>
            
        <div className="row d-flex justify-content-center" styel={{height: "fit-content"}}>
          <div className="col-lg-5 col-md-10 col-sm-12 px-5">
     {/* <Modal
        isOpen={expenseModalIsOpen}
        toggle={() => {
          setExpenseModalIsOpen(!expenseModalIsOpen);
        }}
      > */}
        {/* <ModalHeader> */}
         
        {/* </ModalHeader> */}
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
              <h4  style={{fontFamily:"bold", marginLeft: "10px"}}>Create Expense</h4>
             </div>

          <ModalBody>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label>
                    Select Category <span className="text-red"> * </span>
                  </Label>
                  <Select
                  styles={{
                    menu: (baseStyles, state) => ({
                      ...baseStyles,
                      // height: "50px",
                      overflow: "auto",
                      fontWeight: "900",
                    }),
                    option: (baseStyles, state) => ({
                      ...baseStyles,
                      height: "50px",
                      fontWeight: "900",
                      overflow: "auto",
                    }),
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      // height: "50px",
                      fontWeight: "900",
                      // overflow: "auto",
                    }),
                  }}
                    options={expense_category_dropdown}
                    onChange={(e) => {
                      const val = e.value;
                      setExpenseArr({ ...expenseArr, category_name: val });
                    }}
                    value={expense_category_dropdown.filter(
                      (io) => io.value === expenseArr.category_name
                    )}
                    required={true}
                    placeholder="Select Category"
                  />
                </FormGroup>
              </Col>

              <Col md={12}>
                <FormGroup>
                  <Label>
                    Expense Date <span className="text-red"> * </span>
                  </Label>
                  <Flatpickr

                  style={{  fontStyle: 'italic',
                  fontFamily: 'Arial, sans-serif',}}
                    className="form-control"
                    onChange={(e) => {
                      const d = e[0];
                      setExpenseArr({ ...expenseArr, expense_date: d });
                    }}
                    options={{ allowInput: true, dateFormat: "d-M-Y" }}
                    value={expenseArr.expense_date}
                    required={true}
                    placeholder="Select Date"
                  />
                </FormGroup>
              </Col>

              <Col md={12}>
                <FormGroup>
                  <Label>
                    Payment Mode <span className="text-red"> * </span>
                  </Label>
                  <div className="d-flex">
                    <div className="me-4">
                      <Input
                        type="radio"
                        className="me-2 mouse-pointer"
                        id="online-radio"
                        onChange={(e) => {
                          setExpenseArr({
                            ...expenseArr,
                            payment_mode: "online",
                          });
                        }}
                        checked={expenseArr.payment_mode === "online"}
                        name="payment-mode"
                      />
                      <Label htmlFor="online-radio" className="mouse-pointer">
                        Online
                      </Label>
                    </div>
                    <div className="me-4">
                      <Input
                        type="radio"
                        className="me-2 mouse-pointer"
                        id="cheque-radio"
                        onChange={(e) => {
                          setExpenseArr({
                            ...expenseArr,
                            payment_mode: "cheque",
                          });
                        }}
                        checked={expenseArr.payment_mode === "cheque"}
                        name="payment-mode"
                      />
                      <Label htmlFor="cheque-radio" className="mouse-pointer">
                        Cheque
                      </Label>
                    </div>
                    <div>
                      <Input
                        type="radio"
                        className="me-2 mouse-pointer"
                        id="cash-radio"
                        onChange={(e) => {
                          setExpenseArr({
                            ...expenseArr,
                            payment_mode: "cash",
                          });
                        }}
                        checked={expenseArr.payment_mode === "cash"}
                        name="payment-mode"
                      />
                      <Label htmlFor="cash-radio" className="mouse-pointer">
                        Cash
                      </Label>
                    </div>
                  </div>
                </FormGroup>
              </Col>
{/* 
              <Col md={12}>
                <FormGroup
                  style={{
                    fontWeight: "bolder",
                    color: "#0d6efd",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setAddExpenseModalIsOpen(!addExpenseModalIsOpen);
                  }}
                >
                  <AiOutlinePlus /> Add Expenses
                </FormGroup>
              </Col> */}

          
                 {addExpenseModalIsOpen && <div className="d-flex bg-white rounded-3 p-3"> <AddExpense
        addExpenseModalIsOpen={addExpenseModalIsOpen}
        setAddExpenseModalIsOpen={setAddExpenseModalIsOpen}
        addExpenseArr={addExpenseArr}
        setAddExpenseArr={setAddExpenseArr}
      /> </div>} 

           <div
                style={{ width: "100%" }}
                onClick={() => {
                  setAddExpenseModalIsOpen(!addExpenseModalIsOpen);
                }}
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

              {addExpenseArr.map((item, index) => {
                return (
                  <>
                    <Col md={12} key={index}>
                      <FormGroup>
                        <div className="d-flex justify-content-between">
                          <div>
                            <div>{item.expense_name}</div>
                            <div>₹{item.amount}</div>
                          </div>
                          <div className="d-flex my-auto">
                            <div className="me-3">
                              <BiEdit
                                color="blue"
                                size={23}
                                className="mouse-pointer"
                                onClick={() => {
                                  setUpdateExpenseModalIsOpen(
                                    !updateExpenseModalIsOpen
                                  );
                                  setUpdateItem(item);
                                  setUpdateIndexNumber(index);
                                }}
                              />
                            </div>
                            <div>
                              <AiOutlineDelete
                                color="red"
                                size={23}
                                onClick={() => {
                                  if (addExpenseArr.length > 1) {
                                    let removed = addExpenseArr.splice(
                                      index - 1,
                                      1
                                    );
                                    setAddExpenseArr(removed);
                                  } else {
                                    setAddExpenseArr([]);
                                  }
                                }}
                                className="mouse-pointer"
                              />
                            </div>
                          </div>
                        </div>
                      </FormGroup>
                      {addExpenseArr.length !== index + 1 && (
                        <>
                          <hr />
                        </>
                      )}
                    </Col>
                  </>
                );
              })}
              <Col md={12} className="mt-3">
                <FormGroup>
                  <Label>
                    Expense Notes <span className="text-red"> * </span>
                  </Label>
                  <Input
                  style={{   fontStyle: 'italic',
                  fontFamily: 'Arial, sans-serif',}}
                    type="textarea"
                    onChange={(e) => {
                      const val = e.target.value;
                      setExpenseArr({ ...expenseArr, expense_notes: val });
                    }}
                    value={expenseArr.expense_notes}
                    required={true}
                    rows={4}
                    placeholder="Enter Expense Notes"
                  />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
         
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
      
        </Form>
      {/* </Modal> */}

      <UpdateExpense
        updateExpenseModalIsOpen={updateExpenseModalIsOpen}
        setUpdateExpenseModalIsOpen={setUpdateExpenseModalIsOpen}
        addExpenseArr={addExpenseArr}
        setAddExpenseArr={setAddExpenseArr}
        updateItem={updateItem}
        setUpdateItem={setUpdateItem}
        updateIndexNumber={updateIndexNumber}
        setUpdateIndexNumber={setUpdateIndexNumber}
      />

          
          </div>
        </div>
      </div>
    


     
    </>
  );
};

export default Expense;
