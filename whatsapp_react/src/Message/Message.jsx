import React, { useEffect, useState } from 'react'
import axios from 'axios';
import whatsapplogo from "../Icons/whatsapp.png"

function Message() {
    const [phoneNumberInput, setPhoneNumberInput] = useState('');
    const [messagingbox, setMessagingbox] = useState(true)
    const [numberdata, setNumberdata] = useState([])
    const [templateData, setTemplateData] = useState();
    const [templateName, setTemplateName] = useState('');
    const [componentData, setcomponentData] = useState()



    const handleSubmit = async (e) => {
        e.preventDefault();

        const numbers = phoneNumberInput.split(',').map((number) => number.trim());
        const postData = {
            "numbers": numbers
        }
        try {
            const response = await axios.post('http://127.0.0.1:8000/sent-messages/', postData);
            console.log(response.data)

        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/phone-numbers/')
            .then((response) => {
                // console.log(response.data)
                setNumberdata(response.data)
            })
            .catch((error) => {
                console.log(error.data)
            })

        axios.get('http://127.0.0.1:8000/get_templates/')
            .then((response) => {
                console.log(response.data.data)
                setTemplateData(response.data.data)

            })
            .catch((error) => {
                console.log(error)
            })
    }, [])


    const handleSubmit2 = () => {
        axios.post('http://127.0.0.1:8000/sent-messages/data/')
            .then((response) => {
                console.log(response.data)

            })
            .catch((error) => {
                console.log(error.data)
            })
    }

    const handleSelectChange = (event) => {
        setTemplateName(event.target.value);
    };

    return (
        <div className=' p-5'>
            <div className=' text-[#0d291a] text-4xl font-bold select-none'>Send WhatsApp Message Templates</div>
            <div className=' flex gap-10 mt-4'>
                <div className={messagingbox ? 'cursor-pointer select-none py-1 px-2 text-lg bg-[#064A42] text-white rounded-md hover:shadow-xl' : 'py-1 px-2 text-lg bg-[white] rounded-md hover:shadow-xl'} onClick={() => { setMessagingbox(true) }}>Individual Messaging</div>
                <div className={messagingbox ? 'cursor-pointer select-none py-1 px-2 text-lg bg-white rounded-md hover:shadow-xl' : 'py-1 px-2 text-lg bg-[#064A42] text-white rounded-md hover:shadow-xl'} onClick={() => { setMessagingbox(false) }}>Bulk Messaging</div>
            </div>
            {messagingbox ?
                <>
                    <div className=' flex justify-between px-10 mt-7'>
                        <div className=' flex flex-col gap-1 w-full'>
                            <div className=' text-base font-semibold'>Add Numbers to Send Messages</div>
                            <div className=' text-[10px] font-thin'>Separate Numbers with a Coma</div>
                            <div>
                                <textarea
                                    type="text"
                                    name="" id=""
                                    className=' w-6/12 h-20 p-3'
                                    value={phoneNumberInput}
                                    onChange={(e) => setPhoneNumberInput(e.target.value)}
                                />
                            </div>
                            <div onClick={handleSubmit} className='flex justify-center items-center bg-[#064A42] max-w-max text-white py-1 px-2 rounded-lg uppercase font-bold text-xs tracking-widest	'>
                                <img className='h-6 object-contain' src={whatsapplogo} alt="" />
                                &nbsp;Send Message
                            </div>
                        </div>
                        <div>
                            <div>Select Templates</div>
                            <select value={templateName} onChange={handleSelectChange}>
                                <option value="">Select a name</option>

                                {templateData && templateData.map((item, index) => (
                                    <option key={index} value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                            {templateName && <p>Selected Name: {templateName}</p>}
                            <div class="bg-[#262d31] text-gray-300 rounded-tr-lg  rounded-bl-lg rounded-br-lg mb-4 px-4 py-2 mt-4">
                                <div className='font-bold'>Altos Test</div>
                                <div>
                                    This is a test message which is for testing the WhatsApp business API management.
                                </div>
                                <div className='font-thin text-xs'>Do not Reply</div>
                            </div>
                        </div>
                    </div>
                </> :
                <>
                    <div className='flex justify-between px-10 mt-7'>
                        <div className='flex flex-col gap-1 w-full'>
                            <div className=' text-base font-semibold'>List of Numbers</div>
                            <div className=' bg-white w-3/6 h-[400px] flex flex-col gap-1 items-center p-3 overflow-y-scroll'>
                                {numberdata.map((number) =>
                                    <div className='w-full border border-gray-500 text-center text-sm py-2 bg-gray-200 rounded-lg'>
                                        {number}
                                    </div>)}
                            </div>
                            <div onClick={handleSubmit2} className='flex justify-center items-center mt-4 bg-[#064A42] max-w-max text-white py-1 px-2 rounded-lg uppercase font-bold text-xs tracking-widest	'>
                                <img className='h-6 object-contain' src={whatsapplogo} alt="" />
                                &nbsp;Send Message
                            </div>
                        </div>
                        <div>
                            <div>Select Templates</div>
                            <select value={templateName} onChange={handleSelectChange}>
                                <option value="">Select a name</option>
                                {templateData && templateData.map((item, index) => (
                                    <option key={index} value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                            {templateName && <p>Selected Name: {templateName}</p>}
                            <div class="bg-[#262d31] text-gray-300 rounded-tr-lg  rounded-bl-lg rounded-br-lg mb-4 px-4 py-2 mt-4 tra">
                                <div className='font-bold'>Altos Test</div>
                                <div>
                                    This is a test message which is for testing the WhatsApp business API management.
                                </div>
                                <div className='font-thin text-xs'>Do not Reply</div>
                            </div>
                        </div>
                    </div>
                </>}
        </div>
    )
}

export default Message