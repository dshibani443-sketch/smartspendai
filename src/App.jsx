import { BrowserRouter, Routes, Route } from "react-router-dom";
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


function App() {
  return (
    <>
      <BrowserRouter>
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
          
        </Routes>
      </BrowserRouter>
      
    </>

  )
}


export default App;
