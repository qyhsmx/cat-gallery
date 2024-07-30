'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Artwork, MediaItem } from '../types';

interface GalleryProps {
  artworks: Artwork[];
}

const Gallery: React.FC<GalleryProps> = ({ artworks }) => {
  // 辅助函数：获取作品的第一张图片
  const getFirstImage = (media: MediaItem[]): string => {
    const firstImage = media.find(item => item.type === 'image');
    return firstImage ? firstImage.url : '/placeholder-image.jpg'; // 使用占位图，以防没有图片
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {artworks.map((artwork) => (
        <Link href={`/artwork/${artwork.id}`} key={artwork.id}>
          <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="relative h-48">
              <Image
                src={getFirstImage(artwork.media)}
                alt={artwork.title}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
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