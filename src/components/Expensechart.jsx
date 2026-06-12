import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

// ✅ REQUIRED imports
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// ✅ REGISTER ONCE
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

const ExpenseChart = () => {

  const [chartData, setChartData] = useState([]);

  const data = {
    labels: chartData.map(item => item.month),

    datasets: [
      {
        label: "Expenses",
        data: chartData.map(item => item.expense),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.2)",
        tension: 0.4,
        fill: true,
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
    } catch (err) {
      console.log(err);                  //this line to be remove later
      toast.error(err.response?.data?.message || "Failed to load monthly expenses");
    } 
  };



  const options = {
    responsive: true,
    maintainAspectRatio: false,

    scales: {
      x: {
        ticks: {
          color: "#000000",
          font: {
            size: 14,
            weight: "bold"
          }
        }
      }
    }
  };

  return (
    <div className="h-70 mb-1">
      <h2 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">
        Monthly Expenses
      </h2>


      <Line className="" key="expense-chart" data={data} options={options} />
    </div>
  );
};

export default ExpenseChart;