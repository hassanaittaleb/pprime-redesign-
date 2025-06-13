import { NextResponse } from 'next/server';
import { getInvoices, addInvoice } from '../../../lib/simulated-db';

// GET /api/invoices
export async function GET() {
  // Use the shared function to get all invoices
  return NextResponse.json(getInvoices());
}

// POST /api/invoices
export async function POST(request: Request) {
  try {
    const newInvoiceData = await request.json();

    // Basic validation (add more as needed)
    if (!newInvoiceData.invoiceNumber || newInvoiceData.clientId === undefined || !newInvoiceData.dateIssued || !newInvoiceData.dueDate || newInvoiceData.amount === undefined || !newInvoiceData.status) {
      return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
    }

     if (typeof newInvoiceData.amount !== 'number' || newInvoiceData.amount < 0) {
       return NextResponse.json({ message: 'Amount must be a non-negative number.' }, { status: 400 });
     }

    // Use the shared function to add the new invoice
    // Note: The addInvoice function in simulated-db handles the client existence check
    const newInvoice = addInvoice(newInvoiceData);

    // Return the newly created invoice with a 201 status code
    return NextResponse.json(newInvoice, { status: 201 });
  } catch (error) {
    console.error('Error creating invoice:', error);
    // Return an error response
    return NextResponse.json({ message: 'Failed to create invoice.' }, { status: 500 });
  }
} 