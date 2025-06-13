import React from "react";
import Link from "next/link";
import { FaLinkedin, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#14232b] text-white pt-12 pb-4 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-12">
        {/* Logo + Slogan */}
        <div className="flex flex-col items-center md:items-start md:w-1/3">
          <img src="/logo_pprime1.png" alt="Logo Pprime" className="h-16 w-auto mb-4" />
          <span className="font-bold text-lg md:text-xl tracking-wide mb-6" style={{letterSpacing:2}}>POWER YOUR FUTURE</span>
        </div>
        {/* Pages */}
        <div className="flex-1 flex flex-col md:flex-row gap-12 justify-center">
          <div>
            <h4 className="font-bold text-[#4e7ca0] text-lg mb-2">Pages</h4>
            <ul className="space-y-1">
              <li><Link href="/" className="hover:underline">Accueil</Link></li>
              <li><Link href="/about" className="hover:underline">Histoire Et Vision</Link></li>
              <li><Link href="/offers" className="hover:underline">Offres</Link></li>
              <li><Link href="/sectors" className="hover:underline">Secteurs d'activité</Link></li>
              <li><Link href="/contact" className="hover:underline">Nous rejoindre</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#4e7ca0] text-lg mb-2">Secteurs D'activité</h4>
            <ul className="space-y-1">
              <li>Agriculture & Agroalimentaire</li>
              <li>Infrastructures & Industrie</li>
              <li>Tourisme & Sante</li>
              <li>Green Tech</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Ligne de séparation */}
      <div className="border-t border-[#2a3b45] my-8" />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-[#e0e6ea] gap-4">
        <div>Copyright Pprime 2025. All rights reserved</div>
        <div className="flex gap-6 text-2xl">
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter" className="hover:text-[#4e7ca0]"><FaXTwitter /></a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-[#4e7ca0]"><FaLinkedin /></a>
        </div>
      </div>
    </footer>
  );
} 