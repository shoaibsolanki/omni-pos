import React, { useState, useEffect } from 'react'
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import { HiOutlineArrowSmallLeft } from "react-icons/hi2"
import Select, { useStateManager } from 'react-select'
import { AiOutlinePlus } from "react-icons/ai"
import Flatpickr from "react-flatpickr";

const UpdateExpense = (props) => {
    const { updateExpenseModalIsOpen, setUpdateExpenseModalIsOpen, addExpenseArr, setAddExpenseArr, updateItem, setUpdateItem, setUpdateIndexNumber, updateIndexNumber } = props
    const [updateExpenseState, setUpdateExpenseState] = useState({
        expense_name: "",
        quantity: "",
        cost: "",
        amount: ""
    })

    useEffect(() => {
        setUpdateExpenseState(JSON.parse(JSON.stringify(updateItem)))
    }, [updateItem])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (addExpenseArr.length > 1) {
            let removed = addExpenseArr.splice(updateIndexNumber - 1, 1)
            removed.splice(updateIndexNumber, 0, updateExpenseState)
            setAddExpenseArr(removed)
        } else {
            setAddExpenseArr([...addExpenseArr, updateExpenseState])
        }
        setTimeout(() => {
            setUpdateExpenseState({
                expense_name: "",
                quantity: "",
                cost: "",
                amount: ""
            })
            setUpdateExpenseModalIsOpen(!updateExpenseModalIsOpen)
        }, 500);
    }

    return (<>
        <Modal
            isOpen={updateExpenseModalIsOpen}
            toggle={() => { setUpdateExpenseModalIsOpen(!updateExpenseModalIsOpen) }}
        >
            <ModalHeader>
                <HiOutlineArrowSmallLeft
                    className='mouse-pointer'
                    onClick={() => {
                        setUpdateExpenseModalIsOpen(!updateExpenseModalIsOpen)
                    }}
                />&nbsp;
                Add Expense
            </ModalHeader>
            <Form onSubmit={handleSubmit}>
                <ModalBody>
                    <Row>
                        <Col md={12}>
                            <FormGroup>
                                <Label>Enter Name <span className="text-red"> * </span></Label>
                                <Input
                                    type="text"
                                    onChange={e => {
                                        const val = e.target.value
                                        setUpdateExpenseState({ ...updateExpenseState, expense_name: val })
                                    }}
                                    value={updateExpenseState.expense_name}
                                    required={true}
                                    placeholder='Enter Name'
                                />
                            </FormGroup>
                        </Col>

                        <Col md={12}>
                            <FormGroup>
                                <Label>Enter Quantity <span className="text-red"> * </span></Label>
                                <Input
                                    type="number"
                                    onChange={e => {
                                        const val = e.target.value
                                        setUpdateExpenseState({ ...updateExpenseState, quantity: val })
                                    }}
                                    value={updateExpenseState.quantity}
                                    required={true}
                                    placeholder='Enter Quantity'
                                />
                            </FormGroup>
                        </Col>

                        <Col md={12}>
                            <FormGroup>
                                <Label>Enter Cost <span className="text-red"> * </span></Label>
                                <Input
                                    type="number"
                                    onChange={e => {
                                        const val = e.target.value
                                        setUpdateExpenseState({ ...updateExpenseState, cost: val })
                                    }}
                                    value={updateExpenseState.cost}
                                    required={true}
                                    placeholder='Enter Cost'
                                />
                            </FormGroup>
                        </Col>

                        <Col md={12}>
                            <FormGroup>
                                <Label>Enter Amount <span className="text-red"> * </span></Label>
                                <Input
                                    type="number"
                                    onChange={e => {
                                        const val = e.target.value
                                        setUpdateExpenseState({ ...updateExpenseState, amount: val })
                                    }}
                                    value={updateExpenseState.amount}
                                    required={true}
                                    placeholder='Enter Amount'
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button
                        type="submit"
                        color='primary'

                    >
                        Update
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
    </>)
}

export default UpdateExpense