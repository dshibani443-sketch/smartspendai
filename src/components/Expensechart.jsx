import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import API from "../services/api";
import { toast } from "react-toastify"; // ✅ Toast for error handling

// ✅ REQUIRED imports
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,

} from "chart.js";

// ✅ REGISTER ONCE
ChartJS.register(

  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend

);

const ExpenseChart = () => {
  console.log("ExpenseChart component rendered"); // Debugging line

  const [chartData, setChartData] = useState([]);

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const data = {
    labels: chartData.map((item) => {
      const monthIndex = Number(item.month);
      return months[monthIndex] || item.month || "Unknown";
    }),
    datasets: [
      {
        label: "Expenses",
        data: chartData.map((item) => item.amount),
        backgroundColor: "#3b82f6",
        borderRadius: 6,
        borderSkipped: false,
        barThickness: 18,
        maxBarThickness: 20,
      },
    ],
  };



  useEffect(() => {
    fetchMonthlyExpense();
  }, []);

  const fetchMonthlyExpense = async () => {
    try {
      const res = await API.get("/dashboard/monthly");
      setChartData(res.data);
      console.log("Monthly Expense Data:", res.data); // Debugging line
    } catch (err) {
      console.log(err);
      console.log(err.response);
      console.log(err.response?.data);
      console.log(err.message);
    }
  };



  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `₹${context.parsed.y}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#64748b",
          font: {
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "#e5e7eb",
        },
        ticks: {
          color: "#64748b",
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div className="h-70 mb-1">
      <h2 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">
        Monthly Expenses
      </h2>


      <Bar className="" key="expense-chart" data={data} options={options} />
    </div>
  );
};

export default ExpenseChart;