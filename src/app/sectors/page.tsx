"use client";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SectorsSection from "../../components/SectorsSection";

export default function SectorsPage() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <SectorsSection />
      </main>
      <Footer />
    </div>
  );
} 