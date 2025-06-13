import { NextResponse } from 'next/server';
// Import the shared simulated database functions and interface
import { getProjectById, updateProject, deleteProject, Project } from '../../../../lib/simulated-db';

// Remove simulated data and helper functions from this route file
// interface Project { ... }
// let simulatedProjects: Project[] = [...];
// function findProjectById(...) { ... }
// function updateProject(...) { ... }
// function deleteProjectById(...) { ... }

interface Context {
    params: { id: string };
}

// GET /api/projects/{id}
export async function GET(request: Request, context: Context) {
  const id = parseInt(context.params.id, 10);

  // Use the shared function to find the project by ID
  const project = getProjectById(id);

  if (project) {
    return NextResponse.json(project);
  } else {
    return NextResponse.json({ message: 'Project not found.' }, { status: 404 });
  }
}

// PUT /api/projects/{id}
export async function PUT(request: Request, context: Context) {
  const id = parseInt(context.params.id, 10);
  try {
    const updatedProjectData = await request.json();

    // Use the shared function to update the project
    const updatedProject = updateProject(id, updatedProjectData);

    if (updatedProject) {
      return NextResponse.json(updatedProject);
    } else {
      return NextResponse.json({ message: 'Project not found or update failed.' }, { status: 404 });
    }
  } catch (error) {
     console.error(`Error updating project with ID ${id}:`, error);
    return NextResponse.json({ message: 'Error updating project.' }, { status: 500 });
  }
}

// DELETE /api/projects/{id}
export async function DELETE(request: Request, context: Context) {
  const id = parseInt(context.params.id, 10);

  // Use the shared function to delete the project
  const success = deleteProject(id);

  if (success) {
    return NextResponse.json({ message: 'Project deleted successfully.' });
  } else {
    return NextResponse.json({ message: 'Project not found or deletion failed.' }, { status: 404 });
  }
} 