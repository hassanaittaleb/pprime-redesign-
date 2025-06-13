import { NextResponse } from 'next/server';
import { getClientById, updateClient, deleteClient } from '../../../../lib/simulated-db';

interface Context {
    params: { id: string };
}

// GET /api/clients/{id}
export async function GET(request: Request, context: Context) {
  const id = parseInt(context.params.id, 10);

  // Use the shared function to get the client by ID
  const client = getClientById(id);

  if (client) {
    return NextResponse.json(client);
  } else {
    return NextResponse.json({ message: 'Client not found.' }, { status: 404 });
  }
}

// PUT /api/clients/{id}
export async function PUT(request: Request, context: Context) {
  const id = parseInt(context.params.id, 10);
  try {
    const updatedClientData = await request.json();

    // Use the shared function to update the client
    const updatedClient = updateClient(id, updatedClientData);

    if (updatedClient) {
      return NextResponse.json(updatedClient);
    } else {
      return NextResponse.json({ message: 'Client not found or update failed.' }, { status: 404 });
    }
  } catch (error) {
     console.error(`Error updating client with ID ${id}:`, error);
    return NextResponse.json({ message: 'Error updating client.' }, { status: 500 });
  }
}

// DELETE /api/clients/{id}
export async function DELETE(request: Request, context: Context) {
  const id = parseInt(context.params.id, 10);

  // Use the shared function to delete the client
  const success = deleteClient(id);

  if (success) {
    return NextResponse.json({ message: 'Client deleted successfully.' });
  } else {
    return NextResponse.json({ message: 'Client not found or deletion failed.' }, { status: 404 });
  }
} 