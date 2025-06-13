export interface Project {
    id: number;
    name: string;
    client: string;
    status: string;
    startDate: string;
    endDate: string | null;
  }
  
  export interface Client {
    id: number;
    name: string;
    contactPerson: string;
    email: string;
    phone: string | null;
    address: string | null;
  }
  
  export interface Service {
    id: number;
    name: string;
    description: string | null;
    price: number; // Assuming price is a number
  }
  
  export interface Invoice {
    id: number;
    invoiceNumber: string;
    clientId: number; // Link to Client
    dateIssued: string; // e.g., YYYY-MM-DD
    dueDate: string; // e.g., YYYY-MM-DD
    amount: number;
    status: 'Pending' | 'Paid' | 'Cancelled'; // Or other status options
    // In a real app, you'd have line items linking to services, etc.
  }
  
  // Interface for Settings
  export interface Settings {
    companyName: string;
    address: string | null;
    city: string | null;
    postalCode: string | null;
    country: string | null;
    defaultVatRate: number; // Default VAT rate in percentage
    // Add other settings fields as needed

    // Notification Settings
    emailNotificationsEnabled: boolean;
    projectNotificationsEnabled: boolean;
    invoiceNotificationsEnabled: boolean;

    // Display Settings
    theme: 'light' | 'dark' | 'system';
    language: string; // e.g., 'fr', 'en'
  }
  
  // Simulated data (in-memory storage - NOT FOR PRODUCTION)
  // This data is shared between API route handlers importing this module.
  let simulatedProjects: Project[] = [
    {
      id: 1,
      name: "Installation électrique usine A",
      client: "Client Industrie X",
      status: "Terminé",
      startDate: "2023-01-15",
      endDate: "2023-06-30",
    },
    {
      id: 2,
      name: "Mise à niveau éclairage ferme B",
      client: "Client Agriculture Y",
      status: "En cours",
      startDate: "2023-09-01",
      endDate: null,
    },
    {
      id: 3,
      name: "Système de sécurité hôtel C",
      client: "Client Tertiaire Z",
      status: "Planifié",
      startDate: "2024-03-10",
      endDate: null,
    },
  ];
  
  let nextProjectId = simulatedProjects.length + 1; // Simple ID counter for projects
  
  // Simulated Client Data
  let simulatedClients: Client[] = [
    {
      id: 1,
      name: "Client Industrie X",
      contactPerson: "Jean Dupont",
      email: "jean.dupont@industrie-x.com",
      phone: "0123456789",
      address: "1 Rue de l'Industrie, 75001 Paris",
    },
    {
      id: 2,
      name: "Client Agriculture Y",
      contactPerson: "Marie Curie",
      email: "marie.curie@agriculture-y.fr",
      phone: null,
      address: "La Ferme, 31000 Toulouse",
    },
  ];
  
  let nextClientId = simulatedClients.length + 1; // Simple ID counter for clients
  
  // Simulated Service Data
  let simulatedServices: Service[] = [
    {
      id: 1,
      name: "Installation de tableau électrique",
      description: "Installation et raccordement de tableaux divisionnaires et principaux.",
      price: 500,
    },
    {
      id: 2,
      name: "Mise aux normes électriques",
      description: "Vérification et mise en conformité des installations selon les normes en vigueur.",
      price: 300,
    },
  ];
  
  let nextServiceId = simulatedServices.length + 1; // Simple ID counter for services
  
  // Simulated Invoice Data
  let simulatedInvoices: Invoice[] = [
    {
      id: 1,
      invoiceNumber: "INV-001",
      clientId: 1, // Client Industrie X
      dateIssued: "2023-07-01",
      dueDate: "2023-08-01",
      amount: 1500.00,
      status: 'Paid',
    },
    {
      id: 2,
      invoiceNumber: "INV-002",
      clientId: 2, // Client Agriculture Y
      dateIssued: "2023-10-15",
      dueDate: "2023-11-15",
      amount: 750.50,
      status: 'Pending',
    },
  ];
  
  let nextInvoiceId = simulatedInvoices.length + 1; // Simple ID counter for invoices
  
  // Simulated Settings Data (single object)
  let simulatedSettings: Settings = {
    companyName: "Mon Entreprise Inc.",
    address: "123 Rue Principale",
    city: "Ville",
    postalCode: "10001",
    country: "Pays",
    defaultVatRate: 20.0, // Example: 20% VAT

    // Initial Notification Settings
    emailNotificationsEnabled: true,
    projectNotificationsEnabled: true,
    invoiceNotificationsEnabled: false, // Example: Invoice notifications off by default

    // Initial Display Settings
    theme: 'light', // Default theme
    language: 'fr', // Default language
  };
  
  export const getProjects = (): Project[] => {
    console.log('Simulated DB: getProjects');
    return simulatedProjects;
  };
  
  export const addProject = (projectData: Omit<Project, "id">): Project => {
    console.log('Simulated DB: addProject', projectData);
    const newProject: Project = {
      id: nextProjectId++,
      ...projectData,
      endDate: projectData.endDate || null,
    };
    simulatedProjects.push(newProject);
    return newProject;
  };
  
  export const getProjectById = (id: number): Project | undefined => {
    console.log('Simulated DB: getProjectById', id);
    return simulatedProjects.find(project => project.id === id);
  };
  
  export const updateProject = (id: number, updatedData: Partial<Omit<Project, "id">>): Project | undefined => {
    console.log('Simulated DB: updateProject', id, updatedData);
    const projectIndex = simulatedProjects.findIndex(project => project.id === id);
    if (projectIndex === -1) {
      return undefined;
    }
  
    simulatedProjects[projectIndex] = {
      ...simulatedProjects[projectIndex],
      ...updatedData,
      // Ensure endDate is null if explicitly set to empty string or undefined in update
      endDate: updatedData.hasOwnProperty("endDate") ? (updatedData.endDate || null) : simulatedProjects[projectIndex].endDate
    } as Project; // Cast to Project to satisfy type checker after merging
  
    return simulatedProjects[projectIndex];
  };
  
  export const deleteProject = (id: number): boolean => {
    console.log('Simulated DB: deleteProject', id);
    const initialLength = simulatedProjects.length;
    simulatedProjects = simulatedProjects.filter(project => project.id !== id);
    return simulatedProjects.length < initialLength; // Return true if a project was removed
  };
  
  // Client CRUD functions
  export const getClients = (): Client[] => {
    console.log('Simulated DB: getClients');
    return simulatedClients;
  };
  
  export const addClient = (clientData: Omit<Client, "id">): Client => {
    console.log('Simulated DB: addClient', clientData);
    const newClient: Client = {
      id: nextClientId++,
      ...clientData,
      phone: clientData.phone || null,
      address: clientData.address || null,
    };
    simulatedClients.push(newClient);
    return newClient;
  };
  
  export const getClientById = (id: number): Client | undefined => {
    console.log('Simulated DB: getClientById', id);
    return simulatedClients.find(client => client.id === id);
  };
  
  export const updateClient = (id: number, updatedData: Partial<Omit<Client, "id">>): Client | undefined => {
    console.log('Simulated DB: updateClient', id, updatedData);
    const clientIndex = simulatedClients.findIndex(client => client.id === id);
    if (clientIndex === -1) {
      return undefined;
    }
  
    simulatedClients[clientIndex] = {
      ...simulatedClients[clientIndex],
      ...updatedData,
      phone: updatedData.hasOwnProperty('phone') ? (updatedData.phone || null) : simulatedClients[clientIndex].phone,
      address: updatedData.hasOwnProperty('address') ? (updatedData.address || null) : simulatedClients[clientIndex].address,
    } as Client;
  
    return simulatedClients[clientIndex];
  };
  
  export const deleteClient = (id: number): boolean => {
    console.log('Simulated DB: deleteClient', id);
    const initialLength = simulatedClients.length;
    simulatedClients = simulatedClients.filter(client => client.id !== id);
    return simulatedClients.length < initialLength; // Return true if a client was removed
  };
  
  // Service CRUD functions
  export const getServices = (): Service[] => {
    console.log('Simulated DB: getServices');
    return simulatedServices;
  };
  
  export const addService = (serviceData: Omit<Service, "id">): Service => {
    console.log('Simulated DB: addService', serviceData);
    const newService: Service = {
      id: nextServiceId++,
      ...serviceData,
      description: serviceData.description || null, // Allow null description
    };
    simulatedServices.push(newService);
    return newService;
  };
  
  export const getServiceById = (id: number): Service | undefined => {
    console.log('Simulated DB: getServiceById', id);
    return simulatedServices.find(service => service.id === id);
  };
  
  export const updateService = (id: number, updatedData: Partial<Omit<Service, "id">>): Service | undefined => {
    console.log('Simulated DB: updateService', id, updatedData);
    const serviceIndex = simulatedServices.findIndex(service => service.id === id);
    if (serviceIndex === -1) {
      return undefined;
    }
  
    simulatedServices[serviceIndex] = {
      ...simulatedServices[serviceIndex],
      ...updatedData,
      description: updatedData.hasOwnProperty('description') ? (updatedData.description || null) : simulatedServices[serviceIndex].description,
    } as Service;
  
    return simulatedServices[serviceIndex];
  };
  
  export const deleteService = (id: number): boolean => {
    console.log('Simulated DB: deleteService', id);
    const initialLength = simulatedServices.length;
    simulatedServices = simulatedServices.filter(service => service.id !== id);
    return simulatedServices.length < initialLength; // Return true if a service was removed
  };
  
  // Invoice CRUD functions
  export const getInvoices = (): Invoice[] => {
    console.log('Simulated DB: getInvoices');
    // For getting invoices, it might be useful to also include client name
    return simulatedInvoices.map(invoice => {
      const client = simulatedClients.find(c => c.id === invoice.clientId);
      return {
        ...invoice,
        clientName: client ? client.name : 'Unknown Client', // Add client name for display
      };
    });
  };
  
  export const addInvoice = (invoiceData: Omit<Invoice, "id">): Invoice => {
    console.log('Simulated DB: addInvoice', invoiceData);
    // Basic check if client exists (in a real app, this would be a foreign key check)
    const clientExists = simulatedClients.some(client => client.id === invoiceData.clientId);
    if (!clientExists) {
      console.error(`Client with ID ${invoiceData.clientId} not found. Cannot add invoice.`);
      // In a real scenario, you might throw an error or return a specific status
      // For this simulation, we'll still add it but log the issue
    }
  
    const newInvoice: Invoice = {
      id: nextInvoiceId++,
      ...invoiceData,
      amount: Number(invoiceData.amount), // Ensure amount is a number
      status: invoiceData.status || 'Pending', // Default status
    };
    simulatedInvoices.push(newInvoice);
    return newInvoice;
  };
  
  export const getInvoiceById = (id: number): Invoice | undefined => {
    console.log('Simulated DB: getInvoiceById', id);
    const invoice = simulatedInvoices.find(invoice => invoice.id === id);
    // Also include client name when getting a single invoice
    if (invoice) {
      const client = simulatedClients.find(c => c.id === invoice.clientId);
      return {
        ...invoice,
        clientName: client ? client.name : 'Unknown Client', // Add client name
      } as Invoice; // Cast back to Invoice (adding clientName won't hurt in JS)
    }
    return undefined;
  };
  
  export const updateInvoice = (id: number, updatedData: Partial<Omit<Invoice, "id">>): Invoice | undefined => {
    console.log('Simulated DB: updateInvoice', id, updatedData);
    const invoiceIndex = simulatedInvoices.findIndex(invoice => invoice.id === id);
    if (invoiceIndex === -1) {
      return undefined; // Invoice not found
    }
  
    // Basic check if updated clientId exists
    if (updatedData.clientId !== undefined) {
       const clientExists = simulatedClients.some(client => client.id === updatedData.clientId);
       if (!clientExists) {
         console.error(`Client with ID ${updatedData.clientId} not found. Cannot update invoice with this client.`);
         // In a real scenario, you might return an error status instead of just logging
         // For simulation, we'll proceed but keep the old clientId if the new one is invalid
         delete updatedData.clientId; // Prevent updating with invalid client ID
       }
    }
  
    simulatedInvoices[invoiceIndex] = {
      ...simulatedInvoices[invoiceIndex],
      ...updatedData,
      amount: updatedData.hasOwnProperty('amount') ? Number(updatedData.amount) : simulatedInvoices[invoiceIndex].amount, // Ensure amount is number on update
      status: updatedData.hasOwnProperty('status') ? updatedData.status : simulatedInvoices[invoiceIndex].status, // Allow status update
    } as Invoice; // Cast to Invoice to satisfy type checker after merging
  
    // Return updated invoice, potentially with client name for display
    return getInvoiceById(id); // Use getInvoiceById to include client name
  };
  
  export const deleteInvoice = (id: number): boolean => {
    console.log('Simulated DB: deleteInvoice', id);
    const initialLength = simulatedInvoices.length;
    simulatedInvoices = simulatedInvoices.filter(invoice => invoice.id !== id);
    return simulatedInvoices.length < initialLength; // Return true if an invoice was removed
  };
  
  // Settings CRUD functions
  export const getSettings = (): Settings => {
    console.log('Simulated DB: getSettings');
    return simulatedSettings;
  };
  
  export const updateSettings = (updatedData: Partial<Settings>): Settings => {
    console.log('Simulated DB: updateSettings', updatedData);
    simulatedSettings = { ...simulatedSettings, ...updatedData };
    return simulatedSettings; // Return the updated settings object
  };