import React, { useState } from 'react'
import { Card, CardBody, Col, FormGroup, Label, Row, Input, Button } from 'reactstrap'
import Select from "react-select"
import Flatpickr from "react-flatpickr";
import { AiFillInfoCircle } from "react-icons/ai"
import Toggle from 'react-toggle'

const CreditAndBalance = () => {
    const [limitFlag, setLimitFlag] = useState(false)
    return (<>
        <div>
            <Card>
                <CardBody>
                    <Row>
                        <Col md={4}>
                            <FormGroup>
                                <Label>Opening Balance <span className="text-red"> * </span></Label>
                                <Input
                                    type='number'
                                    required={true}
                                    placeholder="Enter Balance"
                                />
                            </FormGroup>
                        </Col>

                        <Col md={4}>
                            <FormGroup>
                                <Label>As of Date<span className="text-red"> * </span></Label>
                                <Flatpickr
                                    // data-enable-time
                                    className='form-control'
                                    // onChange={(date) => {
                                    //     setBusinessDate(date[0])
                                    // }}
                                    options={{ allowInput: true, dateFormat: "d-M-Y" }}
                                    // value={businessDate}
                                    required={true}
                                    placeholder='Select Date'
                                />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12}>
                            <div>
                                <span>
                                    Credit Limit
                                </span>
                                <span className='ms-1'>
                                    <AiFillInfoCircle color='#979797' />
                                </span>
                            </div>
                        </Col>

                        <Col md={12} className='mt-3'>
                            <div className='d-flex flex-wrap'>
                                <Label
                                    onClick={() => {
                                        setLimitFlag(false)
                                    }}
                                    className='mouse-pointer'
                                >
                                    No Limit
                                </Label>
                                <div
                                    style={{ position: "relative", top: "1px" }}
                                >

                                    <Toggle
                                        // defaultChecked={contentToggle}
                                        className='mx-2 '
                                        onChange={() => {
                                            setLimitFlag(!limitFlag)
                                        }}
                                        checked={limitFlag === true}
                                        icons={false}

                                    />
                                </div>
                                <Label
                                    onClick={() => {
                                        setLimitFlag(true)
                                    }}
                                    className='mouse-pointer'
                                >
                                    Custom Limit
                                </Label>
                            </div>
                        </Col>

                        <div className="d-flex justify-content-end">

                            <Label>&nbsp;</Label>
                            <div>
                                <Button style={{ border: "none", backgroundColor: "var(--primary2)" }}>
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </Row>
                </CardBody>
            </Card>
        </div>
    </>)
}

export default CreditAndBalance