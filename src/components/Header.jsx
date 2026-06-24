import { useEffect, useState, useContext } from "react";
import { Search, Bell, Moon, Sun } from "lucide-react";
import { AuthContext } from "../context/AuthContext";


function Header() {
    const [darkMode, setDarkMode] = useState(() => {
        try {
            const stored = localStorage.getItem("theme");
            if (stored) return stored === "dark";
            return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        } catch (e) {
            return false;
        }
    });
     const {user} = useContext(AuthContext)

    useEffect(() => {
        try {
            if (darkMode) {
                document.documentElement.setAttribute("data-theme", "dark");
                localStorage.setItem("theme", "dark");
            } else {
                document.documentElement.removeAttribute("data-theme");
                localStorage.setItem("theme", "light");
            }
        } catch (e) {
            if (darkMode) document.documentElement.setAttribute("data-theme", "dark");
            else document.documentElement.removeAttribute("data-theme");
        }
    }, [darkMode]);

    return (
        <div className="w-full h-16 px-6 flex items-center justify-between
                    bg-white text-black
                    dark:bg-slate-900 dark:text-white
                    border-b border-slate-200 dark:border-slate-700">

            {/* Search */}
            <div className="flex items-center gap-2 
                      bg-gray-100 dark:bg-slate-800 
                      px-3 py-2 rounded-lg w-96">
                <Search size={25} className="text-slate-500" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent outline-none w-full text-sm"
                />
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-5">

                {/* Notification */}
                <Bell className="cursor-pointer" size={25} />

                {/* Dark Mode Toggle */}
                <button
                    onClick={() => setDarkMode((s) => !s)}
                    className="cursor-pointer"
                    aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                    title={darkMode ? "Light mode" : "Dark mode"}
                >
                    {darkMode ? <Sun size={25} /> : <Moon size={25} />}
                </button>

                {/* User Name */}
                <span className="font-medium">{user.username}</span>
                <img
                    src="https://i.pravatar.cc/40"
                    alt="user"
                    className="w-8 h-8 rounded-full"
                />

            </div>
        </div>
    );
}

export default Header;