"use client";
import React from "react";
import { FaBolt, FaTools, FaDraftingCompass, FaSolarPanel } from "react-icons/fa";
import { motion } from "framer-motion";

const services = [
  {
    title: "Électricité industrielle",
    description: "Installations électriques complètes pour sites industriels, automatisation, distribution et sécurité.",
    icon: <FaBolt className="text-3xl text-yellow-400 mb-2" />,
  },
  {
    title: "Maintenance",
    description: "Maintenance préventive et corrective pour garantir la continuité et la sécurité de vos installations.",
    icon: <FaTools className="text-3xl text-blue-500 mb-2" />,
  },
  {
    title: "Études techniques",
    description: "Conception, dimensionnement et optimisation de vos projets électriques et énergétiques.",
    icon: <FaDraftingCompass className="text-3xl text-green-600 mb-2" />,
  },
  {
    title: "Énergies renouvelables",
    description: "Solutions solaires, efficacité énergétique et intégration de technologies vertes.",
    icon: <FaSolarPanel className="text-3xl text-green-400 mb-2" />,
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

export default function ServicesSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-green-100" id="services">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-blue-900 mb-10 text-center">Nos Services</h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-transform duration-200"
              variants={item}
            >
              {service.icon}
              <h3 className="text-xl font-semibold text-blue-800 mb-2 text-center">{service.title}</h3>
              <p className="text-gray-700 text-center">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 