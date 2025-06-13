"use client";

import React, { useState } from 'react';
import { Service } from '../../lib/simulated-db'; // Import Service interface

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onServiceAdded: (newService: Service) => void; // Callback to add the new service to the list
}

export default function AddServiceModal({ isOpen, onClose, onServiceAdded }: AddServiceModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<string>(''); // Use string for input to handle empty state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Basic validation
    if (!name || price === '') {
       setError('Missing required fields: name, price.');
       setIsSubmitting(false);
       return;
    }

     const parsedPrice = parseFloat(price);
     if (isNaN(parsedPrice) || parsedPrice < 0) {
       setError('Price must be a non-negative number.');
       setIsSubmitting(false);
       return;
     }

    const newServiceData = {
      name,
      description: description || null, // Send null if description is empty
      price: parsedPrice,
    };

    try {
      const response = await fetch('/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newServiceData),
      });

      const result = await response.json();

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Erreur inconnue' }));
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      // Call the callback to add the new service to the list in the parent component
      onServiceAdded(result);

      // Clear form and close modal on success
      setName('');
      setDescription('');
      setPrice('');
      onClose();

    } catch (err: any) {
      console.error('Error adding service:', err);
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Ajouter un nouveau service</h2>

        {error && <div className="mb-4 text-red-600 text-sm text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Input fields for service data */}
          <div>
            <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-1">Nom du service *</label>
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
            <label htmlFor="description" className="block text-gray-700 text-sm font-medium mb-1">Description</label>
             <textarea 
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            ></textarea>
          </div>

          <div>
            <label htmlFor="price" className="block text-gray-700 text-sm font-medium mb-1">Prix *</label>
            <input 
              type="number" // Use type number for price
              id="price"
              value={price}
              onChange={e => setPrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required 
              step="0.01" // Allow decimal values for price
            />
          </div>

          <button 
            type="submit" 
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Ajout...' : 'Ajouter le service'}
          </button>
        </form>
      </div>
    </div>
  );
} 