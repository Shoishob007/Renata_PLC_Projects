"use client";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#f87171",
  "#60a5fa",
  "#a78bfa",
  "#34d399",
  "#fbbf24",
];

export default function CustomerDivisionPie({ customers }) {
  const divisionCounts = customers.reduce((acc, c) => {
    acc[c.division] = (acc[c.division] || 0) + 1;
    return acc;
  }, {});
  const data = Object.entries(divisionCounts).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="w-80 h-80">
      <h3 className="text-center text-sm font-semibold mb-4">
        Division Distribution
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#82ca9d"
            label
          >
            {data.map((_, idx) => (
              <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
