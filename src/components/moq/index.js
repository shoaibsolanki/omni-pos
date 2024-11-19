import React, { useState, useEffect, useCallback } from "react";
import {
    Container,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  CustomInput,
  CardHeader,
  Table
} from "reactstrap";
import { MdPlaylistAdd } from "react-icons/md";
import RetailerQRCode from "../../assets/KhamasQrCode.jpeg";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import axios from "axios";
import { BASE_Url } from "../../URL";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import { Image } from "antd";
function Index() {
  const [entries, setEntries] = useState([
    {
      id: 1,
      customerId: 234244,
      customerName: "Soyam Ali",
      customerMobileNumber: 657890987812,
      addWalletBalance: "₹500",
      pendingBalance: "11/2/2023",
      status: null,
    },
    // Add more entries as needed
  ]);

  const [clicked, setClicked] = useState(false);

  // const handleAcceptReject = (id, status) => {
  //   setEntries(prevEntries =>
  //     prevEntries.map(entry =>
  //       entry.id === id ? { ...entry, status } : entry
  //     )
  //   );

  //   setClicked(true);
  // };

  const [getPayment, setgetPayment] = useState(null);
  const { saasId, storeId } = localStorage.getItem("User_data")
    ? JSON.parse(localStorage.getItem("User_data"))
    : {};

  const fetchPaymentData = async () => {
    try {
      const response = await axios.get(
        `${BASE_Url}/paymentReference/get-all-by-saasId-storeId/${saasId}/${storeId}`
      );
     
      console.log("new address", response.data.data);
      setgetPayment(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchPaymentData();
  }, []);

  const handleAcceptReject = async (payment_reference_id,id, newAmount, Status) => {
   
    // const newAmount = 1000; 
    try {
      await axios.put(
        `${BASE_Url}/paymentReference/amount-updated`,
        {
          payment_reference_id:payment_reference_id,
          customer_id: id,
          amount: newAmount,
          status:Status
        }
      );
      
      setgetPayment(prevPayments =>
        prevPayments.map(payment =>
          payment.payment_reference_id === payment_reference_id
            ? { ...payment, status: Status }
            : payment
        )
      );
      setClicked(true);  
      if(response.data.status){

        fetchPaymentData()
      }
    
      console.log(`Amount updated successfully for customer ${id}`);
    } catch (error) {
      console.error('Error updating amount:', error);
    }
  };

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");
  };
  
  return (
    <>
      <div className="d-block profile mt-3 py-2 px-2" style={{ height: "fit-content" }}>
        <Container fluid>
          <Row className="justify-content-center">
            <Col lg="12">
              <Card className="mb-3">
              <CardHeader> <ArrowBackIcon className="mx-3" onClick={handleNavigate} /> Payment Details</CardHeader>
                <CardBody>
                  <div className="table-responsive">
                    <Table>
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Customer Id</th>
                          <th scope="col">Customer Name</th>
                          <th scope="col">Add Balance Date</th>
                          <th scope="col">Add Wallet Balance</th>
                          {/* <th scope="col">Add Wallet Balance</th> */}
                        
                          <th scope="col">View Image</th>
                           <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getPayment?.map((entry) => (
                          <tr key={entry.id}>
                            <td>{entry.customer_id}</td>
                            <td>{entry.customer_name}</td>
                            <td>{entry.business_date}</td>
                            <td>{entry.amount_recieved}</td>
                            {/* <td>{entry.amount_updated}</td> */}
                            <td>
                              <Image
                                className="m-2"
                                style={{ height: "50px" }}
                                src={entry.image_path}
                                alt="payment"
                              />
                            </td>
                            <td>
  {entry.status !== 'APPROVED' && entry.status !== 'Rejected' ? (
    <>
      <IconButton
        color="success"
        onClick={() => handleAcceptReject(entry.payment_reference_id, entry.customer_id, entry.amount_recieved, "APPROVED" )}
      >
        <CheckCircleIcon />
      </IconButton>
      <IconButton
        color="error"
        onClick={() => handleAcceptReject(entry.payment_reference_id, entry.customer_id, entry.amount_recieved, "Rejected")}
      >
        <CancelIcon />
      </IconButton>
    </>
  ) : (
    <Badge
      sx={{
        backgroundColor: entry.status === 'APPROVED' ? '#4caf50' : '#f44336',
        color: '#fff',
        padding: '5px',
        borderRadius: '35px',
      }}
    >
      {entry.status}
    </Badge>
  )}
</td>

                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Index;
