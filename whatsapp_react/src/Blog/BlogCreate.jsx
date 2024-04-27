import React, { useState } from 'react'
import Nav from '../Nav'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import config from '../config';

function BlogCreate() {
    const [value, setValue] = useState('');
    const [link, setLink] = useState('');
    console.log(value)

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${config.baseUrl}blogs/`, {
                link,
                blog_content: value,
                published: false
            });
            console.log('Blog created successfully:', response.data);
            setLink('');
            setValue('');
        } catch (error) {
            console.error('Error creating blog:', error);
        }
    };

    const modules = {
        toolbar:
            [
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                ['link', 'image', 'video'],

                [{ 'header': 1 }, { 'header': 2 }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
                [{ 'script': 'sub' }, { 'script': 'super' }],
                [{ 'indent': '-1' }, { 'indent': '+1' }],
                [{ 'direction': 'rtl' }],

                [{ 'size': ['small', false, 'large', 'huge'] }],
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                [{ 'color': [] }, { 'background': [] }],
                [{ 'font': [] }],
                [{ 'align': [] }],

                ['clean']
            ],
    }

    return (
        <div className=" w-screen h-screen overflow-hidden bg-white ">

            <Nav />
            <div className='overflow-y-scroll h-full '>

                <div className='flex justify-between flex-1 p-5'>
                    <div className='text-3xl font-bold'>Create Blog</div>
                    <div className=' bg-[#0d291a] text-white px-2 py-1 rounded-lg cursor-pointer select-none h-fit' onClick={handleSubmit} >Save Blog
                    </div>
                </div>
                <div className='flex justify-between flex-1 p-5'>
                    <div className="group relative w-72 md:w-80 lg:w-96">
                        <label for="2" className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">Add title of the Blog</label>
                        <input id="2"
                            placeholder="Link"
                            value={link}
                            onChange={(e) => {
                                const newLink = e.target.value.replace(/\s+/g, '-');
                                setLink(newLink);
                            }}
                            type="text" className="peer h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400" />
                        <span className="absolute block pt-1 text-xs font-semibold text-gray-500 opacity-0 transition-all duration-200 ease-in-out group-focus-within:opacity-100">Text-format: xx-xxx</span>
                    </div>
                </div>
                <ReactQuill
                    value={value}
                    onChange={setValue}
                    modules={modules}
                />
            </div>


        </div>
    )
}

export default BlogCreate