import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Cookies from "js-cookie";


const PrivateRoutes = (props) => {

    return (
        props.accessToken ? <Outlet /> : <Navigate to="/" />
    )
}

export default PrivateRoutes