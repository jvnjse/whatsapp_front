import React from 'react'
import AdminWhatsappModule from './AdminWhatsappModule'

function AdminPage() {
    return (
        <div className=' w-11/12 bg-[#ECE5DD] flex justify-between h-screen  rounded-2xl overflow-x-auto'>
            <div className='h-full'>
                <AdminWhatsappModule select={"admin_message"} />
            </div>
            <div className='flex-1 p-5'>
                <div className=' text-3xl font-bold'>DashBoard</div>
                <div className='flex gap-4'>
                    <div className='rounded-lg bg-white shadow-sm max-w-max p-3 mt-4'>
                        <div className='text-xl select-none'>Total No of Distributors</div>
                        <div className=' text-6xl'>54 <span className='text-lg'>distributors</span></div>

                    </div>
                    <div className='rounded-lg bg-white shadow-sm max-w-max p-3 mt-4'>
                        <div className='text-xl select-none'>Total No of Users</div>
                        <div className=' text-6xl'>54 <span className='text-lg'>users</span></div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default AdminPage