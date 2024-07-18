import React from 'react'
import WhatsappModule from '../WhatsappModule'

function Contacts() {
    return (
        <div className=' w-full bg-[#ECE5DD] flex justify-between h-screen  rounded-2xl overflow-x-auto'>
            <div className='h-full'>
                <WhatsappModule select={"contacts"} />
            </div>
            <div className='flex-1 p-5 h-screen overflow-y-scroll'>
                contactss
            </div>
        </div>
    )
}

export default Contacts