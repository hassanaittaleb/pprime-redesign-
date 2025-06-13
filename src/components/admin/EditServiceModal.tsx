"use client";

import React, { useState, useEffect } from 'react';
import { Service } from '../../lib/simulated-db'; // Import Service interface

interface EditServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null; // The service data to edit
  onServiceUpdated: (updatedService: Service) => void; // Callback to update the list
}

export default function EditServiceModal({ isOpen, onClose, service, onServiceUpdated }: EditServiceModalProps) {
  // Initialize state with service data when modal opens or service changes
  const [name, setName] = useState(service?.name || "");
  const [description, setDescription] = useState(service?.description || "");
  const [price, setPrice] = useState<string>(service?.price?.toString() || ""); // Convert price to string for input
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use useEffect to update form state when the 'service' prop changes
  useEffect(() => {
    if (service) {
      setName(service.name);
      setDescription(service.description || ""); // Handle null description
      setPrice(service.price?.toString() || ""); // Convert price to string
    } else {
       // Reset form if service becomes null (modal is closed)
       setName("");
       setDescription("");
       setPrice("");
    }
  }, [service]); // Re-run effect when the 'service' prop changes


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!service) { // Should not happen if button is disabled when no service selected
        setError("Aucun service sélectionné pour modification.");
        setIsSubmitting(false);
        return;
    }

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

    const updatedServiceData = {
      name,
      description: description || null, // Send null if description is empty
      price: parsedPrice,
    };

    try {
      const response = await fetch(`/api/services/${service.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedServiceData),
      });

      const result = await response.json();

      if (!response.ok) {
         const errorData = await response.json().catch(() => ({ message: 'Erreur inconnue' }));
         throw new Error(errorData.message || `Error: ${response.status}`);
      }

      // Call the callback to update the service list in the parent component
      onServiceUpdated(result);

      // Close modal
      onClose();

    } catch (err: any) {
      console.error('Error updating service:', err);
      setError(err.message || 'Une erreur est survenue lors de la modification.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Only render if modal is open AND a service is selected for editing
  if (!isOpen || !service) return null; 

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md relative" onClick={e => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Modifier le service</h2>

        {error && <div className="mb-4 text-red-600 text-sm text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Input fields for service data (similar to Add modal) */}
          <div>
            <label htmlFor="edit-name" className="block text-gray-700 text-sm font-medium mb-1">Nom du service *</label>
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
            <label htmlFor="edit-description" className="block text-gray-700 text-sm font-medium mb-1">Description</label>
             <textarea 
              id="edit-description"
              value={description || ''} // Ensure it is an empty string for input if null
              onChange={e => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            ></textarea>
          </div>

          <div>
            <label htmlFor="edit-price" className="block text-gray-700 text-sm font-medium mb-1">Prix *</label>
            <input 
              type="number" // Use type number for price
              id="edit-price"
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
            {isSubmitting ? 'Mise à jour...' : 'Mettre à jour le service'}
          </button>
        </form>
      </div>
    </div>
  );
} 