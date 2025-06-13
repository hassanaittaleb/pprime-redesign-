"use client";

import React, { useState, useEffect } from "react";

interface Project {
  id: number;
  name: string;
  client: string;
  status: string;
  startDate: string;
  endDate: string | null;
}

interface EditProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null; // The project data to edit
  onProjectUpdated: (updatedProject: Project) => void; // Callback to update the list
}

export default function EditProjectModal({ isOpen, onClose, project, onProjectUpdated }: EditProjectModalProps) {
  // Initialize state with project data when modal opens or project changes
  const [name, setName] = useState(project?.name || "");
  const [client, setClient] = useState(project?.client || "");
  const [status, setStatus] = useState(project?.status || "Planifié");
  const [startDate, setStartDate] = useState(project?.startDate || "");
  const [endDate, setEndDate] = useState(project?.endDate || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use useEffect to update form state when the 'project' prop changes
  useEffect(() => {
    if (project) {
      setName(project.name);
      setClient(project.client);
      setStatus(project.status);
      setStartDate(project.startDate);
      setEndDate(project.endDate || ""); // Handle null endDate
    } else {
       // Reset form if project becomes null (modal is closed)
       setName("");
       setClient("");
       setStatus("Planifié");
       setStartDate("");
       setEndDate("");
    }
  }, [project]); // Re-run effect when the 'project' prop changes


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!project) { // Should not happen if button is disabled when no project selected
        setError("Aucun projet sélectionné pour modification.");
        setIsSubmitting(false);
        return;
    }

    const updatedProjectData = {
      name,
      client,
      status,
      startDate,
      endDate: endDate || null, // Send null if endDate is empty
    };

    try {
      const response = await fetch(`/api/projects/${project.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProjectData),
      });

      const result = await response.json();

      if (!response.ok) {
         const errorData = await response.json().catch(() => ({ message: 'Erreur inconnue' }));
         throw new Error(errorData.message || `Error: ${response.status}`);
      }

      // Call the callback to update the project list in the parent component
      onProjectUpdated(result); // Pass the updated project data

      // Close modal
      onClose();

    } catch (err: any) {
      console.error('Error updating project:', err);
      setError(err.message || 'Une erreur est survenue lors de la modification.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Only render if modal is open AND a project is selected for editing
  if (!isOpen || !project) return null; 

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md relative" onClick={e => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Modifier le projet</h2>

        {error && <div className="mb-4 text-red-600 text-sm text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Input fields for project data (similar to Add modal) */}
          <div>
            <label htmlFor="edit-name" className="block text-gray-700 text-sm font-medium mb-1">Nom du projet *</label>
            <input 
              type="text" 
              id="edit-name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required 
            />
          </div>

          <div>
            <label htmlFor="edit-client" className="block text-gray-700 text-sm font-medium mb-1">Client *</label>
            <input 
              type="text" 
              id="edit-client"
              value={client}
              onChange={e => setClient(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required 
            />
          </div>

          <div>
            <label htmlFor="edit-status" className="block text-gray-700 text-sm font-medium mb-1">Statut *</label>
            <select 
              id="edit-status"
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
            <label htmlFor="edit-startDate" className="block text-gray-700 text-sm font-medium mb-1">Date de début *</label>
            <input 
              type="date" 
              id="edit-startDate"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required 
            />
          </div>

           <div>
            <label htmlFor="edit-endDate" className="block text-gray-700 text-sm font-medium mb-1">Date de fin</label>
            <input 
              type="date" 
              id="edit-endDate"
              value={endDate || ''} // Ensure it is an empty string for date input if null
              onChange={e => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <button 
            type="submit" 
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Mise à jour...' : 'Mettre à jour le projet'}
          </button>
        </form>
      </div>
    </div>
  );
} 