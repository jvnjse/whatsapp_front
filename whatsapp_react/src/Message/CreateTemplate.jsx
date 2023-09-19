import React, { useState } from 'react'
import whatsappwallpaper from "../Icons/whatsappwallpaper.jpg"
import axios from "axios"

function CreateTemplate(props) {
    const [selectedOption, setSelectedOption] = useState('');
    const [templatename, settemplatename] = useState(' ')
    const [headertext, setheadertext] = useState(' ')
    const [bodytext, setbodytext] = useState(' ')
    const [footertext, setfootertext] = useState(' ')
    const [buttontext, setbuttontext] = useState(' ')
    const [buttoncontent, setbuttoncontent] = useState(' ')
    const [loading, setloading] = useState(false)



    const getApiUrl = (option) => {
        switch (option) {
            case 'URL':
                return 'http://127.0.0.1:8000/post_template/site';
            case 'PHONE_NUMBER':
                return 'http://127.0.0.1:8000/post_template/call';
            default:
                return 'http://127.0.0.1:8000/post_template/text';
        }
    };

    console.log(getApiUrl)



    const data = (option) => {
        switch (option) {
            case 'URL':
                return {
                    'template_name': templatename,
                    'header_text': headertext,
                    'body_text': bodytext,
                    'footer_text': footertext,
                    'button_text': buttontext,
                    'button_url': buttoncontent,
                };
            case 'PHONE_NUMBER':
                return {
                    'template_name': templatename,
                    'header_text': headertext,
                    'body_text': bodytext,
                    'footer_text': footertext,
                    'button_text': buttontext,
                    'button_url': buttoncontent,
                };
            default:
                return {
                    'template_name': templatename,
                    'header_text': headertext,
                    'body_text': bodytext,
                    'footer_text': footertext,
                    'button_text': "buttontext",
                    'button_url': "buttoncontent",
                };
        }
    };

    // const data = {
    //     'template_name': templatename,
    //     'header_text': headertext,
    //     'body_text': bodytext,
    //     'footer_text': footertext,
    //     'button_text': buttontext,
    //     'button_url': buttoncontent,
    // }


    const ModalClose = () => {
        props.settextTemplate(false)
    }
    const CreateTemplateApi = () => {
        const apiUrl = getApiUrl(selectedOption)
        // axios.post
        // console.log(apiUrl)
        setloading(true)
        axios.post(apiUrl, data(selectedOption))
            .then((response) => {
                console.log(response.data)
                ModalClose()
                setloading(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }


    console.log("data", data(selectedOption))
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    return (
        <>
            <div className='w-10/12 bg-white mt-10 p-10 rounded-xl min-h-fit' onClick={props.handleClick}>
                <div className=' text-[#0d291a] text-2xl font-bold select-none'>Create Template</div>
                <div>
                    <div className=' flex justify-between'>
                        <div className=' flex-1 flex flex-col px-5 mt-2 gap-2'>
                            <label className=' flex flex-col' htmlFor='header'>Template Name
                                <input type="text" placeholder='' id="header" className='lowercase border border-gray-400 rounded-md h-9 px-3'
                                    onChange={(e) => {
                                        const inputValue = e.target.value;
                                        const textWithUnderscores = inputValue.replace(/ /g, '_');
                                        settemplatename(textWithUnderscores);
                                    }} />
                            </label>
                            <div>
                                <label className=' flex flex-col' htmlFor='header'>Header
                                    <input type="text" placeholder='' id="header" className='border border-gray-400 rounded-md h-9 px-3' onChange={(e) => { setheadertext(e.target.value) }} />
                                </label>
                                <label className=' flex flex-col' htmlFor='text-body'>Text Body
                                    <textarea type="text" placeholder='' id="text-body" className='border border-gray-400 rounded-md h-9 px-3' onChange={(e) => { setbodytext(e.target.value) }} />
                                </label>
                                <label className=' flex flex-col' htmlFor='footer-body'>Footer
                                    <input type="text" placeholder='' id="footer-body" className='border border-gray-400 rounded-md h-9 px-3' onChange={(e) => { setfootertext(e.target.value) }} />
                                </label>
                            </div>
                        </div>
                        <div className=' wallpaper-bg w-1/5 p-3'>
                            <div className=' font-semibold'>{templatename}</div>
                            <div className=' bg-[#262d31] text-white px-2 py-1 rounded-r-md rounded-bl-md'>
                                <div className=' font-semibold'>{headertext}</div>
                                <div className=' font-thin text-sm'>{bodytext}</div>
                                <div className=' font-sans text-[10px] text-white/70 border-b border-white/70'>{footertext}</div>
                                <div className='text-center text-xs font-semibold text-blue-300 py-1'>{buttontext}</div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className=' text-[#0d291a] text-lg font-bold select-none mt-4'>Button Action</div>
                        <select
                            className=' border border-gray-400 text-sm'
                            value={selectedOption}
                            onChange={handleOptionChange}>
                            <option value="">No Button</option>
                            <option value="URL">URL Button</option>
                            <option value="PHONE_NUMBER">Call Button</option>
                        </select>
                        <label className=' flex flex-col' htmlFor='button-text'>Button Text
                            <input type="text" name="" id="button-text" className='border border-gray-400 rounded-md h-9 px-3' onChange={(e) => { setbuttontext(e.target.value) }} />
                        </label>
                        <label className=' flex flex-col' htmlFor='button-text'>Button Url/Number
                            <input type="text" name="" placeholder='add number with country code' id="button-text" className='border border-gray-400 rounded-md h-9 px-3' onChange={(e) => { setbuttoncontent(e.target.value) }} />
                        </label>
                        <button onClick={CreateTemplateApi} className='bg-[#064A42] text-white rounded-md'>submit</button>
                    </div>
                </div>
            </div>
            {loading && <div className=' absolute w-full h-full top-0 flex justify-center items-center bg-black/40'>
                <svg className='animate-spin' width="100px" height="100px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M12 3a9 9 0 0 1 9 9h-2a7 7 0 0 0-7-7V3z" fill='#ffffff' />
                    </g>
                </svg>
            </div>}
        </>
    )
}

export default CreateTemplate