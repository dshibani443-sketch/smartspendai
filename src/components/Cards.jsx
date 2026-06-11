import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";

import Expensechart from "./Expensechart";
import Recenttransactions from "./Recenttransactions";
import AIPrediction from "./AIPrediction";
import Categorychart from "./Categorychart";

function Cards() {

  // 🔹 State for dashboard data
  const [data, setData] = useState({
    totalIncome: 0,
    totalExpense: 0,
    totalBalance: 0,
    savings: 0,
  });

  const [loading, setLoading] = useState(true);

  // 🔹 Fetch dashboard data
  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {

      // ==========================
      // DASHBOARD SUMMARY API
      // GET /api/dashboard
      //
      // Response:
      // {
      //   totalIncome,
      //   totalExpense,
      //   totalBalance,
      //   savings
      // }
      // ==========================

      // const res = await API.get("/dashboard");
      // setData(res.data);

    } catch (err) {
      console.log(err);                                 //this line to be remove later
      // toast.error(err.response?.data?.message || "Failed to load dashboard");
    }finally {
      setLoading(false);
    }
  };

  // 🔹 Percentage calculation (optional)
  const incomePercent =
    data.totalIncome > 0
      ? ((data.totalIncome - data.totalExpense) / data.totalIncome * 100).toFixed(0)
      : 0;

  const expensePercent =
    data.totalIncome > 0
      ? ((data.totalExpense / data.totalIncome) * 100).toFixed(0)
      : 0;

  // 🔹 Dynamic Cards
  const cards = [
    {
      title: "Total Balance",
      amount: `₹${data.totalBalance}`,
      subtitle: "This Month",
      icon: Wallet,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Income",
      amount: `₹${data.totalIncome}`,
      subtitle: "This Month",
      extra: `+${incomePercent}%`,
      icon: TrendingUp,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Expense",
      amount: `₹${data.totalExpense}`,
      subtitle: "This Month",
      extra: `-${expensePercent}%`,
      icon: TrendingDown,
      color: "bg-red-100 text-red-600",
    },
    {
      title: "Savings",
      amount: `₹${data.savings}`,
      subtitle: "This Month",
      extra: `${incomePercent}%`,
      icon: PiggyBank,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  // if (loading) {
  //   return <p className="text-center mt-10">Loading dashboard...</p>;
  // }

  return (
    <div className="p-4 sm:p-6">

      {/* 🔹 Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-3">
        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 flex items-center justify-between hover:shadow-md transition"
            >
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {card.title}
                </p>

                <h3 className="text-2xl font-semibold mt-2 text-gray-800 dark:text-white">
                  {card.amount}
                </h3>

                <div className="flex flex-wrap items-center gap-2 text-sm mt-2">
                  <span className="text-gray-400">{card.subtitle}</span>

                  {card.extra && (
                    <span
                      className={`font-medium ${card.extra.includes("+")
                        ? "text-green-500"
                        : "text-red-500"
                        }`}
                    >
                      {card.extra}
                    </span>
                  )}
                </div>
              </div>

              <div className={`p-3 rounded-2xl ${card.color}`}>
                <Icon size={22} />
              </div>
            </div>
          );
        })}
      </div>

      {/* 🔹 Charts + AI Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow overflow-hidden">
          <Expensechart />
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow overflow-hidden">
          <Categorychart />
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow overflow-hidden">
          <Recenttransactions />
        </div>

        <div className="bg-linear-to-br from-blue-900 to-blue-600 text-white p-4 rounded-2xl shadow overflow-hidden">
          <AIPrediction />
        </div>

      </div>
    </div>
  );
}

export default Cards;