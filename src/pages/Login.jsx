import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { FaLock, FaEye, FaEyeSlash} from "react-icons/fa";
import spend from "../assets/images/spend.png";
import logo from "../assets/images/logo.png";
import { FaCheck } from "react-icons/fa";
import API from "../services/api";



function Login() {
    const [showPassword, setShowPassword] = useState(false);
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

            alert("Login successful");

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
                        <div className="bg-gray-100 rounded-xl p-3 flex items-center">
                            <MdEmail className="text-gray-400 mr-2" />
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                placeholder="Email"
                                className="bg-transparent outline-none w-full"
                            />
                        </div>

                        {/* Password */}
                        <div className="bg-gray-100 rounded-xl p-3 flex items-center justify-between">

                            <div className="flex items-center w-full">
                                <FaLock className="text-gray-400 mr-2" />

                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    autoComplete="new-password"
                                    onChange={handleChange}
                                    placeholder="Password"
                                    className="bg-transparent outline-none w-full"
                                />
                            </div>

                            {/* Eye Icon */}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-gray-500 ml-2"
                            >
                                {showPassword ? <FaEye /> : <FaEyeSlash />  }
                            </button>

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

                {/* RIGHT SIDE (IMAGE) */}
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

            </div>
        </main>
    )
}

export default Login
