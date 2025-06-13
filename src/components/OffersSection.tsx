"use client";
import React from "react";
import { FaCogs, FaClipboardCheck, FaHandsHelping, FaLightbulb } from "react-icons/fa";
import { motion } from "framer-motion";

const offers = [
  {
    title: "Offre clé en main",
    description: "Gestion complète de vos projets électriques, de l'étude à la réalisation, pour une tranquillité totale.",
    icon: <FaCogs className="text-3xl text-blue-700 mb-2" />,
  },
  {
    title: "Audit & Conseil",
    description: "Analyse de vos installations, recommandations personnalisées et accompagnement vers l'optimisation énergétique.",
    icon: <FaClipboardCheck className="text-3xl text-green-600 mb-2" />,
  },
  {
    title: "Maintenance",
    description: "Contrats de maintenance préventive et corrective pour garantir la sécurité et la performance de vos équipements.",
    icon: <FaHandsHelping className="text-3xl text-yellow-500 mb-2" />,
  },
  {
    title: "Innovation & Green Tech",
    description: "Intégration de solutions innovantes et durables pour accompagner votre transition énergétique.",
    icon: <FaLightbulb className="text-3xl text-blue-400 mb-2" />,
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

export default function OffersSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-green-100" id="offers">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-blue-900 mb-10 text-center">Nos Offres</h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {offers.map((offer, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-transform duration-200"
              variants={item}
            >
              {offer.icon}
              <h3 className="text-xl font-semibold text-blue-800 mb-2 text-center">{offer.title}</h3>
              <p className="text-gray-700 text-center">{offer.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 