import React, { useCallback, useEffect } from 'react'
import { Card, CardBody } from 'reactstrap'
import { BsFillBoxFill } from "react-icons/bs"
import { FaParachuteBox } from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux'
import { handleQuantityInHandRequest } from "../../../redux/actions-reducers/ComponentProps/ComponentPropsManagement"

const InventorySummary = () => {

    const dispatch = useDispatch()
    const { quantity_in_hand } = useSelector(state => state.ComponentPropsManagement)

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
        dispatch(handleQuantityInHandRequest())
    }

    const optimizedFn = useCallback(debounce(handleFunCall), []);
    const id= localStorage.getItem('activeTab')
    useEffect(() => {
        if (id==4) {
            optimizedFn()
        }
    }, [id])


    return (<>
        <Card style={{ border: "none", borderRadius: "12px", maxWidth: "400px" }} className='w-100 me-4 mb-4'>
            <CardBody>
                <div style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}>
                    Inventory Summary
                </div>
                <div className='d-flex justify-content-center align-items-center flex-wrap'>
                    <div style={{ backgroundColor: "#f3f3f3", padding: "19px", borderRadius: "20px", marginRight: "20px", width: "170px", marginBottom: "20px" }}>
                        <div>
                            <BsFillBoxFill size={45} color='var(--primary1)' />
                        </div>
                        <div className='mb-1 mt-3'>
                            Quantity in Hand
                        </div>
                        <div style={{ fontSize: "25px", fontWeight: "bold" }}>
                            {quantity_in_hand}
                        </div>
                    </div>

                    {/* <div style={{ backgroundColor: "#f3f3f3", padding: "19px", borderRadius: "20px", width: "170px", marginBottom: "20px" }}>
                        <div>
                            <FaParachuteBox size={45} color='var(--primary1)' />
                        </div>
                        <div className='mb-1 mt-3'>
                            Will be Received
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

export default InventorySummary