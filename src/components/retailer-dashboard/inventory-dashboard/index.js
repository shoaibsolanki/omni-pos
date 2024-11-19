import React from 'react'
import { Card, CardBody, Col, FormGroup, Row } from 'reactstrap'
import SalesOverview from './SalesOverview'
import PurchaseOverview from './PurchaseOverview'
import InventorySummary from './InventorySummary'
import ProductDetails from './ProductDetails'
import NumberOfUsers from './NumberOfUsers'
import SalesAndPurchaseStatistics from './SalesAndPurchaseStatistics'
import "./index.css"

const InventoryDashboard = () => {
    return (<>
        <Row>
            <Col md={12} className='mt-3'>
                <FormGroup>
                    <h3>
                        <b>
                            Inventory Dashboard
                        </b>
                    </h3>
                </FormGroup>
            </Col>

            <Col md={12}>
                <div className='sale-purchase-container'>
                    <SalesOverview />
                    {/* <PurchaseOverview /> */}
                    <InventorySummary />
                    <NumberOfUsers />
                </div>
            </Col>

            {/* <Col md={12} className='mb-4'>
                <SalesAndPurchaseStatistics />
            </Col> */}

            <Col md={12} className=''>
                <div className='lkksi3'>
                    <ProductDetails />
                </div>
            </Col>

        </Row>
    </>)
}

export default InventoryDashboard