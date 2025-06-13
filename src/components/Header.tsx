"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useNotification } from "../lib/hooks/useNotification";

export default function Header() {
  const { onOpen, isAuthenticated, logout } = useAuth();
  const adminButtonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const notify = useNotification();

  const handleAdminClick = () => {
    if (adminButtonRef.current) {
      const rect = adminButtonRef.current.getBoundingClientRect();
      onOpen(rect);
    }
  };

  const handleLogout = () => {
    logout();
    notify.info("Vous avez été déconnecté");
    router.push("/");
  };

  return (
    <header className="bg-white/90 backdrop-blur shadow-md sticky top-0 z-50 border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/">
            <img src="/logo_pprime.svg" alt="Logo Pprime" className="h-10 w-auto" />
          </Link>
        </div>
        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium items-center">
          <Link href="/services" className="hover:text-blue-700 hover:underline underline-offset-4 transition">
            Services
          </Link>
          <Link href="/offers" className="hover:text-blue-700 hover:underline underline-offset-4 transition">
            Offres
          </Link>
          <Link href="/sectors" className="hover:text-blue-700 hover:underline underline-offset-4 transition">
            Secteurs
          </Link>
          <Link href="/references" className="hover:text-blue-700 hover:underline underline-offset-4 transition">
            Références
          </Link>
          <Link href="/about" className="hover:text-blue-700 hover:underline underline-offset-4 transition">
            À propos
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                href="/admin"
                className="text-blue-700 hover:text-blue-800 font-semibold"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-1"
              >
                <span>Déconnexion</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v3a1 1 0 102 0V9z" clipRule="evenodd" />
                </svg>
              </button>
            </>
          ) : (
            <button
              ref={adminButtonRef}
              onClick={handleAdminClick}
              className="text-blue-700 hover:text-blue-800 font-semibold"
            >
              Admin
            </button>
          )}
          <Link
            href="/contact"
            className="ml-4 bg-blue-700 text-white px-5 py-2 rounded-full shadow hover:bg-blue-800 transition font-semibold"
          >
            Nous rejoindre
          </Link>
        </nav>
        {/* Menu mobile minimal (optionnel) */}
        <div className="md:hidden">
          {/* À améliorer pour un vrai menu mobile si besoin */}
          <Link
            href="/contact"
            className="bg-blue-700 text-white px-4 py-2 rounded-full shadow font-semibold"
          >
            Nous rejoindre
          </Link>
        </div>
      </div>
    </header>
  );
} 