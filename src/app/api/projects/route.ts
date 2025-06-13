import { NextResponse } from 'next/server';
// Import the shared simulated database functions and interface
import { getProjects, addProject, Project } from '../../../lib/simulated-db';

// Remove simulated data and ID counter from this route file
// interface Project { ... }
// let simulatedProjects: Project[] = [...];
// let nextId = simulatedProjects.length + 1;

// GET /api/projects
export async function GET() {
  // Use the shared function to get all projects
  return NextResponse.json(getProjects());
}

// POST /api/projects
export async function POST(request: Request) {
  try {
    const newProjectData = await request.json();

    // Basic validation
    if (!newProjectData.name || !newProjectData.client || !newProjectData.status || !newProjectData.startDate) {
      return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
    }

    // Use the shared function to add the new project
    const newProject = addProject(newProjectData);

    // Return the newly created project with a 201 status code
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    // Return an error response
    return NextResponse.json({ message: 'Failed to create project.' }, { status: 500 });
  }
} 