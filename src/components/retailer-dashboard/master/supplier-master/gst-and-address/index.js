import React from 'react'
import { Card, CardBody, Col, FormGroup, Label, Row, Input, Button } from 'reactstrap'
import Select from "react-select"
const GSTandAddress = () => {
    const gst_type_dropdown = []
    const state_dropdown = []
    return (<>
        <div className=''>
            <Card>
                <CardBody>
                    <Row>
                        <Col md={4}>
                            <FormGroup>
                                <Label>Select GST Type <span className="text-red"> * </span></Label>
                                <Select
                                    options={gst_type_dropdown}
                                    required={true}
                                    placeholder="Select Gst Type"
                                />
                            </FormGroup>
                        </Col>

                        <Col md={4}>
                            <FormGroup>
                                <Label>Select State<span className="text-red"> * </span></Label>
                                <Select
                                    options={state_dropdown}
                                    required={true}
                                    placeholder="Select State"
                                />
                            </FormGroup>
                        </Col>

                        <Col md={4}>
                            <FormGroup>
                                <Label>Email<span className="text-red"> * </span></Label>
                                <Input
                                    type="email"
                                    required={true}
                                    placeholder="Enter Email"
                                />
                            </FormGroup>
                        </Col>

                        <Col md={12}>
                            <FormGroup>
                                <Label>Billing Address<span className="text-red"> * </span></Label>
                                <Input
                                    type="textarea"
                                    required={true}
                                    placeholder="Enter Address"
                                />
                            </FormGroup>
                        </Col>

                        {/* <Col md={3}>
                            <FormGroup> */}
                        <div className="d-flex justify-content-end">

                            <Label>&nbsp;</Label>
                            <div>
                                <Button style={{ border: "none", backgroundColor: "var(--primary2)" }}>
                                    Submit
                                </Button>
                            </div>
                        </div>
                        {/* </FormGroup>
                        </Col> */}
                    </Row>
                </CardBody>
            </Card>
        </div>
    </>)
}

export default GSTandAddress