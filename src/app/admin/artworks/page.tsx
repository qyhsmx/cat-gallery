'use client';

import React, { useState, useEffect } from 'react';
import { Artwork } from '../../../types';

const ManageArtworks: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);

  useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
    const response = await fetch('/api/artworks');
    const data = await response.json();
    setArtworks(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('artist', artist);
    formData.append('description', description);
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append('media', files[i]);
      }
    }

    const response = await fetch('/api/artworks', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      setTitle('');
      setArtist('');
      setDescription('');
      setFiles(null);
      fetchArtworks();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Artworks</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Artwork Title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="artist">
            Artist
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="artist"
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            placeholder="Artist Name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Artwork Description"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="media">
            Media Files
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="media"
            type="file"
            onChange={(e) => setFiles(e.target.files)}
            multiple
            accept="image/*,video/*"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Artwork
          </button>
        </div>
      </form>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h3 className="text-xl font-semibold mb-2">Existing Artworks</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {artworks.map((artwork) => (
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

export default ManageArtworks;