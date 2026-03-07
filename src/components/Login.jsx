import React from 'react'
// import News3 from '../images/News3.jpg';
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { NavLink } from 'react-router-dom';


function Login() {
    return (
        <main className='flex flex-col items-center justify-center w-full flex-1 px-20 text-center h-screen'>
            <div className='rounded-2xl shadow-2xl flex w-2/3 max-w-4xl'>
                <div className='w-3/5 p-5'>
                    <div className="text-left font-bold"><span className='text-amber-700'>OUR</span>Website</div>
                    <div className="py-10">
                        <h2 className="text-3xl font-bold text-green-500 mb-2">Sign in to Account</h2>

                        <div className="flex flex-col items-center">
                            <div className="bg-gray-100 w-80 p-2 flex items-center  text-xl mb-4 ">
                                <MdEmail className="text-gray-400 m-2" />
                                <input type="email" placeholder='Email' name='email' required className='outline-none' />
                            </div>
                            <div className="bg-gray-100 w-80 p-2 flex items-center  text-xl mb-4 ">
                                <FaLock className="text-gray-400 m-2" />
                                <input type="Password" placeholder='Password' name='Password' required className='outline-none' />
                            </div>
                            <div className="flex w-80 mb-5 justify-between leading-1">
                                <label className='flex items-center'>
                                    <input type="checkbox" name='remember' className='mr-1' />
                                    Remember Me</label>
                                <a href="#" className=''>Forgot Password</a>
                            </div>
                            <p className='text-2xl leading-5 '>or</p>
                            <div className="flex justify-center my-2">
                                <a href="" className='border-2 border-gray-200 rounded-full p-2 mx-1 leading-5'>
                                    <FcGoogle className='text-2xl' />
                                </a>
                            </div>
                                
                                <p className=' leading-10 '>Continue with Google</p>

                            <div className='leading-5'>
                                <button className='border-2 border-amber-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white '>Login
                                </button>
                            </div>
                            <div>Dont have an Account!
                                <NavLink to="/Register" className='text-blue-500 underline'>Sign up</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-2/5 bg-green-700 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12'>
                    <h2 className='text-4xl font-bold mb-2'>Hello Friends</h2>
                    <p>Hey! What Are You Doing Here. That was a Restriction Area!!!</p>
                </div>

            </div>
        </main>
    )
}

export default Login
