import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie";
import logo from "./Icons/altoslogo.png"

function WhatsappModule(props) {
    const manager = Cookies.get("isManager")
    const [activeComponent, setActiveComponent] = useState(props.select);
    const [adminuser, setadminuser] = useState(false)
    const handleLinkClick = (componentName) => {
        setActiveComponent(componentName);
    };
    useEffect(() => {
        if (manager == 'true') {
            setadminuser(true)
        } else {
            setadminuser(false)
        }
    }, [])

    const Logout = () => {
        Cookies.remove("accessToken")
        Cookies.remove("isManager")
        window.location.href = "/"

    }

    return (
        <div className='bg-[#064A42] pt-5  rounded-s-2xl h-full'>
            <div className=' px-5'>
                <img src={logo} alt="" className='h-10 object-contain' />
            </div>
            <ul className="space-y-2 text-base font-thin pt-8 select-none">
                <li onClick={() => handleLinkClick('sent-message')} >
                    <a href="/messages" className={activeComponent === 'sent-message' ? "text-[#064A42] bg-[#ECE5DD] flex items-center space-x-3 p-2 whitespace-nowrap" : "whitespace-nowrap flex items-center space-x-3 p-2 text-white  rounded-md font-thin hover:bg-[#ECE5DD] hover:text-[#064A42]"}>
                        <span className='px-10'>Send Messages</span>
                    </a>
                </li>
                <li onClick={() => handleLinkClick('upload')}>
                    <a href="/upload" className={activeComponent === 'upload' ? "text-[#064A42] bg-[#ECE5DD] flex items-center space-x-3 p-2 whitespace-nowrap" : " whitespace-nowrap flex items-center space-x-3 p-2 text-white  rounded-md font-thin hover:bg-[#ECE5DD] hover:text-[#064A42]"}>
                        <span className='px-10'>Upload</span>
                    </a>
                </li>
                <li onClick={() => handleLinkClick('template')}>
                    <a href="/template" className={activeComponent === 'template' ? "text-[#064A42] bg-[#ECE5DD] flex items-center space-x-3 p-2 whitespace-nowrap" : " whitespace-nowrap flex items-center space-x-3 p-2 text-white  rounded-md font-thin hover:bg-[#ECE5DD] hover:text-[#064A42]"}>
                        <span className='px-10'>Templates</span>
                    </a>
                </li>
                {adminuser &&
                    <li onClick={() => handleLinkClick('users')}>
                        <a href="/users" className={activeComponent === 'users' ? "text-[#064A42] bg-[#ECE5DD] flex items-center space-x-3 p-2 whitespace-nowrap" : " whitespace-nowrap flex items-center space-x-3 p-2 text-white  rounded-md font-thin hover:bg-[#ECE5DD] hover:text-[#064A42]"}>
                            <span className='px-10'>Users</span>
                        </a>
                    </li>
                }

                <li onClick={() => handleLinkClick('manage')}>
                    <a href="/manage" className={activeComponent === 'manage' ? "text-[#064A42] bg-[#ECE5DD] flex items-center space-x-3 p-2 whitespace-nowrap" : " whitespace-nowrap flex items-center space-x-3 p-2 text-white  rounded-md font-thin hover:bg-[#ECE5DD] hover:text-[#064A42]"}>
                        <span className='px-10'>Manage</span>
                    </a>
                </li>
                <li onClick={Logout}>
                    <a href="#" className={activeComponent === 'logout' ? "text-[#064A42] bg-[#ECE5DD] flex items-center space-x-3 p-2 whitespace-nowrap" : " whitespace-nowrap flex items-center space-x-3 p-2 text-white  rounded-md font-thin hover:bg-[#ECE5DD] hover:text-[#064A42]"}>
                        <span className='px-10'>Logout</span>
                    </a>
                </li>

            </ul>
        </div>
    )
}

export default WhatsappModule