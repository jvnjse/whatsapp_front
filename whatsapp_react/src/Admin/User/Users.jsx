import React, { useEffect, useState } from 'react'
import AdminWhatsappModule from '../AdminWhatsappModule'
import config from '../../config'
import Cookies from "js-cookie";
import axios from 'axios';

function Users() {
    const [userdata, setuserdata] = useState()
    const [userpopup, setUserpopup] = useState()
    const [userdetail, setUserdetail] = useState()
    const [userfeatures, setUserfeatures] = useState({
        excel_feature: "",
        image_feature: "",
        is_active: '',
        is_distributor: '',
        messaging_feature: '',
        personalised_feature: '',
    });
    const accessToken = Cookies.get("accessToken")

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
    }
    const Getusers = () => {
        axios.get(`${config.baseUrl}users/`, { headers: headers })
            .then((response) => {
                setuserdata(response.data)
                // console.log(response.data)
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
        setUserpopup(true)
        GetuserDetails(userid)
    }
    // const CloseUserDetail = () => {
    //     setUserpopup(false)
    // }




    const UserDetails = ({ userid }) => {

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
        useEffect(() => {
            const updateUserFeatures = async () => {
                try {
                    const response = await axios.put(`${config.baseUrl}users/${userid}/`, userfeatures, { headers: headers });
                    // Update the state with the response data
                    setUserfeatures(response.data);
                    console.log(response.data, "ddd");
                } catch (error) {
                    console.log(error);
                }
            };

            // Call the API only when userfeatures change
            if (userfeaturesChanged(userfeatures, updateUserFeatures)) {
                updateUserFeatures();
            }
        }, [userfeatures, config.baseUrl, userid, headers]);

        const userfeaturesChanged = (newUserFeatures, callback) => {
            // Compare the new and previous userfeatures values
            const userfeaturesChanged = JSON.stringify(newUserFeatures) !== JSON.stringify(userfeatures);

            // If changed, execute the callback
            if (userfeaturesChanged && typeof callback === 'function') {
                return true;
            }

            return false;
        };
        return (
            <div className='absolute w-screen h-screen top-0 left-0 bg-black/10 flex justify-center items-center '
                onClick={() => { setUserpopup(false); }} >
                <div className='bg-white w-10/12 h-[80%] rounded-lg p-4' onClick={(event) => { event.stopPropagation(); }}>
                    <div className='text-xl font-bold'>User Details</div>
                    {userdetail && <div className='bg-white p-2 rounded-sm flex flex-col'>
                        <div className='font-semibold'>{userdetail.email}</div>
                        <label htmlFor="toggleExcel" className="flex items-center cursor-pointer">
                            <span>Excel Feature</span>
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    id="toggleExcel"
                                    className="sr-only"
                                    checked={userfeatures.excel_feature}
                                    onChange={() => handleFeatureToggle('excel_feature')}
                                />
                                <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                                <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                            </div>
                        </label>

                        <label htmlFor="toggleImage" className="flex items-center cursor-pointer">
                            <span>Image Feature</span>
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    id="toggleImage"
                                    className="sr-only"
                                    checked={userfeatures.image_feature}
                                    onChange={() => handleFeatureToggle('image_feature')}
                                />
                                <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                                <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                            </div>
                        </label>

                        <label htmlFor="toggleMessaging" className="flex items-center cursor-pointer">
                            <span>Messaging Feature</span>
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    id="toggleMessaging"
                                    className="sr-only"
                                    checked={userfeatures.messaging_feature}
                                    onChange={() => handleFeatureToggle('messaging_feature')}
                                />
                                <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                                <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                            </div>
                        </label>

                        <br />
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
                <div className='flex-1 p-5'>
                    <div className=' text-3xl font-bold'>Users</div>
                    <div className='flex flex-wrap gap-4'>
                        {userdata && userdata.map((user) => (
                            <>
                                <div key={user.id} className='bg-white p-2 rounded-sm flex flex-col'>
                                    <div className='font-semibold'>{user.email}</div>
                                    <div className='text-sm bg-[#064A42] max-w-max text-white px-2 rounded-md cursor-pointer select-none self-end border border-[#064A42] hover:text-[#064A42] hover:bg-white'
                                        onClick={() => { HandleUserDetails(user.id) }}
                                    >more details</div>
                                </div>
                                {userpopup && <div>
                                    <UserDetails userid={user.id} />

                                </div>
                                }
                            </>
                        ))}
                    </div>

                </div>
            </div>
        </>
    )
}

export default Users