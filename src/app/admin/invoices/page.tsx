"use client";

import React, { useState, useEffect, useMemo } from 'react';
import DataTable from '../../../components/admin/DataTable';
import { Invoice } from '../../../lib/simulated-db'; // Import Invoice interface
import AddInvoiceModal from '../../../components/admin/AddInvoiceModal'; // Import Add Modal
import EditInvoiceModal from '../../../components/admin/EditInvoiceModal'; // Import Edit Modal

// Define Column interface locally to match DataTable's expected structure
interface Column {
  key: string;
  label: string;
  render?: (value: any, item?: any) => React.ReactNode;
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [invoiceToEdit, setInvoiceToEdit] = useState<Invoice | null>(null);

  const fetchInvoices = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/invoices');
      if (!response.ok) {
        throw new Error(`Error fetching invoices: ${response.statusText}`);
      }
      const data = await response.json();
      const processedData = data.map((invoice: Invoice) => ({
        ...invoice,
        amount: parseFloat(String(invoice.amount)),
      }));
      setInvoices(processedData);
    } catch (err: any) {
      console.error('Failed to fetch invoices:', err);
      setError('Échec du chargement des factures.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleAddInvoice = (newInvoice: Invoice) => {
    setInvoices((prevInvoices) => [...prevInvoices, newInvoice]);
  };

  const handleEditInvoice = (invoice: Invoice) => {
    setInvoiceToEdit(invoice);
    setIsEditModalOpen(true);
  };

  const handleInvoiceUpdated = (updatedInvoice: Invoice) => {
    setInvoices((prevInvoices) =>
      prevInvoices.map((inv) =>
        inv.id === updatedInvoice.id ? updatedInvoice : inv
      )
    );
  };

  const handleDeleteInvoice = async (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette facture ?')) {
      try {
        const response = await fetch(`/api/invoices/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`Error deleting invoice: ${response.statusText}`);
        }

        setInvoices((prevInvoices) => prevInvoices.filter((invoice) => invoice.id !== id));
        alert('Facture supprimée avec succès.');

      } catch (err: any) {
        console.error('Failed to delete invoice:', err);
        alert(`Échec de la suppression de la facture : ${err.message}`);
      }
    }
  };

  const columns = useMemo<Column[]>(() => [
    {
      key: 'invoiceNumber',
      label: 'Numéro de facture',
    },
    {
      key: 'clientName',
      label: 'Client',
    },
    {
      key: 'dateIssued',
      label: 'Date d\'émission',
      render: (value: any) => value,
    },
    {
      key: 'dueDate',
      label: 'Date d\'échéance',
      render: (value: any) => value,
    },
    {
      key: 'amount',
      label: 'Montant',
      render: (value: any) => `${parseFloat(value).toFixed(2)} €`,
    },
    {
      key: 'status',
      label: 'Statut',
      render: (value: any) => {
        let statusColor = 'text-gray-800';
        switch (value) {
          case 'Paid':
            statusColor = 'text-green-600';
            break;
          case 'Pending':
            statusColor = 'text-yellow-600';
            break;
          case 'Cancelled':
            statusColor = 'text-red-600';
            break;
        }
        return <span className={`font-semibold ${statusColor}`}>{value}</span>;
      },
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (value: any, item: any) => {
        const invoiceItem = item as Invoice;
        return (
          <div className="flex space-x-2">
            <button
              onClick={() => handleEditInvoice(invoiceItem)}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm transition"
            >
              Modifier
            </button>
            <button
              onClick={() => handleDeleteInvoice(invoiceItem.id)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm transition"
            >
              Supprimer
            </button>
          </div>
        );
      },
    },
  ], [invoices]);

  if (loading) return <div className="text-center py-8 text-gray-500 text-lg">Chargement des factures...</div>;
  if (error) return <div className="text-center py-8 px-4 bg-red-100 text-red-800 border border-red-200 rounded-md font-semibold">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Gestion des Factures</h1>
      <div className="mb-4 text-right">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Ajouter une facture
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-4">
        <DataTable
          columns={columns}
          data={invoices}
          title="Liste des Factures"
        />
      </div>

      {/* Modals */}
      <AddInvoiceModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onInvoiceAdded={handleAddInvoice}
      />

      <EditInvoiceModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        invoiceToEdit={invoiceToEdit}
        onInvoiceUpdated={handleInvoiceUpdated}
      />
    </div>
  );
} 