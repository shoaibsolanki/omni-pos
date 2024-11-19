import React, { useState } from 'react'
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import { HiOutlineArrowSmallLeft } from "react-icons/hi2"
import Select, { useStateManager } from 'react-select'
import { AiOutlinePlus } from "react-icons/ai"
import Flatpickr from "react-flatpickr";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {

  handleOpneMenuRequest,
} from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";

const AddExpense = (props) => {
    const dispatch = useDispatch();
    const { addExpenseModalIsOpen, setAddExpenseModalIsOpen, addExpenseArr, setAddExpenseArr } = props
    const [addExpenseState, setAddExpenseState] = useState({
        expense_name: "",
        quantity: "",
        cost: "",
        amount: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        setAddExpenseArr([...addExpenseArr, addExpenseState])
        // setTimeout(() => {
            setAddExpenseState({
                expense_name: "",
                quantity: "",
                cost: "",
                amount: ""
            })
            // setAddExpenseModalIsOpen(!addExpenseModalIsOpen)
        // }, 500);
    }

    return (<>
        {/* <Modal
            isOpen={addExpenseModalIsOpen}
            toggle={() => { setAddExpenseModalIsOpen(!addExpenseModalIsOpen) }}
        >
            <ModalHeader>
                <HiOutlineArrowSmallLeft
                    className='mouse-pointer'
                    onClick={() => {
                        setAddExpenseModalIsOpen(!addExpenseModalIsOpen)
                    }}
                />&nbsp;
                Add Expense
            </ModalHeader> */}
            <Form >
                {/* <ModalBody> */}
                    <Row>
                        <Col md={12}>
                            <FormGroup>
                                <Label>Enter Name <span className="text-red"> * </span></Label>
                                <Input

                                style={{fontStyle: 'italic',
                                fontFamily: 'Arial, sans-serif',}}
                                    type="text"
                                    onChange={e => {
                                        const val = e.target.value
                                        setAddExpenseState({ ...addExpenseState, expense_name: val })
                                    }}
                                    value={addExpenseState.expense_name}
                                    required={true}
                                    placeholder='Enter Name'
                                />
                            </FormGroup>
                        </Col>

                        <Col md={12}>
                            <FormGroup>
                                <Label>Enter Quantity <span className="text-red"> * </span></Label>
                                <Input
                                
                                style={{fontStyle: 'italic',
                                fontFamily: 'Arial, sans-serif',}}
                                    type="number"
                                    onChange={e => {
                                        const val = e.target.value
                                        setAddExpenseState({ ...addExpenseState, quantity: val })
                                    }}
                                    value={addExpenseState.quantity}
                                    required={true}
                                    placeholder='Enter Quantity'
                                />
                            </FormGroup>
                        </Col>

                        <Col md={12}>
                            <FormGroup>
                                <Label>Enter Cost <span className="text-red"> * </span></Label>
                                <Input
                                
                                style={{fontStyle: 'italic',
                                fontFamily: 'Arial, sans-serif',}}
                                    type="number"
                                    onChange={e => {
                                        const val = e.target.value
                                        setAddExpenseState({ ...addExpenseState, cost: val })
                                    }}
                                    value={addExpenseState.cost}
                                    required={true}
                                    placeholder='Enter Cost'
                                />
                            </FormGroup>
                        </Col>

                        <Col md={12}>
                            <FormGroup>
                                <Label>Enter Amount <span className="text-red"> * </span></Label>
                                <Input
                                
                                style={{fontStyle: 'italic',
                                fontFamily: 'Arial, sans-serif',}}
                                    type="number"
                                    onChange={e => {
                                        const val = e.target.value
                                        setAddExpenseState({ ...addExpenseState, amount: val })
                                    }}
                                    value={addExpenseState.amount}
                                    required={true}
                                    placeholder='Enter Amount'
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                {/* </ModalBody> */}
                <div className="mt-3 d-flex justify-content-center">
                <button
                onClick={(e)=>handleSubmit(e)}
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
                  Add
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
    </>)
}

export default AddExpense