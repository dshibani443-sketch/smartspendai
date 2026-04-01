import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";


// added by hasanur

function Logout(){
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext)

    useEffect(()=>{
        const logoutUser = async () =>{
            try{
                const res = await API.post("/auth/logout")
                toast.info(res.data.success)
            } catch (err) {
                toast.error("Logout error");
            } finally {
                setUser(null)
                navigate("/")
            }
        };
        logoutUser()
    }, []);

    return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
    </div> 
    )
}

export default Logout