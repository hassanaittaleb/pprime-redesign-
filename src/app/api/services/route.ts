import { NextResponse } from 'next/server';
import { getServices, addService } from '../../../lib/simulated-db';

// GET /api/services
export async function GET() {
  // Use the shared function to get all services
  return NextResponse.json(getServices());
}

// POST /api/services
export async function POST(request: Request) {
  try {
    const newServiceData = await request.json();

    // Basic validation (add more as needed)
    if (!newServiceData.name || newServiceData.price === undefined) { // Price should be defined
      return NextResponse.json({ message: 'Missing required fields: name, price.' }, { status: 400 });
    }

     if (typeof newServiceData.price !== 'number' || newServiceData.price < 0) {
       return NextResponse.json({ message: 'Price must be a non-negative number.' }, { status: 400 });
     }

    // Use the shared function to add the new service
    const newService = addService(newServiceData);

    // Return the newly created service with a 201 status code
    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    // Return an error response
    return NextResponse.json({ message: 'Failed to create service.' }, { status: 500 });
  }
} 