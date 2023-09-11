import React, { useEffect, useState } from 'react'
import axios from 'axios';
import whatsapplogo from "../Icons/whatsapp.png"
import whatsappgif from "../Icons/whatsappgif.gif"

function Message() {
    const [phoneNumberInput, setPhoneNumberInput] = useState('');
    const [messagingbox, setMessagingbox] = useState(true)
    const [numberdata, setNumberdata] = useState([])
    const [templateData, setTemplateData] = useState();
    // const [templateName, setTemplateName] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);
    // const [componentData, setcomponentData] = useState()
    const [selectedHeaderText, setSelectedHeaderText] = useState('');
    const [selectedName, setSelectedName] = useState('');
    const [selectedBodyText, setSelectedBodyText] = useState('')
    const [selectedFooterText, setSelectedFooterText] = useState('')
    const [select, setSelect] = useState()


    // console.log("check", select)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const numbers = phoneNumberInput.split(',').map((number) => number.trim());
        const postData = {
            "numbers": numbers,
            "template_name": select

        }
        try {
            const response = await axios.post('http://127.0.0.1:8000/sent-messages/', postData);
            console.log(response.data)
            setPhoneNumberInput('')
            setSuccessMessage(true)
            setTimeout(() => {
                setSuccessMessage(false);
            }, 3000);

        } catch (error) {
            console.log(error)
        }
    };


    const handleSubmit2 = () => {
        axios.post(`http://127.0.0.1:8000/sent-messages/data/?template_name=${select}`)
            .then((response) => {
                console.log(response.data)
                setSuccessMessage(true)
                setTimeout(() => {
                    setSuccessMessage(false);
                }, 3000);

            })
            .catch((error) => {
                console.log(error.data)
            })
    }

    const handleSelectChange = (event) => {
        const name = event.target.value;
        setSelect(name)
        setSelectedName(name);
        const selectedComponent = templateData.components[templateData.names.indexOf(name)];
        if (selectedComponent) {
            const header = selectedComponent.find((component) => component.type === 'HEADER');
            setSelectedHeaderText(header ? header.text : '');
            const body = selectedComponent.find((component) => component.type === 'BODY');
            setSelectedBodyText(body.text);
            const footer = selectedComponent.find((component) => component.type === 'FOOTER');
            setSelectedFooterText(footer ? footer.text : '');
        } else {
            setSelectedHeaderText('');
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
                // console.log(response.data.data)
                setTemplateData(response.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <div className=' p-5'>
            <div className=' text-[#0d291a] text-4xl font-bold select-none'>Send WhatsApp Message Templates</div>
            <div className=' flex gap-10 mt-4'>
                <div className={messagingbox ? 'cursor-pointer select-none py-1 px-2 text-lg bg-[#064A42] text-white rounded-md hover:shadow-xl' : 'cursor-pointer select-none py-1 px-2 text-lg bg-[white] rounded-md hover:shadow-xl'} onClick={() => { setMessagingbox(true) }}>Individual Messaging</div>
                <div className={messagingbox ? 'cursor-pointer select-none py-1 px-2 text-lg bg-white rounded-md hover:shadow-xl' : 'cursor-pointer select-none py-1 px-2 text-lg bg-[#064A42] text-white rounded-md hover:shadow-xl'} onClick={() => { setMessagingbox(false) }}>Bulk Messaging</div>
            </div>
            {messagingbox ?
                <>
                    <div className=' flex justify-between px-10 mt-7 max-md:flex-col-reverse max-lg:flex-col-reverse'>
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
                            <div onClick={handleSubmit} className='select-none cursor-pointer flex justify-center items-center bg-[#064A42] max-w-max text-white py-1 px-2 rounded-lg uppercase font-bold text-xs tracking-widest	'>
                                <img className='h-6 object-contain' src={whatsapplogo} alt="" />
                                &nbsp;Send Message
                            </div>
                        </div>
                        <div>
                            <div>Select Templates</div>
                            <select value={selectedName} onChange={handleSelectChange}>
                                <option value="">Select a name</option>

                                {templateData && templateData.names.map((item, index) => (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                            <div class="bg-[#262d31] text-gray-300 rounded-tr-lg  rounded-bl-lg rounded-br-lg mb-4 px-4 py-2 mt-4 w-[300px]">
                                <div className='font-bold'>{selectedHeaderText && selectedHeaderText}</div>
                                <div>
                                    {selectedBodyText && selectedBodyText}
                                </div>
                                <div className='font-thin text-xs'>{selectedFooterText && selectedFooterText}</div>
                            </div>
                        </div>
                    </div>
                </> :
                <>
                    <div className='flex justify-between px-10 mt-7 max-md:flex-col-reverse max-lg:flex-col-reverse'>
                        <div className='flex flex-col w-full gap-1 pr-4'>
                            <div className=' text-base font-semibold'>List of Numbers</div>
                            <div className=' bg-white  flex flex-col gap-1 items-center p-3 overflow-y-scroll h-[400px]'>
                                {numberdata.map((number) =>
                                    <div className='w-full border border-gray-500 text-center text-sm py-2 bg-gray-200 rounded-lg'>
                                        {number}
                                    </div>)}
                            </div>
                            <div onClick={handleSubmit2} className='select-none cursor-pointer flex justify-center items-center mt-4 bg-[#064A42] max-w-max text-white py-1 px-2 rounded-lg uppercase font-bold text-xs tracking-widest	'>
                                <img className='h-6 object-contain' src={whatsapplogo} alt="" />
                                &nbsp;Send Message
                            </div>
                        </div>
                        <div>
                            <div>Select Templates</div>
                            <select value={selectedName} onChange={handleSelectChange}>
                                <option value="">Select a name</option>

                                {templateData && templateData.names.map((item, index) => (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                            <div class="bg-[#262d31] text-gray-300 rounded-tr-lg  rounded-bl-lg rounded-br-lg mb-4 px-4 py-2 mt-4 w-[300px]">
                                <div className='font-bold'>{selectedHeaderText && selectedHeaderText}</div>
                                <div className='text-sm'>
                                    {selectedBodyText && selectedBodyText}
                                </div>
                                <div className='font-thin text-xs'>{selectedFooterText && selectedFooterText}</div>
                            </div>
                        </div>
                    </div>
                </>}
            {successMessage && <div className="transition-all ease-in duration-1000 absolute w-full h-full bg-green-950/25 top-0 left-0 flex justify-center items-center">
                <div className='w-2/6 bg-white rounded-lg flex flex-col items-center p-7'>
                    <div>
                        <img src={whatsappgif} alt="" className=' w-20' />
                    </div>
                    <div className=' text-green-800 font-semibold'>
                        Message has been sent Successfully
                    </div>

                </div>

            </div>}
        </div>
    )
}

export default Message