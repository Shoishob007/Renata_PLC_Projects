"use client";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d"];

export default function CustomerGenderPie({ customers }) {
  const data = [
    { name: "Male", value: customers.filter((c) => c.gender === "M").length },
    { name: "Female", value: customers.filter((c) => c.gender === "F").length },
  ];

  return (
    <div className="w-80 h-80">
      <h3 className="text-center text-sm font-semibold mb-2">
        Gender Distribution
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
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
