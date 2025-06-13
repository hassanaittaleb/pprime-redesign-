"use client";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ReferencesSection from "../../components/ReferencesSection";

export default function ReferencesPage() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <ReferencesSection />
      </main>
      <Footer />
    </div>
  );
} 