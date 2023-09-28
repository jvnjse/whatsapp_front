import React, { useEffect, useState } from 'react'
import logo from "./Icons/altoslogo.png"
import Message from './Message/Message';
import Upload from './Message/Upload';
import Template from './Message/Template';
import axios from 'axios';
import Cookies from "js-cookie";
import Users from './Users/Users';

function ContainerBox() {
    const manager = Cookies.get("isManager")
    const accessToken = Cookies.get("accessToken")
    const [activeComponent, setActiveComponent] = useState("sent-message");
    const [adminuser, setadminuser] = useState(false)
    const handleLinkClick = (componentName) => {
        setActiveComponent(componentName);
    };
    useEffect(() => {
        console.log(manager)
        if (manager == 'true') {
            setadminuser(true)
        } else {
            setadminuser(false)
        }
    }, [])

    const Logout = () => {
        Cookies.remove("accessToken")
        Cookies.remove("isManager")
        window.location.reload()

    }



    return (
        <div className=' w-11/12 bg-[#ECE5DD] flex justify-between min-h-[95%] rounded-2xl'>
            <img src="" alt="" />
            <div className='bg-[#064A42] pt-5  rounded-s-2xl'>
                <div className=' px-5'>
                    <img src={logo} alt="" className='h-10 object-contain' />
                </div>
                <ul className="space-y-2 text-base font-thin pt-8 select-none">
                    <li onClick={() => handleLinkClick('sent-message')} >
                        <a href="#" className={activeComponent === 'sent-message' ? "text-[#064A42] bg-[#ECE5DD] flex items-center space-x-3 p-2 whitespace-nowrap" : "whitespace-nowrap flex items-center space-x-3 p-2 text-white  rounded-md font-thin hover:bg-[#ECE5DD] hover:text-[#064A42]"}>
                            <span className='px-10'>Send Messages</span>
                        </a>
                    </li>
                    <li onClick={() => handleLinkClick('upload')}>
                        <a href="#" className={activeComponent === 'upload' ? "text-[#064A42] bg-[#ECE5DD] flex items-center space-x-3 p-2 whitespace-nowrap" : " whitespace-nowrap flex items-center space-x-3 p-2 text-white  rounded-md font-thin hover:bg-[#ECE5DD] hover:text-[#064A42]"}>
                            <span className='px-10'>Upload</span>
                        </a>
                    </li>
                    <li onClick={() => handleLinkClick('template')}>
                        <a href="#" className={activeComponent === 'template' ? "text-[#064A42] bg-[#ECE5DD] flex items-center space-x-3 p-2 whitespace-nowrap" : " whitespace-nowrap flex items-center space-x-3 p-2 text-white  rounded-md font-thin hover:bg-[#ECE5DD] hover:text-[#064A42]"}>
                            <span className='px-10'>Templates</span>
                        </a>
                    </li>
                    {adminuser &&
                        <li onClick={() => handleLinkClick('users')}>
                            <a href="#" className={activeComponent === 'users' ? "text-[#064A42] bg-[#ECE5DD] flex items-center space-x-3 p-2 whitespace-nowrap" : " whitespace-nowrap flex items-center space-x-3 p-2 text-white  rounded-md font-thin hover:bg-[#ECE5DD] hover:text-[#064A42]"}>
                                <span className='px-10'>Users</span>
                            </a>
                        </li>
                    }

                    <li onClick={Logout}>
                        <a href="#" className={activeComponent === 'logout' ? "text-[#064A42] bg-[#ECE5DD] flex items-center space-x-3 p-2 whitespace-nowrap" : " whitespace-nowrap flex items-center space-x-3 p-2 text-white  rounded-md font-thin hover:bg-[#ECE5DD] hover:text-[#064A42]"}>
                            <span className='px-10'>Logout</span>
                        </a>
                    </li>

                </ul>
            </div>
            <div className=' flex-1'>

                {activeComponent === 'sent-message' && <Message />}
                {activeComponent === 'upload' && <Upload />}
                {activeComponent === 'template' && <Template />}
                {activeComponent === 'users' && <Users />}

            </div>
        </div>
    )
}

export default ContainerBox