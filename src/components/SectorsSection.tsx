"use client";
import React from "react";
import { FaSeedling, FaLeaf, FaIndustry, FaHospital } from "react-icons/fa";
import { motion } from "framer-motion";

const sectors = [
  {
    title: "Infrastructures & Industrie",
    description: "Services d'installation, de distribution, d'éclairage, d'automatisation, de sécurité électrique, de maintenance et d'efficacité énergétique pour soutenir le bon fonctionnement et la durabilité des sites industriels et des infrastructures critiques",
    image: "/secteures/infrastructures.jpg",
  },
  {
    title: "Agriculture & Agroalimentaire",
    description: "Services d'installation, d'éclairage et d'automatisation adaptés aux besoins agricoles. Nous assurons également la sécurité électrique, fournissons des solutions d'alimentation pour les équipements et intégrons les énergies renouvelables, contribuant ainsi à l'efficacité et à la durabilité des exploitations.",
    image: "/secteures/agriculture.jpg",
  },
  {
    title: "Green Tech",
    description: "Des services axés sur les énergies renouvelables, l'efficacité énergétique et les technologies intelligentes pour promouvoir la durabilité et la transition vers un avenir énergétique propre.",
    image: "/secteures/green-tech.jpg",
  },
  {
    title: "Tertiaire",
    description: "Des services spécialisés pour garantir la sécurité, la fiabilité, l'efficacité énergétique et la continuité des opérations dans les établissements touristiques, les hôpitaux, les cliniques et autres installations de santé.",
    image: "/secteures/tertiaire.jpg",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

export default function SectorsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50" id="sectors">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-blue-900 mb-2 text-center">NOS CHAMPS D'EXPERTISE</h2>
        <p className="text-lg text-gray-700 mb-12 text-center">Ensemble, pour un monde plus lumineux, vert et intelligent.</p>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {sectors.map((sector, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-xl shadow-lg p-6 flex items-center hover:scale-[1.02] hover:shadow-2xl transition-transform duration-200"
              variants={item}
            >
              {/* Image on the left */}
              <div className="w-1/3 mr-6 flex-shrink-0">
                <img src={sector.image} alt={sector.title} className="w-full h-auto rounded-lg" />
              </div>
              {/* Text content on the right */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">{sector.title}</h3>
                <p className="text-gray-700 text-sm">{sector.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 