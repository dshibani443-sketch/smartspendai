import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import API from "../services/api";
import { toast } from "react-toastify";


function ForgotPassword() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSendOTP = async () => {
    try {
        const res = await API.post("/auth/forgot-password", { email });
        console.log(res); //later remove

        if (res.data.success) {   // check backend flag
            toast.success("Otp send Successfully.")
            navigate("/verifyotp", { state: { email , 
                expiresAt:res.data.expiresAt } });//this is new line add by me
        } else {
            toast.error(res.data.message || "Failed to send OTP");
        }

    } catch (error) {
        toast.error(error.response?.data?.message || "Error sending OTP");
    }
};

    return (
        <div className="flex flex-col justify-center  items-center  h-screen ">
            <div className="w-180 h-100 flex flex-col items-center bg-white shadow-2xl rounded-2xl  ">
                <h2 className="flex justify-center mt-[20px] text-5xl text-blue-600">Forgot Password</h2>

                <div className=" flex p-2 mt-20 bg-gray-100 w-120 rounded-xl  ">
                    <MdEmail className="text-gray-400 m-2" />
                    <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Email' name='email' required className='outline-none w-120' />
                </div>
                <div  className="flex justify-between">


                </div>


                    


                <button className="className=' w-50 rounded-xl px-12 py-2 mt-20 inline-block font-semibold text-white bg-blue-600 hover:bg-green-500 hover:text-white '" onClick={handleSendOTP}>Send OTP</button>
            </div>
        </div>
    );
}

export default ForgotPassword;