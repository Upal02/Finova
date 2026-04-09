// src/pages/User.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDashboard } from "../action/action"; 

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#a855f7", "#22c55e", "#f97316", "#3b82f6", "#ef4444"];

const UserDashboard = () => {
  const dispatch = useDispatch();

  // ✅ Get data from Redux store
  const { user, transactions, analysis, loading } = useSelector(
    (state) => state.user
  );

  // ✅ Fetch from backend
  useEffect(() => {
    dispatch(fetchUserDashboard());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black text-white p-4 sm:p-6">

      {/* MAIN GRID */}
      <div
        className="grid gap-6 
        grid-cols-1 
        md:grid-cols-2 
        xl:grid-cols-4"
      >

        {/* 🧑 USER INFO */}
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

        {/* 💰 BALANCE */}
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

        {/* 📜 TRANSACTIONS */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-xl col-span-1 md:col-span-2">
          <h2 className="text-gray-400 mb-4">Last 5 Transactions</h2>

          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-10 bg-white/10 rounded animate-pulse"
                />
              ))}
            </div>
          ) : transactions?.length > 0 ? (
            <div className="space-y-3">
              {transactions.slice(0, 5).map((t, i) => (
                <div
                  key={i}
                  className="flex justify-between bg-white/5 p-3 rounded-xl"
                >
                  <span>{t.type}</span>
                  <span
                    className={`font-semibold ${
                      t.amount > 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    ₹{t.amount}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No transactions found</p>
          )}
        </div>

        {/* 📊 ANALYSIS PIE CHART */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-xl col-span-1 md:col-span-2 xl:col-span-2">
          <h2 className="text-gray-400 mb-4">
            Spending Analysis (Last 20)
          </h2>

          {loading ? (
            <div className="h-64 bg-white/10 rounded animate-pulse" />
          ) : analysis?.length > 0 ? (
            <div className="w-full h-64">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={analysis}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={90}
                  >
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

export default UserDashboard;