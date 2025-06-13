"use client";
import React from "react";
import { motion } from "framer-motion";

const references = [
  { name: "Azura", logo: "/references-logos/azura.png" },
  { name: "Alf Mabrouk", logo: "/references-logos/alfmabrouk.webp" },
  { name: "Boujdour", logo: "/references-logos/boujdour.jpeg" },
  { name: "Comaprim", logo: "/references-logos/comaprim.jpg" },
  { name: "Copag", logo: "/references-logos/copag.png" },
  { name: "Delassus", logo: "/references-logos/delassus.jpeg" },
  { name: "Doha", logo: "/references-logos/doha.svg" },
  { name: "Domaines Agricoles", logo: "/references-logos/domaines.gif" },
  { name: "GPC", logo: "/references-logos/gpc.jpeg" },
  { name: "OCP", logo: "/references-logos/ocp.png" },
  { name: "Soremed", logo: "/references-logos/soremed.jpeg" },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
};

export default function ReferencesSection() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-white to-blue-50" id="references">
      {/* Séparateur SVG */}
      <div className="absolute -top-8 left-0 w-full overflow-hidden leading-none rotate-180" aria-hidden="true">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#f0f6ff" d="M0,32L48,37.3C96,43,192,53,288,69.3C384,85,480,107,576,101.3C672,96,768,64,864,53.3C960,43,1056,53,1152,58.7C1248,64,1344,64,1392,64L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"/></svg>
      </div>
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-bold text-blue-900 mb-10 text-center">Nos Références</h2>
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {references.map((ref, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col items-center group"
              variants={item}
            >
              <div className="bg-white rounded-lg p-3 w-24 h-24 flex items-center justify-center mb-2 shadow group-hover:scale-110 group-hover:shadow-xl transition-transform duration-200">
                <img src={ref.logo} alt={ref.name} className="max-h-16 max-w-full object-contain grayscale group-hover:grayscale-0 transition" />
              </div>
              <span className="text-xs text-gray-600 text-center group-hover:text-blue-700 transition">{ref.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 