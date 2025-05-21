"use client";

import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
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

export function GaugeChartPage() {
  return (
    <div className="flex flex-col w-full">
      {/* <h1 className="text-center text-3xl font-bold mb-16">Monthly Performance</h1> */}
      <div className="mt-8">
        <GaugeChart />
      </div>
    </div>
  );
}

function GaugeChart() {
  const [value, setValue] = useState(undefined);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [monthlyData, setMonthlyData] = useState({});
  const [isMobile, setIsMobile] = useState(false);

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
        setSelectedMonth(null);
        setValue(undefined);
      })
      .catch((err) => {
        console.error("Failed to fetch monthly sales data:", err);
      });
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMonthClick = (month) => {
    setSelectedMonth(month);
    setValue(monthlyData[month]);
  };

  if (!monthlyData || Object.keys(monthlyData).length === 0) {
    return <div className="text-center p-2">Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row p-2 w-full h-full gap-4">
      <div className="flex flex-row md:flex-col gap-2 overflow-auto text-sm w-full md:w-auto md:min-w-[8rem] md:max-w-[10rem]">
        {Object.keys(monthlyData).map((monthName) => (
          <button
            key={monthName}
            className={`rounded text-center w-full transition-all ${
              monthName === selectedMonth
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            style={{
              fontSize: isMobile ? "0.6rem" : "0.8rem",
              minWidth: isMobile ? 60 : 80,
              padding: isMobile ? "0.35rem 0.5rem" : "0.4rem 0.8rem",
              marginBottom: 2,
              fontWeight: monthName === selectedMonth ? 600 : 500,
              letterSpacing: isMobile ? "0" : "0.01em",
            }}
            onClick={() => handleMonthClick(monthName)}
          >
            {monthName}
          </button>
        ))}
      </div>
      <div className="flex-grow flex items-center justify-center min-h-[180px] mt-8">
        <GaugeChartDisplay value={value} month={selectedMonth} isMobile={isMobile} />
      </div>
    </div>
  );
}

const GaugeChartDisplay = ({ value, month, isMobile }) => {
  // selecting category
  const getCategory = (value) => {
    if (typeof value !== "number") return "";
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
    if (typeof value !== "number") return "0";
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
  const needleValue =
    typeof value === "number"
      ? Math.min(Math.max(value, 0), 10000000)
      : 0;
  const angle = (needleValue / 10000000) * 270 - 135;

  const chartRef = useRef(null);
  const [container, setContainer] = useState({ width: 0, height: 0 });

  // updating size on resize
  useLayoutEffect(() => {
    function updateSize() {
      if (chartRef.current) {
        setContainer({
          width: chartRef.current.offsetWidth,
          height: chartRef.current.offsetHeight,
        });
      }
    }
    updateSize();
    if (chartRef.current) {
      const resizeObserver = new window.ResizeObserver(updateSize);
      resizeObserver.observe(chartRef.current);
      window.addEventListener("resize", updateSize);
      return () => {
        resizeObserver.disconnect();
        window.removeEventListener("resize", updateSize);
      };
    }
  }, []);

  // tick marks and labels
  const tickLabels = ["0.0m", "2.0m", "4.0m", "6.0m", "8.0m", "10.0m"];
  const tickPositions = [0, 0.2, 0.4, 0.6, 0.8, 1];

  // Responsive radius and center
  const R = Math.min(container.width, container.height) / 2;
  const radius = R * 1.3;
  const centerX = container.width / 2;
  const centerY = container.height / 2 + R * 0.1;

  const labelElements = tickLabels.map((label, index) => {
    const position = tickPositions[index];
    const radians = ((135 + position * 270) * Math.PI) / 180;
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
          fontSize: isMobile ? "10px" : "12px",
          fontWeight: "500",
          color: "#444",
          pointerEvents: "none",
          userSelect: "none",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </div>
    );
  });

  // responsive needle style
  const needleLength = radius * 0.7;
  const needleStyle = {
    position: "absolute",
    top: `calc(50% - ${needleLength}px)`,
    left: "50%",
    width: isMobile ? "12px" : "20px",
    height: `${needleLength}px`,
    backgroundColor: "#383838",
    transformOrigin: `bottom center`,
    transform: `translateX(-50%) rotate(${angle}deg)`,
    zIndex: 10,
    borderRadius: "50%",
    boxShadow: "0 0 4px rgba(0,0,0,0.3)",
    clipPath: "polygon(0% 100%, 100% 100%, 50% 0%)",
    pointerEvents: "none",
  };

  // Tooltip button font size
  const tooltipBtnFontSize = isMobile ? "12px" : "16px";
  const tooltipBtnPadding = isMobile ? "0.3rem 0.7rem" : "0.5rem 1.2rem";

  return (
    <div className="relative w-full h-full flex flex-col items-center mt-8">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="absolute top-0 right-0 z-10 cursor-pointer">
              <div
                className="rounded font-medium flex items-center"
                style={{
                  backgroundColor: getStatusColor(category),
                  color: "#fff",
                  fontSize: tooltipBtnFontSize,
                  padding: tooltipBtnPadding,
                  minWidth: isMobile ? "auto" : 120,
                  textAlign: "center",
                }}
              >
                {month
                  ? category || "Select a month"
                  : "Select a month"}
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent className="max-w-[200px] md:max-w-[300px]">
            <p className="text-xs md:text-sm whitespace-normal">
              {typeof value === "number" && month
                ? `Sales for ${month}: ${formatValue(value)}`
                : "Please select a month to view the status"}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div
        ref={chartRef}
        style={{
          position: "relative",
          width: isMobile ? "94vw" : "80vw",
          maxWidth: isMobile ? 350 : 400,
          minWidth: 160,
          height: isMobile ? "56vw" : "48vw",
          maxHeight: isMobile ? 220 : 250,
          minHeight: 120,
          marginTop: "30px"
        }}
        className="mx-auto"
      >
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
        {typeof value === "number" && <div style={needleStyle} />}

        {/* tick points */}
        {container.width > 0 && labelElements}

        {/* value */}
        <div
          style={{
            position: "absolute",
            top: "90%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            fontSize: isMobile ? "15px" : "22px",
            fontWeight: "bold",
            color: "#222",
            width: 100,
          }}
        >
          {typeof value === "number" ? formatValue(value) : ""}
        </div>
      </div>
    </div>
  );
};