
import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { toast } from "react-toastify";
import API from "../services/api"; // ✅ API Base URL

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryChart = () => {
  

  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    fetchCategoryExpense();
  }, []);

  
  
  const fetchCategoryExpense = async () => {
    try {
      const res = await API.get("/dashboard/category"); 

      
      setCategoryData(res.data);
    } catch (err) {
        
      toast.error(err.response?.data?.message || "Failed to load category data");
    }
  };


  const categories = categoryData;

    const colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#8BC34A",
    "#E91E63",
  ];

  // 🔢 Total Calculation
  const total = categories.reduce((sum, item) => sum + item.amount, 0);

  const data = {
    labels: categories.map((c) => c.category),

    datasets: [
      {
        data: categories.map((c) => c.amount),

        backgroundColor: categories.map(
          (_, index) => colors[index % colors.length]
        ),

        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // ❌ hide default legend
      },
    },
    cutout: "70%", // makes donut look modern
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
      <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
        Expense by Category
      </h2>

      <div className="flex items-center justify-between">

        {/* 🥧 LEFT: Doughnut */}
        <div className="w-1/2 h-[200px]">
          <Doughnut data={data} options={options} />
        </div>

        {/* 📋 RIGHT: Details */}
        <div className="w-1/2 pl-4">

          {/* Total */}
          <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">
            Total: ₹{total}
          </h3>

          {/* Category List */}
          <div className="space-y-2">
            {categories.map((item, index) => (
              <div key={index} className="flex items-center justify-between">

                {/* Color + Name */}
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: colors[index % colors.length], }}
                  ></span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {item.category}
                  </span>
                </div>

                {/* Amount */}
                <span className="font-medium text-gray-800 dark:text-white">
                  ₹{item.amount}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default CategoryChart;