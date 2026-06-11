import { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import API from "../services/api";

export default function TransactionsPage() {
  const [incomeList, setIncomeList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterDate, setFilterDate] = useState("");
  const [filterMonth, setFilterMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const [incomeRes, expenseRes] = await Promise.all([
        API.get("/income/"),
        API.get("/expense/"),
      ]);

      console.log("Income Response:", incomeRes.data); // Debug log
      console.log("Expense Response:", expenseRes.data); // Debug log

      setIncomeList(
        Array.isArray(incomeRes.data.data) ? incomeRes.data.data : []
      );
      setExpenseList(
        Array.isArray(expenseRes.data.data) ? expenseRes.data.data : []
      );
    } catch (error) {
      console.error("Error fetching transactions:", error); // Debug log
      toast.error(
        error.response?.data?.message || "Failed to fetch transactions"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const transactionList = useMemo(() => {
    const incomeTransactions = incomeList.map((item) => ({
      id: `income-${item.id || item._id}`,
      type: "income",
      title: item.source || "Unknown Source",
      date: item.date || "",
      note: item.note || "",
      amount: Number(item.amount),
    }));

    const expenseTransactions = expenseList.map((item) => ({
      id: `expense-${item.id || item._id}`,
      type: "expense",
      title: item.category,
      date: item.date || "",
      note: item.note || "",
      amount: Number(item.amount || 0),
    }));

    return [...incomeTransactions, ...expenseTransactions].sort(
      (a, b) => {
        const dateA = a.date ? new Date(a.date) : new Date(0);
        const dateB = b.date ? new Date(b.date) : new Date(0);
        return dateB - dateA;
      }
    );
  }, [incomeList, expenseList]);

  const categoryOptions = useMemo(() => {
    const categories = transactionList.map((item) => item.title);
    return ["all", ...Array.from(new Set(categories))];
  }, [transactionList]);

  const filteredTransactions = useMemo(() => {
    return transactionList.filter((item) => {
      if (filterType !== "all" && item.type !== filterType) return false;
      if (filterCategory !== "all" && item.title !== filterCategory)
        return false;
      if (filterDate && item.date !== filterDate) return false;
      if (filterMonth) {
        const itemMonth = item.date?.slice(0, 7);
        if (itemMonth !== filterMonth) return false;
      }
      return true;
    });
  }, [transactionList, filterType, filterCategory, filterDate, filterMonth]);

  const totalIncome = filteredTransactions
    .filter((item) => item.type === "income")
    .reduce((total, item) => total + item.amount, 0);

  const totalExpense = filteredTransactions
    .filter((item) => item.type === "expense")
    .reduce((total, item) => total + item.amount, 0);

  const netTotal = totalIncome - totalExpense;

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold">Transactions</h1>
          <p className="text-slate-400 mt-1">
            View income and expense history with filters.
          </p>
        </div>

        <span className="flex gap-3">
          <button
            onClick={() => (window.location.href = "/dashboard")}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-xl shadow-lg"
          >
            Dashboard
          </button>

          <button
            onClick={fetchTransactions}
            className="self-start bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-xl shadow-lg"
          >
            Refresh
          </button>
        </span>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_1fr] mb-6">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg">Total Income</h2>
          <p className="text-3xl font-bold">₹{totalIncome}</p>
        </div>
        <div className="bg-gradient-to-r from-red-500 to-pink-600 p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg">Total Expense</h2>
          <p className="text-3xl font-bold">₹{totalExpense}</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-2xl shadow-lg xl:col-span-2">
          <h2 className="text-lg">Savings</h2>
          <p className={`text-3xl font-bold ${netTotal >= 0 ? "text-emerald-400" : "text-red-400"}`}>
            ₹{netTotal}
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 mb-6">
        <div className="bg-slate-800 p-4 rounded-2xl">
          <label className="block mb-2 text-sm text-slate-400">Transaction Type</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full rounded-xl bg-slate-700 p-3"
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="bg-slate-800 p-4 rounded-2xl">
          <label className="block mb-2 text-sm text-slate-400">Category / Source</label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full rounded-xl bg-slate-700 p-3"
          >
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category === "all" ? "All" : category}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-slate-800 p-4 rounded-2xl">
          <label className="block mb-2 text-sm text-slate-400">Filter by Date</label>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => {
              setFilterDate(e.target.value);
              setFilterMonth("");
            }}
            className="w-full rounded-xl bg-slate-700 p-3"
          />
        </div>

        <div className="bg-slate-800 p-4 rounded-2xl">
          <label className="block mb-2 text-sm text-slate-400">Filter by Month</label>
          <input
            type="month"
            value={filterMonth}
            onChange={(e) => {
              setFilterMonth(e.target.value);
              setFilterDate("");
            }}
            className="w-full rounded-xl bg-slate-700 p-3"
          />
        </div>
      </div>

      <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Transaction History</h2>
          <span className="text-sm text-slate-400">
            {filteredTransactions.length} record{filteredTransactions.length === 1 ? "" : "s"}
          </span>
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-300">Loading transactions...</div>
        ) : filteredTransactions.length === 0 ? (
          <div className="text-center py-20 text-slate-400">No transactions found.</div>
        ) : (
          <div className="space-y-4">
            {filteredTransactions.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 p-4 rounded-2xl flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full bg-slate-700 text-sm uppercase tracking-[0.05em]">
                      {item.type}
                    </span>
                    <span className="text-sm text-slate-400">{item.date || "No date"}</span>
                  </div>

                  <p className="text-2xl font-semibold">{item.title}</p>
                  {item.note && <p className="text-slate-400 mt-1">{item.note}</p>}
                </div>

                <div className="text-right">
                  <p className={`text-3xl font-bold ${item.type === "income" ? "text-emerald-400" : "text-red-400"}`}>
                    {item.type === "income" ? "+₹" : "-₹"}{item.amount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
