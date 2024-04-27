import React, { useEffect, useState } from 'react'
import Nav from '../Nav'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

function Blog() {
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
        <div className=" w-screen h-screen overflow-hidden bg-white ">
            <Nav></Nav>
            <div className='flex flex-wrap gap-10 p-5'>

                {data && data.map((blog) => (
                    <div class="bg-white rounded-lg shadow-lg w-[200px]">
                        <img src="https://images.unsplash.com/photo-1600054800747-be294a6a0d26?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80" alt="" class="rounded-t-lg" />
                        <div class="p-6">
                            <h2 class="font-bold mb-2 text-2xl text-purple-800">{blog.link}
                            </h2>
                            <Link to={`/blog/${blog.id}/${blog.link}`} target='_blank' class="text-purple-600 hover:text-purple-500 underline text-sm">See Blog 👉</Link>
                        </div>
                    </div>
                ))}

            </div>


        </div >
    )
}

export default Blog