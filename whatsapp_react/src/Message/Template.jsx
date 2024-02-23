import React, { useEffect, useState } from 'react'
import axios from 'axios';
import CreateTemplate from './CreateTemplate';
import ImageTemplate from './ImageTemplate';
import { AiOutlineDelete } from 'react-icons/ai';
import Cookies from "js-cookie";
import config from '../config';
import WhatsappModule from '../WhatsappModule';
import { jwtDecode } from 'jwt-decode';
import Personalised from './Personalised';
import PersonalisedImageTemplate from './PersonalisedImageTemplate';


function Template() {
    const [templates, setTemplates] = useState([]);
    const [create_template, setCreateTemplate] = useState(false)
    const [textTemplate, settextTemplate] = useState(false)
    const [imageTemplate, setimageTemplate] = useState(false)
    const [personalisedTemplate, setPersonalisedTemplate] = useState(false)
    const [personalisedImageTemplate, setPersonalisedImageTemplate] = useState(false)
    const [selectedTemplateName, setSelectedTemplateName] = useState('');
    const [loading, setloading] = useState(false)
    const accessToken = Cookies.get("accessToken")
    const userid = jwtDecode(accessToken).user_id;
    const ft = Cookies.get("ft")
    const basic_feature = jwtDecode(ft).basic_feature;
    const standard_feature = jwtDecode(ft).standard_feature;
    const advanced_feature = jwtDecode(ft).advanced_feature;
    console.log(basic_feature)



    const handleClick = (event) => {
        event.stopPropagation();
    };

    const handleDeleteClick = (templateName) => {
        setSelectedTemplateName(templateName);
        if (selectedTemplateName) {
            DeleteApiCall()
        }
        else {

        }
    };
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
    }


    const DeleteApiCall = () => {
        setloading(true)
        const data = {}
        axios.post(`${config.baseUrl}delete/template?template_name="${selectedTemplateName}"&user_id=${userid}`, data, { headers: headers })
            .then((response) => {
                //console.log(response.data)
                setloading(false)
                GetTemplates()
            })
            .catch((error) => {
                setloading(false)
                //console.log(error)
            })
    }

    const GetTemplates = () => {
        axios.get(`${config.baseUrl}get_templates/lists?user_id=${userid}`, { headers: headers })
            .then((response) => {
                //console.log('ghujhjhj')
                const extractedData = response.data.data.map((template) => ({
                    id: template.id,
                    name: template.name,
                    status: template.status,
                    text: template.components.find((component) => component.type === 'HEADER')?.text || '',
                }));
                setTemplates(extractedData);
                //console.log("template", extractedData)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    useEffect(() => {
        GetTemplates()
    }, [personalisedImageTemplate, textTemplate, personalisedTemplate, imageTemplate]);



    const [activeButton, setActiveButton] = useState(null);
    const handleMouseEnter = (buttonIndex) => {
        setTimeout(() => {
            setActiveButton(buttonIndex);
        }, 1000);
    };

    const handleMouseLeave = () => {
        setTimeout(() => {
            setActiveButton(null);
        }, 500);
    }

    return (
        <div className=' w-11/12 bg-[#ECE5DD] flex justify-between h-screen  rounded-2xl overflow-x-auto'>
            <div className='h-full'>
                <WhatsappModule select={"template"} />
            </div>
            <div className='p-5 flex-1' onClick={() => {
                if (create_template == true) {
                    setCreateTemplate(false)
                }
            }}>
                <div className='flex items-center justify-between px-4'>
                    <div className=' text-[#0d291a] text-4xl font-bold select-none'>Message Templates</div>
                    <div className='relative'>
                        <div className=' bg-[#0d291a] text-white px-2 py-1 rounded-lg cursor-pointer select-none ' onClick={() => { setCreateTemplate(!create_template) }}>Create Template
                        </div>
                        {create_template &&
                            <div className=' bg-white absolute z-20 top-2 right-2 rounded-lg' onClick={handleClick}>
                                {basic_feature && <>
                                    <li className='list-none border-b border-gray-500 text-center px-3 py-2 whitespace-nowrap select-none cursor-pointer hover:bg-slate-100' onClick={() => { settextTemplate(true) }}>Text Template</li>
                                    <li className='list-none border-b border-gray-500 text-center px-3 py-2 whitespace-nowrap select-none cursor-pointer hover:bg-slate-100 relative' onMouseEnter={() => handleMouseEnter(1)}
                                        onMouseLeave={handleMouseLeave}>Image Template
                                        {activeButton === 1 && <div className='absolute bg-[#0d291a] left-[-220px] text-white text-[12px] px-2 py-1 w-[220px] rounded-lg shadow-md'>Upgrade Plan to Avail </div>}
                                    </li>
                                    <li className='list-none border-b border-gray-500 text-center px-3 py-2 whitespace-nowrap select-none cursor-pointer hover:bg-slate-100 relative' onMouseEnter={() => handleMouseEnter(2)}
                                        onMouseLeave={handleMouseLeave}>Personalised Template
                                        {activeButton === 2 && <div className='absolute bg-[#0d291a] left-[-220px] text-white text-[12px] px-2 py-1 w-[220px] rounded-lg shadow-md'>Upgrade Plan to Avail </div>}
                                    </li>
                                    <li className='list-none border-b border-gray-500 text-center px-3 py-2 whitespace-nowrap select-none cursor-pointer hover:bg-slate-100 relative' onMouseEnter={() => handleMouseEnter(3)}
                                        onMouseLeave={handleMouseLeave}>Personalised Image Template
                                        {activeButton === 3 && <div className='absolute bg-[#0d291a] left-[-220px] text-white text-[12px] px-2 py-1 w-[220px] rounded-lg shadow-md'>Upgrade Plan to Avail </div>}
                                    </li>
                                </>}
                                {standard_feature && <>
                                    <li className='list-none border-b border-gray-500 text-center px-3 py-2 whitespace-nowrap select-none cursor-pointer hover:bg-slate-100' onClick={() => { settextTemplate(true) }}>Text Template</li>
                                    <li className='list-none border-b border-gray-500 text-center px-3 py-2 whitespace-nowrap select-none cursor-pointer hover:bg-slate-100' onClick={() => { setimageTemplate(true) }}>Image Template</li>
                                    <li className='list-none border-b border-gray-500 text-center px-3 py-2 whitespace-nowrap select-none cursor-pointer hover:bg-slate-100 relative' onMouseEnter={() => handleMouseEnter(2)}
                                        onMouseLeave={handleMouseLeave}>Personalised Template
                                        {activeButton === 2 && <div className='absolute bg-[#0d291a] left-[-220px] text-white text-[12px] px-2 py-1 w-[220px] rounded-lg shadow-md'>Upgrade Plan to Avail </div>}
                                    </li>
                                    <li className='list-none border-b border-gray-500 text-center px-3 py-2 whitespace-nowrap select-none cursor-pointer hover:bg-slate-100 relative' onMouseEnter={() => handleMouseEnter(3)}
                                        onMouseLeave={handleMouseLeave}>Personalised Image Template
                                        {activeButton === 3 && <div className='absolute bg-[#0d291a] left-[-220px] text-white text-[12px] px-2 py-1 w-[220px] rounded-lg shadow-md'>Upgrade Plan to Avail </div>}
                                    </li>

                                </>}



                                {/* <li className='list-none border-b border-gray-500 text-center px-3 py-2 whitespace-nowrap select-none cursor-pointer hover:bg-slate-100' onClick={() => { settextTemplate(true) }}>Text Template</li>
                                <li className='list-none border-b border-gray-500 text-center px-3 py-2 whitespace-nowrap select-none cursor-pointer hover:bg-slate-100' onClick={() => { setimageTemplate(true) }}>Image Template</li>
                                <li className='list-none border-b border-gray-500 text-center px-3 py-2 whitespace-nowrap select-none cursor-pointer hover:bg-slate-100' onClick={() => { setPersonalisedTemplate(true) }}>Personalised Template</li>
                                <li className='list-none border-b border-gray-500 text-center px-3 py-2 whitespace-nowrap select-none cursor-pointer hover:bg-slate-100' onClick={() => { setPersonalisedImageTemplate(true) }}>Personalised Image Template</li> */}


                            </div>}
                    </div>
                </div>
                <div>
                    <table className="table-auto w-full mt-6 border border-gray-600">
                        <thead className='text-left bg-slate-500'>
                            <tr>
                                <th>Template Name</th>
                                <th>Title</th>
                                <th>Status</th>
                                <th>Delete Template</th>
                            </tr>
                        </thead>
                        <tbody >
                            {templates.map((template) => (
                                <tr key={template.id} >
                                    <td className='py-2 border-b border-gray-600'>{template.name}</td>
                                    <td className='py-2 border-b border-gray-600'>{template.text}</td>
                                    <td className='py-2 border-b border-gray-600'>{template.status}</td>
                                    <td className='py-2 border-b border-gray-600'>
                                        <div className='select-none cursor-pointer hover:bg-black hover:text-white w-min p-1 rounded-lg' onClick={() => handleDeleteClick(template.name)}><AiOutlineDelete /></div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {textTemplate &&
                <div className='absolute w-full h-full bg-black/30 top-0 left-0 flex justify-center' onClick={() => { settextTemplate(false) }} >
                    <CreateTemplate handleClick={handleClick} settextTemplate={settextTemplate} />
                </div>
            }
            {personalisedTemplate &&
                <div className='absolute w-full h-full bg-black/30 top-0 left-0 flex justify-center' onClick={() => { setPersonalisedTemplate(false) }} >
                    <Personalised handleClick={handleClick} setPersonalisedTemplate={setPersonalisedTemplate} />
                </div>
            }
            {personalisedImageTemplate &&
                <div className='absolute w-full h-full bg-black/30 top-0 left-0 flex justify-center' onClick={() => { setPersonalisedImageTemplate(false) }} >
                    <PersonalisedImageTemplate handleClick={handleClick} setPersonalisedImageTemplate={setPersonalisedImageTemplate} />
                </div>
            }
            {imageTemplate &&
                <div className='absolute w-full h-full bg-black/30 top-0 left-0 flex justify-center items-center' onClick={() => { setimageTemplate(false) }} >
                    {/* <CreateTemplate handleClick={handleClick} /> */}
                    <ImageTemplate handleClick={handleClick} setimageTemplate={setimageTemplate} />
                </div>
            }
            {loading && <div className=' absolute w-full h-full top-0 left-0 flex justify-center items-center bg-black/40'>
                <svg className='animate-spin' width="100px" height="100px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M12 3a9 9 0 0 1 9 9h-2a7 7 0 0 0-7-7V3z" fill='#ffffff' />
                    </g>
                </svg>
            </div>}
        </div>
    )
}

export default Template