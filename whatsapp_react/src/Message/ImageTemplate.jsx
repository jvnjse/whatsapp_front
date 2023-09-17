import axios from 'axios'
import React, { useState } from 'react'


function ImageTemplate(props) {
    const [templatename, settemplatename] = useState(' ')
    const [headerimage, setheaderimage] = useState(' ')
    const [headerimageview, setheaderimageview] = useState(' ')
    const [bodytext, setbodytext] = useState(' ')
    const [footertext, setfootertext] = useState(' ')
    const [buttontext, setbuttontext] = useState(' ')
    const [imageupload, setimageupload] = useState('')


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setheaderimage(event.target.files[0])
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setheaderimageview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };



    const handleUpload = () => {
        const formData = new FormData();
        formData.append('image_file', headerimage);

        axios
            .post('http://127.0.0.1:8000/upload/image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                setimageupload(response.data.h)
                console.log(imageupload)
            })
            .catch((error) => {
                console.error(error);
            });
    };



    const data = {
        'template_name': templatename,
        'header_text': imageupload,
        'body_text': bodytext,
        'footer_text': footertext,
        // 'button_text': buttontext,
    }
    const HandleTemplateUpload = () => {
        axios.post("http://127.0.0.1:8000/post_template/image", data).then((response) => {
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }




    return (
        <div className='w-10/12 bg-white mt-10 p-10 rounded-xl h-[80%]' onClick={props.handleClick}>
            <div className=' text-[#0d291a] text-2xl font-bold select-none'>Create Image Template</div>
            <div className=' flex justify-between'>
                <div className='flex-1'>
                    <div className=' flex-1 flex flex-col px-5 mt-2 gap-2'>
                        <label className='flex flex-col'>Template Name
                            <input className='lowercase border border-gray-400 rounded-md h-9 px-3' onChange={(e) => { settemplatename(e.target.value) }} />
                        </label>
                        <div className='flex items-end gap-3'>
                            <label className=' flex flex-col'>Select an Image
                                <input type="file" placeholder='' id="" className='border border-gray-400 rounded-md h-9 px-3' onChange={handleImageChange} />
                            </label>
                            <div className='py-1 px-2 rounded-lg select-none cursor-pointer text-white bg-[#133624] whitespace-nowrap h-fit' onClick={handleUpload}>Upload Image</div>
                        </div>

                        <label className=' flex flex-col' htmlFor='text-body'>Text Body
                            <input type="text" placeholder='' id="text-body" className='border border-gray-400 rounded-md h-9 px-3' onChange={(e) => { setbodytext(e.target.value) }} />
                        </label>
                        <label className=' flex flex-col' htmlFor='footer-body'>Footer
                            <input type="text" placeholder='' id="footer-body" className='border border-gray-400 rounded-md h-9 px-3' onChange={(e) => { setfootertext(e.target.value) }} />
                        </label>
                        <button onClick={HandleTemplateUpload} className='bg-[#064A42] text-white rounded-md'>submit</button>

                    </div>
                </div>
                <div className='flex-1 flex justify-center'>
                    <div className=' wallpaper-bg w-3/5 p-3'>
                        <div className=' font-semibold'>{templatename}</div>
                        <div className=' bg-[#262d31] text-white px-2 py-1 rounded-r-md rounded-bl-md'>
                            {/* <div className=' font-semibold'>{headertext}</div> */}
                            <img src={headerimageview} alt="" />
                            <div className=' font-thin text-sm'>{bodytext}</div>
                            <div className=' font-sans text-[10px] text-white/70 border-b border-white/70'>{footertext}</div>
                            <div className='text-center text-xs font-semibold text-blue-300 py-1'>{buttontext}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageTemplate