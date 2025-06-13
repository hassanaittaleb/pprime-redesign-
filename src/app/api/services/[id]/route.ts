import { NextResponse } from 'next/server';
import { getServiceById, updateService, deleteService } from '../../../../lib/simulated-db';

interface Context {
    params: { id: string };
}

// GET /api/services/{id}
export async function GET(request: Request, context: Context) {
  const id = parseInt(context.params.id, 10);

  // Use the shared function to get the service by ID
  const service = getServiceById(id);

  if (service) {
    return NextResponse.json(service);
  } else {
    return NextResponse.json({ message: 'Service not found.' }, { status: 404 });
  }
}

// PUT /api/services/{id}
export async function PUT(request: Request, context: Context) {
  const id = parseInt(context.params.id, 10);
  try {
    const updatedServiceData = await request.json();

     // Basic validation for update
    if (updatedServiceData.price !== undefined && (typeof updatedServiceData.price !== 'number' || updatedServiceData.price < 0)) {
       return NextResponse.json({ message: 'Price must be a non-negative number.' }, { status: 400 });
    }

    // Use the shared function to update the service
    const updatedService = updateService(id, updatedServiceData);

    if (updatedService) {
      return NextResponse.json(updatedService);
    } else {
      return NextResponse.json({ message: 'Service not found or update failed.' }, { status: 404 });
    }
  } catch (error) {
     console.error(`Error updating service with ID ${id}:`, error);
    return NextResponse.json({ message: 'Error updating service.' }, { status: 500 });
  }
}

// DELETE /api/services/{id}
export async function DELETE(request: Request, context: Context) {
  const id = parseInt(context.params.id, 10);

  // Use the shared function to delete the service
  const success = deleteService(id);

  if (success) {
    return NextResponse.json({ message: 'Service deleted successfully.' });
  } else {
    return NextResponse.json({ message: 'Service not found or deletion failed.' }, { status: 404 });
  }
} 