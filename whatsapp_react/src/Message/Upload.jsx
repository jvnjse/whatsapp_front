import React, { useEffect, useState } from 'react'
import "../App.css"
import axios from 'axios';
import whatsapplogo from "../Icons/whatsapp.png"
import whatsappgif from "../Icons/whatsappgif.gif"


function Upload() {
    const [excelfile, setexcelfile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [uploadbox, setUploadbox] = useState(true)
    const [templateData, setTemplateData] = useState();
    const [selectedHeaderText, setSelectedHeaderText] = useState('');
    const [selectedName, setSelectedName] = useState('');
    const [selectedBodyText, setSelectedBodyText] = useState('')
    const [selectedFooterText, setSelectedFooterText] = useState('')
    const [select, setSelect] = useState('')
    const [successMessage, setSuccessMessage] = useState(false);
    const [successMessageupload, setSuccessMessageUpload] = useState(false);
    const [headerHandle, setHeaderHandle] = useState('');
    const [apiurl1, setApiurl1] = useState();

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
    const handleSubmitExcelUpload = async (event) => {
        event.preventDefault();

        if (!excelfile) {
            alert('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('excel_file', excelfile);

        try {
            const response = await axios.post('http://127.0.0.1:8000/upload/data', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            setSuccessMessageUpload(true)
            setTimeout(() => {
                setSuccessMessageUpload(false);
            }, 3000);
        } catch (error) {
            console.error('Error uploading file: ', error);
        }
    };

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/get_templates/')
            .then((response) => {
                // console.log(response.data.data)
                setTemplateData(response.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const handleSubmitExcelSent = async (event) => {
        event.preventDefault();

        if (!excelfile) {
            alert('Please select a file to upload.');
            return;
        }
        if (!select) {
            alert('Please Select a Template for Messaging')
        }

        const formData = new FormData();
        formData.append('excel_file', excelfile);
        formData.append('template_name', select)
        formData.append('image_link', headerHandle)

        try {
            const response = await axios.post(apiurl1, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccessMessage(true)
            setexcelfile('')
            setTimeout(() => {
                setSuccessMessage(false);
            }, 3000);
            console.log(response.data)
        } catch (error) {
            console.error('Error uploading file: ', error);
        }
    };

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
            const headerHandle = header && header.example && header.example.header_handle[0];
            setHeaderHandle(headerHandle || '');
            setApiurl1((prevApiurl1) => {
                if (headerHandle != null) {
                    return `http://127.0.0.1:8000/upload/sent/images`;
                } else {
                    return `http://127.0.0.1:8000/upload/sent`;
                }
            });
        } else {
            setSelectedHeaderText('');
        }
    };
    return (
        <div className='p-5'>
            <div className=' text-[#0d291a] text-4xl font-bold'>Upload Numbers using Excel</div>
            <div className=' flex gap-10 mt-4'>
                <div className={uploadbox ? 'cursor-pointer select-none py-1 px-2 text-lg bg-[#064A42] text-white rounded-md hover:shadow-xl shadow-2xl' : 'py-1 px-2 text-lg bg-[white] rounded-md hover:shadow-xl cursor-pointer select-none '} onClick={() => { setUploadbox(true) }}>Excel Messaging</div>
                <div className={uploadbox ? 'cursor-pointer select-none py-1 px-2 text-lg bg-white rounded-md hover:shadow-xl' : 'py-1 px-2 text-lg bg-[#064A42] text-white rounded-md hover:shadow-xl cursor-pointer select-none '} onClick={() => { setUploadbox(false) }}>Excel Data Upload</div>
            </div>
            {uploadbox ? <div className='flex '>
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

                    <div onClick={handleSubmitExcelSent} className='select-none cursor-pointer flex justify-center items-center mt-4 bg-[#064A42] max-w-max text-white py-1 px-2 rounded-lg uppercase font-bold text-xs tracking-widest	'>
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
                        <img src={headerHandle && headerHandle} alt="" />
                        <div>
                            {selectedBodyText && selectedBodyText}
                        </div>
                        <div className='font-thin text-xs'>{selectedFooterText && selectedFooterText}</div>
                    </div>
                </div>
            </div>
                :
                <div>
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

                        <div onClick={handleSubmitExcelUpload} className='select-none cursor-pointer flex justify-center items-center mt-4 bg-[#064A42] max-w-max text-white py-2 px-2 rounded-lg uppercase font-bold text-xs tracking-widest '>
                            {/* <img className='h-6 object-contain' src={whatsapplogo} alt="" /> */}
                            &nbsp;Upload Numbers
                        </div>
                    </div>
                </div>}
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
            {successMessageupload && <div className="transition-all ease-in duration-1000 absolute w-full h-full bg-green-950/25 top-0 left-0 flex justify-center items-center">
                <div className='w-2/6 bg-white rounded-lg flex flex-col items-center p-7'>
                    <div>
                        <img src={whatsappgif} alt="" className=' w-20' />
                    </div>
                    <div className=' text-green-800 font-semibold'>
                        Numbers have been Uploaded
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default Upload