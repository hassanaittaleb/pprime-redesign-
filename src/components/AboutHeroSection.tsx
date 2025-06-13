"use client";
import React from "react";
import Link from "next/link";

export default function AboutHeroSection() {
  return (
    <section className="relative w-full flex justify-center items-center min-h-[450px] py-16">
      {/* Image de fond */}
      <img
        src="/pprime.jpeg"
        alt="Equipe Pprime"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      />
      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black/60 z-10" />
      {/* Contenu */}
      <div className="relative z-20 max-w-3xl text-left text-white px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">À PROPOS DE NOUS</h1>
        <p className="text-lg md:text-xl mb-8 max-w-xl">
          PPrime oeuvre dans le domaine des installations électriques destinées aux secteurs agricole, agroalimentaire, tertiaire et industriel.
        </p>
        <Link href="/about" className="inline-block bg-white text-[#14232b] font-bold text-lg px-8 py-4 rounded-none border-2 border-white hover:bg-[#14232b] hover:text-white transition">
          Découvrez Prime
        </Link>
      </div>
    </section>
  );
} 