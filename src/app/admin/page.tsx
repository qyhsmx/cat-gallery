'use client';

import React, { useState, useEffect } from 'react';
import { Artwork } from '../../types';

const AdminDashboard: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
    const response = await fetch('/api/artworks');
    const data = await response.json();
    setArtworks(data);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h3 className="text-xl font-semibold mb-2">Recent Artworks</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {artworks.slice(0, 6).map((artwork) => (
            <div key={artwork.id} className="border rounded p-4">
              <h4 className="font-bold">{artwork.title}</h4>
              <p className="text-gray-600">{artwork.artist}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;