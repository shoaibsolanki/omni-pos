import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Swal from 'sweetalert2';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import MoneyWalletStep2 from './MoneyWalletStep2';

function AddMoneyWalletModal(props) {
  const [paymentShow, setPaymentShow] = useState(false);
  const [transactionAmount, setTransactionAmount] = useState('');

  const handleButtonClick = (amount) => {
    setTransactionAmount(amount);
  };

  const handleProceed = () => {
    handleBack()
    setPaymentShow(true)
  };

  const handleBack = () => {
    // Hide the modal when the back arrow is clicked
    props.onHide();
  };
  return (
    <>
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body>
        <Row className=' p-3'>
          <Col>
            <Row className=''>
              <Col  xs={12} className='mt-1' sm={2}><ArrowBackIcon onClick={handleBack}/> </Col>
              <Col>
                <p className='fw-bold' style={{ color: 'black',
                    outline: 'none',
                    border: 'none',
                    fontSize: '23px',
                    fontFamily: 'Roboto',}}>Add Money</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form className='d-flex'>
                  <FormControl
                    type="search"
                    placeholder="1000"
                    value={transactionAmount}
                    onChange={(e) => setTransactionAmount(parseFloat(e.target.value) || 0)}
                  />
                </Form>
              </Col>
            
            </Row>
            <Row className='mt-3'>
              <Col>
                {/* Buttons for predefined amounts */}
                <Button className='mx-2 border-0 bg-dark-subtle' onClick={() => handleButtonClick(100)}>+100</Button>
                <Button  className='mx-2 border-0 bg-dark-subtle' onClick={() => handleButtonClick(200)}>+200</Button>
                <Button className='mx-2 border-0 bg-dark-subtle' onClick={() => handleButtonClick(500)}>+500</Button>
                <Button className='mx-2 border-0 bg-dark-subtle' onClick={() => handleButtonClick(1000)}>+1000</Button>
                <Button className='mx-2 border-0 bg-dark-subtle' onClick={() => handleButtonClick(1500)}>+1500</Button>

              </Col>
            </Row>
           
          </Col>
          <Button
                  className="fw-bold mt-5"
                  style={{
                    float: 'left',
                    backgroundColor: '#ffc107',
                    color: 'black',
                    outline: 'none',
                    border: 'none',
                    fontSize: '18px',
                    fontFamily: 'Roboto',
                  }}
                  onClick={handleProceed}
                >
                  Proceed
                </Button>
        </Row>
      </Modal.Body>
    </Modal>
    <MoneyWalletStep2 paymentShow={paymentShow} transactionAmount={transactionAmount} setTransactionAmount={setTransactionAmount} setPaymentShow={setPaymentShow}/>
    </>
  );
}

export default AddMoneyWalletModal;
