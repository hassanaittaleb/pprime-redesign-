"use client";

import React, { useState, useEffect } from 'react';
import { Client } from '../../lib/simulated-db'; // Import Client interface

interface EditClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: Client | null; // The client data to edit
  onClientUpdated: (updatedClient: Client) => void; // Callback to update the list
}

export default function EditClientModal({ isOpen, onClose, client, onClientUpdated }: EditClientModalProps) {
  // Initialize state with client data when modal opens or client changes
  const [name, setName] = useState(client?.name || "");
  const [contactPerson, setContactPerson] = useState(client?.contactPerson || "");
  const [email, setEmail] = useState(client?.email || "");
  const [phone, setPhone] = useState(client?.phone || "");
  const [address, setAddress] = useState(client?.address || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use useEffect to update form state when the 'client' prop changes
  useEffect(() => {
    if (client) {
      setName(client.name);
      setContactPerson(client.contactPerson);
      setEmail(client.email);
      setPhone(client.phone || ""); // Handle null phone
      setAddress(client.address || ""); // Handle null address
    } else {
       // Reset form if client becomes null (modal is closed)
       setName("");
       setContactPerson("");
       setEmail("");
       setPhone("");
       setAddress("");
    }
  }, [client]); // Re-run effect when the 'client' prop changes


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!client) { // Should not happen if button is disabled when no client selected
        setError("Aucun client sélectionné pour modification.");
        setIsSubmitting(false);
        return;
    }

    const updatedClientData = {
      name,
      contactPerson,
      email,
      phone: phone || null, // Send null if phone is empty
      address: address || null, // Send null if address is empty
    };

    try {
      const response = await fetch(`/api/clients/${client.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedClientData),
      });

      const result = await response.json();

      if (!response.ok) {
         const errorData = await response.json().catch(() => ({ message: 'Erreur inconnue' }));
         throw new Error(errorData.message || `Error: ${response.status}`);
      }

      // Call the callback to update the client list in the parent component
      onClientUpdated(result);

      // Close modal
      onClose();

    } catch (err: any) {
      console.error('Error updating client:', err);
      setError(err.message || 'Une erreur est survenue lors de la modification.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Only render if modal is open AND a client is selected for editing
  if (!isOpen || !client) return null; 

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md relative" onClick={e => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Modifier le client</h2>

        {error && <div className="mb-4 text-red-600 text-sm text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Input fields for client data (similar to Add modal) */}
          <div>
            <label htmlFor="edit-name" className="block text-gray-700 text-sm font-medium mb-1">Nom *</label>
            <input 
              type="text" 
              id="edit-name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required 
            />
          </div>

          <div>
            <label htmlFor="edit-contactPerson" className="block text-gray-700 text-sm font-medium mb-1">Personne contact *</label>
            <input 
              type="text" 
              id="edit-contactPerson"
              value={contactPerson}
              onChange={e => setContactPerson(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required 
            />
          </div>

          <div>
            <label htmlFor="edit-email" className="block text-gray-700 text-sm font-medium mb-1">Email *</label>
            <input 
              type="email" 
              id="edit-email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required 
            />
          </div>

          <div>
            <label htmlFor="edit-phone" className="block text-gray-700 text-sm font-medium mb-1">Téléphone</label>
            <input 
              type="text" 
              id="edit-phone"
              value={phone || ''} // Ensure it is an empty string for input if null
              onChange={e => setPhone(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

           <div>
            <label htmlFor="edit-address" className="block text-gray-700 text-sm font-medium mb-1">Adresse</label>
            <textarea 
              id="edit-address"
              value={address || ''} // Ensure it is an empty string for input if null
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
            {isSubmitting ? 'Mise à jour...' : 'Mettre à jour le client'}
          </button>
        </form>
      </div>
    </div>
  );
} 