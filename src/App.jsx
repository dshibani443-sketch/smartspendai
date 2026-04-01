import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";


// import React from 'react'
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Forgotpass from "./pages/Forgotpass";
import VerifyOTP from "./pages/Verifyotp";
import NewPassword from "./pages/Newpassword";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import Logout from "./pages/Logout";


function App() {

  const { loading } = useContext(AuthContext);

  if (loading) {
    return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
    </div>
  ); 
  }

  return (
    <>
      
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" 
          element={
                <ProtectedRoute>
                  <Dashboard/>
                </ProtectedRoute>
          } />
          <Route path="/forgotpass" element={<Forgotpass/>}/>
          <Route path="/verifyotp" element={<VerifyOTP/>}/>
          <Route path="/newpassword" element={<NewPassword/>}/>
          <Route path="/income" element={<Income/>}/>
          <Route path="/expense" element={<Expense/>}/>
          <Route path="/logout" element={<Logout/>}/>
          
        </Routes>
      
    </>

  )
}


export default App;



// for App.jsx