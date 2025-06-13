"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useNotification } from "../lib/hooks/useNotification";

interface AuthContextType {
  isOpen: boolean;
  onOpen: (buttonRect?: DOMRect) => void;
  onClose: () => void;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  buttonPosition?: DOMRect;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [buttonPosition, setButtonPosition] = useState<DOMRect>();
  const notify = useNotification();

  // Vérifier l'état d'authentification au chargement
  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const onOpen = (buttonRect?: DOMRect) => {
    setButtonPosition(buttonRect);
    setIsOpen(true);
  };
  
  const onClose = () => setIsOpen(false);
  
  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    notify.success("Connexion réussie !");
  };
  
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    notify.info("Vous avez été déconnecté");
  };

  return (
    <AuthContext.Provider value={{ isOpen, onOpen, onClose, isAuthenticated, login, logout, buttonPosition }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
} 