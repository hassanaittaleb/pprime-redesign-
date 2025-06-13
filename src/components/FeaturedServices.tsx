"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const services = [
  {
    title: "Installations Industrielles",
    description: "Solutions électriques complètes pour l'industrie, de la conception à la maintenance.",
    icon: "🏭",
    link: "/services/industriel"
  },
  {
    title: "Énergies Renouvelables",
    description: "Intégration de solutions solaires et éoliennes pour une énergie durable.",
    icon: "☀️",
    link: "/services/renouvelable"
  },
  {
    title: "Automatisation",
    description: "Systèmes d'automatisation intelligents pour optimiser vos processus.",
    icon: "⚡",
    link: "/services/automatisation"
  },
  {
    title: "Maintenance Préventive",
    description: "Programmes de maintenance personnalisés pour garantir la fiabilité.",
    icon: "🔧",
    link: "/services/maintenance"
  }
];

export default function FeaturedServices() {
  return (
    <section className="py-20 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Nos Services en Vedette
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez notre gamme complète de services électriques adaptés à vos besoins
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {service.description}
              </p>
              <Link
                href={service.link}
                className="inline-block text-blue-600 font-semibold hover:text-blue-800 transition"
              >
                En savoir plus →
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/services"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
          >
            Voir tous nos services
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 