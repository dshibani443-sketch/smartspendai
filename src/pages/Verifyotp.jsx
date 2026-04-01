import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../services/api";

function VerifyOTP() {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [expiresAtState, setExpiresAtState] = useState(location.state?.expiresAt);
    //restore expiry otp                            //new line|code add by me
    useEffect(() => {
        if (!expiresAtState) {
            const saved = sessionStorage.getItem("otp_expiry");
            if (saved) {
                setExpiresAtState(Number(saved));
            }
        }
    }, []);

    const calculateTimeLeft = () => {
        if (!expiresAtState) return 0;
        const now = Date.now();
        const diff = Math.floor((expiresAtState - now) / 1000);
        return diff > 0 ? diff : 0;
    };

    const [timeLeft, setTimeLeft] = useState(0);
    const inputRefs = useRef([]);

    // ✅ Countdown Timer
    useEffect(() => {
        
        if (!expiresAtState) return;

        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [expiresAtState]);

    // ✅ Save expiry (ADD HERE)                   //new line|code add by me
    useEffect(() => {
        if (expiresAtState) {
            sessionStorage.setItem("otp_expiry", expiresAtState);
        }
    }, [expiresAtState]);

    // ✅ Format time (MM:SS)
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };

    // ✅ Handle OTP input
    const handleChange = (value, index) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    // ✅ Backspace handling
    const handleBackspace = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    // ✅ Submit OTP
    const handleSubmit = async () => {
        const finalOtp = otp.join("");

        if (finalOtp.length !== 6) {
            alert("Enter valid OTP");
            return;
        }

        if (timeLeft <= 0) {
            alert("OTP expired. Please resend.");
            return;
        }

        try {
            const res = await API.post("/auth/verify-otp", {
                email: email,
                otp: finalOtp,
            });

            if (res.data.success) {
                sessionStorage.setItem("reset_token", res.data.reset_token);

                alert(res.data.message || "OTP Verified Successfully");

                navigate("/newpassword", { state: { email } });
            } else {
                alert(res.data.message || "Invalid OTP");
            }
        } catch (error) {
            alert(error.response?.data?.message || "Something went wrong");
        }
    };

    // ✅ Resend OTP
    const handleResend = async () => {
        try {
            const res = await API.post("/auth/resend-otp", { email });

            const newExpiresAt = res.data.expiresAt;

            // ✅ update state instead of mutating location
            setExpiresAtState(newExpiresAt);

            setOtp(["", "", "", "", "", ""]);

            alert("OTP resent successfully");
        } catch (err) {
            alert(err.response?.data?.detail || "Server error");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4 bg-gray-100">
            <div className="w-150 h-80 p-8 flex flex-col items-center bg-white shadow-2xl rounded-2xl">

                <h2 className="text-3xl font-bold text-green-600 mb-2">
                    OTP Verification
                </h2>

                <p className="text-gray-600 text-2xl text-center mb-6">
                    Enter the OTP sent to your registered email
                </p>

                {/* OTP Inputs */}
                <div className="flex gap-3">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            value={digit}
                            ref={(el) => (inputRefs.current[index] = el)}
                            onChange={(e) =>
                                handleChange(e.target.value, index)
                            }
                            onKeyDown={(e) =>
                                handleBackspace(e, index)
                            }
                            className="w-12 h-12 text-center border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    ))}
                </div>

                {/* Timer + Resend */}
                <div className="flex justify-between w-full mt-6 text-sm">
                    <p className="text-gray-500">
                        Remaining time:{" "}
                        <span className="text-indigo-600 font-semibold">
                            {timeLeft > 0 ? formatTime(timeLeft) : "Expired"}
                        </span>
                    </p>

                    <button
                        onClick={handleResend}
                        disabled={timeLeft > 0}
                        className={`font-semibold ${timeLeft > 0
                            ? "text-gray-800 cursor-not-allowed"
                            : "text-indigo-600 hover:underline"
                            }`}
                    >
                        Resend
                    </button>
                </div>

                {/* Verify Button */}
                <button
                    onClick={handleSubmit}
                    disabled={timeLeft <= 0}
                    className={`w-full py-2 mt-6 rounded-lg text-white font-semibold transition 
                    ${timeLeft <= 0
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-amber-600"
                        }`}
                >
                    Verify OTP
                </button>
            </div>
        </div>
    );
}

export default VerifyOTP;