import React, { useEffect, useState } from 'react'
import AdminWhatsappModule from '../AdminWhatsappModule'
import config from '../../config'
import Cookies from "js-cookie";
import axios from 'axios';

function Users() {
    const [userdata, setuserdata] = useState()
    const [userpopup, setUserpopup] = useState()
    const [userdetail, setUserdetail] = useState()
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [userfeatures, setUserfeatures] = useState({
        email: "",
        is_active: '',
        is_distributor: '',
        basic_feature: "",
        standard_feature: '',
        advanced_feature: '',
    });
    const accessToken = Cookies.get("accessToken")

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
    }

    const Getusers = () => {
        axios.get(`${config.baseUrl}users/`, { headers: headers })
            .then((response) => {
                setuserdata(response.data.staff_users)
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const GetuserDetails = (userid) => {
        axios.get(`${config.baseUrl}users/${userid}/`, { headers: headers })
            .then((response) => {
                setUserdetail(response.data)
                setUserfeatures(response.data)
                console.log(response.data, "gdgjgjhg")
            })
            .catch((error) => {
                console.log(error)
            })
    }
    // console.log(userfeatures, "sdd")
    useEffect(() => {
        Getusers()
    }, [])

    const HandleUserDetails = (userid) => {
        setSelectedUserId(userid);
        setUserpopup(true)
        GetuserDetails(userid)
    }
    // const CloseUserDetail = () => {
    //     setUserpopup(false)
    // }




    const UserDetails = () => {

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
        const handleFeatureToggle = (feature) => {
            setUserfeatures(prevState => ({
                ...prevState,
                [feature]: !prevState[feature]
            }))
        };
        const updateUserFeatures = () => {
            axios.put(`${config.baseUrl}users/${selectedUserId}/`, userfeatures, { headers: headers })
                .then((response) => {
                    // setUserfeatures(response.data);
                    console.log(response.data, "ddd");
                })
                .catch((error) => {
                    console.log(error);
                })
        };
        useEffect(() => {
            updateUserFeatures()


        }, [userfeatures]);


        return (
            <div className='absolute w-screen h-screen top-0 left-0 bg-black/10 flex justify-center items-center '
                onClick={() => { setUserpopup(false); }} >
                <div className='bg-white w-10/12 h-[80%] rounded-lg p-4' onClick={(event) => { event.stopPropagation(); }}>
                    <div className='text-xl font-bold'>User Details</div>
                    {userdetail && <div className='bg-white p-2 rounded-sm flex flex-col h-full'>
                        {/* <div className='font-semibold text-3xl py-4'>{useremail}</div> */}
                        <label htmlFor="toggleActive" className="flex justify-between items-center cursor-pointer  p-3 rounded-xl">
                            <div className='font-semibold text-3xl py-4'>{userfeatures.email}</div>
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    id="toggleActive"
                                    className="sr-only"
                                    checked={userfeatures.is_active}
                                    onChange={() => handleFeatureToggle('is_active')}
                                />
                                <div className="block bg-gray-500 w-14 h-8 rounded-full back-check"></div>
                                <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                            </div>
                        </label>
                        <div className='flex flex-wrap gap-4'>



                            <label htmlFor="toggleImage" className="flex items-center cursor-pointer bg-slate-200 max-w-max p-3 rounded-xl">
                                <span>Basic Plan</span>
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        id="toggleImage"
                                        className="sr-only"
                                        checked={userfeatures.basic_feature}
                                        onChange={() => handleFeatureToggle('basic_feature')}
                                    />
                                    <div className="block bg-gray-500 w-14 h-8 rounded-full back-check"></div>
                                    <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                                </div>
                            </label>

                            <label htmlFor="toggleMessaging" className="flex items-center cursor-pointer bg-slate-200 max-w-max p-3 rounded-xl">
                                <span>Standard Plan</span>
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        id="toggleMessaging"
                                        className="sr-only"
                                        checked={userfeatures.standard_feature}
                                        onChange={() => handleFeatureToggle('standard_feature')}
                                    />
                                    <div className="block bg-gray-500 w-14 h-8 rounded-full back-check"></div>
                                    <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                                </div>
                            </label>
                            <label htmlFor="togglePersonal" className="flex items-center cursor-pointer bg-slate-200 max-w-max p-3 rounded-xl">
                                <span>Advanced Plan</span>
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        id="togglePersonal"
                                        className="sr-only"
                                        checked={userfeatures.advanced_feature}
                                        onChange={() => handleFeatureToggle('advanced_feature')}
                                    />
                                    <div className="block bg-gray-500 w-14 h-8 rounded-full back-check"></div>
                                    <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                                </div>
                            </label>
                        </div>
                        <label htmlFor="toggleDistributor" className="flex justify-between items-center  cursor-pointer  p-3 rounded-xl">
                            <div className='font-semibold text-3xl py-4'>Make Distributor</div>
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    id="toggleDistributor"
                                    className="sr-only"
                                    checked={userfeatures.is_distributor}
                                    onChange={() => handleFeatureToggle('is_distributor')}
                                />
                                <div className="block bg-gray-500 w-14 h-8 rounded-full back-check"></div>
                                <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                            </div>
                        </label>

                    </div>}
                </div>

            </div>
        )
    }


    return (
        <>
            <div className=' w-11/12 bg-[#ECE5DD] flex justify-between h-screen  rounded-2xl overflow-x-auto'>
                <div className='h-full'>
                    <AdminWhatsappModule select={"admin_users"} />
                </div>
                <div className='flex-1 p-5  h-screen overflow-y-scroll'>
                    <div className=' text-3xl font-bold'>Clients</div>

                    <div className='flex flex-wrap gap-4 pt-2'>
                        {userdata && userdata.map((user) => (
                            <>
                                {/* <div key={user.id} className='bg-white p-2 rounded-sm flex flex-col'>
                                    <div className='font-semibold'>{user.email}</div>
                                    <div className='text-sm bg-[#064A42] max-w-max text-white px-2 rounded-md cursor-pointer select-none self-end border border-[#064A42] hover:text-[#064A42] hover:bg-white'
                                        onClick={() => { HandleUserDetails(user.id) }}
                                    >more details</div>
                                </div> */}
                                <div key={user.id} className="flex flex-col bg-[#fcfcfc] p-3  whitespace-nowrap rounded-xl w-[400px]">
                                    <div className=' font-semibold'>Name: {user.first_name} {user.last_name}</div>
                                    <div className=' font-semibold'>Company: {user.company_name}</div>
                                    <div className=' font-semibold'>Email: {user.email}</div>
                                    <div className=' font-semibold'>Phone: {user.phone}</div>
                                    <div className='text-sm bg-[#064A42] max-w-max text-white px-2 rounded-md cursor-pointer select-none self-end border border-[#064A42] hover:text-[#064A42] hover:bg-white'
                                        onClick={() => { HandleUserDetails(user.id) }}
                                    >more details</div>
                                </div>

                            </>
                        ))}
                        {userpopup && <div>
                            <UserDetails />

                        </div>
                        }
                    </div>

                </div>
            </div>
        </>
    )
}

export default Users