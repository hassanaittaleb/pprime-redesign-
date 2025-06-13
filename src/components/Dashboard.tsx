"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useNotification } from "../lib/hooks/useNotification";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

// Composant pour les cartes de statistiques
const StatCard = ({ title, value, icon, trend, color }: { 
  title: string; 
  value: string; 
  icon: string; 
  trend?: { value: number; isPositive: boolean }; 
  color: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02 }}
    className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
  >
    <div className="flex items-center justify-between mb-4">
      <div className={`text-3xl ${color} bg-opacity-10 p-3 rounded-full`}>{icon}</div>
      {trend && (
        <div className={`text-sm font-semibold px-3 py-1 rounded-full ${
          trend.isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {trend.isPositive ? '↑' : '↓'} {trend.value}%
        </div>
      )}
    </div>
    <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
    <p className="text-gray-600 font-medium">{title}</p>
  </motion.div>
);

// Composant pour les projets récents
const RecentProject = ({ 
  title, 
  status, 
  progress, 
  date,
  onStatusChange,
  onDelete 
}: {
  title: string;
  status: string;
  progress: number;
  date: string;
  onStatusChange?: (newStatus: string) => void;
  onDelete?: () => void;
}) => {
  const notify = useNotification();

  const handleStatusChange = (newStatus: string) => {
    if (onStatusChange) {
      onStatusChange(newStatus);
      notify.success(`Statut du projet "${title}" mis à jour en "${newStatus}"`);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
      notify.error(`Projet "${title}" supprimé`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
    >
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <div className="flex items-center space-x-2">
          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className={`text-sm px-3 py-1.5 rounded-full border ${
              status === 'En cours' ? 'bg-blue-50 text-blue-700 border-blue-200' :
              status === 'Terminé' ? 'bg-green-50 text-green-700 border-green-200' :
              'bg-yellow-50 text-yellow-700 border-yellow-200'
            } focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500`}
          >
            <option value="En cours">En cours</option>
            <option value="En attente">En attente</option>
            <option value="Terminé">Terminé</option>
          </select>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded-full transition-colors duration-200"
            title="Supprimer le projet"
          >
            🗑️
          </button>
        </div>
      </div>
      <div className="mb-2">
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <span className="font-medium">{progress}% complété</span>
        <span className="text-gray-500">{date}</span>
      </div>
    </motion.div>
  );
};

export default function Dashboard() {
  const notify = useNotification();
  const { logout } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = React.useState([
    {
      title: "Installation électrique - Usine Renault",
      status: "En cours",
      progress: 75,
      date: "15 Mars 2024"
    },
    {
      title: "Maintenance préventive - Complexe commercial",
      status: "En attente",
      progress: 30,
      date: "12 Mars 2024"
    },
    {
      title: "Mise à niveau système - Agroalimentaire",
      status: "Terminé",
      progress: 100,
      date: "10 Mars 2024"
    }
  ]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleStatusChange = (index: number, newStatus: string) => {
    setProjects(prevProjects => {
      const newProjects = [...prevProjects];
      newProjects[index] = { ...newProjects[index], status: newStatus };
      return newProjects;
    });
  };

  const handleDeleteProject = (index: number) => {
    setProjects(prevProjects => prevProjects.filter((_, i) => i !== index));
  };

  const stats = [
    {
      title: "Projets en cours",
      value: "12",
      icon: "📊",
      trend: { value: 8, isPositive: true },
      color: "text-blue-500"
    },
    {
      title: "Clients actifs",
      value: "48",
      icon: "👥",
      trend: { value: 12, isPositive: true },
      color: "text-green-500"
    },
    {
      title: "Revenu mensuel",
      value: "€45,200",
      icon: "💰",
      trend: { value: 5, isPositive: true },
      color: "text-yellow-500"
    },
    {
      title: "Tickets support",
      value: "8",
      icon: "🎫",
      trend: { value: 3, isPositive: false },
      color: "text-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* En-tête du dashboard */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex justify-between items-center bg-white p-6 rounded-xl shadow-lg"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
            <p className="text-gray-600 mt-2">Bienvenue sur votre espace de gestion</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <span>Déconnexion</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v3a1 1 0 102 0V9z" clipRule="evenodd" />
            </svg>
          </button>
        </motion.div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Projets récents */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Projets récents</h2>
                <Link 
                  href="/projects"
                  className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 hover:gap-2 transition-all duration-300"
                >
                  Voir tout
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <RecentProject 
                    key={index} 
                    {...project}
                    onStatusChange={(newStatus) => handleStatusChange(index, newStatus)}
                    onDelete={() => handleDeleteProject(index)}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Activité récente */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Activité récente</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                <div className="bg-blue-100 p-2 rounded-full">
                  <span className="text-blue-600">📝</span>
                </div>
                <div>
                  <p className="text-gray-900 font-medium">Nouveau projet ajouté</p>
                  <p className="text-sm text-gray-600">Il y a 2 heures</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                <div className="bg-green-100 p-2 rounded-full">
                  <span className="text-green-600">✅</span>
                </div>
                <div>
                  <p className="text-gray-900 font-medium">Projet terminé</p>
                  <p className="text-sm text-gray-600">Il y a 5 heures</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                <div className="bg-yellow-100 p-2 rounded-full">
                  <span className="text-yellow-600">⚠️</span>
                </div>
                <div>
                  <p className="text-gray-900 font-medium">Maintenance prévue</p>
                  <p className="text-sm text-gray-600">Il y a 1 jour</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 