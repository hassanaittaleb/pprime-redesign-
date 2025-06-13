"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-700 to-green-400 py-24 text-white overflow-hidden" id="hero">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/acceuil.jpg')] bg-cover bg-center opacity-80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-900/50" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                Solutions Électriques
                <span className="block text-green-300 mt-2">Innovantes & Durables</span>
              </h1>
            </motion.div>
            
            <motion.p
              className="text-lg md:text-xl mb-8 opacity-90 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Experts en installations électriques, nous accompagnons l'industrie, l'agriculture et le tertiaire vers la performance et la durabilité.
            </motion.p>
            
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-white text-blue-900 px-8 py-4 rounded-full font-bold shadow-lg hover:bg-blue-100 transition text-lg"
              >
                Contactez-nous
              </motion.a>
              <motion.a
                href="#services"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition text-lg"
              >
                Découvrir nos services
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Removed image illustration */}
          </motion.div>
        </div>

        <motion.div
          className="max-w-3xl mx-auto mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <blockquote className="italic text-xl text-white/90 border-l-4 border-green-300 pl-6 py-2">
            " Notre engagement absolu a permis de soutenir la continuité de nos clients, assurant ainsi le fonctionnement de leurs entités sans faille. "
          </blockquote>
          <div className="mt-4 text-sm text-white/70 font-semibold">
            Mohammed ElHabib Abaakil, CEO
          </div>
        </motion.div>
      </div>
    </section>
  );
} 