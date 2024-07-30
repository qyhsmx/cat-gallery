'use client';

import React, { useCallback, useEffect } from 'react';
import Image from 'next/image';
import { MediaItem } from '../types';

interface ImageViewerProps {
  media: MediaItem[];
  currentIndex: number;
  onClose: () => void;
  onChangeMedia: (index: number) => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({
  media,
  currentIndex,
  onClose,
  onChangeMedia,
}) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowLeft') {
      onChangeMedia((currentIndex - 1 + media.length) % media.length);
    } else if (e.key === 'ArrowRight') {
      onChangeMedia((currentIndex + 1) % media.length);
    }
  }, [onClose, onChangeMedia, currentIndex, media.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const renderMediaItem = (item: MediaItem) => {
    if (item.type === 'image') {
      return (
        <Image
          src={item.url}
          alt={`Image ${currentIndex + 1}`}
          fill
          style={{ objectFit: 'contain' }}
        />
      );
    } else {
      return (
        <video
          src={item.url}
          className="w-full h-full"
          controls
          autoPlay
        />
      );
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="relative w-full h-full" onClick={(e) => e.stopPropagation()}>
        {renderMediaItem(media[currentIndex])}
      </div>
      <button
        className="absolute top-4 right-4 text-white text-2xl p-2 z-60"
        onClick={onClose}
      >
        &times;
      </button>
      <button
        className="absolute left-4 text-white text-4xl z-60"
        onClick={(e) => {
          e.stopPropagation();
          onChangeMedia((currentIndex - 1 + media.length) % media.length);
        }}
      >
        &#8249;
      </button>
      <button
        className="absolute right-4 text-white text-4xl z-60"
        onClick={(e) => {
          e.stopPropagation();
          onChangeMedia((currentIndex + 1) % media.length);
        }}
      >
        &#8250;
      </button>
    </div>
  );
};

export default ImageViewer;