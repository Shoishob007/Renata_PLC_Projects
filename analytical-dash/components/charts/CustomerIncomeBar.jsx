"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function CustomerIncomeBar({ customers }) {
  const isMobile = useIsMobile();

  // responsive values
  const fontSize = isMobile ? 9 : 12;
  const angle = isMobile ? -30 : 0;
  const tickMargin = isMobile ? 18 : 8;

  // division
  const divisionGroups = customers.reduce((acc, c) => {
    if (!acc[c.division]) acc[c.division] = [];
    acc[c.division].push(Number(c.income));
    return acc;
  }, {});

  const data = Object.entries(divisionGroups).map(([division, incomes]) => ({
    division,
    avgIncome: Math.round(incomes.reduce((a, b) => a + b, 0) / incomes.length),
  }));

  return (
    <div className="w-full max-w-xl h-80">
      <h3 className="text-center text-sm font-semibold mb-2">
        Average Income per Division
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis
            dataKey="division"
            interval={0}
            fontSize={fontSize}
            angle={angle}
            tickMargin={tickMargin}
          />
          <YAxis fontSize={fontSize} />
          <Tooltip />
          <Legend />
          <Bar dataKey="avgIncome" fill="#8884d8" name="Avg Income" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
