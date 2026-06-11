import React, { useEffect, useState } from "react";
import API from "../services/api";



const RecentTransactions = () => {


  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {


    // API will come later

    // try {
    //   const res = await API.get("/dashboard/monthly-expense");
    //   setChartData(res.data);
    // } catch (error) {
    //   console.log(error);
    // }
  };


  return (
    <>
      <h2 className="text-3xl font-bold mb-5 text-gray-800 dark:text-white">
        Recent Transactions
      </h2>

      <table className="w-full text-m">
        <thead>
          <tr className="text-gray-700 border-b">
            <th className="py-2 text-left">Date</th>
            <th className="text-left">Name</th>
            <th className="text-left">Category</th>
            <th className="text-left">Amount</th>
            <th className="text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((t, i) => (
            <tr key={i} className="border-b  hover:bg-gray-200">
              <td className="py-2">{t.date}</td>
              <td >{t.name}</td>
              <td>{t.category}</td>
              <td>₹{t.amount}</td>
              <td>
                <span className={`px-3 py-1 rounded text-xs ${t.status === "New"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-green-100 text-green-600"
                  }`}>
                  {t.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default RecentTransactions;