"use client";

import React, { useState, useEffect } from 'react';
import { Settings } from '../../../lib/simulated-db'; // Import Settings interface

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // State for form fields
  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [defaultVatRate, setDefaultVatRate] = useState<string>(''); // Use string for input

  // State for notification settings
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(true);
  const [projectNotificationsEnabled, setProjectNotificationsEnabled] = useState(true);
  const [invoiceNotificationsEnabled, setInvoiceNotificationsEnabled] = useState(false);

  // State for display settings
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  const [language, setLanguage] = useState('');

  // Fetch settings on component mount
  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/settings');
        if (!response.ok) {
          throw new Error(`Error fetching settings: ${response.statusText}`);
        }
        const data: Settings = await response.json();
        setSettings(data);

        // Populate form fields with fetched data
        setCompanyName(data.companyName);
        setAddress(data.address || '');
        setCity(data.city || '');
        setPostalCode(data.postalCode || '');
        setCountry(data.country || '');
        setDefaultVatRate(String(data.defaultVatRate)); // Convert number to string for input

        // Populate notification settings states
        setEmailNotificationsEnabled(data.emailNotificationsEnabled);
        setProjectNotificationsEnabled(data.projectNotificationsEnabled);
        setInvoiceNotificationsEnabled(data.invoiceNotificationsEnabled);

        // Populate display settings states
        setTheme(data.theme);
        setLanguage(data.language);

      } catch (err: any) {
        console.error('Failed to fetch settings:', err);
        setError('Échec du chargement des paramètres.');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    setError(null);

    // Basic validation
    if (!companyName || !defaultVatRate) {
      setError('Company Name and Default VAT Rate are required.');
      setIsSaving(false);
      return;
    }
     const parsedVatRate = parseFloat(defaultVatRate);
     if (isNaN(parsedVatRate) || parsedVatRate < 0) {
        setError('Default VAT Rate must be a non-negative number.');
        setIsSaving(false);
        return;
     }

    const updatedSettingsData: Partial<Settings> = {
      companyName,
      address: address || null,
      city: city || null,
      postalCode: postalCode || null,
      country: country || null,
      defaultVatRate: parsedVatRate,
      // Include notification settings
      emailNotificationsEnabled,
      projectNotificationsEnabled,
      invoiceNotificationsEnabled,
      // Include display settings
      theme,
      language,
    };

    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedSettingsData),
      });

      if (!response.ok) {
         const errorData = await response.json().catch(() => ({ message: 'Erreur inconnue' }));
         throw new Error(errorData.message || `Error: ${response.status}`);
      }

      setSaveSuccess(true);
      // Optionally re-fetch settings or update state with response data if needed
      // const data: Settings = await response.json();
      // setSettings(data);

    } catch (err: any) {
      console.error('Error saving settings:', err);
      setError(err.message || "Une erreur est survenue l'enregistrement.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <div className="text-center py-8 text-gray-500 text-lg">Chargement des paramètres...</div>;
  if (error && !settings) return <div className="text-center py-8 px-4 bg-red-100 text-red-800 border border-red-200 rounded-md font-semibold">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Gestion des Paramètres</h1>

      {error && settings && <div className="mb-4 text-sm text-center px-4 bg-red-100 text-red-800 border border-red-200 rounded-md font-semibold">{error}</div>}
      {saveSuccess && <div className="mb-4 text-green-600 text-sm text-center">Paramètres enregistrés avec succès !</div>}

      {settings && (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company Information */}
          <div className="md:col-span-2">
             <h2 className="text-xl font-bold text-gray-900 mb-4">Informations Entreprise</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Company Name */}
                <div>
                  <label htmlFor="companyName" className="block text-gray-700 text-sm font-medium mb-1">Nom de l'entreprise *</label>
                  <input
                    type="text"
                    id="companyName"
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                  />
                </div>

                {/* Address */}
                <div>
                  <label htmlFor="address" className="block text-gray-700 text-sm font-medium mb-1">Adresse</label>
                  <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>

                {/* City */}
                <div>
                  <label htmlFor="city" className="block text-gray-700 text-sm font-medium mb-1">Ville</label>
                  <input
                    type="text"
                    id="city"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>

                {/* Postal Code */}
                <div>
                  <label htmlFor="postalCode" className="block text-gray-700 text-sm font-medium mb-1">Code Postal</label>
                  <input
                    type="text"
                    id="postalCode"
                    value={postalCode}
                    onChange={e => setPostalCode(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>

                {/* Country */}
                <div>
                  <label htmlFor="country" className="block text-gray-700 text-sm font-medium mb-1">Pays</label>
                  <input
                    type="text"
                    id="country"
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>

                {/* Default VAT Rate */}
                <div>
                  <label htmlFor="defaultVatRate" className="block text-gray-700 text-sm font-medium mb-1">Taux de TVA par défaut (%) *</label>
                  <input
                    type="number"
                    id="defaultVatRate"
                    value={defaultVatRate}
                    onChange={e => setDefaultVatRate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                    step="0.01"
                  />
                </div>
             </div>
          </div>

          {/* Notification Settings */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold text-gray-900 mb-4 mt-4">Paramètres de Notification</h2>
            <div className="space-y-4">
              {/* Email Notifications */}
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="emailNotificationsEnabled" className="font-medium text-gray-900">Notifications par email</label>
                  <p className="text-sm text-gray-500">Recevoir les notifications par email</p>
                </div>
                <input
                  type="checkbox"
                  id="emailNotificationsEnabled"
                  checked={emailNotificationsEnabled}
                  onChange={e => setEmailNotificationsEnabled(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                />
              </div>
              {/* Project Notifications */}
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="projectNotificationsEnabled" className="font-medium text-gray-900">Notifications de projets</label>
                  <p className="text-sm text-gray-500">Recevoir les mises à jour des projets</p>
                </div>
                <input
                  type="checkbox"
                  id="projectNotificationsEnabled"
                  checked={projectNotificationsEnabled}
                  onChange={e => setProjectNotificationsEnabled(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                />
              </div>
              {/* Invoice Notifications */}
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="invoiceNotificationsEnabled" className="font-medium text-gray-900">Notifications de factures</label>
                  <p className="text-sm text-gray-500">Recevoir les rappels de factures</p>
                </div>
                <input
                  type="checkbox"
                  id="invoiceNotificationsEnabled"
                  checked={invoiceNotificationsEnabled}
                  onChange={e => setInvoiceNotificationsEnabled(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Display Settings */}
          <div className="md:col-span-2">
             <h2 className="text-xl font-bold text-gray-900 mb-4 mt-4">Paramètres d'Affichage</h2>
             <div className="space-y-4">
                {/* Theme */}
                <div>
                  <label htmlFor="theme" className="block text-gray-700 text-sm font-medium mb-1">Thème</label>
                  <select
                    id="theme"
                    value={theme}
                    onChange={e => setTheme(e.target.value as 'light' | 'dark' | 'system')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  >
                    <option value="light">Clair</option>
                    <option value="dark">Sombre</option>
                    <option value="system">Système</option>
                  </select>
                </div>
                {/* Language */}
                <div>
                  <label htmlFor="language" className="block text-gray-700 text-sm font-medium mb-1">Langue</label>
                  <select
                    id="language"
                    value={language}
                    onChange={e => setLanguage(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  >
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                    {/* Add more languages as needed */}
                  </select>
                </div>
             </div>
          </div>

          {/* Save Button */}
          <div className="md:col-span-2 text-right">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
              disabled={isSaving}
            >
              {isSaving ? 'Enregistrement...' : 'Enregistrer les paramètres'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
} 