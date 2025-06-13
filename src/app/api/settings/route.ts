import { NextResponse } from 'next/server';
import { getSettings, updateSettings } from '../../../lib/simulated-db';
import { Settings } from '../../../lib/simulated-db'; // Import Settings interface

// GET /api/settings
export async function GET() {
  console.log('API: GET /api/settings');
  try {
    const settings = getSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ message: 'Failed to fetch settings.' }, { status: 500 });
  }
}

// PUT /api/settings
export async function PUT(request: Request) {
  console.log('API: PUT /api/settings');
  try {
    const updatedSettingsData: Partial<Settings> = await request.json();

    // Basic validation (optional, depending on how strict you want the API) - add checks if needed
    // For example, check if defaultVatRate is a number and non-negative
    if (updatedSettingsData.defaultVatRate !== undefined && (typeof updatedSettingsData.defaultVatRate !== 'number' || updatedSettingsData.defaultVatRate < 0)) {
       return NextResponse.json({ message: 'Default VAT Rate must be a non-negative number.' }, { status: 400 });
    }

    const updatedSettings = updateSettings(updatedSettingsData);
    return NextResponse.json(updatedSettings);
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ message: 'Failed to update settings.' }, { status: 500 });
  }
} 