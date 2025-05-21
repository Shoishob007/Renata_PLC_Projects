"use client";
import { useState, useEffect } from "react";
import CustomerGenderPie from "@/components/charts/CustomerGenderPie";
import CustomerDivisionPie from "@/components/charts/CustomerDivisionPie";
import CustomerIncomeBar from "@/components/charts/CustomerIncomeBar";

export default function CustomerChartsPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/customers")
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-4">Loading charts...</div>;

  return (
    <div className="">
      <div className="flex flex-col items-center justify-center gap-16">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
          <CustomerGenderPie customers={customers} />
          <CustomerDivisionPie customers={customers} />
        </div>
        <CustomerIncomeBar customers={customers} />
      </div>
    </div>
  );
}
