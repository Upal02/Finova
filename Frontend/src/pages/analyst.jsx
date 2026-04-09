// src/pages/Analytics.jsx

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, fetchUserDetails } from "../action/adminActions";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#a855f7", "#22c55e", "#f97316", "#3b82f6", "#ef4444"];

const AnalyticsDashboard = () => {
  const dispatch = useDispatch();

  // ✅ Redux state
  const { users, selectedUser, transactions, analysis, loading } =
    useSelector((state) => state.admin);

  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // 🔹 Fetch all users from backend
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  // 🔹 Search filter (frontend filtering on fetched users)
  useEffect(() => {
    if (!search) {
      setSuggestions([]);
      return;
    }

    const filtered = users.filter((u) =>
      u.name?.toLowerCase().includes(search.toLowerCase())
    );

    setSuggestions(filtered);
  }, [search, users]);

  // 🔹 Handle user selection
  const handleSelectUser = (id, name) => {
    dispatch(fetchUserDetails(id));
    setSearch(name || "");
    setSuggestions([]);
  };

  const user = selectedUser;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black text-white p-4 sm:p-6">

      {/* 🔷 HEADER */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-xl mb-6">
        <h1 className="text-2xl font-bold text-purple-400 mb-4">
          Analytics Dashboard
        </h1>

        <div className="grid md:grid-cols-2 gap-4">

          {/* 🔍 SEARCH */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search user..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-3 rounded-xl bg-black/40 border border-white/20 focus:outline-none"
            />

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="absolute w-full bg-black/90 border border-white/20 mt-2 rounded-xl max-h-40 overflow-y-auto z-10">
                {suggestions.map((u) => (
                  <div
                    key={u._id}
                    onClick={() => handleSelectUser(u._id, u.name)}
                    className="p-2 hover:bg-purple-600 cursor-pointer"
                  >
                    {u.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 🔽 DROPDOWN */}
          <select
            onChange={(e) => handleSelectUser(e.target.value)}
            className="p-3 rounded-xl bg-black/40 border border-white/20"
          >
            <option value="">Select User</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 🔷 DASHBOARD */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">

        {/* USER INFO */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-xl">
          <h2 className="text-gray-400 mb-3">User Info</h2>

          <p className="text-lg font-semibold">
            {loading ? (
              <div className="h-4 w-24 bg-white/20 animate-pulse rounded" />
            ) : (
              user?.name
            )}
          </p>

          <p className="text-gray-400 text-sm mt-2">
            {loading ? (
              "Bank • XXXX"
            ) : user ? (
              `${user.bank} • XXXX${user.account?.slice(-4)}`
            ) : (
              "No Data"
            )}
          </p>
        </div>

        {/* BALANCE */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-xl">
          <h2 className="text-gray-400 mb-3">Balance</h2>

          {loading ? (
            <div className="h-8 w-28 bg-white/20 animate-pulse rounded" />
          ) : (
            <p className="text-3xl font-bold text-purple-400">
              ₹{user?.balance || 0}
            </p>
          )}
        </div>

        {/* TRANSACTIONS */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-xl col-span-1 md:col-span-2">
          <h2 className="text-gray-400 mb-4">Transactions</h2>

          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-10 bg-white/10 rounded animate-pulse"
                />
              ))}
            </div>
          ) : transactions?.length > 0 ? (
            <div className="space-y-3">
              {transactions.map((t, i) => (
                <div
                  key={i}
                  className="flex justify-between bg-white/5 p-3 rounded-xl"
                >
                  <span>{t.type}</span>
                  <span
                    className={
                      t.amount > 0
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    ₹{t.amount}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No transactions</p>
          )}
        </div>

        {/* PIE CHART */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-xl col-span-1 md:col-span-2">
          <h2 className="text-gray-400 mb-4">Spending Analysis</h2>

          {loading ? (
            <div className="h-64 bg-white/10 rounded animate-pulse" />
          ) : analysis?.length > 0 ? (
            <div className="w-full h-64">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={analysis} dataKey="value" outerRadius={90}>
                    {analysis.map((_, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-gray-400">No analysis data</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default AnalyticsDashboard;