import { useState, useContext, useEffect, use } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, NavLink } from 'react-router-dom';
// import News3 from '../images/News3.jpg';
import { FcGoogle } from "react-icons/fc";
// import { MdEmail } from "react-icons/md";
// import { FaLock } from "react-icons/fa";
// import { NavLink } from 'react-router-dom';

// import icon
import { MdEmail } from 'react-icons/md';
import { FaLock } from 'react-icons/fa';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


import spend from "../assets/images/spend.png";
import logo from "../assets/images/logo.png";
import { FaCheck } from "react-icons/fa";
import API from "../services/api";
import { toast } from 'react-toastify';  // add by hasanur




function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const { setUser } = useContext(AuthContext)

    const { user } = useContext(AuthContext);

    useEffect(()=>{
        if (user) {
            navigate("/dashboard")
        }
    }, [user]);

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!form.email || !form.password) {
            alert("All fields are required");
            return;
        }



        try {

            // Step 1: login (cookie set here)
            const res = await API.post("/auth/login", form);
            console.log(res);//remove later

            // Step 2: get user data

            const resp = await API.get("/auth/me");

            // step 3: update gobal state
            setUser(resp.data);


            // ✅ store token
            // localStorage.setItem("token", res.data.token);

            // alert("Login successful");

            toast.success("Login successful")


            navigate("/dashboard");

        } catch (err) {
             if (err.response) {
                console.log("Backend error:", err.response);
                toast.error(err.response.data.detail)

            } else {
                toast.error("Server error")
            }
        }
    };




    return (

        <main className='flex flex-col items-center justify-center w-full flex-1 px-20 text-center h-screen'>
            <div className='rounded-2xl shadow-2xl flex w-2/3 max-w-4xl'>
                <div className='w-3/5  '>
                    <div className=" mx-10" style={{
                        width: "70px",
                        height: "70px",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundImage: `url(${logo})`
                    }}>
                        <span className='text-2xl font-bold relative left-[60px] top-[18px]'>SmartSpend</span><span className='text-left text-2xl font-bold text-blue-400 relative left-[65px] top-[18px]'>AI</span>
                    </div>
                    <div className="py-1">
                        <h2 className="text-3xl   mb-2">Welcome back to <span className='font-bold'>SmartSpend</span></h2>
                        <p className='leading-[3]'>Sign in to continue to your account</p>

                        <div className="flex flex-col items-center">
                            <form onSubmit={handleLogin}>
                                {/* <div className="bg-gray-100 w-95 rounded-xl p-2 flex items-center  text-xl mb-4 ">
                                    <MdEmail className="text-gray-400 m-2" />
                                    <input type="email" onChange={handleChange} placeholder='Email' name='email' required className='outline-none w-95' />
                                </div> */}
                                <div className="relative w-95 mb-4">
                                    <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        onChange={handleChange}
                                        required
                                        placeholder=" "
                                        className="peer w-full border border-gray-300 rounded-xl pl-10 pr-4 pt-6 pb-2 outline-none focus:border-blue-500"
                                    />

                                    <label
                                        htmlFor="email"
                                        className="absolute left-10 top-2 text-gray-500 text-sm transition-all cursor-text
                                        peer-placeholder-shown:top-4
                                        peer-placeholder-shown:text-base
                                        peer-focus:top-2
                                        peer-focus:text-sm
                                        peer-focus:text-blue-500">
                                        Email
                                    </label>
                                </div>
                                {/* <div className="bg-gray-100 w-95 rounded-xl p-2 flex items-center  text-xl mb-4 ">
                                    <FaLock className="text-gray-400 m-2" />
                                    <input type="password" onChange={handleChange} placeholder='password' name='password' required className='outline-none w-95' />
                                </div> */}
                                

                                <div className="relative w-95 mb-4">
                                    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        onChange={handleChange}
                                        required
                                        placeholder=" "
                                        className="peer w-full border border-gray-300 rounded-xl pl-10 pr-10 pt-6 pb-2 outline-none focus:border-blue-500"
                                    />

                                    <label
                                        htmlFor="password"
                                        className="absolute left-10 top-2 text-gray-500 text-sm transition-all cursor-text
                                        peer-placeholder-shown:top-4
                                        peer-placeholder-shown:text-base
                                        peer-focus:top-2
                                        peer-focus:text-sm
                                        peer-focus:text-blue-500">
                                        Password
                                    </label>

                                    <div
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </div>
                                </div>



                                <div className="flex w-95 mb-5 justify-between leading-1">
                                    <label className='flex items-center text-black'>
                                        <input type="checkbox" name='remember' className='mr-1' />
                                        Remember Me</label>
                                    <NavLink to="/Forgotpass" className='text-blue-600'>Forgot Password?</NavLink>
                                </div>
                                <div className='leading-5'>
                                    <button type='submit' className=' w-90 rounded-xl px-12 py-2  inline-block font-semibold text-white bg-blue-600 hover:bg-green-500 hover:text-white  cursor-pointer '>Sign in →
                                    </button>
                                </div>
                            </form>

                            <div className="flex items-center w-90 mt-5">
                                <div className="flex-grow border-t border-gray-400"></div>

                                <span className="mx-4 text-gray-600 text-sm">OR CONTINUE WITH</span>

                                <div className="flex-grow border-t border-gray-400"></div>
                            </div>

                            <div className="flex items-center justify-center border-gray-400  p-2 shadow-md rounded-xl my-2 w-90 mt-10">
                                <a href="" className=' flex '>
                                    <FcGoogle className='text-2xl ' />
                                    <span className='ml-1'>Continue with Google</span>
                                </a>
                            </div>
                            <div className='mt-4'>Dont have an Account!
                                <NavLink to="/Register" className='text-blue-500 underline'>Sign up</NavLink>
                            </div>




                        </div>
                    </div>
                </div>
                <div className='w-3/7 rounded-tr-2xl rounded-br-2xl py-36 px-12' style={{
                    width: "450px",
                    height: "600px",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundImage: `url(${spend})`
                }} >
                    <div className='relative right-[70px] bottom-[120px] text-3xl text-white'>
                        <h2>SmartSpend <span className='text-blue-300'>AI</span></h2>
                        <h4 className=' text-xl'><FaCheck className='relative left-[60px] top-[20px] text-sm' />Track Expenses</h4>

                        <h4 className=' text-xl'><FaCheck className='relative left-[60px] top-[20px] text-sm' /><span className='relative left-[40px]'> Predict future spending</span></h4>
                        <h4 className=' text-xl'><FaCheck className='relative left-[60px] top-[20px] text-sm' /> <span className='relative left-[30px]'>Secure your finances</span></h4>
                    </div>
                </div>

            </div>
        </main>
    )
}

export default Login