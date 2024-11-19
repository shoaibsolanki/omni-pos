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

import StoreModal from "./StoreModal";

const StoreMaster = () => {

    const [modalShow, setModalShow] = useState(false);
  const handleShow = () => setModalShow(true);

  const [storeData, setStoreData] = useState(null);
  const [date, setDate] = useState(new Date());
  const id= localStorage.getItem('activeTab')
  useEffect(() => {
    const { storeId, saasId } = JSON.parse(localStorage.getItem("User_data"));
    const t1 = moment(date).format("Y-MM-DD");
    if(id==5){
      axios
        .get(`${BASE_Url}/store-master/get_store_detail/${saasId}/${storeId}`)
        .then((response) => {
          // Convert the object from the API response into an array with a single element
          setStoreData([response.data.data]);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [id]);




        return (
          <>
           <div  className=" d-block profile mt-3 py-2 px-2
      " style={{ height:"fit-content" }}>
        <Container fluid>
          <Row className="justify-content-center">
            <Col lg="12">
              <Card className="mb-3">
                <CardHeader>Store</CardHeader>
                <CardBody>
                  <div className="table-responsive">
                
                  <Table>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">store_id</th>
                        <th scope="col">store_name</th>
                        <th scope="col">city</th>
                        <th scope="col">store_type</th>
                        <th scope="col">saas_id</th>
                        <th scope="col">Action</th>
                       
                      </tr>
                    </thead>
                    <tbody>
                      {storeData&&
                        storeData?.map((item, index) => (
                          <tr key={item._id}>
                            <th>
                              {index + 1}
                            </th>

                            <td>
                            {item.store_id}
                            
                            </td>
                            <td>
                            {item.store_name}
                            
                            </td>
                            <td>
                          {item.city}
                              </td>
                            <td>
                            {item.store_type}
                            
                            </td>
                            
                            <td>
                            {item.saas_id}
                            
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
 <StoreModal 
          show={modalShow}
          onHide={() => setModalShow(false)}/>
      
    </>
  );
};

export default StoreMaster;
