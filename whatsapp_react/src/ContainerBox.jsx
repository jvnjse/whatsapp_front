import React, { useState } from 'react'
import logo from "./Icons/altoslogo.png"
import Message from './Message/Message';
import Upload from './Message/Upload';
import Template from './Message/Template';

function ContainerBox() {
    const [activeComponent, setActiveComponent] = useState("sent-message");

    const handleLinkClick = (componentName) => {
        setActiveComponent(componentName);
    };
    return (
        <div className=' w-11/12 bg-[#ECE5DD] flex justify-between h-[95%] rounded-2xl'>
            <div className='bg-[#064A42] pt-5  rounded-s-2xl'>
                <div className=' px-5'>
                    <img src={logo} alt="" className='h-10 object-contain' />
                </div>
                <ul className="space-y-2 text-base font-thin pt-8 select-none">
                    <li onClick={() => handleLinkClick('sent-message')} >
                        <a href="#" className={activeComponent === 'sent-message' ? "text-[#064A42] bg-[#ECE5DD] flex items-center space-x-3 p-2" : "flex items-center space-x-3 p-2 text-white  rounded-md font-thin hover:bg-[#ECE5DD] hover:text-[#064A42]"}>
                            <span className='px-10'>Send Messages</span>
                        </a>
                    </li>
                    <li onClick={() => handleLinkClick('upload')}>
                        <a href="#" className={activeComponent === 'upload' ? "text-[#064A42] bg-[#ECE5DD] flex items-center space-x-3 p-2" : "flex items-center space-x-3 p-2 text-white  rounded-md font-thin hover:bg-[#ECE5DD] hover:text-[#064A42]"}>
                            <span className='px-10'>Upload</span>
                        </a>
                    </li>
                    <li onClick={() => handleLinkClick('template')}>
                        <a href="#" className={activeComponent === 'template' ? "text-[#064A42] bg-[#ECE5DD] flex items-center space-x-3 p-2" : "flex items-center space-x-3 p-2 text-white  rounded-md font-thin hover:bg-[#ECE5DD] hover:text-[#064A42]"}>
                            <span className='px-10'>Templates</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div className=' flex-1'>

                {activeComponent === 'sent-message' && <Message />}
                {activeComponent === 'upload' && <Upload />}
                {activeComponent === 'template' && <Template />}
            </div>
        </div>
    )
}

export default ContainerBox