"use client";

import { useState } from "react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const chartData = [
  { name: "Jan", value: 100 },
  { name: "Feb", value: 180 },
  { name: "Mar", value: 90 },
  { name: "Apr", value: 150 },
  { name: "May", value: 200 },
  { name: "Jun", value: 270 },
  { name: "Jul", value: 190 },
  { name: "Aug", value: 160 },
  { name: "Sep", value: 220 },
  { name: "Oct", value: 180 },
  { name: "Nov", value: 210 },
  { name: "Dec", value: 190 },
];

export default function HistoryChart() {
  const [activeTab, setActiveTab] = useState("Viewership");

  return (
    <section className="bg-white rounded-[var(--radius-card)] shadow-md p-6 border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        {/* Tabs */}
        <div className="flex gap-3">
          {["Viewership", "Subscribers", "Earning"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                px-3 py-1.5 rounded-lg text-sm font-medium transition
                ${
                  activeTab === tab
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-gray-500 hover:text-indigo-600"
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>

        <span className="text-sm font-semibold text-gray-700">1,113 hours</span>
      </div>

      {/* Chart */}
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                background: "white",
                border: "1px solid #e5e7eb",
                fontSize: "12px",
              }}
            />
            <Bar
              dataKey="value"
              fill="var(--color-primary)"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
