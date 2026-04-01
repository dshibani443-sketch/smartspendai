// import React from "react";
import logo from "../assets/images/logo.png";
import {
    Home,
    Wallet,
    CreditCard,
    Repeat,
    Brain,
    ShieldAlert,
    Settings,
    LogOut
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
    const navigate = useNavigate();


    
    
    return (
        <div className="h-screen w-70 bg-slate-900 text-white flex flex-col justify-between">

            {/* Top Section */}
            <div>
                {/* Logo */}
                <div className="" style={{
                    width: "70px",
                    height: "70px",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundImage: `url(${logo})`
                }}>
                    <span className='text-2xl font-bold relative left-[60px] top-[18px]'>SmartSpend</span><span className='text-left text-2xl font-bold text-blue-400 relative left-[65px] top-[18px]'>AI</span>
                </div>

                {/* Menu */}
                <ul className="mt-5 space-y-2 px-3">

                    <li className="flex items-center gap-3 p-3 rounded-lg bg-slate-800 cursor-pointer">
                        <Home size={20} />
                        Dashboard
                    </li>

                    <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 cursor-pointer">
                        <Wallet size={20} />
                        <NavLink to="/income">Income</NavLink> {/* page add methode is that*/}

                    </li>

                    <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 cursor-pointer">
                        <CreditCard size={20} />
                        <NavLink to="/Expense">Expenses</NavLink> {/* page add methode is that*/}

                    </li>

                    <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 cursor-pointer">
                        <Repeat size={20} />
                        Transactions
                    </li>

                    <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 cursor-pointer">
                        <Brain size={20} />
                        AI Prediction
                    </li>

                    <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 cursor-pointer">
                        <ShieldAlert size={20} />
                        Risk Analysis
                    </li>

                    <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 cursor-pointer">
                        <Settings size={20} />
                        Settings
                    </li>
                    <li>
                        {/* added by hasanur */}
                        <button onClick={() => navigate("/logout")}
                        className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-slate-800 cursor-pointer">
                            <LogOut size={20} />
                            Logout
                        </button>
                    </li>

                </ul>
            </div>

            {/* Bottom Section */}
            <div className="p-4 border-t border-slate-700">
                <div className="flex items-center gap-3">

                    {/* Avatar */}
                    <img
                        src="https://i.pravatar.cc/40"
                        alt="user"
                        className="w-10 h-10 rounded-full"
                    />

                    {/* User Info */}
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold">John Doe</span>
                        <span className="text-xs text-slate-400">john@example.com</span>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default Sidebar;