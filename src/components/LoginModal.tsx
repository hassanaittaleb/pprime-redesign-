"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext"; // We'll create this context next
import { useNotification } from "../lib/hooks/useNotification";
import { motion, AnimatePresence } from "framer-motion";

const ADMIN_EMAIL = "admin@pprime.com";
const ADMIN_PASSWORD = "motdepasse123";

export default function LoginModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { isOpen, onClose, login, buttonPosition } = useAuth(); // Get functions from context
  const notify = useNotification();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      login(); // Call login function from context
      onClose(); // Close the modal
      notify.success("Connexion réussie !");
      router.push("/admin"); // Navigate to admin page
    } else {
      setError("Email ou mot de passe incorrect.");
      notify.error("Email ou mot de passe incorrect");
    }
  };

  if (!isOpen || !buttonPosition) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute bg-white rounded-xl shadow-2xl w-96"
          style={{
            top: `${buttonPosition.bottom + window.scrollY + 5}px`,
            left: `${buttonPosition.left - 100}px`,
          }}
          onClick={e => e.stopPropagation()}
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold text-gray-900">Connexion Admin</h1>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold hover:bg-gray-100 p-1 rounded-full transition-colors duration-200"
              >
                &times;
              </button>
            </div>
          </div>
          <div className="p-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 text-red-600 text-sm font-medium text-center bg-red-50 p-3 rounded-lg border border-red-100"
              >
                {error}
              </motion.div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Entrez votre email"
                    className="w-full px-4 py-2.5 text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Entrez votre mot de passe"
                    className="w-full px-4 py-2.5 text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 rounded-lg text-base font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Se connecter
              </motion.button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 