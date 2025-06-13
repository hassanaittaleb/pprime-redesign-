"use client";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ServicesSection from "../../components/ServicesSection";

export default function ServicesPage() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <ServicesSection />
      </main>
      <Footer />
    </div>
  );
} 