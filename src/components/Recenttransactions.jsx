import React, { useEffect, useState } from "react";
import API from "../services/api";

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await API.get("/transactions");

      const data = Array.isArray(res.data) ? res.data : [];

      // Backend already sorts latest first
      // Only show latest 5 transactions
      setTransactions(data.slice(0, 5));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold mb-5 text-gray-800 dark:text-white">
        Recent Transactions
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-md">
          <thead>
            <tr className="text-gray-700 dark:text-gray-300 border-b">
              <th className="py-3 text-left">Date</th>
              <th className="text-left">Name</th>
              <th className="text-left">Category</th>
              <th className="text-left">Amount</th>
              <th className="text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((t, i) => (
              <tr
                key={i}
                className="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                {/* Date */}
                <td className="py-3">
                  {new Date(t.date).toLocaleDateString()}
                </td>

                {/* Name */}
                <td>{t.title}</td>

                {/* Category */}
                <td className="capitalize">
                  {t.type}
                </td>

                {/* Amount */}
                <td
                  className={`font-semibold ${
                    t.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {t.type === "income" ? "+" : "-"}₹{t.amount}
                </td>

                {/* Status */}
                <td>
                  <span
                    className={`px-3 py-1 rounded text-xs font-medium ${
                      t.type === "income"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {t.type === "income"
                      ? "Income"
                      : "Expense"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {transactions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No transactions found.
          </div>
        )}
      </div>
    </>
  );
};

export default RecentTransactions;