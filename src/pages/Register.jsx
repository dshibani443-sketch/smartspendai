import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { FaLock, FaUser, FaEye, FaEyeSlash, FaCheck } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import spend from "../assets/images/spend.png";
import logo from "../assets/images/logo.png";
import API from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [confirmPassword, setConfirmPassword] = useState("");

    // 👁️ toggle states
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validateEmail = () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(form.email.trim())) {
            alert("Please enter a valid email address");
            return false;
        }
        return true;
    };

    const validatePassword = () => {
        const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
        if (!regex.test(form.password)) {
            alert("Password must contain: 8 characters, 1 uppercase, 1 number, 1 special character");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.username || !form.email || !form.password) {
            alert("All fields required");
            return;
        }

        if (!validateEmail()) return;
        if (!validatePassword()) return;

        if (form.password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const res = await API.post("/auth/register", form);
            alert("Registration Successful 🎉");
            navigate("/");
        } catch (err) {
            if (err.response) {
                alert(err.response.data.detail);
            } else {
                alert("Server error");
            }
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden">

                {/* LEFT FORM */}
                <div className="w-full md:w-1/2 p-6 md:p-10">

                    {/* Logo */}
                    <div className="flex items-center  mb-6">
                        <img src={logo} alt="logo" className="w-20 h-20" />
                        <h1 className=" text-3xl font-bold">
                            SmartSpend <span className="text-blue-500">AI</span>
                        </h1>
                    </div>

                    <h2 className="text-2xl ml-20 md:text-3xl mb-3">
                        Create Account
                    </h2>
                    <p className="text-gray-700 ml-28 mb-6">
                        Sign up to get started
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Username */}
                        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
                            <FaUser className="text-gray-400 mr-2" />
                            <input
                                type="text"
                                name="username"
                                placeholder="Enter your name"
                                onChange={handleChange}
                                required
                                className="bg-transparent outline-none w-full"
                            />
                        </div>

                        {/* Email */}
                        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
                            <MdEmail className="text-gray-400 mr-2" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                onChange={handleChange}
                                required
                                className="bg-transparent outline-none w-full"
                            />
                        </div>

                        {/* Password */}
                        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
                            <FaLock className="text-gray-400 mr-2" />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter Password"
                                onChange={handleChange}
                                required
                                className="bg-transparent outline-none w-full"
                            />
                            <span
                                className="cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>

                        {/* Confirm Password */}
                        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
                            <FaLock className="text-gray-400 mr-2" />
                            <input
                                type={showConfirm ? "text" : "password"}
                                placeholder="Confirm Password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="bg-transparent outline-none w-full"
                            />
                            <span
                                className="cursor-pointer"
                                onClick={() => setShowConfirm(!showConfirm)}
                            >
                                {showConfirm ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>

                        {/* Button */}
                        <button className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-amber-300 transition">
                            Sign Up →
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center my-6">
                        <div className="flex-grow border-t" />
                        <span className="mx-3 text-sm text-gray-500">OR</span>
                        <div className="flex-grow border-t" />
                    </div>

                    {/* Google */}
                    <a
                        href="https://smartspend-ai-68ou.onrender.com/auth/google"
                        className="flex items-center justify-center gap-2  rounded-xl p-3 shadow-lg hover:bg-amber-300 transition"
                    >
                        <FcGoogle className="text-xl" />
                        Continue with Google
                    </a>

                    {/* Login */}
                    <p className="mt-4 text-sm text-center">
                        Already have an account?{" "}
                        <NavLink to="/" className="text-blue-500 underline">
                            Login
                        </NavLink>
                    </p>
                </div>

                {/* RIGHT IMAGE (hidden on mobile) */}
                <div
                    className="hidden md:flex w-1/2 text-white"
                    style={{
                        backgroundImage: `url(${spend})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="p-6 rounded-xl">
                        <h2 className="text-4xl mb-4">
                            SmartSpend <span className="text-blue-300">AI</span>
                        </h2>

                        <p className="flex items-center mb-2">
                            <FaCheck className="mr-2" /> Track Expenses
                        </p>
                        <p className="flex items-center mb-2">
                            <FaCheck className="mr-2" /> Predict future Spending
                        </p>
                        <p className="flex items-center">
                            <FaCheck className="mr-2" /> Secure your Finances
                        </p>
                    </div>
                </div>

            </div>
        </main>
    );
}

export default Register;