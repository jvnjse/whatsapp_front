import React from 'react'
import whatsappwallpaper from "../Icons/whatsappwallpaper.jpg"

function CreateTemplate() {
    return (
        <div className='w-10/12 bg-white mt-10 p-5 rounded-xl'>
            <div className=' text-[#0d291a] text-2xl font-bold select-none'>Create Template</div>
            <div>

                <div className=' flex justify-between'>
                    <div className=' flex-1 flex flex-col px-5 mt-2 gap-2'>
                        <div>
                            <label className=' flex flex-col' htmlFor='header'>Header
                                <input type="text" placeholder='' id="header" className='border border-gray-400 rounded-md h-9 px-3' />
                            </label>
                            <label className=' flex flex-col' htmlFor='text-body'>Text Body
                                <input type="text" placeholder='' id="text-body" className='border border-gray-400 rounded-md h-9 px-3' />
                            </label>
                            <label className=' flex flex-col' htmlFor='footer-body'>Footer
                                <input type="text" placeholder='' id="footer-body" className='border border-gray-400 rounded-md h-9 px-3' />
                            </label>
                        </div>
                    </div>
                    <div className=' wallpaper-bg w-1/5 p-3'>
                        <div className=' bg-[#262d31] text-white px-2 py-1 rounded-r-md rounded-bl-md'>
                            <div className=' font-semibold'>Altos Test</div>
                            <div className=' font-thin text-sm'>ddccbdchbhj dgvdgvdgvb</div>
                            <div className=' font-sans text-[10px] text-white/70 border-b border-white/70'>Altos Test</div>
                            <div className='text-center text-xs font-semibold text-blue-300 py-1'>Visit Site</div>
                        </div>
                    </div>

                </div>
                <div>
                    <div className=' text-[#0d291a] text-lg font-bold select-none mt-4'>Button Action</div>
                    <select className=' border border-gray-400 text-sm'>
                        <option value="">Select an option</option>
                        <option value="URL">URL Button</option>
                        <option value="PHONE_NUMBER">Call Button</option>
                    </select>
                    <label className=' flex flex-col' htmlFor='button-text'>Button Text
                        <input type="text" name="" id="button-text" className='border border-gray-400 rounded-md h-9 px-3' />
                    </label>
                </div>
            </div>
        </div>
    )
}

export default CreateTemplate