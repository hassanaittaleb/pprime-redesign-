"use client";

import React from "react";
// Importez vos icônes ici si vous en utilisez (par exemple, from 'react-icons/fa')
// import { FaTree, FaCog } from "react-icons/fa"; 

export default function AboutExpertsSection() {
  return (
    <section className="py-20 bg-white" id="experts">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left side: Text content */}
        <div>
          <span className="inline-block bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full mb-4">Qui sommes-nous ?</span>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6 leading-tight">
            Experts dans le monde
            <span className="block text-green-600">des solutions électriques</span>
          </h2>
          
          {/* Description items */}
          <div className="space-y-8">
            {/* Item 1 */}
            <div className="flex items-start">
              {/* Icône placeholder - remplacez par votre icône */}
              {/* <FaTree className="text-2xl text-green-500 mr-4 mt-1" /> */}
              <div className="text-2xl text-green-500 mr-4 mt-1">💡</div> {/* Placeholder icon */}
              <div>
                <h3 className="text-xl font-semibold text-blue-900 mb-2">Solutions Durables</h3>
                <p className="text-gray-600">
                  Nos solutions électriques visent la performance tout en respectant l'environnement.
                </p>
              </div>
            </div>
            
            {/* Item 2 */}
            <div className="flex items-start">
              {/* Icône placeholder - remplacez par votre icône */}
              {/* <FaCog className="text-2xl text-blue-500 mr-4 mt-1" /> */}
               <div className="text-2xl text-blue-500 mr-4 mt-1">🛠️</div> {/* Placeholder icon */}
              <div>
                <h3 className="text-xl font-semibold text-blue-900 mb-2">Maintenance Simplifiée</h3>
                <p className="text-gray-600">
                  Nous concevons des systèmes fiables nécessitant une maintenance minimale.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side: Map image placeholder */}
        <div className="flex justify-center items-center">
          {/* Replace with your map image */}
          <img
            src="/mapp.jpeg"
            alt="Carte du monde montrant notre présence"
            className="w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
} 