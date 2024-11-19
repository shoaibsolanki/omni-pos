import React, { useEffect, useState, useCallback } from 'react'
import { Card, CardBody, Col, FormGroup, Row } from 'reactstrap'
import { HiReceiptPercent } from "react-icons/hi2"
import { BsGraphUpArrow, BsBarChartFill, BsFillBagFill } from "react-icons/bs"
import { ImArrowDown, ImCancelCircle } from "react-icons/im"
import { GiReturnArrow } from "react-icons/gi"
import { useDispatch, useSelector } from 'react-redux'
import { handleSalesOverviewRequest } from "../../../redux/actions-reducers/ComponentProps/ComponentPropsManagement"

const SalesOverview = () => {
    const dispatch = useDispatch()
    const { sales_overview_data } = useSelector(state => state.ComponentPropsManagement)

    const { total_sales, revenue, cost, profit } = sales_overview_data ? sales_overview_data : {}
    const debounce = (func) => {
        let timer;
        return function (...args) {
            const context = this;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                func.apply(context, args);
            }, 1000);
        };
    };

    const handleFunCall = () => {
        dispatch(handleSalesOverviewRequest())
    }

    const optimizedFn = useCallback(debounce(handleFunCall), []);
    const id= localStorage.getItem('activeTab')
    useEffect(() => {
        if (id==4) {
            optimizedFn()
        }
    }, [id])


    return (<>
        <Card className='me-4 w-100 mb-4' style={{ border: "none", borderRadius: "12px" }}>
            <CardBody>
                <h5 className='mb-4'>
                    <b>
                        Sales Overview
                    </b>
                </h5>

                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                    <div className='d-flex justify-content-between flex-wrap w-100' >
                        <div className='d-flex me-3 mb-3'>
                            <div style={{ backgroundColor: "rgba(84,135,197,0.2)", padding: "10px 10px", borderRadius: "10px", marginRight: "10px" }}>
                                <HiReceiptPercent color='var(--primary1)' size={40} />
                            </div>
                            <div>
                                <div style={{ fontSize: "16px" }}>
                                    Total Sales
                                </div>
                                <div style={{ fontSize: "20px", fontWeight: "bolder" }}>
                                    {total_sales}
                                </div>
                            </div>
                        </div>

                        <div className='d-flex mb-3'>
                            <div style={{ backgroundColor: "rgba(84,135,197,0.2)", padding: "10px 10px", borderRadius: "10px", marginRight: "10px" }}>
                                <BsGraphUpArrow color='var(--primary1)' size={40} />
                            </div>
                            <div>
                                <div style={{ fontSize: "16px" }}>
                                    Revenue
                                </div>
                                <div style={{ fontSize: "20px", fontWeight: "bolder" }}>
                                    {revenue}
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='d-flex justify-content-between flex-wrap w-100 mt-5' >
                        <div className='d-flex me-3 mb-3'>
                            <div style={{ backgroundColor: "rgba(84,135,197,0.2)", padding: "10px 10px", borderRadius: "10px", marginRight: "10px" }}>
                                <ImArrowDown color='var(--primary1)' size={40} />
                            </div>
                            <div>
                                <div style={{ fontSize: "16px" }}>
                                    Cost
                                </div>
                                <div style={{ fontSize: "20px", fontWeight: "bolder" }}>
                                    {cost}
                                </div>
                            </div>
                        </div>

                        <div className='d-flex justify-content-start mb-3' style={{ width: "135px" }}>
                            <div style={{ backgroundColor: "rgba(84,135,197,0.2)", padding: "10px 10px", borderRadius: "10px", marginRight: "10px" }}>
                                <BsBarChartFill color='var(--primary1)' size={40} />
                            </div>
                            <div>
                                <div style={{ fontSize: "16px" }}>
                                    Profit
                                </div>
                                <div style={{ fontSize: "20px", fontWeight: "bolder" }}>
                                    {profit}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </CardBody>
        </Card>

    </>)
}

export default SalesOverview