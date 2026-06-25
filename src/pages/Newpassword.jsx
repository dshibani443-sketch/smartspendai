import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from "react-toastify";


function NewPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // ✅ NEW: state for toggle visibility
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    // ✅ NEW: strong password validation function
    const isStrongPassword = (pwd) => {
        const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
        return regex.test(pwd);
    };

    const handleSubmit = async () => {

        // ✅ NEW: check strong password
        if (!isStrongPassword(password)) {
            toast.error("Password must be at least 8 characters.");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const resetToken = sessionStorage.getItem("reset_token");

            const res = await API.post("/auth/reset-password", {
                new_password: password,
                reset_token: resetToken
            });
            

            toast.success("Password updated successfully."); 
            
            // optional: remove token after use
            sessionStorage.removeItem("reset_token");

            navigate("/");

        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating password");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen ">
            <div className="p-8 rounded-2xl shadow-2xl flex flex-col items-center w-150 h-80">
                <h2 className="text-4xl font-semibold text-amber-400 mb-4">
                    Create New Password
                </h2>

                {/* ✅ Password Input with Eye Icon */}
                <div className="bg-gray-100 w-90 p-3 rounded-xl flex items-center mt-3">
                    <input
                        type={showPassword ? "text" : "password"}  // ✅ NEW
                        placeholder="New Password"
                        className="outline-none w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span onClick={() => setShowPassword(!showPassword)} className="cursor-pointer">
                        {showPassword ? <FaEyeSlash /> : <FaEye />} {/* ✅ NEW */}
                    </span>
                </div>

                {/* ✅ Confirm Password Input with Eye Icon */}
                <div className="bg-gray-100 w-90 p-3 rounded-xl flex items-center mt-3">
                    <input
                        type={showConfirmPassword ? "text" : "password"}  // ✅ NEW
                        placeholder="Confirm Password"
                        className="outline-none w-full"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="cursor-pointer">
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />} {/* ✅ NEW */}
                    </span>
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-40 mt-10 bg-indigo-600 text-white py-2 rounded-xl hover:bg-green-400"
                >
                    Update Password
                </button>
            </div>
        </div>
    );
}

export default NewPassword;