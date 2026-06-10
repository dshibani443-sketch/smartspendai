import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import API from "../services/api"; // ✅ API Base URL

export default function IncomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [incomeList, setIncomeList] = useState([]);

  const [form, setForm] = useState({
    source: "",
    amount: "",
    date: "",
    note: "",
  });

  const [customSource, setCustomSource] = useState("");



  // ✅ Fetch income from backend
  const fetchIncome = async () => {
    try {
      const res = await API.get(`/income/`);
      setIncomeList(res.data.data || []);
    } catch (error) {
      toast.error("Failed to load data");
    }
  };

  // ✅ Run on page load
  useEffect(() => {
    fetchIncome();
  }, []);





  //total icome section
  const totalIncome = incomeList.reduce(
    (acc, item) => acc + Number(item.amount),
    0
  );

  //reset form
  const resetForm = () => {
    setForm({ source: "", amount: "", date: "", note: "" });
    setCustomSource("");
  };


  // function handelsubmit with post api
  const handleSubmit = async () => {
    const amount = Number(form.amount);

    // ❌ Validation
    if (!form.source || !form.amount) {
      toast.error("Please fill required fields");
      return;
    }
    if (form.source === "custom" && !customSource.trim()) {
      toast.error("Please enter custom source");
      return;
    }

    if (amount <= 0) {
      toast.error("Amount must be greater than 0");
      return;
    }

    const finalData = {
      ...form,
      source: form.source === "custom" ? customSource : form.source,
    };

    try {
      //for data storing 

      setLoading(true);

      await API.post(`/income/`, finalData);

      // ✅ Always refresh from backend
      await fetchIncome();

      toast.success("Income Added Successfully");

      resetForm();
      setIsOpen(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Income</h1>
        <span className="flex gap-3">
          <button
            onClick={() => (window.location.href = "/dashboard")}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-xl shadow-lg"
          >
            Dashboard
          </button>

          <button
            onClick={() => setIsOpen(true)}
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-xl shadow-lg"
          >
            + Add Income
          </button>
        </span>
      </div>

      {/* Total Card */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 rounded-2xl shadow-lg mb-6">
        <h2 className="text-lg">Total Income</h2>
        <p className="text-3xl font-bold">₹{totalIncome}</p>
      </div>

      {/* Income List */}
      <div className="space-y-4">
        {incomeList.map((item) => (
          <div
            key={item.id}
            className="bg-slate-800 p-4 rounded-xl flex justify-between items-center hover:scale-[1.02] transition"
          >
            <div>
              <p className="font-semibold text-2xl">{item.source}</p>
              <p className="text-l text-gray-200">{item.date}</p>

              {/* ✅ for note showing */}

              {item.note && (
                <p className="text-xl text-gray-200 mt-1">{item.note}</p>
              )}
            </div>

            <div className="text-green-400 font-bold">
              +₹{item.amount}
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
                Add Income
              </h2>

              <div className="space-y-3">

                {/* Source */}
                <select
                  value={form.source}
                  onChange={(e) =>
                    setForm({ ...form, source: e.target.value })
                  }
                  className="w-full p-2 rounded bg-slate-700"
                >
                  <option value="">Select Source</option>
                  <option value="Salary">Salary</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Business">Business</option>
                  <option value="custom">Other</option>
                </select>

                {/* Custom Source */}
                {form.source === "custom" && (
                  <input
                    type="text"
                    placeholder="Custom source"
                    value={customSource}
                    onChange={(e) => setCustomSource(e.target.value)}
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
                    className="w-full pl-8 p-2 rounded bg-slate-700 appearance-none no-spinner"
                    min="1"
                    step="1"
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
                    className="w-1/2 bg-green-500 py-2 rounded flex justify-center"
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

};
