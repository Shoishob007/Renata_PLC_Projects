"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

export default function Home() {
  const { user, loading } = useAuth();
  
  useEffect(() => {
    if (!loading) {
      if (user) {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/login";
      }
    }
  }, [user, loading]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      Loading...
    </div>
  );
}