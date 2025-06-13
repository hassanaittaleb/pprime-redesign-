import { NextResponse } from 'next/server';
// You might need a library like 'formidable' or 'multer' to handle file uploads
// For a simple example, we'll demonstrate the structure.
import { writeFile, stat, mkdir } from 'fs/promises';
import path from 'path';

// Configure the body parser to allow larger file uploads (e.g., 5MB)
export const config = {
  api: {
    bodyParser: false, // Disable built-in bodyParser
  },
};

export async function POST(request: Request) {
  console.log('API Route /api/join-us received a request.');
  try {
    const formData = await request.formData();
    console.log('FormData received.');

    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    // Make sure the file input in the frontend has name="cv"
    const cvFile = formData.get('cv') as File | null; 

    console.log('Form fields:', { name, email, phone });
    console.log('CV File status:', cvFile ? { name: cvFile.name, size: cvFile.size, type: cvFile.type } : 'No file received');

    if (!name || !email || !phone || !cvFile) {
      console.error('Missing required fields or CV file.');
      return NextResponse.json({ message: 'Missing required fields or CV file.' }, { status: 400 });
    }

    if (typeof name !== 'string' || typeof email !== 'string' || typeof phone !== 'string') {
       console.error('Invalid field types.');
       return NextResponse.json({ message: 'Invalid field types.' }, { status: 400 });
    }

    const bytes = await cvFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    console.log(`Received file buffer with size: ${buffer.length} bytes.`);

    const uploadDir = path.join(process.cwd(), 'uploads');
    const filePath = path.join(uploadDir, cvFile.name);
    console.log(`Attempting to save file to: ${filePath}`);

    // Ensure the uploads directory exists
    try {
      await stat(uploadDir);
      console.log(`Directory ${uploadDir} already exists.`);
    } catch (e: any) {
      if (e.code === 'ENOENT') {
        console.log(`Directory ${uploadDir} does not exist. Creating...`);
        await mkdir(uploadDir, { recursive: true });
        console.log(`Directory ${uploadDir} created.`);
      } else {
        console.error(`Error checking or creating directory ${uploadDir}:`, e);
        throw e; // Re-throw other errors
      }
    }

    await writeFile(filePath, buffer);
    console.log('File saved successfully.');

    console.log('Application processed successfully:', { name, email, phone, filename: cvFile.name });

    // Here you would typically save application details to a database,
    // send an email notification, etc.

    return NextResponse.json({ message: 'Votre candidature a été envoyée avec succès !' });
  } catch (error) {
    console.error('Caught exception in API route:', error);
    return NextResponse.json({ message: 'Erreur lors de l\'envoi de la candidature.' }, { status: 500 });
  }
} 