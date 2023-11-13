import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie";
import config from '../config';
import WhatsappModule from '../WhatsappModule';
import { jwtDecode } from 'jwt-decode';

function Users() {
    const [userdata, setuserdata] = useState()
    const accessToken = Cookies.get("accessToken")

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
    }


    useEffect(() => {
        axios.get(`${config.baseUrl}users/`, { headers: headers })
            .then((response) => {
                const filteredUsers = response.data.filter(user => !user.is_staff);
                console.log(filteredUsers);
                setuserdata(filteredUsers);
            })
            .catch((error) => {
                console.log(error.response.data)
            })
    }, [])




    const DisableUser = (key, is_active) => {
        const data = {
            "is_active": !is_active
        }
        axios.patch(`${config.baseUrl}users/${key}/`, data, { headers: headers })
            .then((response) => {
                console.log(response.data)
                axios.get(`${config.baseUrl}users/`, { headers: headers })
                    .then((response) => {
                        const filteredUsers = response.data.filter(user => !user.is_staff);
                        console.log(filteredUsers);
                        setuserdata(filteredUsers);
                    })
                    .catch((error) => {
                        console.log(error.response.data)
                    })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className=' w-11/12 bg-[#ECE5DD] flex justify-between h-full  rounded-2xl overflow-x-auto'>
            <div className='h-full'>
                <WhatsappModule select={"users"} />
            </div>
            <div className='p-5 flex-1'>
                <table className='table-auto w-full'>
                    <thead className='text-left bg-slate-500'>
                        <tr>
                            <th>User Emails </th>
                            <th>Active/In-Active</th>
                            <th>Disable User</th>
                        </tr>
                    </thead>
                    <tbody>

                        {userdata && userdata.map((user) => (
                            <>
                                <tr key={user.id}>
                                    <td>
                                        {user.email}
                                    </td>
                                    <td>{user.is_active ? "Active" : "Not-Active"}</td>
                                    <td >
                                        <button className='hover:bg-black/90 hover:text-white p-2 rounded-lg' onClick={() => DisableUser(user.id, user.is_active)}>
                                            {user.is_active ? "Disable" : "Enable"}
                                        </button>
                                    </td>
                                </tr >
                            </>
                        ))}
                    </tbody>



                </table>
            </div >
        </div >
    )
}

export default Users