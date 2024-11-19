import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { handleViewOrderByCustomerRequest } from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";

const ViewOrdersCustomer = ({
  showVierCustomerOrderModal,
  setShowVierCustomerOrderModal,
}) => {
  const { customer_order } = useSelector((e) => e.ComponentPropsManagement);
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the action to fetch customer orders here
    // dispatch(handleViewOrderByCustomerRequest({ saasId, userName }));
  }, []);
  useEffect(() => {
    if (customer_order.length > 0) {
      // setOrderNumber(pending_order_data[0].order_id);
    }
  }, [customer_order]);
  const handleClose = () => setShowVierCustomerOrderModal(false);

  // Define the columns for DataTable
  const columns = [
    { name: "Order Id", selector: "order_id", sortable: true },
    { name: "Date", selector: "order_date", sortable: true },
    { name: "Name", selector: "customer_name", sortable: true },
    { name: "No. of Items", selector: "order_qty", sortable: true },
    { name: "Value", selector: "order_value", sortable: true },
    { name: "Status", selector: "status", sortable: true },
  ];

  return (
    <div>
      <Modal fullscreen={true} show={showVierCustomerOrderModal} onHide={handleClose}>
        <Modal.Header className="container" closeButton>
          <Modal.Title style={{color:"green"}}>Your Orders</Modal.Title>
        </Modal.Header>
        <Modal.Body className="container">
          <DataTable
            title=""
            columns={columns}
            data={customer_order}
            pagination
          />
        </Modal.Body>
        <Modal.Footer className="container">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewOrdersCustomer;
