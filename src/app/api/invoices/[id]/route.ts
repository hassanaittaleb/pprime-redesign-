import { NextResponse } from 'next/server';
import { getInvoiceById, updateInvoice, deleteInvoice } from '../../../../lib/simulated-db';

interface Context {
    params: { id: string };
}

// GET /api/invoices/{id}
export async function GET(request: Request, context: Context) {
  const id = parseInt(context.params.id, 10);

  // Use the shared function to get the invoice by ID
  const invoice = getInvoiceById(id);

  if (invoice) {
    return NextResponse.json(invoice);
  } else {
    return NextResponse.json({ message: 'Invoice not found.' }, { status: 404 });
  }
}

// PUT /api/invoices/{id}
export async function PUT(request: Request, context: Context) {
  const id = parseInt(context.params.id, 10);
  try {
    const updatedInvoiceData = await request.json();

     // Basic validation for update
    if (updatedInvoiceData.amount !== undefined && (typeof updatedInvoiceData.amount !== 'number' || updatedInvoiceData.amount < 0)) {
       return NextResponse.json({ message: 'Amount must be a non-negative number.' }, { status: 400 });
    }

    // Use the shared function to update the invoice
    // Note: The updateInvoice function in simulated-db handles the client existence check
    const updatedInvoice = updateInvoice(id, updatedInvoiceData);

    if (updatedInvoice) {
      return NextResponse.json(updatedInvoice);
    } else {
      return NextResponse.json({ message: 'Invoice not found or update failed.' }, { status: 404 });
    }
  } catch (error) {
     console.error(`Error updating invoice with ID ${id}:`, error);
    return NextResponse.json({ message: 'Error updating invoice.' }, { status: 500 });
  }
}

// DELETE /api/invoices/{id}
export async function DELETE(request: Request, context: Context) {
  const id = parseInt(context.params.id, 10);

  // Use the shared function to delete the invoice
  const success = deleteInvoice(id);

  if (success) {
    return NextResponse.json({ message: 'Invoice deleted successfully.' });
  } else {
    return NextResponse.json({ message: 'Invoice not found or deletion failed.' }, { status: 404 });
  }
} 