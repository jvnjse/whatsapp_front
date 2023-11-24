import React, { useEffect, useState } from 'react'
import uimock from "./Icons/65968.png"
import backdrop from "./Icons/backdrop.png"
import { motion, useViewportScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import json from "./Icons/CountryCodes.json"

function Landing() {
    const { scrollYProgress } = useViewportScroll();
    const scale = useTransform(scrollYProgress, [0, 1], [1, 2]);
    const [options, setOptions] = useState();


    useEffect(() => {
        setOptions(json)

    }, [])

    console.log(options)




    return (
        <div className=' w-screen h-[100%] overflow-hidden '>
            {/* nav */}
            <div className='bg-[#083929] text-[#f0f0f0] flex justify-between px-16 py-4'>
                <div className=''>logo</div>
                <div className='flex gap-6 text-sm font-medium'>
                    <button className='p-2 hover:text-[#1a4735] hover:bg-[#eaeeec] rounded-lg'>Contact Us</button>
                    <button className='p-2 hover:text-[#1a4735] hover:bg-[#eaeeec] rounded-lg'><a href='/login'>Login  |  SignUp</a></button>
                </div>
            </div>
            {/* nav */}

            {/* <motion.div style={{
                scale
            }}
                className='flex justify-around relative  flex-wrap-reverse animate-section1'>
                xxx
            </motion.div> */}
            <section className='flex flex-col gap-3 w-full text-center bg-[#f0f0f0]  text-[#000] '>
                <div className=' font-bold text-5xl p-14 px-20 leading-snug'>Improve Your Audience with <br></br> ALT Whatsapp Module</div>
                <div>Get the Best ALT Whatsapp Module for Your Business Today</div>
                <div className='flex gap-16 justify-center text-[#f0f0f0] py-10'>
                    <button className='bg-[#2f2e2e] px-5 py-2 rounded-full hover:bg-[#f0f0f0] hover:text-[#2f2e2e] hover:border border border-[#2f2e2e]'>Request a Product Demo</button>
                    <button className='bg-[#2f2e2e] px-5 py-2 rounded-full hover:bg-[#f0f0f0] hover:text-[#2f2e2e] hover:border border border-[#2f2e2e]'>Get Started</button>
                </div>
            </section>
            <section className='flex justify-center items-center gap-7 w-full text-center bg-[#f0f0f0] py-10'>
                <iframe width="849" height="434" src="https://www.youtube.com/embed/GmK43VVcsWc" title="How to Send Bulk WhatsApp Messages using the official WhatsApp Cloud APIs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </section>

            <section className='flex flex-col gap-20 w-full text-center bg-[#f0f0f0] text-[#000] '>
                <div className=' font-extrabold text-3xl pt-20 px-20 leading-snug'>Any best points to high light about module</div>
                <div className='flex gap-32 justify-center px-28 '>
                    <div className='max-w-sm  overflow-hidden rounded-2xl hover:shadow-2xl transition-shadow '>
                        <img className='w-full' src="https://img.freepik.com/free-vector/businessmen-shaking-hands-through-display-video-call-smart-phone-internet-business-concept-cartoon-character-vector-illustration_1150-56245.jpg" alt="" />
                    </div>
                    <div className='max-w-sm text-start flex flex-col gap-4'>
                        <div>Point 1</div>
                        <div>Our ALT Whatsapp Module are made of high-quality materials to ensure durability and reliability. We offer products that are designed to meet the needs of our clients and provide the best possible value for their money.</div>
                    </div>
                </div>
                <div className='flex gap-32 justify-center px-28 '>
                    <div className='max-w-sm text-start flex flex-col gap-4'>
                        <div>Point 1</div>
                        <div>Our ALT Whatsapp Module are made of high-quality materials to ensure durability and reliability. We offer products that are designed to meet the needs of our clients and provide the best possible value for their money.</div>
                    </div>
                    <div className='max-w-sm  overflow-hidden rounded-2xl hover:shadow-2xl transition-shadow '>
                        <img className='w-full' src="https://img.freepik.com/free-vector/businessmen-shaking-hands-through-display-video-call-smart-phone-internet-business-concept-cartoon-character-vector-illustration_1150-56245.jpg" alt="" />
                    </div>
                </div>
            </section>

            <section className='flex flex-col justify-center items-center gap-7 w-full text-center bg-[#afd5be] text-[#f0f0f0] py-10'>
                <div className='flex gap-8 '>
                    <div className='px-3 py-1  bg-[#282626] cursor-pointer hover:bg-[#f0f0f0] hover:text-[#282626] '>MARKETING</div>
                    <div className='px-3 py-1 bg-[#282626] cursor-pointer hover:bg-[#f0f0f0] hover:text-[#282626] '>MARKETING</div>
                    <div className='px-3 py-1 bg-[#282626] cursor-pointer hover:bg-[#f0f0f0] hover:text-[#282626] '>MARKETING</div>
                    <div className='px-3 py-1 bg-[#282626] cursor-pointer hover:bg-[#f0f0f0] hover:text-[#282626] '>MARKETING</div>
                </div>
                <div className='bg-[#fff] text-[#000] p-10 rounded-2xl flex flex-col gap-4'>
                    <div>Talk to Us</div>
                    <div className='flex gap-8'>
                        <label className='flex flex-col text-left'>First Name<input type="text" className='input-border' /></label>
                        <label className='flex flex-col text-left'>Last Name<input type="text" className='input-border' /></label>
                    </div>
                    <div className='flex '>
                        {/* <label className='flex flex-col text-left'>First Name<input type="text" className='input-border' /></label> */}
                        <label className='flex flex-1 flex-col text-left'>Email<input type="email" className='input-border' /></label>
                    </div>
                    <div className='flex gap-8'>
                        <label className='flex flex-col text-left w-28'>Code
                            <select type="text" className='input-border ' >
                                {/* <option>shbhj</option> */}
                                {options && options.map((i) => (
                                    <option className='h-8' value={i.code}>
                                        {i.code}
                                        &nbsp;&nbsp;{i.dial_code}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label className='flex flex-col text-left'>Phone<input type="tel" className='input-border' /></label>
                    </div>
                    <div className='flex gap-8'>
                        <label className='flex flex-col text-left flex-1'>Issue Description<textarea type="text" className='input-border' /></label>
                        {/* <label className='flex flex-col text-left'>Last Name<input type="text" className='input-border' /></label> */}
                    </div>

                </div>

            </section>
            <section className='flex flex-col items-center gap-3 w-full text-center bg-[#f0f0f0]  text-[#000] '>
                <h2 className=' font-bold text-5xl p-14 px-20 leading-snug'>anything like market +<br /> audience+ whatsapp + <br /> engagemnt content</h2>
                <div className='max-w-xl'>This is a paragraph area where you can add your own text. Just click “Edit Text” or double click here to add your own content and make changes to the font. It's a great place to tell a story about your business and let users know more about you.
                </div>
            </section>
            <section className='flex flex-col justify-center items-center gap-7 w-full text-center bg-[#afd5be] py-10 px-28'>
                <h2 className=' font-bold text-5xl p-14 px-20 leading-snug  text-[#221231]'>Plan and Pricing</h2>
                <div className='flex gap-4 '>
                    <div>
                        <p>
                            Plan 1
                        </p>
                        <p>Describe your service here. What makes it great? Use short catchy text to tell people what you offer, and the benefits they will receive. A great description gets readers in the mood, and makes them more likely to go ahead and book.</p>
                    </div>
                    <div>
                        <p>
                            Plan 1
                        </p>
                        <p>Describe your service here. What makes it great? Use short catchy text to tell people what you offer, and the benefits they will receive. A great description gets readers in the mood, and makes them more likely to go ahead and book.</p>
                    </div>
                    <div>
                        <p>
                            Plan 1
                        </p>
                        <p>Describe your service here. What makes it great? Use short catchy text to tell people what you offer, and the benefits they will receive. A great description gets readers in the mood, and makes them more likely to go ahead and book.</p>
                    </div>
                </div>
            </section>
            <section>

            </section>
        </div >
    )
}

export default Landing