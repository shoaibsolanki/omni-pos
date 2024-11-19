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
import DataTable, { createTheme } from 'react-data-table-component';
import { AiOutlineRight } from "react-icons/ai"
import HsnModal from "./HsnModal";

const HSNMaster = () => {

    const [modalShow, setModalShow] = useState(false);
  const handleShow = () => setModalShow(true);

  const [data, setData] = useState([]);
  const [date, setDate] = useState(new Date());
  const id= localStorage.getItem('activeTab')
  useEffect(() => {
    // Define the API URL
    const { storeId, saasId  } = JSON.parse(localStorage.getItem("User_data"));
    const t1 = moment(date).format("Y-MM-DD");
    if(id==5){
        // Make a GET request to the APItax/get-hsn-item-list
        axios.get(`${BASE_Url}/tax/get-hsn-item-list`)
          .then(response => {
            // Handle the successful response
            console.log("taxt Data", response.data.tax_item_list)
            setData(response.data.tax_item_list);
          })
          .catch(error => {
            // Handle any errors
            console.error('Error:', error);
          });
    }
  }, [id]);


// data table
const columns = [
  {
      name: 'Code',
      selector: row => row.code,
  },
  {
      name: 'Description',
      selector: row => row.description,
  },
  {
      name: 'Action',
      cell: row => {
          return (<>
              <AiOutlineRight />
          </>)
      }
  }
];

const Data = [
  {
      id: 1,
      code: '851672',
      description: 'toasters'
  },
  {
      id: 2,
      code: '851672',
      description: 'toasters'
  }
]

        return (
          <>
           <div  className=" d-block profile mt-3 py-2 px-2
      " style={{ height:"fit-content" }}>
        <Container fluid>
          <Row className="justify-content-center">
            <Col lg="12">
              <Card className="mb-3">
                <CardHeader>HSN Master</CardHeader>
                <CardBody>
                  <div className="table-responsive">
                
                  <Table>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">total_value</th>
                        <th scope="col">total_discount</th>
                        <th scope="col">tax_value</th>
                        <th scope="col">additional_cess</th>
                        <th scope="col">flood_cess</th>
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
                            {item.total_value}
                            
                            </td>
                            <td>
                            {item.total_discount}
                            
                            </td>
                            <td>
                          {item.tax_value}
                              </td>
                            <td>
                            {item.additional_cess}
                            
                            </td>
                            
                            <td>
                            {item.flood_cess}
                            
                            </td>
                            <td>
                            <MdPlaylistAdd
                  size={22}
                  color="green"
                  className="mouse-pointer"
                  onClick={() => {
                    // setAddUpdateItemModalIsOpen(!addUpdateItemModalIsOpen);
                    handleShow((state) => !state);
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
        <Card className='mt-4'>
                <CardBody>
                    <Row>
                        <Col md={12}>
                            <DataTable
                                columns={columns}
                                data={Data}
                                title="Select HSN/SAC Code"
                                theme="solarized"
                                className='table-bordered'
                            />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
      </div>
 <HsnModal 
          show={modalShow}
          onHide={() => setModalShow(false)}/>
      
    </>
  );
};

export default HSNMaster;
