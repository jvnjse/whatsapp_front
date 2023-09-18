import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Cookies from "js-cookie";

function Login() {
    const [login, setLogin] = useState(true)
    const [lemail, setlemail] = useState('')
    const [lpassword, setlpassword] = useState('')
    const [semail, setsemail] = useState('')
    const [spassword, setspassword] = useState('')
    const [signupmessage, setsignupmessage] = useState(false)
    const [errormesssage, seterrormesssage] = useState(false)
    const [errormesssagel, seterrormesssagel] = useState(false)


    const ldata = {
        "email": lemail,
        "password": lpassword
    }
    const HandleLogin = () => {
        axios.post("http://127.0.0.1:8000/login/", ldata)
            .then((response) => {
                const accessToken = response.data.token.access
                Cookies.set("accessToken", accessToken, { expires: 24 / 24 });
                window.location.reload()
            }).catch((error) => {
                console.log(error)
                if (error.response.data.non_field_errors) {
                    seterrormesssagel(true)
                }
            })
    }


    const sdata = {
        "email": semail,
        "password": spassword
    }
    const HandleSignUp = () => {
        axios.post("http://127.0.0.1:8000/register/", sdata)
            .then((response) => {
                console.log(response.data)
                setsignupmessage(true)
            }).catch((error) => {
                console.log(error.response.data.email)
                if (error.response.data.email) {
                    seterrormesssage(true)
                }
            })
    }


    return (
        <div className='flex flex-col items-center justify-center w-full h-full gap-3 background-doodle'>
            <div className='flex justify-around w-2/6 bg-[#ffffff] rounded-lg relative max-md:w-2/4 max-sm:w-10/12'>
                <div onClick={() => { setLogin(true) }} className='cursor-pointer w-full text-center  select-none'>Login</div>
                <div onClick={() => { setLogin(false) }} className='cursor-pointer w-full text-center select-none'>Signup</div>
                <div className={login ? 'absolute w-3/6 bg-[#064A42] mix-blend-multiply rounded-lg left-0 shadow-lg select-none ' : 'absolute w-3/6 bg-[#064A42] mix-blend-multiply rounded-lg right-0 select-none shadow-lg '}>&nbsp;</div>
            </div>
            {login ? <div className='w-2/6 bg-[#cfe7e1] rounded-lg max-md:w-2/4 max-sm:w-10/12'>
                <div className=' flex flex-col px-10 py-5 gap-5'>
                    <div className='text-center font-bold text-2xl'>Login</div>
                    <label htmlFor='email' className=' flex flex-col gap-2 text-sm'>Email
                        <input type="email" name="" id="email" className='border border-gray-500 pl-3  h-7' value={lemail} onChange={(e) => { setlemail(e.target.value) }} />
                    </label>
                    <label htmlFor='email' className=' flex flex-col gap-2 text-sm'>Password
                        <input type="password" name="" id="" className='border border-gray-500 pl-3 h-7' value={lpassword} onChange={(e) => { setlpassword(e.target.value) }} />
                    </label>
                    {errormesssagel
                        && <div className='text-xs text-center whitespace-nowrap font-semibold text-red-500'>Invalid Credentials</div>
                    }
                    <div className=' bg-[#064A42] text-center select-none cursor-pointer text-white rounded-md' onClick={HandleLogin}>
                        Login
                    </div>
                </div>
            </div> :
                <div className='w-2/6 bg-[#cfe7e1] rounded-lg max-md:w-2/4 max-sm:w-10/12'>
                    <div className=' flex flex-col px-10 py-5 gap-5'>
                        <div className='text-center font-bold text-2xl'>SignUp</div>
                        <label htmlFor='email' className=' flex flex-col gap-2 text-sm'>Email
                            <input type="email" name="" id="email" className='border border-gray-500 pl-3 h-7' value={semail} onChange={(e) => { setsemail(e.target.value) }} />
                        </label>
                        {signupmessage
                            && <div className='text-xs text-center whitespace-nowrap'>A Generated password will be received <br></br>in your <a className='text-blue-700 underline' href='https://mail.google.com/mail/' target='_blank'>email inbox</a> </div>
                        }
                        {errormesssage
                            && <div className='text-xs text-center whitespace-nowrap font-semibold text-red-500'>Email already Exists</div>
                        }
                        {/* <label htmlFor='email' className=' flex flex-col gap-2 text-sm'>Password
                            <input type="password" name="" id="" className='border border-gray-500 pl-3 h-7' value={spassword} onChange={(e) => { setspassword(e.target.value) }} />
                        </label> */}
                        {/* <label htmlFor='email' className=' flex flex-col gap-2 text-sm'>Confirm Password
                            <input type="password" name="" id="" className='border border-gray-500 pl-3 h-7' />
                        </label> */}
                        <div className=' bg-[#064A42] text-center select-none cursor-pointer text-white rounded-md' onClick={HandleSignUp}>
                            SignUp
                        </div>
                    </div>
                </div>}

        </div>
    )
}

export default Login