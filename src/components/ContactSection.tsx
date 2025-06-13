"use client";
import React, { useState } from "react";
import { FaUser, FaEnvelope, FaCommentDots, FaMapMarkerAlt, FaPhone, FaDownload } from "react-icons/fa";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    if (!cvFile) {
      setMessage("Veuillez télécharger votre CV.");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('cv', cvFile);

    try {
      const response = await fetch('/api/join-us', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Votre candidature a été envoyée avec succès !');
        setName("");
        setEmail("");
        setPhone("");
        setCvFile(null);
      } else {
        setMessage(data.message || 'Erreur lors de l\'envoi de la candidature.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setMessage('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setCvFile(file);
  };

  return (
    <section className="relative py-20 bg-gray-50" id="join-us">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side: Title and Description */}
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6 leading-tight">
              Quel Est Le Meilleur
              <span className="block">Travail Pour Vous</span>
              Chez <span className="text-green-600">PRIME</span> ?
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-md">
              Faites glisser et déposez votre CV dans le module ci-dessous ou choisissez vos propres filtres. Les offres d'emploi qui vous correspondent seront affichées. À votre tour maintenant !
            </p>
          </div>

          {/* Right side: Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-1">Votre nom *</label>
                <input 
                  type="text" 
                  id="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Entrez votre nom"
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required 
                />
              </div>
              {/* Email Input */}
              <div>
                 <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">Votre e-mail *</label>
                <input 
                  type="email" 
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Entrez votre e-mail"
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required 
                />
              </div>
              {/* Phone Input */}
              <div>
                 <label htmlFor="phone" className="block text-gray-700 text-sm font-medium mb-1">Votre téléphone *</label>
                <input 
                  type="tel" 
                  id="phone"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="Entrez votre téléphone"
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required 
                />
              </div>
              
              {/* File Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition">
                <input 
                  type="file" 
                  className="hidden" 
                  id="cv-upload" 
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                />
                <label htmlFor="cv-upload" className="flex flex-col items-center justify-center">
                  <FaDownload className="text-4xl text-blue-600 mb-4" />
                  <p className="text-gray-700 mb-2">{cvFile ? `Fichier sélectionné: ${cvFile.name}` : 'Glissez / déposez votre CV'}</p>
                  <p className="text-gray-500 text-sm">
                    Le format PDF est préconisé (max 2 Mo). Les formats jpg/jpeg/png peuvent être utilisés.
                  </p>
                </label>
              </div>

              {/* Message Area */}
              {message && (
                <div className={`mt-4 text-center text-sm ${message.includes('succès') ? 'text-green-600' : 'text-red-600'}`}>
                  {message}
                </div>
              )}

              {/* Submit Button */}
              <div>
                <button 
                  type="submit" 
                  className="w-full bg-blue-900 text-white px-8 py-4 rounded-lg font-semibold shadow-md hover:bg-blue-800 transition disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer un message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
} 