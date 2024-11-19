import React from 'react'
// import { FiMenu } from "react-icons/fi"
import { BiArrowBack } from "react-icons/bi"
import { MdLogout } from "react-icons/md"
import "./index.css"
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from "react-router-dom";
const Navbar = (props) => {
    const navigate = useNavigate();
    const location = useLocation()
    const { user_data } = useSelector(state => state.ComponentPropsManagement)
    return (<>
        <div style={{
            // backgroundColor: "var(--primary)", 
            padding: "20px",
            backgroundColor: "var(--primary1)"

        }}>
            <div className="d-flex justify-content-between">
                <div className='d-flex'>

                    <div
                        onClick={() => {
                            navigate("/")
                            // setSidebarIsOpen(!sidebarIsOpen)
                        }}
                        className='me-4 my-auto'
                    >
                        {/* <FiMenu size={30} color='white' className='mouse-pointer' /> */}
                        <BiArrowBack size={30} color='white' className='mouse-pointer' />

                    </div>
                    <div className='navbar-text'>
                        {/* {user_data.userName} Dashboard */}
                    </div>
                </div>
                <div style={{ color: "white" }} className='d-flex'>
                    {/* <div className='m-auto me-2'>
                        {localStorage.getItem("username")}
                    </div> */}
                    {/* <div className='me-4'>
                        <img src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg" alt="no" style={{ width: "45px", borderRadius: "50px" }} />
                    </div> */}
                    <div className='my-auto mouse-pointer'
                        onClick={() => {
                            localStorage.clear()
                            window.location.replace("/")
                        }}
                    >
                        <MdLogout size={30} />
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Navbar