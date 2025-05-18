"use client";

import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement } from "chart.js";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { parseCSV } from "@/actions/helper";

ChartJS.register(ArcElement);

export function GaugeChart() {
  const [value, setValue] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [monthlyData, setMonthlyData] = useState({});

  useEffect(() => {
    fetch(
      "https://docs.google.com/spreadsheets/d/1VsS1TuL7ImxsbWSX73OEwwrVf8F5LOWc/export?format=csv&gid=945873077"
    )
      .then((res) => res.text())
      .then((csvText) => {
        const rawData = parseCSV(csvText);
        const salesObj = {};
        rawData.forEach((row) => {
          salesObj[row.month] = Number(row.sales);
        });
        setMonthlyData(salesObj);

        // initial selected month and value
        const firstMonth = Object.keys(salesObj)[0];
        setSelectedMonth(firstMonth);
        setValue(salesObj[firstMonth]);
      })
      .catch((err) => {
        console.error("Failed to fetch monthly sales data:", err);
      });
  }, []);

  const handleMonthClick = (month) => {
    setSelectedMonth(month);
    setValue(monthlyData[month]);
  };

  if (!monthlyData || Object.keys(monthlyData).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-row p-4 w-full h-full">
      <div className="flex flex-col gap-2 overflow-auto text-sm">
        {Object.keys(monthlyData).map((monthName) => (
          <button
            key={monthName}
            className={`px-4 py-1.5 rounded w-32 text-center ${
              monthName === selectedMonth
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => handleMonthClick(monthName)}
          >
            {monthName}
          </button>
        ))}
      </div>
      <div className="flex-grow">
        <GaugeChartDisplay value={value} month={selectedMonth} />
      </div>
    </div>
  );
}

const GaugeChartDisplay = ({ value, month }) => {
  // selecting category based on value
  const getCategory = (value) => {
    if (value <= 3000000) {
      return "Low";
    } else if (value < 7000000) {
      return "Medium";
    } else {
      return "High";
    }
  };

  // corresponding colors for categories
  const getStatusColor = (category) => {
    switch (category) {
      case "Low":
        return "#387cf3";
      case "Medium":
        return "#f8b338";
      case "High":
        return "#dc3545";
      default:
        return "#387cf3";
    }
  };

  // formatting value to display
  const formatValue = (value) => {
    if (!value && value !== 0) return "0";
    const millions = value / 1000000;
    return `${millions.toFixed(1)}m`;
  };

  const category = getCategory(value);

  // data for the chart
  const gaugeData = {
    datasets: [
      {
        data: [3000000, 4000000, 3000000],
        backgroundColor: ["#387cf3", "#f8b338", "#dc3545"],
        borderWidth: 0,
        circumference: 270,
        rotation: 225,
        cutout: "80%",
      },
    ],
  };

  // needle position
  const needleValue = Math.min(Math.max(value, 0), 10000000);
  const angle = (needleValue / 10000000) * 270 - 135;

  //needle style
  const needleStyle = {
    position: "absolute",
    top: "14%",
    left: "50%",
    width: "20px",
    height: "45%",
    backgroundColor: "#383838",
    transformOrigin: "bottom center",
    transform: `translateX(-50%) rotate(${angle}deg)`,
    zIndex: 10,
    borderRadius: "50%",
    boxShadow: "0 0 4px rgba(0,0,0,0.3)",
    clipPath: "polygon(0% 100%, 100% 100%, 50% 0%)",
  };

  // tick marks and labels
  const tickLabels = ["0.0m", "2.0m", "4.0m", "6.0m", "8.0m", "10.0m"];
  const tickPositions = [0, 0.2, 0.4, 0.6, 0.8, 1];

  const radius = 240;
  const centerX = 450;
  const centerY = 220;

  const labelElements = tickLabels.map((label, index) => {
    const position = tickPositions[index];
    const radians = (135 + position * 270) * (Math.PI / 180);
    const labelRadius = radius;
    const x = centerX + labelRadius * Math.cos(radians);
    const y = centerY + labelRadius * Math.sin(radians);

    return (
      <div
        key={label}
        style={{
          position: "absolute",
          left: `${x}px`,
          top: `${y}px`,
          transform: "translate(-50%, -50%)",
          fontSize: "12px",
          fontWeight: "500",
          color: "#444",
        }}
      >
        {label}
      </div>
    );
  });

  return (
    <div className="relative w-full h-full flex flex-col items-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="absolute top-0 right-0 z-10 cursor-pointer">
              <div
                className="px-4 py-2 rounded text-white font-medium flex items-center"
                style={{ backgroundColor: getStatusColor(category) }}
              >
                {month ? category : "Select a month"}
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {month
                ? `Sales for ${month}: ${formatValue(value)}`
                : "Please select a month to view sales data"}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div style={{ position: "relative", width: "80%", height: "80%" }}>
        <Doughnut
          data={gaugeData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: { enabled: false },
            },
          }}
        />

        {/* needle */}
        <div style={needleStyle} />

        {/* tick points */}
        {labelElements}

        {/* value */}
        <div
          style={{
            position: "absolute",
            top: "90%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#222",
          }}
        >
          {formatValue(value)}
        </div>
      </div>
    </div>
  );
};
