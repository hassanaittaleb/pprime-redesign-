"use client";
import React, { useState, useEffect } from "react";
import DataTable from "../../../components/admin/DataTable";
import AddProjectModal from "../../../components/admin/AddProjectModal";
import EditProjectModal from "../../../components/admin/EditProjectModal";
// TODO: Import EditProjectModal later

interface Project {
  id: number;
  name: string;
  client: string;
  status: string;
  startDate: string;
  endDate: string | null;
}

// Remove simulated data
// const simulatedProjects: Project[] = [...];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState<string | null>(null); // Add error state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Rename state for clarity
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for edit modal
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null); // State to hold project being edited

  // Function to fetch projects from the API
  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/projects');
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      // Ensure data has IDs even with simulated data for edit/delete
      const dataWithIds = data.map((item: Project, index: number) => ({...item, id: item.id || index + 1}));
      setProjects(dataWithIds);
    } catch (err: any) {
      console.error('Failed to fetch projects:', err);
      setError('Échec du chargement des projets.'); // Set error message
    } finally {
      setLoading(false);
    }
  };

  // Fetch projects when the component mounts
  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAddProject = () => {
    setIsAddModalOpen(true); // Open the add modal
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false); // Close the add modal
  };

  const handleProjectAdded = (newProject: Project) => {
    setProjects(prevProjects => [...prevProjects, newProject]);
  };

  const handleEditProject = (project: Project) => {
    setProjectToEdit(project); // Set the project to be edited
    setIsEditModalOpen(true); // Open the edit modal
  };

  const handleCloseEditModal = () => {
    setProjectToEdit(null); // Clear project to edit
    setIsEditModalOpen(false); // Close the edit modal
  };

  const handleProjectUpdated = (updatedProject: Project) => {
    // Update the project in the list
    setProjects(prevProjects => 
      prevProjects.map(project => project.id === updatedProject.id ? updatedProject : project)
    );
     // In a real app connected to a persistent DB, you might want to refetch:
     // fetchProjects(); 
  };

  const handleDeleteProject = async (projectId: number) => {
    // Ask for confirmation before deleting
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      try {
        const response = await fetch(`/api/projects/${projectId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          // Attempt to read error message from response body if available
          const errorData = await response.json().catch(() => ({ message: 'Erreur inconnue' }));
          throw new Error(errorData.message || `Error: ${response.status}`);
        }

        // If deletion is successful, update the state to remove the project
        setProjects(prevProjects => prevProjects.filter(project => project.id !== projectId));

        console.log(`Projet avec l'ID ${projectId} supprimé.`);

      } catch (err: any) {
        console.error(`Échec de la suppression du projet ${projectId}:`, err);
        // Show a user-friendly error message (optional)
         alert(`Échec de la suppression du projet: ${err.message}`);
      }
    }
  };

  // Define columns here (after handler functions)
  const columns = [
    { key: "name", label: "Nom du projet" },
    { key: "client", label: "Client" },
    { 
      key: "status", 
      label: "Statut",
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
          value === "Terminé" ? "bg-green-100 text-green-800" :
          value === "En cours" ? "bg-yellow-100 text-yellow-800" :
          "bg-blue-100 text-blue-800"
        }`}>
          {value}
        </span>
      )
    },
    { key: "startDate", label: "Date de début" },
    { key: "endDate", label: "Date de fin" },
    { 
      key: "actions", 
      label: "Actions",
      render: (value: any, item: Project) => ( 
        <div className="flex space-x-2">
           <button
            onClick={() => handleEditProject(item)} // Call edit handler, pass the project item
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm transition"
          >
            Modifier
          </button>
          <button
            onClick={() => handleDeleteProject(item.id)} 
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm transition"
          >
            Supprimer
          </button>
        </div>
      )
    },
  ];

  if (loading) {
    return <div>Chargement des projets...</div>; // Show loading message
  }

  if (error) {
    return <div className="text-red-600">{error}</div>; // Show error message
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Projets</h1>
        <p className="text-gray-600 mt-2">Gérer les projets de l'entreprise</p>
      </div>
      <DataTable 
        columns={columns as any} // Cast columns to any for now due to render signature
        data={projects}
        title="Liste des Projets"
        onAdd={handleAddProject}
        addButtonText="Nouveau projet"
      />

      {/* Render the Add Project Modal */}
      <AddProjectModal 
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        onProjectAdded={handleProjectAdded}
      />

      {/* Render the Edit Project Modal */}
      <EditProjectModal 
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        project={projectToEdit}
        onProjectUpdated={handleProjectUpdated}
      />
    </div>
  );
} 