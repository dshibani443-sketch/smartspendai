import { useState, useContext, useEffect } from 'react';
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



    //if user not logged in redirect to dashboard

    const { setUser } = useContext(AuthContext)

    const { user } = useContext(AuthContext);

    useEffect(() => {
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
            const res = await API.post("/auth/login", form);
            console.log(res);//remove later

            // ✅ store token
            localStorage.setItem("token", res.data.token);

            toast.success("Login Successful.")

            navigate("/dashboard");

        } catch (err) {
            if (err.response) {
                console.log("Backend error:", err.response);
                alert(err.response.data.detail);
            } else {
                alert("Server error");
            }
        }
    };




    return (

        <main className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
            <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">

                {/* LEFT SIDE (FORM) */}
                <div className="w-full md:w-1/2 p-6 md:p-10">

                    {/* Logo */}
                    <div className="flex items-center gap-1 mb-6">
                        <img src={logo} alt="logo" className="w-20 h-20" />
                        <h1 className="text-3xl font-bold">
                            SmartSpend <span className="text-blue-400">AI</span>
                        </h1>
                    </div>

                    {/* Heading */}
                    <h2 className="text-xl ml-5 md:text-3xl mb-2">
                        Welcome back to <span className="font-bold">SmartSpend</span>
                    </h2>
                    <p className="text-gray-700 ml-22 mb-6">
                        Sign in to continue to your account
                    </p>

                    {/* FORM */}
                    <form onSubmit={handleLogin} className="space-y-4">

                        {/* Email */}
                        <div className="relative w-full mb-4">
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

                        {/* Password */}
                        <div className="border-gray-100 rounded-xl p-3 flex items-center justify-between">

                            <div className="relative w-full mb-4">
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
                                    className="absolute left-10 top-2  text-gray-500 text-sm transition-all cursor-text
                                        peer-placeholder-shown:top-4
                                        peer-placeholder-shown:text-base
                                        peer-focus:top-2
                                        peer-focus:text-sm
                                        peer-focus:text-blue-500">
                                    Password
                                </label>

                                <div
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-gray-500 ml-2 cursor-pointer">
                                    
                                

                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </button>

                            </div>
                        </div>

                        

                </div>

                {/* Remember + Forgot */}
                <div className="flex justify-between text-sm">
                    <label className="flex items-center gap-1">
                        <input type="checkbox" />
                        Remember me
                    </label>
                    <NavLink to="/Forgotpass" className="text-blue-600">
                        Forgot Password?
                    </NavLink>
                </div>

                {/* Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-amber-300 transition"
                >
                    Sign in →
                </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
                <div className="flex-grow border-t"></div>
                <span className="mx-3 text-sm text-gray-500">OR</span>
                <div className="flex-grow border-t"></div>
            </div>

            {/* Google */}
            <a
                href="https://smartspend-ai-68ou.onrender.com/auth/google"
                className="flex items-center justify-center gap-2  p-3 rounded-xl shadow-lg hover:bg-amber-300 transition"
            >
                <FcGoogle className="text-xl" />
                Continue with Google
            </a>

            {/* Register */}
            <p className="mt-4 text-sm text-center">
                Don't have an account?{" "}
                <NavLink to="/Register" className="text-blue-500 underline">
                    Sign up
                </NavLink>
            </p>
        </div>

                {/* RIGHT SIDE (IMAGE) */ }
    <div
        className="hidden md:flex md:w-1/2 text-white "
        style={{
            backgroundImage: `url(${spend})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}
    >
        <div className="p-6  rounded-xl">
            <h2 className="text-4xl mb-4">
                SmartSpend <span className="text-blue-300">AI</span>
            </h2>

            <p className="flex items-center mb-2">
                <FaCheck className="mr-2" /> Track Expenses
            </p>
            <p className="flex items-center mb-2">
                <FaCheck className="mr-2" /> Predict future spending
            </p>
            <p className="flex items-center ">
                <FaCheck className="mr-2" /> Secure your finances
            </p>
        </div>
    </div>

            </div >
        </main >
    )
}

export default Login
