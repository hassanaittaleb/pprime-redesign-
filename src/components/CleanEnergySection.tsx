"use client";

import React from "react";
import Link from "next/link"; // Assuming the button will be a link

export default function CleanEnergySection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">

        {/* Left Column: Text and Button */}
        <div className="lg:col-span-1">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6 leading-tight">
            Propulsez votre avenir
            <span className="block text-green-600">avec l'énergie propre,</span>
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Rejoignez des centaines d'entreprises adoptant des stratégies mondiales novatrices.
          </p>
          <Link 
            href="#contact" // Replace with actual link
            className="inline-block bg-blue-700 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-blue-800 transition"
          >
            En savoir plus
          </Link>

          {/* Smaller Description Section */}
          <div className="mt-12">
            {/* Icon placeholder if needed */}
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Respectueux de l'environnement</h3>
            <p className="text-gray-600">
              L'énergie renouvelable réduit les gaz à effet de serre et les polluants atmosphériques, contribuant à la lutte contre le changement climatique.
            </p>
            {/* Learn More link if needed */}
            {/* <Link href="#" className="text-blue-600 hover:underline">En savoir plus</Link> */}
          </div>
        </div>

        {/* Center Column: Image Placeholder */}
        <div className="lg:col-span-1 flex justify-center items-center">
          {/* Replace with your image */}
           <img
            src="/pixels.jpg"
            alt="Image représentant l'énergie propre"
            className="w-full max-w-sm h-96 object-contain rounded-full"
          />
        </div>

        {/* Right Column: Specifications */}
        <div className="lg:col-span-1 text-gray-700 space-y-6">
          {/* Certification 1 */}
          <div>
            <div className="font-semibold">Certifications:</div>
            <div>IEC/UL 61730</div>
            <div>CEC Listed</div>
          </div>

          {/* Inverter Power */}
          <div>
            <div className="font-semibold">Puissance de l'onduleur:</div>
            <div>3.8KW/7.6KW</div>
          </div>

          {/* Dimensions */}
          <div>
            <div className="font-semibold">Dimensions:</div>
            <div>74.4"x41.2"x1.57" (incluant le cadre)</div>
          </div>

          {/* Certification 2 */}
          <div>
            <div className="font-semibold">Certifications:</div>
            <div>IEC/UL 61730</div>
            <div>CEC Listed</div>
          </div>
        </div>

      </div>
    </section>
  );
} 