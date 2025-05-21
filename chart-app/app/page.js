import { BarChart } from "@/components/BarChart";
import { GaugeChartPage } from "@/components/GaugeChart";
import React from "react";

function App() {
  return (
    <div className="min-h-screen p-2 sm:p-4 bg-gray-50">
      <h1 className="text-2xl font-bold mb-8 text-center">Sales Dashboard</h1>

      {/* bar chart */}
      <div className="bg-white w-full p-4 sm:p-8 rounded-lg shadow-md mb-8">
        <h2 className="text-lg font-semibold mb-4 text-center">Product Sales</h2>
        <div className="h-64 sm:h-80 mx-auto">
          <BarChart />
        </div>
      </div>

      {/* gauge chart */}
      <div className="bg-white p-4 sm:p-8 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row justify-center items-start gap-6">
          <div className="w-full">
                    <h2 className="text-lg font-semibold mb-4 text-center">Monthly Performance</h2>

            <GaugeChartPage />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;