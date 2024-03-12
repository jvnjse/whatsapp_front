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
import TextTemplate from './TextTemplate';
import ImageTemplateNoButton from './ImageTemplateNoButton';


function Template() {
    const [templates, setTemplates] = useState([]);
    const [create_template, setCreateTemplate] = useState(false)
    const [textTemplate, settextTemplate] = useState(false)
    const [normaltextTemplate, setnormaltextTemplate] = useState(false)
    const [imageTemplate, setimageTemplate] = useState(false)
    const [imageTemplatenotbtn, setimageTemplatenotbtn] = useState(false)
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
    //console.log(basic_feature)



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
    }, [personalisedImageTemplate, textTemplate, personalisedTemplate, imageTemplate, normaltextTemplate, imageTemplatenotbtn]);



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
        <div className=' w-full bg-[#ECE5DD] flex justify-between h-screen  rounded-2xl overflow-x-auto'>
            <div className='h-full'>
                <WhatsappModule select={"template"} />
            </div>
            <div className='p-5 flex-1 h-screen overflow-y-scroll' onClick={() => {
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
                            <div className=' bg-white absolute z-10 top-2 right-2 rounded-lg' onClick={handleClick}>
                                {basic_feature && <>
                                    <li className='list-none border-b border-gray-500 text-center px-3 py-2 whitespace-nowrap select-none cursor-pointer hover:bg-slate-100' onClick={() => { setnormaltextTemplate(true) }}>Text Template</li>
                                    <li className='list-none border-b border-gray-500 text-center px-3 py-2 whitespace-nowrap select-none cursor-pointer hover:bg-slate-100' onMouseEnter={() => handleMouseEnter(4)}
                                        onMouseLeave={handleMouseLeave}>Text Template with Button
                                        {activeButton === 4 && <div className='absolute bg-[#0d291a] left-[-220px] text-white text-[12px] px-2 py-1 w-[220px] rounded-lg shadow-md'>Upgrade Plan to Avail </div>}
                                    </li>
                                    <li className='list-none border-b border-gray-500 text-center px-3 py-2 whitespace-nowrap select-none cursor-pointer hover:bg-slate-100 relative' onMouseEnter={() => handleMouseEnter(1)}
                                        onMouseLeave={handleMouseLeave}>Image Template
                                        {activeButton === 1 && <div className='absolute bg-[#0d291a] left-[-220px] text-white text-[12px] px-2 py-1 w-[220px] rounded-lg shadow-md'>Upgrade Plan to Avail </div>}
                                    </li>
                                    <li className='list-none border-b border-gray-500 text-center px-3 py-2 whitespace-nowrap select-none cursor-pointer hover:bg-slate-100 relative' onMouseEnter={() => handleMouseEnter(5)}
                                        onMouseLeave={handleMouseLeave}>Image Template with Button
                                        {activeButton === 5 && <div className='absolute bg-[#0d291a] left-[-220px] text-white text-[12px] px-2 py-1 w-[220px] rounded-lg shadow-md'>Upgrade Plan to Avail </div>}
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
                                    <li className='list-none border-b border-gray-500 text-center px-3 py-2 whitespace-nowrap select-none cursor-pointer hover:bg-slate-100' onClick={() => { setnormaltextTemplate(true) }}>Text Template</li>
                                    <li className='list-none border-b border-gray-500 text-center px-3 py-2 whitespace-nowrap select-none cursor-pointer hover:bg-slate-100' onClick={() => { settextTemplate(true) }}>Text Template with Button</li>
                                    <li className='list-none border-b border-gray-500 text-center px-3 py-2 whitespace-nowrap select-none cursor-pointer hover:bg-slate-100' onClick={() => { setimageTemplatenotbtn(true) }}>Image Template</li>
                                    <li className='list-none border-b border-gray-500 text-center px-3 py-2 whitespace-nowrap select-none cursor-pointer hover:bg-slate-100' onClick={() => { setimageTemplate(true) }}>Image Template with Button</li>
                                    <li className='list-none border-b border-gray-500 text-center px-3 py-2 whitespace-nowrap select-none cursor-pointer hover:bg-slate-100 relative' onMouseEnter={() => handleMouseEnter(2)}
                                        onMouseLeave={handleMouseLeave}>Personalised Template
                                        {activeButton === 2 && <div className='absolute bg-[#0d291a] left-[-220px] text-white text-[12px] px-2 py-1 w-[220px] rounded-lg shadow-md'>Upgrade Plan to Avail </div>}
                                    </li>
                                    <li className='list-none border-b border-gray-500 text-center px-3 py-2 whitespace-nowrap select-none cursor-pointer hover:bg-slate-100 relative' onMouseEnter={() => handleMouseEnter(3)}
                                        onMouseLeave={handleMouseLeave}>Personalised Image Template
                                        {activeButton === 3 && <div className='absolute bg-[#0d291a] left-[-220px] text-white text-[12px] px-2 py-1 w-[220px] rounded-lg shadow-md'>Upgrade Plan to Avail </div>}
                                    </li>

                                </>}


                                {advanced_feature &&
                                    <>
                                        <li className='list-none border-b border-gray-500 text-center px-3 py-2 whitespace-nowrap select-none cursor-pointer hover:bg-slate-100' onClick={() => { setnormaltextTemplate(true) }}>Text Template</li>
                                        <li className='list-none border-b border-gray-500 text-center px-3 py-2 whitespace-nowrap select-none cursor-pointer hover:bg-slate-100' onClick={() => { settextTemplate(true) }}>Text Template with Button</li>
                                        <li className='list-none border-b border-gray-500 text-center px-3 py-2 whitespace-nowrap select-none cursor-pointer hover:bg-slate-100' onClick={() => { setimageTemplatenotbtn(true) }}>Image Template</li>
                                        <li className='list-none border-b border-gray-500 text-center px-3 py-2 whitespace-nowrap select-none cursor-pointer hover:bg-slate-100' onClick={() => { setimageTemplate(true) }}>Image Template with button</li>
                                        <li className='list-none border-b border-gray-500 text-center px-3 py-2 whitespace-nowrap select-none cursor-pointer hover:bg-slate-100' onClick={() => { setPersonalisedTemplate(true) }}>Personalised Template</li>
                                        <li className='list-none border-b border-gray-500 text-center px-3 py-2 whitespace-nowrap select-none cursor-pointer hover:bg-slate-100' onClick={() => { setPersonalisedImageTemplate(true) }}>Personalised Image Template</li>
                                    </>
                                }


                            </div>}
                    </div>
                </div>
                <div>
                    {/* <table className="table-auto w-full mt-6 border border-gray-600"> */}
                    <table class="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-[#064A42] text-left text-xs font-semibold text-white uppercase tracking-wider">
                                    Template Name
                                </th>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-[#064A42] text-left text-xs font-semibold text-white uppercase tracking-wider">
                                    Title
                                </th>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-[#064A42] text-left text-xs font-semibold text-white uppercase tracking-wider">
                                    Status
                                </th>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-[#064A42] text-left text-xs font-semibold text-white uppercase tracking-wider">
                                    Delete Template
                                </th>
                            </tr>
                        </thead>

                        {/* <thead className='text-left bg-slate-500'>
                            <tr>
                                <th>Template Name</th>
                                <th>Title</th>
                                <th>Status</th>
                                <th>Delete Template</th>
                            </tr>
                        </thead> */}
                        <tbody >
                            {templates.map((template) => (
                                <tr key={template.id} >
                                    {/* <tr> */}
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <div class="flex items-center">
                                            <div class="ml-3">
                                                <p class="text-gray-900 whitespace-no-wrap">
                                                    {template.name}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p class="text-gray-900 whitespace-no-wrap">{template.text}</p>
                                    </td>
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {template.status === "APPROVED" ? <span
                                            class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                            <span aria-hidden
                                                class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                            <span class="relative">{template.status}</span>
                                        </span> : <span
                                            class="relative inline-block px-3 py-1 font-semibold text-orange-900 leading-tight">
                                            <span aria-hidden
                                                class="absolute inset-0 bg-orange-200 opacity-50 rounded-full"></span>
                                            <span class="relative">{template.status}</span>
                                        </span>}

                                    </td>
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white ">
                                        <span onClick={() => handleDeleteClick(template.name)}
                                            class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight cursor-pointer">
                                            <span aria-hidden
                                                class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                            <span class="relative">  <AiOutlineDelete /></span>
                                        </span>
                                        {/* <p class="text-gray-900 whitespace-no-wrap " >
                                          
                                        </p> */}
                                    </td>

                                </tr>

                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {normaltextTemplate &&
                <div className='absolute w-full h-full bg-black/30 top-0 left-0 flex justify-center items-center z-20' onClick={() => { setnormaltextTemplate(false) }} >
                    <TextTemplate handleClick={handleClick} settextTemplate={setnormaltextTemplate} />
                </div>
            }
            {textTemplate &&
                <div className='absolute w-full h-full bg-black/30 top-0 left-0 flex justify-center z-20' onClick={() => { settextTemplate(false) }} >
                    <CreateTemplate handleClick={handleClick} settextTemplate={settextTemplate} />
                </div>
            }
            {personalisedTemplate &&
                <div className='absolute w-full h-full bg-black/30 top-0 left-0 flex justify-center z-20' onClick={() => { setPersonalisedTemplate(false) }} >
                    <Personalised handleClick={handleClick} setPersonalisedTemplate={setPersonalisedTemplate} />
                </div>
            }
            {personalisedImageTemplate &&
                <div className='absolute w-full h-full bg-black/30 top-0 left-0 flex justify-center z-20' onClick={() => { setPersonalisedImageTemplate(false) }} >
                    <PersonalisedImageTemplate handleClick={handleClick} setPersonalisedImageTemplate={setPersonalisedImageTemplate} />
                </div>
            }
            {imageTemplate &&
                <div className='absolute w-full h-full bg-black/30 top-0 left-0 flex justify-center z-20 items-center' onClick={() => { setimageTemplate(false) }} >
                    {/* <CreateTemplate handleClick={handleClick} /> */}
                    <ImageTemplate handleClick={handleClick} setimageTemplate={setimageTemplate} />
                </div>
            }
            {imageTemplatenotbtn &&
                <div className='absolute w-full h-full bg-black/30 top-0 left-0 flex justify-center z-20 items-center' onClick={() => { setimageTemplatenotbtn(false) }} >
                    {/* <CreateTemplate handleClick={handleClick} /> */}
                    <ImageTemplateNoButton handleClick={handleClick} setimageTemplate={setimageTemplatenotbtn} />
                </div>
            }
            {loading && <div className=' absolute w-full h-full top-0 left-0 flex justify-center z-20 items-center bg-black/40'>
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