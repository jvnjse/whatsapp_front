import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Cookies from "js-cookie";


const PrivateRoutes = () => {
    const accessToken = Cookies.get("accessToken");

    return (
        accessToken ? <Outlet /> : <Navigate to="/" />
    )
}

export default PrivateRoutes