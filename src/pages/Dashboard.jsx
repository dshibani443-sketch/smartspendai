// import React from 'react'
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Cards from '../components/Cards'

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-100 overflow-hidden">

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Mobile backdrop */}
      {isSidebarOpen && (
        <button
          type="button"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/30 sm:hidden"
          aria-label="Close sidebar"
        />
      )}

      {/* Right Section */}
      <div className="flex-1 flex flex-col overflow-x-hidden">

        {/* Mobile menu button */}
        <div className="sm:hidden p-4">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-slate-900 text-white shadow-lg"
            aria-label="Open sidebar menu"
          >
            <span className="text-2xl leading-none">⋮</span>
          </button>
        </div>

        {/* Header */}
        <Header />

        {/* Main Content */}
        <Cards />

      </div>
    </div>
  );
}

export default Dashboard
