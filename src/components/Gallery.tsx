import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Artwork } from '../types';

interface GalleryProps {
  artworks: Artwork[];
}

const Gallery: React.FC<GalleryProps> = ({ artworks }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {artworks.map((artwork) => (
        <Link href={`/artwork/${artwork.id}`} key={artwork.id}>
          <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105">
            <Image
              src={artwork.images[0]}
              alt={artwork.title}
              width={300}
              height={300}
              style={{ objectFit: 'cover' }}
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{artwork.title}</h2>
              <p className="text-gray-600">{artwork.artist}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Gallery;