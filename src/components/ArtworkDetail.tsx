'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Artwork, MediaItem } from '../types';
import ImageViewer from './ImageViewer';

interface ArtworkDetailProps {
  artwork: Artwork;
}

const ArtworkDetail: React.FC<ArtworkDetailProps> = ({ artwork }) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openViewer = (index: number) => {
    setCurrentMediaIndex(index);
    setIsViewerOpen(true);
  };

  const closeViewer = () => {
    setIsViewerOpen(false);
  };

  const renderMediaItem = (item: MediaItem, index: number) => {
    if (item.type === 'image') {
      return (
        <Image
          key={index}
          src={item.url}
          alt={`${artwork.title} - ${index + 1}`}
          width={80}
          height={80}
          style={{ objectFit: 'cover' }}
          className="rounded cursor-pointer"
          onClick={() => openViewer(index)}
        />
      );
    } else {
      return (
        <div
          key={index}
          className="relative w-20 h-20 cursor-pointer"
          onClick={() => openViewer(index)}
        >
          <video src={item.url} className="w-full h-full object-cover rounded" />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded">
            <span className="text-white text-2xl">▶</span>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/2">
        <div className="relative h-96">
          {artwork.media[currentMediaIndex].type === 'image' ? (
            <Image
              src={artwork.media[currentMediaIndex].url}
              alt={artwork.title}
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg cursor-pointer"
              onClick={() => openViewer(currentMediaIndex)}
            />
          ) : (
            <video
              src={artwork.media[currentMediaIndex].url}
              className="w-full h-full object-cover rounded-lg cursor-pointer"
              onClick={() => openViewer(currentMediaIndex)}
            />
          )}
        </div>
        <div className="mt-4 flex space-x-2 overflow-x-auto">
          {artwork.media.map((item, index) => renderMediaItem(item, index))}
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <h1 className="text-3xl font-bold">{artwork.title}</h1>
        <h2 className="text-xl text-gray-600 mt-2">{artwork.artist}</h2>
        <p className="mt-4 text-gray-800">{artwork.description}</p>
      </div>
      {isViewerOpen && (
        <ImageViewer
          media={artwork.media}
          currentIndex={currentMediaIndex}
          onClose={closeViewer}
          onChangeMedia={setCurrentMediaIndex}
        />
      )}
    </div>
  );
};

export default ArtworkDetail;