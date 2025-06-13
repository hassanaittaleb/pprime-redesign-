"use client";

import React, { useState, useEffect } from 'react';
import DataTable from '../../../components/admin/DataTable';
// Import modals
import AddServiceModal from '../../../components/admin/AddServiceModal';
import EditServiceModal from '../../../components/admin/EditServiceModal';

interface Service {
  id: number;
  name: string;
  description: string | null;
  price: number;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State for add modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for edit modal
  const [serviceToEdit, setServiceToEdit] = useState<Service | null>(null); // State to hold service being edited

  // Function to fetch services from the API
  const fetchServices = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/services');
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setServices(data);
    } catch (err: any) {
      console.error('Failed to fetch services:', err);
      setError('Échec du chargement des services.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch services when the component mounts
  useEffect(() => {
    fetchServices();
  }, []);

  // Handlers for modals
  const handleAddService = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
     // Optionally refetch services after adding, or rely on onServiceAdded callback
     // fetchServices(); 
  };

  const handleServiceAdded = (newService: Service) => {
    setServices(prevServices => [...prevServices, newService]);
  };

  const handleEditService = (service: Service) => {
    setServiceToEdit(service);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setServiceToEdit(null);
    setIsEditModalOpen(false);
     // Optionally refetch services after updating, or rely on onServiceUpdated callback
     // fetchServices(); 
  };

  const handleServiceUpdated = (updatedService: Service) => {
    setServices(prevServices =>
      prevServices.map(service => service.id === updatedService.id ? updatedService : service)
    );
  };

  const handleDeleteService = async (serviceId: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) {
      try {
        const response = await fetch(`/api/services/${serviceId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: 'Erreur inconnue' }));
          throw new Error(errorData.message || `Error: ${response.status}`);
        }

        setServices(prevServices => prevServices.filter(service => service.id !== serviceId));
        console.log(`Service with ID ${serviceId} deleted.`);

      } catch (err: any) {
        console.error(`Failed to delete service ${serviceId}:`, err);
         alert(`Échec de la suppression du service: ${err.message}`);
      }
    }
  };

  // Define columns for the DataTable
  const columns = [
    { key: 'name', label: 'Nom du service' },
    { key: 'description', label: 'Description' },
    { 
      key: 'price', 
      label: 'Prix',
      render: (value: number) => `${value.toFixed(2)} €` // Format price
    },
    { 
      key: 'actions', 
      label: 'Actions',
      render: (value: any, item: Service) => ( 
        <div className="flex space-x-2">
           <button
            onClick={() => handleEditService(item)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm transition"
          >
            Modifier
          </button>
          <button
            onClick={() => handleDeleteService(item.id)} 
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm transition"
          >
            Supprimer
          </button>
        </div>
      )
    },
  ];

  if (loading) {
    return <div>Chargement des services...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Services</h1>
        <p className="text-gray-600 mt-2">Gérer les services proposés par l'entreprise</p>
      </div>
      <DataTable 
        columns={columns as any} // Cast for DataTable type compatibility
        data={services}
        title="Liste des Services"
        onAdd={handleAddService}
        addButtonText="Nouveau service"
      />

      {/* Modals */}
      <AddServiceModal 
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        onServiceAdded={handleServiceAdded} 
      />
      <EditServiceModal 
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        service={serviceToEdit}
        onServiceUpdated={handleServiceUpdated} 
      />

    </div>
  );
} 