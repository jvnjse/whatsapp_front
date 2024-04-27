import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Nav from '../Nav';
import axios from 'axios';
import config from '../config';

function BlogPage() {
    const { id, title } = useParams();
    const [data, setdata] = useState()
    const GetBlogs = async () => {
        try {
            const response = await axios.get(`${config.baseUrl}blogs/${id}/`);
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
        <div className=" w-screen overflow-hidden bg-white ">
            <Nav></Nav>

            {data &&
                <div className='ql-container  '>
                    <div className='ql-editor'>
                        <div className='text-justify-around' dangerouslySetInnerHTML={{ __html: data.blog_content }} />
                    </div>

                </div>
            }


        </div>
    )
}

export default BlogPage