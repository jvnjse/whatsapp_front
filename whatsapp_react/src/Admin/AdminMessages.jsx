import React, { useEffect, useState } from 'react'
import AdminWhatsappModule from './AdminWhatsappModule'
import config from '../config'
import axios from 'axios'
import Cookies from "js-cookie";

function AdminMessages() {
    const [messages, setMessages] = useState()
    const accessToken = Cookies.get("accessToken")

    const headers = {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer ' + accessToken
    }
    const GetMessages = () => {
        axios.get(`${config.baseUrl}contact-form/`, { headers: headers })
            .then((response) => {
                console.log(response.data)
                setMessages(response.data)
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
                    <table>
                        <tr>
                            <th>name</th>
                            <th>email</th>
                            <th>phone</th>
                            <th>issue</th>
                        </tr>

                        {messages && messages.map((message) => (
                            <tr>
                                <th>{message.first_name} {message.last_name}
                                </th>
                                <th>{message.email}</th>
                                <th>{message.phone}</th>
                                <th>{message.issue_description}</th>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </>
    )
}

export default AdminMessages