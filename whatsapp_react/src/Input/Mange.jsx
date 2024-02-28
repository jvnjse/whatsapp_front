import React, { useState } from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai';
import Cookies from "js-cookie";
import axios from 'axios';
import config from '../config';
import WhatsappModule from '../WhatsappModule';
import { jwtDecode } from 'jwt-decode';

function Mange() {
    const [phid, setPhid] = useState()
    const [whid, setWhid] = useState()
    const [accesstoken, setAccesstoken] = useState()
    const [activeButton, setActiveButton] = useState(null);
    const accessToken = Cookies.get("accessToken")
    const userid = jwtDecode(accessToken).user_id;
    const [loading, setloading] = useState(false)


    const data = {
        "user_id": userid,
        "phone_number_id": phid,
        "whatsapp_business_id": whid,
        "permanent_access_token": accesstoken
    }
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
    }

    const UploadCredentials = (e) => {
        e.preventDefault()
        setloading(true)
        axios.post(`${config.baseUrl}upload/credentials`, data, { headers: headers })
            .then((response) => {
                //console.log(response.data)
                setPhid('')
                setWhid('')
                setAccesstoken('')
                setloading(false)
            })
            .catch((error) => {
                //console.log(error)
                setloading(false)
            })
    }


    const handleMouseEnter = (buttonIndex) => {
        setTimeout(() => {
            setActiveButton(buttonIndex);
        }, 1000);
    };

    const handleMouseLeave = () => {
        setTimeout(() => {
            setActiveButton(null);
        }, 500);
    };
    return (
        <div className=' w-full bg-[#ECE5DD] flex justify-between h-screen  rounded-2xl overflow-x-auto'>
            <div className='h-full'>
                <WhatsappModule select={"manage"} />
            </div>
            <div className='p-5 flex-1'>
                <div className=' text-[#0d291a] text-4xl font-bold select-none'>Manage Credentials</div>
                <form onSubmit={UploadCredentials} className='pt-5 flex flex-col gap-4 w-7/12'>
                    <label className=' flex flex-col' htmlFor='whatsapp_id'>
                        <div className=' flex justify-between'>
                            <div>Phone Number Id</div>
                            <div className=' cursor-help relative'
                                onMouseEnter={() => handleMouseEnter(1)}
                                onMouseLeave={handleMouseLeave}>
                                <AiOutlineInfoCircle />
                                {activeButton === 1 && <div className='absolute bg-[#f2efeb] text-black text-[8px] px-2 py-1 w-[220px] rounded-lg shadow-md'>get the phone number id from whatsapp Credentials manager in the facebook developer console</div>}
                            </div>
                        </div>
                        <input required type="text" placeholder='' id="whatsapp_id" className='border border-gray-400 rounded-md h-9 px-3' value={phid} onChange={(e) => { setPhid(e.target.value) }} />
                    </label>
                    <label className=' flex flex-col' htmlFor='business_id'>
                        <div className=' flex justify-between'>
                            <div>Whatsapp Business Id</div>
                            <div className=' cursor-help relative'
                                onMouseEnter={() => handleMouseEnter(2)}
                                onMouseLeave={handleMouseLeave}>
                                <AiOutlineInfoCircle />
                                {activeButton === 2 && <div className='absolute bg-[#f2efeb] text-black text-[8px] px-2 py-1 w-[220px] rounded-lg shadow-md'>get the whatsapp business id from whatsapp Credentials manager in the facebook developer console</div>}
                            </div>
                        </div>
                        <input required type="text" placeholder='' id="business_id" className='border border-gray-400 rounded-md h-9  px-3' value={whid} onChange={(e) => { setWhid(e.target.value) }} />
                    </label>
                    <label className=' flex flex-col' htmlFor='acccess_token'>
                        <div className=' flex justify-between'>
                            <div>Permanent Access Token</div>
                            <div className=' cursor-help relative'
                                onMouseEnter={() => handleMouseEnter(3)}
                                onMouseLeave={handleMouseLeave}>
                                <AiOutlineInfoCircle />
                                {activeButton === 3 && <div className='absolute bg-[#f2efeb] text-black text-[8px] px-2 py-1 w-[220px] rounded-lg shadow-md'>get the permanent access token from whatsapp Credentials manager in the facebook developer console</div>}
                            </div>
                        </div>
                        <input required type="text" placeholder='' id="acccess_token" className='border border-gray-400 rounded-md h-9 px-3' value={accesstoken} onChange={(e) => { setAccesstoken(e.target.value) }} />
                    </label>
                    <button className=' p-2 bg-[#0d291a] text-white w-min whitespace-nowrap rounded-lg self-end'>Submit Credentials</button>
                </form>
            </div>
            {loading && <div className=' absolute w-full h-full top-0 flex justify-center items-center bg-black/40'>
                <svg className='animate-spin' width="100px" height="100px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M12 3a9 9 0 0 1 9 9h-2a7 7 0 0 0-7-7V3z" fill='#ffffff' />
                    </g>
                </svg>
            </div>}
        </div>
    )
}

export default Mange