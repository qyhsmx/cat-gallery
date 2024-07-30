import React from 'react';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-semibold text-gray-800">Admin Panel</h1>
        </div>
        <nav className="mt-4">
          <Link href="/admin" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
            Dashboard
          </Link>
          <Link href="/admin/artworks" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
            Manage Artworks
          </Link>
          {/* Add more admin navigation links as needed */}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}