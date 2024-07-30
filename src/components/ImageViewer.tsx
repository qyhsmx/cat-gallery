'use client';

import React, { useCallback, useEffect } from 'react';
import Image from 'next/image';

interface ImageViewerProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onChangeImage: (index: number) => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({
  images,
  currentIndex,
  onClose,
  onChangeImage,
}) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowLeft') {
      onChangeImage((currentIndex - 1 + images.length) % images.length);
    } else if (e.key === 'ArrowRight') {
      onChangeImage((currentIndex + 1) % images.length);
    }
  }, [onClose, onChangeImage, currentIndex, images.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="relative w-full h-full" onClick={(e) => e.stopPropagation()}>
        <Image
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          fill
          style={{ objectFit: 'contain' }}
        />
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
          onChangeImage((currentIndex - 1 + images.length) % images.length);
        }}
      >
        &#8249;
      </button>
      <button
        className="absolute right-4 text-white text-4xl z-60"
        onClick={(e) => {
          e.stopPropagation();
          onChangeImage((currentIndex + 1) % images.length);
        }}
      >
        &#8250;
      </button>
    </div>
  );
};

export default ImageViewer;