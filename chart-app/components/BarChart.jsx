"use client";

import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { parseCSV } from "@/actions/helper";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const BarChart = () => {
  const [data, setData] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    fetch(
      "https://docs.google.com/spreadsheets/d/1VsS1TuL7ImxsbWSX73OEwwrVf8F5LOWc/export?format=csv&gid=1616175236"
    )
      .then((res) => res.text())
      .then((csvText) => {
        const rawData = parseCSV(csvText);
        // mapping the CSV rows
        const chartData = rawData.map((row) => ({
          product: row.Product,
          totalSales: Number(row.TotalSales),
          totalValue: Number(row.TotalValue),
        }));
        setData(chartData);
      })
      .catch((err) => {
        console.error("Failed to fetch or parse bar chart data:", err);
      });
  }, []);

  // Responsive: detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const getBarColor = (totalValue) => {
    if (totalValue < 8) return "#f9e4d2";
    if (totalValue < 16) return "#f5d7af";
    if (totalValue < 24) return "#f0d2b4";
    if (totalValue < 32) return "#e8c9a5";
    if (totalValue < 36) return "#e06414";
    if (totalValue <= 40) return "#6e1e00";
    return "#6e1e00";
  };

  //chart data
  const chartData = {
    labels: data.map((item) => item.product),
    datasets: [
      {
        data: data.map((item) => item.totalSales),
        backgroundColor: data.map((item) => getBarColor(item.totalValue)),
        borderWidth: 0,
        barThickness: isMobile ? 26 : 56, // much narrower on mobile!
        maxBarThickness: isMobile ? 28 : 56,
        minBarLength: 2,
      },
    ],
  };

  // bar options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "white",
        titleColor: "#333",
        bodyColor: "#333",
        borderColor: "#ddd",
        borderWidth: 1,
        padding: 6,
        displayColors: false,
        callbacks: {
          title: (tooltipItems) => {
            return tooltipItems[0].label;
          },
          label: (context) => {
            return `Total Sales: ${context.raw}`;
          },
          afterLabel: (context) => {
            const dataItem = data[context.dataIndex];
            return `Total Value: ${dataItem.totalValue}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
          drawTicks: false,
        },
        border: {
          dash: [4, 4],
        },
        ticks: {
          stepSize: 2,
          padding: isMobile ? 2 : 10,
          font: {
            size: isMobile ? 10 : 11,
          },
        },
        title: {
          display: true,
          text: "Total Sales",
          color: "#666",
          font: {
            size: 11,
          },
          padding: {
            bottom: isMobile ? 2 : 10,
          },
        },
        max: 14.5,
      },
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        title: {
          display: true,
          text: "Product",
          color: "#666",
          font: {
            size: 11,
          },
          padding: {
            top: isMobile ? 2 : 10,
          },
        },
        ticks: {
          font: {
            size: isMobile ? 10 : 11,
          },
          padding: isMobile ? 2 : 8,
        },
      },
    },
    layout: {
      padding: {
        right: isMobile ? 10 : 22,
        left: isMobile ? 0 : 4,
        top: isMobile ? 0 : 0,
        bottom: isMobile ? 0 : 0,
      },
    },
  };

  // loading state
  if (data.length === 0) {
    return <div className="text-center p-2">Loading bar chart data...</div>;
  }

  return (
    <div className="relative w-full h-60 sm:h-80 px-0">
      <Bar data={chartData} options={options} className="px-0" />

      {/* Color scale indicator*/}
      <div className="absolute right-2 top-6 bottom-16 w-2 rounded hidden sm:block">
        <div
          className="h-full w-full"
          style={{
            background:
              "linear-gradient(to bottom, #6e1e00 0%, #e06414 20%, #e8c9a5 40%, #f0d2b4 60%, #f5d7af 80%, #f9e4d2 100%)",
          }}
        ></div>
        <div
          className="absolute -right-6 text-xs text-gray-500"
          style={{ top: "0%" }}
        >
          40
        </div>
        <div
          className="absolute -right-6 text-xs text-gray-500"
          style={{ top: "20%" }}
        >
          36
        </div>
        <div
          className="absolute -right-6 text-xs text-gray-500"
          style={{ top: "40%" }}
        >
          32
        </div>
        <div
          className="absolute -right-6 text-xs text-gray-500"
          style={{ top: "60%" }}
        >
          24
        </div>
        <div
          className="absolute -right-6 text-xs text-gray-500"
          style={{ top: "80%" }}
        >
          16
        </div>
        <div
          className="absolute -right-6 text-xs text-gray-500"
          style={{ top: "100%" }}
        >
          0
        </div>
        <span className="absolute -right-1 top-1/2 -rotate-90 text-xs text-gray-500 whitespace-nowrap">
          Total Value
        </span>
      </div>
    </div>
  );
};