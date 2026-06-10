import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

//this will be added by me
import API from "../services/api"; // ✅ API Base URL



export default function ExpensePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [expenseList, setExpenseList] = useState([]);

  const [form, setForm] = useState({
    category: "",
    amount: "",
    date: "",
    note: "",
  });

  const [customCategory, setCustomCategory] = useState("");






  const fetchExpenses = async () => {                    //this function and 77 no line must be uncommand together
    try {
      const res = await API.get(`/expense/`);
      setExpenseList(res.data.data || []);
    } catch (err) {
      toast.error("Failed to load data");
    }
  };




  //run on page load
  useEffect(() => {
    fetchExpenses();
  }, []);



  // ✅ Total Expense
  const totalExpense = expenseList.reduce(
    (acc, item) => acc + Number(item.amount),
    0
  );

  const resetForm = () => {
    setForm({
      category: "",
      amount: "",
      date: "",
      note: "",
    });

    setCustomCategory("");
  };

  // ✅ Submit to before return must be edit.
  const handleSubmit = async () => {

    if (!form.category || !form.amount) {
      toast.error("Please fill required fields");
      return;
    }

    if (form.category === "custom" && !customCategory.trim()) {
      toast.error("Please enter custom category");
      return;
    }

    const amount = Number(form.amount);

    if (amount <= 0) {
      toast.error("Amount must be greater than 0");
      return;
    }

    const finalCategory =
      form.category === "custom" ? customCategory : form.category;

    const newExpense = {
      ...form,
      category: finalCategory,
    };

    try {

      setLoading(true);

      await API.post(`/expense/`, newExpense);

      // 🔄 Refresh list
      await fetchExpenses();

      toast.success("Expense Added Successfully");

      resetForm();
      setIsOpen(false);

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }

  };


  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Expense</h1>
        <span className="flex gap-3">

          <button
            onClick={() => (window.location.href = "/dashboard")}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-xl shadow-lg"
          >
            Dashboard
          </button>

        <button
          onClick={() => {
            resetForm();
            setIsOpen(true);
          }}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl shadow-lg"
        >
          + Add Expense
        </button>
        </span>
      </div>

      {/* Total Card */}
      <div className="bg-gradient-to-r from-red-500 to-pink-600 p-6 rounded-2xl shadow-lg mb-6">
        <h2 className="text-lg">Total Expense</h2>
        <p className="text-3xl font-bold">₹{totalExpense}</p>
      </div>

      {/* Expense List */}
      <div className="space-y-4">
        {expenseList.map((item) => (
          <div
            key={item.id}
            className="bg-slate-800 p-4 rounded-xl flex justify-between items-center hover:scale-[1.02] transition"
          >
            <div>
              <p className="font-semibold text-2xl">{item.category}</p>
              <p className="text-l text-gray-200">{item.date}</p>

              {item.note && (
                <p className="text-xl text-gray-200 mt-1">{item.note}</p>
              )}
            </div>

            <div className="text-red-400 font-bold">
              -₹{item.amount}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-slate-800 p-6 rounded-2xl w-full max-w-md shadow-xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-xl mb-4 font-semibold text-center">
                Add Expense
              </h2>

              <div className="space-y-3">

                {/* Category */}
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="w-full p-2 rounded bg-slate-700"
                >
                  <option value="">Select Category</option>
                  <option value="Food">Food</option>
                  <option value="Travel">Travel</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Bills">Bills</option>
                  <option value="custom">Other</option>
                </select>

                {/* Custom Category */}
                {form.category === "custom" && (
                  <input
                    type="text"
                    placeholder="Custom category"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    className="w-full p-2 rounded bg-slate-700"
                  />
                )}

                {/* Amount */}
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-400">₹</span>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={form.amount}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setForm({ ...form, amount: value });
                      }
                    }}
                    className="w-full pl-8 p-2 rounded bg-slate-700"
                  />
                </div>

                {/* Date */}
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) =>
                    setForm({ ...form, date: e.target.value })
                  }
                  className="w-full p-2 rounded bg-slate-700"
                />

                {/* Note */}
                <textarea
                  placeholder="Note (optional)"
                  value={form.note}
                  onChange={(e) =>
                    setForm({ ...form, note: e.target.value })
                  }
                  className="w-full p-2 rounded bg-slate-700"
                  maxLength={1000}
                />

                {/* Buttons */}
                <div className="flex gap-3 pt-2">

                  <button
                    onClick={() => {
                      resetForm();
                      setIsOpen(false);
                    }}
                    className="w-1/2 bg-gray-500 py-2 rounded"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-1/2 bg-red-500 py-2 rounded flex justify-center"
                  >
                    {loading ? "Adding..." : "Save"}
                  </button>

                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}