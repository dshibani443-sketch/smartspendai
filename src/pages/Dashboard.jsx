// import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
// import Mainbody from '../components/Mainbody'
import Cards from '../components/Cards'
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import API from "../services/api";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/auth/me")
      .then(res => {
        setUser(res.data);   // store user data
      })
      .catch(() => {
        navigate("/");  // redirect if not logged in
      });
  }, []);
  console.log(user);

  return (
    <>

      <div className="flex min-h-screen bg-slate-100 overflow-hidden">

        {/* Sidebar */}
        <Sidebar />

        {/* Right Section */}
        <div className="flex-1 flex flex-col overflow-x-hidden">

          {/* Header */}
          <Header />

          {/* Main Content */}
          <Cards />

        </div>

      </div>

    </>
  )
}

export default Dashboard
