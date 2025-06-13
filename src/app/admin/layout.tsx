"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

const menuItems = [
  {
    title: "Tableau de bord",
    href: "/admin",
    icon: "📊"
  },
  {
    title: "Projets",
    href: "/admin/projects",
    icon: "📁"
  },
  {
    title: "Clients",
    href: "/admin/clients",
    icon: "👥"
  },
  {
    title: "Services",
    href: "/admin/services",
    icon: "⚡"
  },
  {
    title: "Factures",
    href: "/admin/invoices",
    icon: "💰"
  },
  {
    title: "Paramètres",
    href: "/admin/settings",
    icon: "⚙️"
  }
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated && pathname !== "/") {
      router.replace("/");
    }
  }, [isAuthenticated, pathname, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-screen w-64 bg-white shadow-lg">
        <div className="p-6">
          <Link href="/admin" className="flex items-center space-x-2">
            <img src="/logo_pprime.svg" alt="Pprime Admin" className="h-8 w-auto" />
            <span className="text-xl font-bold text-gray-900">Admin</span>
          </Link>
        </div>
        <nav className="mt-6">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition ${
                pathname === item.href ? "bg-blue-50 text-blue-700 border-r-4 border-blue-700" : ""
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  );
} 