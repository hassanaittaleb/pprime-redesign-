"use client";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import OffersSection from "../../components/OffersSection";

export default function OffersPage() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <OffersSection />
      </main>
      <Footer />
    </div>
  );
} 