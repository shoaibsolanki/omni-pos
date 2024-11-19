import React, { useState, useEffect, useCallback } from 'react'
import { Button, Card, CardBody, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { handleGetHsnCodeDropdownRequest, handleCreateTaxMasterRequest } from "../../../../redux/actions-reducers/ComponentProps/ComponentPropsManagement"
import { useDispatch, useSelector } from 'react-redux'
import Select from "react-select"
import Flatpickr from "react-flatpickr";
import moment from 'moment'
import Modal from 'react-bootstrap/Modal';

function TaxModal(props) {
    const dispatch = useDispatch()
    const { hsn_code_dropdown, gst_type_dropdown } = useSelector(state => state.ComponentPropsManagement)
    const [hsnCode, setHsnCode] = useState("")
    const [gstType, setGstType] = useState("")
    const [taxDescription, setTaxDescription] = useState("")
    const [effectiveFrom, setEffectiveFrom] = useState("")
    const [endDate, setEndDate] = useState("")

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

    const handleFunCall = () => {
        dispatch(handleGetHsnCodeDropdownRequest())
    }

    const optimizedFn = useCallback(debounce(handleFunCall), []);
    const id = localStorage.getItem('activeTab')
    useEffect(() => {
        if (id == 5) {
            optimizedFn()
        }
    }, [id])

    const handleFormSubmit = (e) => {
        e.preventDefault()
        const obj = {
            hsn_code: hsnCode,
            tax_desc: taxDescription,
            effective_from: moment(effectiveFrom).format("Y-MM-DD"),
            end_date: moment(endDate).format("Y-MM-DD")
        }
        dispatch(handleCreateTaxMasterRequest(obj))
    }
  return (
 
    <Modal   {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered>
    <Modal.Header closeButton>
      <Modal.Title>Tax</Modal.Title>
    </Modal.Header>
    <Card>
                <CardBody>
                    <Form onSubmit={handleFormSubmit}>
                        <Row className='fw-bold'>
                            {/* <Col md={12}>
                                <FormGroup>
                                    <Label>Select GST Type <span className="text-red"> * </span></Label>
                                    <Select
                                        options={gst_type_dropdown}
                                        onChange={e => {
                                            setGstType(e.value)
                                        }}
                                        value={gst_type_dropdown.filter(io => io.value === gstType)}
                                        required={true}
                                        placeholder="Select Gst Type"
                                    />
                                </FormGroup>
                            </Col> */}
                            <Col md={12}>
                                <FormGroup>
                                    <Label style={{
                                        color: "#000",

                                        fontFamily: "Segoe UI",
                                        fontSize: "24px",
                                        fontStyle: "normal",
                                        fontWeight: "600",
                                        lineHeight: "normal"
                                    }}>HSN Code <span className="text-red"> * </span></Label>

                                    <Select
                                        options={hsn_code_dropdown}
                                        onChange={e => {
                                            setHsnCode(e.value)
                                        }}
                                        value={hsn_code_dropdown.filter(e => e.value === hsnCode)}
                                        required={true}
                                        placeholder='Select HSN Code'
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
                                    }}>Tax Description <span className="text-red"> * </span></Label>
                                    <Input
                                        type='text'
                                        onChange={e => {
                                            setTaxDescription(e.target.value)
                                        }}
                                        value={taxDescription}
                                        required={true}
                                        placeholder='Enter Tax Description'
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
                                    }}>Effective From <span className="text-red"> * </span></Label>
                                    <Flatpickr
                                        className='form-control'
                                        onChange={e => {
                                            setEffectiveFrom(e[0])
                                        }}
                                        options={{ allowInput: true, dateFormat: "d-M-Y" }}
                                        value={effectiveFrom}
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

export default TaxModal