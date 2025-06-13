"use client";

import React, { useState } from 'react';
import { Client } from '../../lib/simulated-db'; // Import Client interface

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClientAdded: (newClient: Client) => void; // Callback to add the new client to the list
}

export default function AddClientModal({ isOpen, onClose, onClientAdded }: AddClientModalProps) {
  const [name, setName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const newClientData = {
      name,
      contactPerson,
      email,
      phone: phone || null, // Send null if phone is empty
      address: address || null, // Send null if address is empty
    };

    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newClientData),
      });

      const result = await response.json();

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Erreur inconnue' }));
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      // Call the callback to add the new client to the list in the parent component
      onClientAdded(result);

      // Clear form and close modal on success
      setName('');
      setContactPerson('');
      setEmail('');
      setPhone('');
      setAddress('');
      onClose();

    } catch (err: any) {
      console.error('Error adding client:', err);
      setError(err.message || 'Une erreur est survenue lors de l\'ajout.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md relative" onClick={e => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Ajouter un nouveau client</h2>

        {error && <div className="mb-4 text-red-600 text-sm text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Input fields for client data */}
          <div>
            <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-1">Nom *</label>
            <input 
              type="text" 
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required 
            />
          </div>

          <div>
            <label htmlFor="contactPerson" className="block text-gray-700 text-sm font-medium mb-1">Personne contact *</label>
            <input 
              type="text" 
              id="contactPerson"
              value={contactPerson}
              onChange={e => setContactPerson(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required 
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">Email *</label>
            <input 
              type="email" 
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required 
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-gray-700 text-sm font-medium mb-1">Téléphone</label>
            <input 
              type="text" 
              id="phone"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

           <div>
            <label htmlFor="address" className="block text-gray-700 text-sm font-medium mb-1">Adresse</label>
            <textarea 
              id="address"
              value={address}
              onChange={e => setAddress(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Ajout...' : 'Ajouter le client'}
          </button>
        </form>
      </div>
    </div>
  );
} 