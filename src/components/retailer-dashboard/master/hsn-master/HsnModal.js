import React, { useState, useEffect, useCallback } from 'react'
import { Button, Card, CardBody, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import DataTable, { createTheme } from 'react-data-table-component';
import Modal from 'react-bootstrap/Modal';

function HsnModal(props) {
    const [itemName, setItemName] = useState("")
    const [itemHsn, setItemHsn] = useState("")
    createTheme('solarized', {
        text: {
            // primary: '#268bd2',
            // secondary: '#2aa198',

        },
        background: {
            // default: 'var(--primary2)',
            default: '#ffffff',
        }
    })

  

  return (
 
    <Modal   {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered>
    <Modal.Header closeButton>
      <Modal.Title>HSN Master</Modal.Title>
    </Modal.Header>
    <Card>
                <CardBody>
                    {/* <div style={{ fontSize: "22px", fontWeight: "bold" }}>HSN Master</div> */}

                    <Form className='mt-2'>
                        <Row>
                            <Col md={12}>
                                <FormGroup>
                                    <Label
                                      style={{color: "#000",

                                      fontFamily: "Segoe UI",
                                      fontSize: "24px",
                                      fontStyle: "normal",
                                      fontWeight: "600",
                                      lineHeight: "normal"}}>Item Name <span className="text-red"> * </span></Label>
                                    <Input
                                        type='text'
                                        onChange={e => {
                                            setItemName(e.target.value)
                                        }}
                                        value={itemName}
                                        required={true}
                                        placeholder='Enter Item Name'
                                        style={{boxShadow: "0 2px 12px rgba(36, 36, 39, .12)",
                                        borderRadius: ".75rem",
                                        overflow: "hidden"}}
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={12}>
                                <FormGroup>
                                    <Label
                                          style={{color: "#000",
                                          fontFamily: "Segoe UI",
                                          fontSize: "24px",
                                          fontStyle: "normal",
                                          fontWeight: "600",
                                          lineHeight: "normal"}}>Item HSN <span className="text-red"> * </span></Label>
                                    <Input
                                        type='text'
                                        onChange={e => {
                                            setItemHsn(e.target.value)
                                        }}
                                        value={itemHsn}
                                        required={true}
                                        placeholder='Enter Item HSN'
                                        style={{boxShadow: "0 2px 12px rgba(36, 36, 39, .12)",
                                        borderRadius: ".75rem",
                                        overflow: "hidden"}}
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={12}>
                                <FormGroup>
                                    <Label>&nbsp;</Label>
                                    <div>
                                        <Button className='mt-2' style={{
                            borderRadius:" 8px;",
                            background:" #0067CE"
                          }}>
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

export default HsnModal