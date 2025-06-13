"use client";

import React from "react";

export default function StatsSection() {
  const stats = [
    {
      value: "6M€",
      label: "Chiffre d'affaires annuel",
    },
    {
      value: "315",
      label: "Projets réalisés",
    },
    {
      value: "120k",
      label: "Employés dans le monde",
    },
  ];

  return (
    <section className="relative z-20 -mt-12 max-w-5xl mx-auto px-4">
      <div className="bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {stats.map((stat, index) => (
          <div key={index} className="border-r last:border-r-0 border-gray-200 pr-8 last:pr-0 md:pr-0">
            <div className="text-4xl font-bold text-blue-900 mb-1">{stat.value}</div>
            <div className="text-gray-600 text-sm uppercase tracking-wide">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
} 