import { NextResponse } from 'next/server';
// Import the shared simulated database functions and interface
import { getClients, addClient } from '../../../lib/simulated-db';

// GET /api/clients
export async function GET() {
  // Use the shared function to get all clients
  return NextResponse.json(getClients());
}

// POST /api/clients
export async function POST(request: Request) {
  try {
    const newClientData = await request.json();

    // Basic validation (add more as needed)
    if (!newClientData.name || !newClientData.contactPerson || !newClientData.email) {
      return NextResponse.json({ message: 'Missing required fields: name, contactPerson, email.' }, { status: 400 });
    }

    // Use the shared function to add the new client
    const newClient = addClient(newClientData);

    // Return the newly created client with a 201 status code
    return NextResponse.json(newClient, { status: 201 });
  } catch (error) {
    console.error('Error creating client:', error);
    // Return an error response
    return NextResponse.json({ message: 'Failed to create client.' }, { status: 500 });
  }
} 