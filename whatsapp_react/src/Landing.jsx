import React, { useEffect, useState } from 'react'
import uimock from "./Icons/65968.png"
import backdrop from "./Icons/backdrop.png"
import json from "./Icons/CountryCodes.json"
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import Cookies from "js-cookie";
import axios from 'axios'
import config from './config';

function Landing() {
    const accessToken = Cookies.get("accessToken") || "";
    const [options, setOptions] = useState();
    const is_distributor = accessToken && jwtDecode(accessToken).user_is_distributor;
    const is_staff = accessToken && jwtDecode(accessToken).user_is_staff;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [selectedCode, setSelectedCode] = useState();
    const [phone, setPhone] = useState('');
    const [issueDescription, setIssueDescription] = useState('');


    useEffect(() => {
        setOptions(json)
    }, [])

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare data to be sent in the request
        const formData = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            code: selectedCode,
            phone,
            issue_description: issueDescription,
        };

        try {

            const response = await axios.post(`${config.baseUrl}contact-form/`, formData);


            console.log(response.data);
        } catch (error) {
            console.error('Error submitting the form:', error);
        }


    }



    return (
        <div className=' w-screen h-[100%] overflow-hidden '>
            <div className='bg-[#083929] text-[#f0f0f0] flex justify-between px-16 py-4 max-sm:px-2 max-sm:text-sm'>
                <div className=''>logo</div>
                <div className='flex gap-6 text-sm font-medium max-sm:text-xs max-sm:gap-0' >
                    <button className='p-2 hover:text-[#1a4735] hover:bg-[#eaeeec] rounded-lg'><Link to='#contact'>Contact Us</Link></button>
                    <button className='p-2 hover:text-[#1a4735] hover:bg-[#eaeeec] rounded-lg'>{accessToken ? <Link to={is_staff ? '/admin/messages' : (is_distributor ? '/distributor/users' : '/messages')}>Go to Module</Link> : <Link to='/login'>Login  |  SignUp</Link>}</button>
                </div>
            </div>

            <section className='flex flex-col gap-3 w-full text-center bg-[#f0f0f0]  text-[#000] '>
                <div className=' font-bold text-5xl p-14 px-20 leading-snug max-md:p-1 max-md:text-3xl max-sm:text-lg'>Introducing Alt WhatsApp <br></br> Your Ultimate WhatsApp Marketing Companion!</div>
                <div className='max-sm:text-xs'>Get started now for enhanced outreach and engagement.</div>
                <div className='flex gap-16 justify-center text-[#f0f0f0] py-10 max-sm:gap-4'>
                    <button className='bg-[#2f2e2e] px-5 py-2 rounded-full hover:bg-[#f0f0f0] hover:text-[#2f2e2e] hover:border border border-[#2f2e2e] max-sm:p-2 max-sm:text-xs'>Try Demo</button>
                    <button className='bg-[#2f2e2e] px-5 py-2 rounded-full hover:bg-[#f0f0f0] hover:text-[#2f2e2e] hover:border border border-[#2f2e2e] max-sm:p-2 max-sm:text-xs' ><Link to='/login'>Get Started</Link></button>
                </div>
            </section>
            <section className='flex justify-center items-center gap-7 w-full text-center bg-[#f0f0f0] py-10 max-sm:py-2'>
                <iframe className='w-10/12 aspect-video' src="https://www.youtube.com/embed/GmK43VVcsWc" title="How to Send Bulk WhatsApp Messages using the official WhatsApp Cloud APIs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </section>

            <section className='flex flex-col gap-20 w-full text-center bg-[#f0f0f0] text-[#000] max-sm:gap-5 '>
                <div className=' font-extrabold text-3xl pt-20 px-20 leading-snug max-sm:pt-3'>Why Alt WhatsApp?</div>
                <div className='flex gap-32 justify-center px-28 max-sm:gap-3 max-sm:px-4 max-md:gap-6 max-md:px-6 '>
                    <div className='w-5/12  overflow-hidden rounded-2xl transition-shadow '>
                        <img className='w-full aspect-video hover:shadow-2xl' src="https://img.freepik.com/free-vector/businessmen-shaking-hands-through-display-video-call-smart-phone-internet-business-concept-cartoon-character-vector-illustration_1150-56245.jpg" alt="" />
                    </div>
                    <div className='w-5/12 text-start flex flex-col gap-4 max-sm:text-[8px]'>
                        <div>Advanced Automation Tools</div>
                        <div>Empower your WhatsApp marketing strategy with Alt WhatsApp's cutting-edge automation tools. Streamline messaging, scheduling, and customer interactions effortlessly, saving time and enhancing efficiency.</div>
                    </div>
                </div>
                <div className='flex gap-32 justify-center px-28 max-sm:gap-3 max-sm:px-4  max-md:gap-6 max-md:px-6'>
                    <div className='max-w-sm text-start flex flex-col gap-4 max-sm:text-[8px]'>
                        <div>Enhanced Analytics and Insights</div>
                        <div>Gain valuable insights into your WhatsApp marketing campaigns with Alt WhatsApp. Track performance metrics, analyze user engagement, and make data-driven decisions to optimize your outreach and maximize results.</div>
                    </div>
                    <div className='max-w-sm  overflow-hidden rounded-2xl hover:shadow-2xl transition-shadow '>
                        <img className='w-full aspect-video' src="https://img.freepik.com/free-vector/businessmen-shaking-hands-through-display-video-call-smart-phone-internet-business-concept-cartoon-character-vector-illustration_1150-56245.jpg" alt="" />
                    </div>
                </div>
            </section>

            <section id='contact' className='flex flex-col justify-center items-center gap-7 w-full text-center bg-[#afd5be] text-[#f0f0f0] py-10'>
                <div className='flex gap-8 '>
                    <div className='px-3 py-1  bg-[#282626] cursor-pointer hover:bg-[#f0f0f0] hover:text-[#282626] max-sm:text-xs'>MARKETING</div>
                    <div className='px-3 py-1 bg-[#282626] cursor-pointer hover:bg-[#f0f0f0] hover:text-[#282626] max-sm:text-xs '>MARKETING</div>
                    <div className='px-3 py-1 bg-[#282626] cursor-pointer hover:bg-[#f0f0f0] hover:text-[#282626] max-sm:text-xs '>MARKETING</div>
                    <div className='px-3 py-1 bg-[#282626] cursor-pointer hover:bg-[#f0f0f0] hover:text-[#282626] max-sm:text-xs '>MARKETING</div>
                </div>
                <div className='bg-[#fff] text-[#000] p-10 rounded-2xl flex flex-col gap-4 w-7/12 max-sm:w-10/12'>
                    <div>Talk to Us</div>
                    <form onSubmit={handleSubmit}>
                        <div className='flex gap-8 flex-wrap'>
                            <label className='flex flex-col text-left'>
                                First Name
                                <input type="text" className='input-border' required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </label>
                            <label className='flex flex-col text-left'>
                                Last Name
                                <input type="text" className='input-border' required value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </label>
                        </div>
                        <div className='flex '>
                            <label className='flex flex-1 flex-col text-left'>
                                Email
                                <input type="email" className='input-border' required value={email} onChange={(e) => setEmail(e.target.value)} />
                            </label>
                        </div>
                        <div className='flex gap-8 flex-wrap'>
                            <label className='flex flex-col text-left w-28'>
                                Code
                                <select type="text" className='input-border' required value={selectedCode} onChange={(e) => setSelectedCode(e.target.value)}>
                                    {options && options.map((i) => (
                                        <option key={i.code} value={i.code} selected={i.dial_code === '+91'}>
                                            {i.code}
                                            &nbsp;&nbsp;{i.dial_code}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label className='flex flex-col text-left'>
                                Phone
                                <input type="number" className='input-border' required value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </label>
                        </div>
                        <div className='flex gap-8'>
                            <label className='flex flex-col text-left flex-1'>
                                Issue Description
                                <textarea type="text" className='input-border' required value={issueDescription} onChange={(e) => setIssueDescription(e.target.value)} />
                            </label>
                        </div>
                        <button type="submit" className='w-full bg-[#1a4735] text-white mt-5 rounded-md'>Submit</button>
                    </form>
                </div>

            </section>
            <section className='flex flex-col items-center gap-3 w-full text-center bg-[#f0f0f0]  text-[#000] '>
                <h2 className=' font-bold text-5xl p-10 px-20 leading-snug max-md:p-1 max-md:text-3xl max-sm:text-lg'>Revolutionizing Business Marketing</h2>
                <div className='max-w-xl max-sm:text-xs px-3'>Revolutionize your business marketing strategies with Alt WhatsApp! Seamlessly connect with your audience, streamline communication, and unlock new possibilities for growth. Elevate your brand's presence and engagement on WhatsApp like never before.
                </div>
            </section>
            <section className='flex flex-col justify-center items-center gap-7 w-full text-center bg-[#afd5be] py-10 px-28 max-sm:px-4'>
                <h2 className=' font-bold text-5xl p-14 px-20 leading-snug  text-[#221231] max-md:p-1 max-md:text-3xl max-sm:text-lg'>Plan and Pricing</h2>
                <div className='flex justify-evenly gap-4 max-sm:text-xs max-sm:gap-4'>
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
                <div class="footer-2 bg-gray-800 pt-6 md:pt-12">
                    <div class="container px-4 mx-auto">

                        <div class="md:flex md:flex-wrap md:-mx-4 py-6 md:pb-12">

                            <div class="footer-info lg:w-1/3 md:px-4">
                                <h4 class="text-white text-2xl mb-4">ALTOS CONNECT</h4>
                                <p class="text-gray-400">Empower your WhatsApp marketing strategy with Alt WhatsApp's cutting-edge automation tools. Streamline messaging, scheduling, and customer interactions effortlessly, saving time and enhancing efficiency.</p>
                                <div class="mt-4">
                                    {/* <button class="bg-facebook py-2 px-4 text-white rounded mt-2 transition-colors duration-300">
                                        <span class="fab fa-facebook-f mr-2"></span> Follow
                                    </button>
                                    <button class="bg-twitter py-2 px-4 text-white rounded ml-2 mt-2 transition-colors duration-300">
                                        <span class="fab fa-twitter mr-2"></span> Follow @freeweb19
                                    </button> */}
                                </div>
                            </div>

                            <div class="md:w-2/3 lg:w-1/3 md:px-4 xl:pl-16 mt-12 lg:mt-0">
                                <div class="sm:flex">
                                    <div class="sm:flex-1">
                                        <h6 class="text-base font-medium text-white uppercase mb-2">About</h6>
                                        <div>
                                            <a href="#" class="text-gray-400 py-1 block hover:underline">Company</a>
                                            <a href="#" class="text-gray-400 py-1 block hover:underline">Culture</a>
                                            <a href="#" class="text-gray-400 py-1 block hover:underline">Team</a>
                                            <a href="#" class="text-gray-400 py-1 block hover:underline">Careers</a>
                                        </div>
                                    </div>
                                    <div class="sm:flex-1 mt-4 sm:mt-0">
                                        <h6 class="text-base font-medium text-white uppercase mb-2">What we offer</h6>
                                        <div>
                                            <a href="#" class="text-gray-400 py-1 block hover:underline">Blocks</a>
                                            <a href="#" class="text-gray-400 py-1 block hover:underline">Resources</a>
                                            <a href="#" class="text-gray-400 py-1 block hover:underline">Tools</a>
                                            <a href="#" class="text-gray-400 py-1 block hover:underline">Tutorials</a>
                                            <a href="#" class="text-gray-400 py-1 block hover:underline">Freebies</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="md:w-1/3 md:px-4 md:text-center mt-12 lg:mt-0">
                                <h5 class="text-lg text-white font-medium mb-4">Explore our site</h5>
                                <button class="bg-indigo-600 text-white hover:bg-indigo-700 rounded py-2 px-6 md:px-12 transition-colors duration-300">Explore</button>
                            </div>

                        </div>

                    </div>

                    <div class="border-t border-solid border-gray-900 mt-4 py-4">
                        <div class="container px-4 mx-auto">

                            <div class="md:flex md:-mx-4 md:items-center">
                                <div class="md:flex-1 md:px-4 text-center md:text-left">
                                    <p class="text-white">&copy; <strong>FWR</strong></p>
                                </div>
                                <div class="md:flex-1 md:px-4 text-center md:text-right">
                                    <a href="#" class="py-2 px-4 text-white inline-block hover:underline">Terms of Service</a>
                                    <a href="#" class="py-2 px-4 text-white inline-block hover:underline">Privacy Policy</a>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </section>
        </div >
    )
}

export default Landing