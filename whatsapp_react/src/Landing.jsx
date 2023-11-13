import React from 'react'
import uimock from "./Icons/65968.png"
import backdrop from "./Icons/backdrop.png"

function Landing() {
    return (
        <div className='bg-[#1a4735] w-screen text-[#eaeeec]'>
            {/* nav */}
            <div className='flex justify-between px-16 py-4'>
                <div className=''>logo</div>
                <div className='flex gap-6 text-sm font-medium'>
                    <button className='p-2 hover:text-[#1a4735] hover:bg-[#eaeeec] rounded-lg'>Contact Us</button>
                    <button className='p-2 hover:text-[#1a4735] hover:bg-[#eaeeec] rounded-lg'>Login  |  SignUp</button>
                </div>
            </div>
            {/* nav */}
            <section className='flex justify-around relative overflow-hidden flex-wrap-reverse'>
                <div className='flex-1 flex items-center justify-center  '>
                    <h2 className='text-4xl font-Quest font-semibold tracking-widest leading-snug'>Connect to Your Customers<br></br>Through WhatsApp</h2>
                </div>
                <div className='flex-1 flex justify-center'>
                    <img className='h-[500px] w-[500px] z-10' src={uimock} alt="" />
                </div>
                <img src={backdrop} alt="" className='absolute w-full opacity-5 top-0' />

            </section>

        </div>
    )
}

export default Landing