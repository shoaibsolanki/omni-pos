import React, { useState, useEffect, useCallback } from 'react'
import { Button, Card, CardBody, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { handleGetHsnCodeDropdownRequest, handleCreateSaasMasterRequest } from "../../../../redux/actions-reducers/ComponentProps/ComponentPropsManagement"
import { useDispatch, useSelector } from 'react-redux'
import Select from "react-select"
import Flatpickr from "react-flatpickr";
import moment from 'moment'

import Modal from 'react-bootstrap/Modal';

function SaasModal(props) {
    const dispatch = useDispatch()
    //    const { hsn_code_dropdown, gst_type_dropdown } = useSelector(state => state.ComponentPropsManagement)
    const [saasId, setSaasId] = useState("")
    const [name, setName] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    // const debounce = (func) => {
    //     let timer;
    //     return function (...args) {
    //         const context = this;
    //         if (timer) clearTimeout(timer);
    //         timer = setTimeout(() => {
    //             timer = null;
    //             func.apply(context, args);
    //         }, 1000);
    //     };
    // };

    // const handleFunCall = () => {
    //     dispatch(handleGetHsnCodeDropdownRequest())
    // }

    // const optimizedFn = useCallback(debounce(handleFunCall), []);
    // useEffect(() => {
    //     optimizedFn()
    // }, [])

    const handleFormSubmit = (e) => {
        e.preventDefault()
        const obj = {
            saas_id: saasId,
            tax_name: name,
            start_date: moment(startDate).format("Y-MM-DD"),
            end_date: moment(endDate).format("Y-MM-DD")
        }
        dispatch(handleCreateSaasMasterRequest(obj))
    }

  

  return (
 
    <Modal   {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered>
    <Modal.Header closeButton>
      <Modal.Title>Saas Master</Modal.Title>
    </Modal.Header>
    <Card>
                <CardBody>
                    <Form onSubmit={handleFormSubmit}>
                        <Row>

                            <Col md={12}>
                                <FormGroup>
                                    <Label style={{
                                        color: "#000",

                                        fontFamily: "Segoe UI",
                                        fontSize: "24px",
                                        fontStyle: "normal",
                                        fontWeight: "600",
                                        lineHeight: "normal"
                                    }}>Saas Id <span className="text-red"> * </span></Label>

                                    {/* <Select
                                        options={hsn_code_dropdown}
                                        onChange={e => {
                                            setHsnCode(e.value)
                                        }}
                                        // value={hsn_code_dropdown.filter(e => e.value === hsnCode)}
                                        // required={true}
                                        placeholder='Enter Id'
                                    /> */}
                                    <Input
                                        type='text'
                                        onChange={e => {
                                            setSaasId(e.target.value)
                                        }}
                                        value={saasId}
                                        required={true}
                                        placeholder='Enter Id'
                                        style={{
                                            boxShadow: "0 2px 12px rgba(36, 36, 39, .12)",
                                            borderRadius: ".75rem",
                                            overflow: "hidden"
                                        }}
                                    />
                                </FormGroup>

                            </Col>

                            <Col md={12}>
                                <FormGroup>
                                    <Label style={{
                                        color: "#000",

                                        fontFamily: "Segoe UI",
                                        fontSize: "24px",
                                        fontStyle: "normal",
                                        fontWeight: "600",
                                        lineHeight: "normal"
                                    }}>Saas Name <span className="text-red"> * </span></Label>
                                    <Input
                                        type='text'
                                        onChange={e => {
                                            setName(e.target.value)
                                        }}
                                        value={name}
                                        required={true}
                                        placeholder='Enter Name'
                                        style={{
                                            boxShadow: "0 2px 12px rgba(36, 36, 39, .12)",
                                            borderRadius: ".75rem",
                                            overflow: "hidden"
                                        }}
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={12}>
                                <FormGroup>
                                    <Label style={{
                                        color: "#000",

                                        fontFamily: "Segoe UI",
                                        fontSize: "24px",
                                        fontStyle: "normal",
                                        fontWeight: "600",
                                        lineHeight: "normal"
                                    }}>Start Date <span className="text-red"> * </span></Label>
                                    <Flatpickr
                                        className='form-control'
                                        onChange={e => {
                                            setStartDate(e[0])
                                        }}
                                        options={{ allowInput: true, dateFormat: "d-M-Y" }}
                                        value={startDate}
                                        required={true}
                                        placeholder='Select Date'
                                        style={{
                                            boxShadow: "0 2px 12px rgba(36, 36, 39, .12)",
                                            borderRadius: ".75rem",
                                            overflow: "hidden"
                                        }}
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={12}>
                                <FormGroup>
                                    <Label style={{
                                        color: "#000",

                                        fontFamily: "Segoe UI",
                                        fontSize: "24px",
                                        fontStyle: "normal",
                                        fontWeight: "600",
                                        lineHeight: "normal"
                                    }}>End Date <span className="text-red"> * </span></Label>
                                    <Flatpickr
                                        className='form-control'
                                        onChange={e => {
                                            setEndDate(e[0])
                                        }}
                                        options={{ allowInput: true, dateFormat: "d-M-Y" }}
                                        value={endDate}
                                        required={true}
                                        placeholder='Select Date'
                                        style={{
                                            boxShadow: "0 2px 12px rgba(36, 36, 39, .12)",
                                            borderRadius: ".75rem",
                                            overflow: "hidden"
                                        }}
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={12}>
                                <FormGroup>
                                    <Label style={{
                                        color: "#000",

                                        fontFamily: "Segoe UI",
                                        fontSize: "24px",
                                        fontStyle: "normal",
                                        fontWeight: "600",
                                        lineHeight: "normal"
                                    }}>&nbsp;</Label>
                                    <div>
                                        <Button
                                            type='submit'
                                            style={{
                                                borderRadius: " 8px;",
                                                background: " #0067CE"
                                            }}
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card>

    
  </Modal>
  )
}

export default SaasModal