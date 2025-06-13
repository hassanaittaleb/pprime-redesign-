"use client";

import React, { useState, useEffect } from 'react';
import DataTable from '../../../components/admin/DataTable';
// Import modals
import AddClientModal from '../../../components/admin/AddClientModal';
import EditClientModal from '../../../components/admin/EditClientModal';

interface Client {
  id: number;
  name: string;
  contactPerson: string;
  email: string;
  phone: string | null;
  address: string | null;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State for add modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for edit modal
  const [clientToEdit, setClientToEdit] = useState<Client | null>(null); // State to hold client being edited

  // Function to fetch clients from the API
  const fetchClients = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/clients');
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setClients(data);
    } catch (err: any) {
      console.error('Failed to fetch clients:', err);
      setError('Échec du chargement des clients.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch clients when the component mounts
  useEffect(() => {
    fetchClients();
  }, []);

  // Handlers for modals
  const handleAddClient = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
     // Optionally refetch clients after adding, or rely on onClientAdded callback
     // fetchClients(); 
  };

  const handleClientAdded = (newClient: Client) => {
    setClients(prevClients => [...prevClients, newClient]);
  };

  const handleEditClient = (client: Client) => {
    setClientToEdit(client);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setClientToEdit(null);
    setIsEditModalOpen(false);
     // Optionally refetch clients after updating, or rely on onClientUpdated callback
     // fetchClients(); 
  };

  const handleClientUpdated = (updatedClient: Client) => {
    setClients(prevClients =>
      prevClients.map(client => client.id === updatedClient.id ? updatedClient : client)
    );
  };

  const handleDeleteClient = async (clientId: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      try {
        const response = await fetch(`/api/clients/${clientId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: 'Erreur inconnue' }));
          throw new Error(errorData.message || `Error: ${response.status}`);
        }

        setClients(prevClients => prevClients.filter(client => client.id !== clientId));
        console.log(`Client with ID ${clientId} deleted.`);

      } catch (err: any) {
        console.error(`Failed to delete client ${clientId}:`, err);
         alert(`Échec de la suppression du client: ${err.message}`);
      }
    }
  };

  // Define columns for the DataTable
  const columns = [
    { key: 'name', label: 'Nom' },
    { key: 'contactPerson', label: 'Personne contact' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Téléphone' },
    { key: 'address', label: 'Adresse' },
    { 
      key: 'actions', 
      label: 'Actions',
      render: (value: any, item: Client) => ( 
        <div className="flex space-x-2">
           <button
            onClick={() => handleEditClient(item)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm transition"
          >
            Modifier
          </button>
          <button
            onClick={() => handleDeleteClient(item.id)} 
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm transition"
          >
            Supprimer
          </button>
        </div>
      )
    },
  ];

  if (loading) {
    return <div>Chargement des clients...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Clients</h1>
        <p className="text-gray-600 mt-2">Gérer les clients de l'entreprise</p>
      </div>
      <DataTable 
        columns={columns as any} // Cast for DataTable type compatibility
        data={clients}
        title="Liste des Clients"
        onAdd={handleAddClient}
        addButtonText="Nouveau client"
      />

      {/* Modals */}
      <AddClientModal 
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        onClientAdded={handleClientAdded} 
      />
      <EditClientModal 
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        client={clientToEdit}
        onClientUpdated={handleClientUpdated} 
      />

    </div>
  );
} 