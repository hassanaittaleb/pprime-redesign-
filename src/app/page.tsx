"use client";
import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import FeaturedServices from "../components/FeaturedServices";
import StatsSection from "../components/StatsSection";
import AboutExpertsSection from "../components/AboutExpertsSection";
import CleanEnergySection from "../components/CleanEnergySection";
import Footer from "../components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <StatsSection />
        <AboutExpertsSection />
        <CleanEnergySection />
        <FeaturedServices />
        <section className="max-w-3xl mx-auto py-16 px-4 text-center">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Découvrez Pprime</h2>
          <p className="text-lg text-gray-700 mb-8">
            Experts en installations électriques, nous accompagnons l'industrie, l'agriculture et le tertiaire vers la performance et la durabilité.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/services" className="bg-blue-700 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-blue-800 transition">Nos Services</Link>
            <Link href="/sectors" className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-green-700 transition">Secteurs</Link>
            <Link href="/references" className="bg-white text-blue-900 px-6 py-3 rounded-full font-semibold shadow hover:bg-blue-50 border border-blue-100 transition">Références</Link>
            <Link href="/about" className="bg-white text-blue-900 px-6 py-3 rounded-full font-semibold shadow hover:bg-blue-50 border border-blue-100 transition">À propos</Link>
            <Link href="/contact" className="bg-blue-900 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-blue-950 transition">Contact</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
