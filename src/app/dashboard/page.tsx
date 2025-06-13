"use client";
import React from "react";
import Dashboard from "../../components/Dashboard";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <Dashboard />
      </main>
      <Footer />
    </div>
  );
} 