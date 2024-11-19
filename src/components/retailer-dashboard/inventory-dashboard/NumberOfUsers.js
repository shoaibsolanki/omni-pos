import React, { useState, useEffect, useCallback } from 'react'
import { Card, CardBody } from 'reactstrap'
import { BsFillBoxFill } from "react-icons/bs"
import { FaParachuteBox, FaUsers } from "react-icons/fa"
import { useHistory } from "react-router-dom"
import { HiUsers } from "react-icons/hi"
import { useDispatch, useSelector } from 'react-redux'
import { handleNumberOfCustomerRequest } from "../../../redux/actions-reducers/ComponentProps/ComponentPropsManagement"

const NumberOfUsers = () => {
    const dispatch = useDispatch()
    const { number_of_customer } = useSelector(state => state.ComponentPropsManagement)

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
        dispatch(handleNumberOfCustomerRequest())
    }

    const optimizedFn = useCallback(debounce(handleFunCall), []);
    const id= localStorage.getItem('activeTab')
    useEffect(() => {
        if (id==4) {
            optimizedFn()
        }
    }, [id])

    return (<>
        <Card style={{ border: "none", borderRadius: "12px", maxWidth: "400px" }} className='w-100 mb-4'>
            <CardBody>
                <div style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}>
                    No of Customer
                </div>
                <div className='d-flex justify-content-center flex-wrap align-items-center'>
                    <div style={{ backgroundColor: "#f3f3f3", padding: "19px", borderRadius: "20px", marginRight: "20px", marginBottom: "20px" }}>
                        <div>
                            <FaUsers size={45} color='var(--primary1)' />
                        </div>
                        <div className='mb-1 mt-3'>
                            Number of Customer
                        </div>
                        <div style={{ fontSize: "25px", fontWeight: "bold" }}>
                            {number_of_customer}
                        </div>
                    </div>

                    {/* <div style={{ backgroundColor: "#f3f3f3", padding: "19px", borderRadius: "20px", width: "170px", marginBottom: "20px" }}>
                        <div>
                            <HiUsers size={45} color='var(--primary1)' />
                        </div>
                        <div className='mb-1 mt-3'>
                            Total Suppliers
                        </div>
                        <div style={{ fontSize: "25px", fontWeight: "bold" }}>
                            214
                        </div>
                    </div> */}

                </div>
            </CardBody>
        </Card>
    </>)
}

export default NumberOfUsers