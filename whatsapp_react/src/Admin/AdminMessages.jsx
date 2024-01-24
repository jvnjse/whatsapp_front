import React, { useEffect } from 'react'
import AdminWhatsappModule from './AdminWhatsappModule'
import config from '../config'
import axios from 'axios'
import Cookies from "js-cookie";

function AdminMessages() {
    const accessToken = Cookies.get("accessToken")

    const headers = {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer ' + accessToken
    }
    const GetMessages = () => {
        axios.get(`${config.baseUrl}contact-form/`, { headers: headers })
            .then((response) => {
                console.log(response.data)
            }).catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        GetMessages()


    }, [])

    return (
        <>
            <div className=' w-11/12 bg-[#ECE5DD] flex justify-between h-screen  rounded-2xl overflow-x-auto'>
                <div className='h-full'>
                    <AdminWhatsappModule select={"admin_messages"} />
                </div>
                <div className='flex-1 p-5'>


                </div>
            </div>
        </>
    )
}

export default AdminMessages