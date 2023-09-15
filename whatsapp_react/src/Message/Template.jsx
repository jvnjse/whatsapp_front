import React, { useEffect, useState } from 'react'
import axios from 'axios';
import CreateTemplate from './CreateTemplate';

function Template() {
    const [templates, setTemplates] = useState([]);
    const [create_template, setCreateTemplate] = useState(false)


    const handleClick = (event) => {
        event.stopPropagation();
    };

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/get_templates/lists')
            .then((response) => {
                const extractedData = response.data.data.map((template) => ({
                    id: template.id,
                    name: template.name,
                    status: template.status,
                    text: template.components.find((component) => component.type === 'HEADER')?.text || '',
                }));
                setTemplates(extractedData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    return (
        <>
            <div className='p-5' onClick={() => {
                if (create_template == true) {
                    setCreateTemplate(false)
                }
            }}>
                <div className='flex items-center justify-between px-4'>
                    <div className=' text-[#0d291a] text-4xl font-bold select-none'>Message Templates</div>
                    <div className='relative'>
                        <div className=' bg-[#0d291a] text-white px-2 py-1 rounded-lg cursor-pointer select-none ' onClick={() => { setCreateTemplate(!create_template) }}>Create Template
                        </div>
                        {create_template && <div className='w-full bg-white absolute top-2 right-2' onClick={handleClick}>
                            <li className='list-none border-b border-gray-500 text-center px-3 py-2 whitespace-nowrap select-none cursor-pointer hover:bg-slate-100'>Text Template</li>
                            <li className='list-none border-b border-gray-500 text-center px-3 py-2 whitespace-nowrap select-none cursor-pointer hover:bg-slate-100'>Image Template</li>
                        </div>}
                    </div>
                </div>
                <div>
                    <table class="table-auto w-full mt-6 border border-gray-600">
                        <thead className='text-left bg-slate-500'>
                            <tr>
                                <th>Template Name</th>
                                <th>Title</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody >
                            {templates.map((template) => (
                                <tr key={template.id} >
                                    <td className='py-2 border-b border-gray-600'>{template.name}</td>
                                    <td className='py-2 border-b border-gray-600'>{template.text}</td>
                                    <td className='py-2 border-b border-gray-600'>{template.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* {create_template &&
                <div className='absolute w-full h-full bg-black/30 top-0 left-0 flex justify-center' onClick={() => { setCreateTemplate(false) }} >
                    <CreateTemplate handleClick={handleClick} setCreateTemplate={setCreateTemplate} />
                    <div>jhhj</div>
                </div>
            } */}
        </>
    )
}

export default Template