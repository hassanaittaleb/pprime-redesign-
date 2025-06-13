"use client";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AboutSection from "../../components/AboutSection";
import AboutHeroSection from "../../components/AboutHeroSection";

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <AboutHeroSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
} 