import React from "react";
import { BarChart } from "../components/BarChart";
import { GaugeChart } from "../components/GaugeChart";

function App() {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-8 text-center">Sales Dashboard</h1>

      {/* bar chart */}
      <div className="bg-white w-full p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-lg font-semibold mb-4 text-center">Product Sales</h2>
        <div className="h-80 mx-auto">
          <BarChart />
        </div>
      </div>

      {/* gauge chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-center">Monthly Performance</h2>
        <div className="flex flex-col md:flex-row justify-center items-start gap-6">
          <div className="w-full">
            <GaugeChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
