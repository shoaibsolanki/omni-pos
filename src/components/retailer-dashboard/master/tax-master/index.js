import React, { useState, useEffect } from "react";
import axios from 'axios';
import { BASE_Url, host } from "../../../../URL";
import moment from "moment";
// import Table from 'react-bootstrap/Table';
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Row,
    Table,
    Badge,
    Button
  } from "reactstrap";
import { MdDelete, MdEdit, MdPlaylistAdd } from "react-icons/md";
import {
  handleItemMasterListRequest,
  handleSearchedDataRequest1,
  handleSalesReportRequest
} from "../../../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import TaxModal from "./TaxModal";

const TaxMaster = () => {

    const [modalShow, setModalShow] = useState(false);
  const handleShow = () => setModalShow(true);

  const [data, setData] = useState([]);
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    // Define the API URL
    const { storeId, saasId  } = JSON.parse(localStorage.getItem("User_data"));
    const t1 = moment(date).format("Y-MM-DD");
    // Make a GET request to the API
    axios.get(`${BASE_Url}/tax/get-sales-report/${t1}/${storeId}/${saasId}`)
      .then(response => {
        // Handle the successful response
        console.log("taxt Data", response.data.list_sales_report)
        setData(response.data.list_sales_report);
      })
      .catch(error => {
        // Handle any errors
        console.error('Error:', error);
      });
  }, []);




        return (
          <>
           <div  className=" d-block profile mt-3 py-2 px-2
      " style={{ height:"fit-content" }}>
        <Container fluid>
          <Row className="justify-content-center">
            <Col lg="12">
              <Card className="mb-3">
                <CardHeader>Tax</CardHeader>
                <CardBody>
                  <div className="table-responsive">
                
                  <Table>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">business_date</th>
                        <th scope="col">invoice_no</th>
                        <th scope="col">invoice_total</th>
                        <th scope="col">pdf_name</th>
                        <th scope="col">tax_total</th>
                        <th scope="col">Action</th>
                       
                      </tr>
                    </thead>
                    <tbody>
                      {data &&
                        data.map((item, index) => (
                          <tr key={item._id}>
                            <th>
                              {index + 1}
                            </th>

                            <td>
                            {item.business_date}
                            
                            </td>
                            <td>
                            {item.invoice_no}
                            
                            </td>
                            <td>
                          {item.invoice_total}
                              </td>
                            <td>
                            {item.pdf_name}
                            
                            </td>
                            
                            <td>
                            {item.tax_total}
                            
                            </td>
                            <td>
                            <MdPlaylistAdd
                 size={22}
                 color="green"
                 className="mouse-pointer"
                  onClick={() => {
                    // setAddUpdateItemModalIsOpen(!addUpdateItemModalIsOpen);
                    setModalShow((state) => !state);
                  }}
                />
                            
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
 <TaxModal 
          show={modalShow}
          onHide={() => setModalShow(false)}/>
      
    </>
  );
};

export default TaxMaster;
