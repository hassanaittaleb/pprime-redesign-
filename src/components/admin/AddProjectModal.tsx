"use client";

import React, { useState } from "react";

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectAdded: (newProject: any) => void; // Callback to update the list
}

export default function AddProjectModal({ isOpen, onClose, onProjectAdded }: AddProjectModalProps) {
  const [name, setName] = useState("");
  const [client, setClient] = useState("");
  const [status, setStatus] = useState("Planifié"); // Default status
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const projectData = {
      name,
      client,
      status,
      startDate,
      endDate: endDate || null, // Send null if endDate is empty
    };

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Échec de l\'ajout du projet.');
      }

      // Call the callback to update the project list in the parent component
      onProjectAdded(result); // Pass the newly added project data

      // Reset form and close modal
      setName("");
      setClient("");
      setStatus("Planifié");
      setStartDate("");
      setEndDate("");
      onClose();
    } catch (err: any) {
      console.error('Error adding project:', err);
      setError(err.message || 'Une erreur est survenue lors de l\'ajout.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null; // Don't render if modal is closed

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md relative" onClick={e => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Ajouter un nouveau projet</h2>

        {error && <div className="mb-4 text-red-600 text-sm text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-1">Nom du projet *</label>
            <input 
              type="text" 
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required 
            />
          </div>

          <div>
            <label htmlFor="client" className="block text-gray-700 text-sm font-medium mb-1">Client *</label>
            <input 
              type="text" 
              id="client"
              value={client}
              onChange={e => setClient(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required 
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-gray-700 text-sm font-medium mb-1">Statut *</label>
            <select 
              id="status"
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            >
              <option value="Planifié">Planifié</option>
              <option value="En cours">En cours</option>
              <option value="Terminé">Terminé</option>
            </select>
          </div>

          <div>
            <label htmlFor="startDate" className="block text-gray-700 text-sm font-medium mb-1">Date de début *</label>
            <input 
              type="date" 
              id="startDate"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required 
            />
          </div>

           <div>
            <label htmlFor="endDate" className="block text-gray-700 text-sm font-medium mb-1">Date de fin</label>
            <input 
              type="date" 
              id="endDate"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <button 
            type="submit" 
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Ajout en cours...' : 'Ajouter le projet'}
          </button>
        </form>
      </div>
    </div>
  );
} 