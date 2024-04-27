import React, { useEffect, useState } from 'react'
import AdminWhatsappModule from './AdminWhatsappModule'
import { useNavigate } from 'react-router-dom'
import config from '../config';
import axios from 'axios';

function AdminBlog() {
    const [data, setdata] = useState()
    const navigate = useNavigate()

    const GetBlogs = async () => {
        try {
            const response = await axios.get(`${config.baseUrl}blogs/`);
            console.log('Blog created successfully:', response.data);
            setdata(response.data)
        } catch (error) {
            console.error('Error creating blog:', error);
        }
    };

    useEffect(() => {
        GetBlogs()
    }, [])


    return (
        <>
            <div className=' w-full bg-[#ECE5DD] flex justify-between h-screen  rounded-2xl overflow-x-auto'>
                <div className='h-full'>
                    <AdminWhatsappModule select={"admin_blog"} />
                </div>

                <div className=' flex-1 p-5 '>
                    <div className='flex justify-between'>
                        <div className='text-3xl font-bold'>Create Blog</div>
                        <div className=' bg-[#0d291a] text-white px-2 py-1 rounded-lg cursor-pointer select-none h-fit' onClick={() => { navigate('/admin/blog/create') }} >Create Blog
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-10'>

                        {data && data.map((blog) => (
                            <div class="bg-white rounded-lg shadow-lg w-[200px]">
                                <img src="https://images.unsplash.com/photo-1600054800747-be294a6a0d26?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80" alt="" class="rounded-t-lg" />
                                <div class="p-6">
                                    <h2 class="font-bold mb-2 text-2xl text-purple-800">{blog.link}
                                    </h2>
                                    <a href="#" class="text-purple-600 hover:text-purple-500 underline text-sm">See Blog 👉</a>
                                </div>

                            </div>
                        ))}

                    </div>
                    {/* {data &&
                        <div className='ql-container'>
                            <div className='ql-editor'>

                                <div dangerouslySetInnerHTML={{ __html: data.blog_content }} />
                            </div>

                        </div>
                    } */}
                </div>
            </div>
        </>
    )
}

export default AdminBlog