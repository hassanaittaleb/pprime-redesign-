"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Dashboard from "../../components/Dashboard";
import { useAuth } from "../../context/AuthContext";

export default function AdminPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Administration</h1>
        <p className="text-gray-600 mt-2">Bienvenue dans votre espace d'administration</p>
      </div>
      <Dashboard />
    </div>
  );
} 