"use client";

import React, { useState, useEffect } from 'react';
import { Invoice, Client } from '../../lib/simulated-db'; // Import interfaces

interface AddInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvoiceAdded: (newInvoice: Invoice) => void; // Callback
}

export default function AddInvoiceModal({ isOpen, onClose, onInvoiceAdded }: AddInvoiceModalProps) {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [clientId, setClientId] = useState<string>(''); // Use string for select input
  const [dateIssued, setDateIssued] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [amount, setAmount] = useState<string>(''); // Use string for input
  const [status, setStatus] = useState<'Pending' | 'Paid' | 'Cancelled'>('Pending');
  const [clients, setClients] = useState<Client[]>([]); // State to hold clients for selection
  const [loadingClients, setLoadingClients] = useState(true); // Loading state for clients
  const [clientsError, setClientsError] = useState<string | null>(null); // Error state for clients
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch clients when modal opens
  useEffect(() => {
    if (isOpen) {
      const fetchClients = async () => {
        setLoadingClients(true);
        setClientsError(null);
        try {
          const response = await fetch('/api/clients');
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          const data = await response.json();
          setClients(data);
        } catch (err: any) {
          console.error('Failed to fetch clients for invoice modal:', err);
          setClientsError('Échec du chargement des clients.');
        } finally {
          setLoadingClients(false);
        }
      };
      fetchClients();
    }
  }, [isOpen]); // Fetch clients when modal opens

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Basic validation
    if (!invoiceNumber || !clientId || !dateIssued || !dueDate || amount === '' || !status) {
       setError('Missing required fields.');
       setIsSubmitting(false);
       return;
    }

     const parsedAmount = parseFloat(amount);
     if (isNaN(parsedAmount) || parsedAmount < 0) {
       setError('Amount must be a non-negative number.');
       setIsSubmitting(false);
       return;
     }

    const newInvoiceData = {
      invoiceNumber,
      clientId: parseInt(clientId, 10), // Parse client ID to number
      dateIssued,
      dueDate,
      amount: parsedAmount,
      status,
    };

    try {
      const response = await fetch('/api/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newInvoiceData),
      });

      const result = await response.json();

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Erreur inconnue' }));
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      // Call the callback to add the new invoice to the list in the parent component
      onInvoiceAdded(result);

      // Clear form and close modal on success
      setInvoiceNumber('');
      setClientId('');
      setDateIssued('');
      setDueDate('');
      setAmount('');
      setStatus('Pending');
      onClose();

    } catch (err: any) {
      console.error('Error adding invoice:', err);
      setError(err.message || "Une erreur est survenue lors de l'ajout.");
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Ajouter une nouvelle facture</h2>

        {error && <div className="mb-4 text-sm text-center px-4 bg-red-100 text-red-800 border border-red-200 rounded-md font-semibold">{error}</div>}
        {clientsError && <div className="mb-4 text-sm text-center px-4 bg-red-100 text-red-800 border border-red-200 rounded-md font-semibold">{clientsError}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Input fields for invoice data */}
          <div>
            <label htmlFor="invoiceNumber" className="block text-gray-700 text-sm font-medium mb-1">Numéro de facture *</label>
            <input 
              type="text" 
              id="invoiceNumber"
              value={invoiceNumber}
              onChange={e => setInvoiceNumber(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required 
            />
          </div>

          <div>
            <label htmlFor="clientId" className="block text-gray-700 text-sm font-medium mb-1">Client *</label>
            {loadingClients ? (
              <div className="text-gray-500 text-sm">Chargement des clients...</div>
            ) : clientsError ? (
              null
            ) : (
              <select 
                id="clientId"
                value={clientId}
                onChange={e => setClientId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
                disabled={clients.length === 0} // Disable if no clients are available
              >
                 <option value="">Sélectionner un client</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>{client.name}</option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label htmlFor="dateIssued" className="block text-gray-700 text-sm font-medium mb-1">Date d'émission *</label>
            <input 
              type="date" 
              id="dateIssued"
              value={dateIssued}
              onChange={e => setDateIssued(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required 
            />
          </div>

          <div>
            <label htmlFor="dueDate" className="block text-gray-700 text-sm font-medium mb-1">Date d'échéance *</label>
            <input 
              type="date" 
              id="dueDate"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required 
            />
          </div>

          <div>
            <label htmlFor="amount" className="block text-gray-700 text-sm font-medium mb-1">Montant *</label>
            <input 
              type="number" 
              id="amount"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required 
              step="0.01"
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-gray-700 text-sm font-medium mb-1">Statut *</label>
            <select 
              id="status"
              value={status}
              onChange={e => setStatus(e.target.value as 'Pending' | 'Paid' | 'Cancelled')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            >
              <option value="Pending">En attente</option>
              <option value="Paid">Payée</option>
              <option value="Cancelled">Annulée</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            disabled={isSubmitting || loadingClients} // Disable submit if submitting or clients are loading
          >
            {isSubmitting ? 'Ajout...' : 'Ajouter la facture'}
          </button>
        </form>
      </div>
    </div>
  );
} 