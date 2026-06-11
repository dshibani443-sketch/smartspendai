// import React from "react";
import logo from "../assets/images/logo.png";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
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

function Sidebar({ isOpen = false, onClose }) {
    const navigate = useNavigate();
    const {user} = useContext(AuthContext)
    console.log(user);

    const sidebarClasses = `fixed inset-y-0 left-0 z-40 w-[280px] max-w-[80%] transform bg-slate-900 text-white flex flex-col justify-between transition-transform duration-300 shadow-xl sm:relative sm:translate-x-0 sm:w-70 sm:max-w-none ${isOpen ? 'translate-x-0' : '-translate-x-full'}`;

    return (
        <div className={sidebarClasses}>
            <div className="flex items-center justify-between p-4 sm:hidden">
                <div className="text-lg font-semibold">Menu</div>
                <button
                    type="button"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 hover:bg-slate-600"
                    onClick={onClose}
                    aria-label="Close menu"
                >
                    ✕
                </button>
            </div>

            {/* Top Section */}
            <div className="px-4 pb-6">
                {/* Logo */}
                <div className="flex items-center gap-4 mb-8">
                    <div
                        className="h-16 w-16 rounded-2xl bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${logo})`
                        }}
                    />
                    <div>
                        <div className='text-xl font-bold'>SmartSpend</div>
                        <div className='text-xl font-bold text-blue-400'>AI</div>
                    </div>
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
                        <NavLink to="/transactions">Transactions</NavLink>
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
                        <span className="text-sm font-semibold">{user.username}</span>
                        <span className="text-xs text-slate-400">{user.email}</span>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default Sidebar;