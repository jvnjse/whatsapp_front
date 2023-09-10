import React, { useEffect, useState } from 'react'
import "../App.css"
import axios from 'axios';
import whatsapplogo from "../Icons/whatsapp.png"


function Upload() {
    const [excelfile, setexcelfile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [uploadbox, setUploadbox] = useState()

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setexcelfile(selectedFile);
    };

    useEffect(() => {
        if (excelfile) {
            setFileName(excelfile.name);
        } else {
            setFileName('');
        }
    }, [excelfile]);

    console.log(fileName)
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!excelfile) {
            alert('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('excel_file', excelfile);

        try {
            const response = await axios.post('http://127.0.0.1:8000/upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error uploading file: ', error);
        }
    };
    return (
        <div className='p-5'>
            <div className=' text-[#0d291a] text-4xl font-bold'>Upload Numbers using Excel</div>
            <div className=' flex gap-10 mt-4'>
                <div className={uploadbox ? 'cursor-pointer select-none py-1 px-2 text-lg bg-[#064A42] text-white rounded-md hover:shadow-xl shadow-2xl' : 'py-1 px-2 text-lg bg-[white] rounded-md hover:shadow-xl cursor-pointer select-none '} onClick={() => { setUploadbox(true) }}>Excel Messaging</div>
                <div className={uploadbox ? 'cursor-pointer select-none py-1 px-2 text-lg bg-white rounded-md hover:shadow-xl' : 'py-1 px-2 text-lg bg-[#064A42] text-white rounded-md hover:shadow-xl cursor-pointer select-none '} onClick={() => { setUploadbox(false) }}>Excel Data Upload</div>
            </div>
            {uploadbox ? <>
                <div className=' flex flex-col px-14 mt-7 max-w-max'>
                    <div>Upload and Sent Messages to the Numbers in Excel Document </div>
                    {excelfile ?
                        <label htmlFor="excel-file" className='mt-3 excel-bg-1 bg-white h-36 text-center rounded-xl flex flex-col'>{fileName}
                            <input type="file" id="excel-file" accept='xlsx' className=' invisible' onChange={handleFileChange} />
                        </label>
                        :
                        <label htmlFor="excel-file" className='mt-3 excel-bg bg-white h-36 text-center rounded-xl flex flex-col'>
                            <input type="file" id="excel-file" accept='xlsx' className=' invisible' onChange={handleFileChange} />
                        </label>

                    }

                    <div onClick="" className='flex justify-center items-center mt-4 bg-[#064A42] max-w-max text-white py-1 px-2 rounded-lg uppercase font-bold text-xs tracking-widest	'>
                        <img className='h-6 object-contain' src={whatsapplogo} alt="" />
                        &nbsp;Send Message
                    </div>
                </div>
            </> : <>
                <div className=' flex flex-col px-14 mt-7 max-w-max'>
                    <div>Upload Numbers to List</div>
                    {excelfile ?
                        <label htmlFor="excel-file" className='mt-3 excel-bg-1 bg-white h-36 text-center rounded-xl flex flex-col'>{fileName}
                            <input type="file" id="excel-file" accept='xlsx' className=' invisible' onChange={handleFileChange} />
                        </label>
                        :
                        <label htmlFor="excel-file" className='mt-3 excel-bg bg-white h-36 text-center rounded-xl flex flex-col'>
                            <input type="file" id="excel-file" accept='xlsx' className=' invisible' onChange={handleFileChange} />
                        </label>

                    }

                    <div onClick="" className='flex justify-center items-center mt-4 bg-[#064A42] max-w-max text-white py-2 px-2 rounded-lg uppercase font-bold text-xs tracking-widest '>
                        {/* <img className='h-6 object-contain' src={whatsapplogo} alt="" /> */}
                        &nbsp;Upload Numbers
                    </div>
                </div>
            </>}
        </div>
    )
}

export default Upload