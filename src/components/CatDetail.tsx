'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import ImageViewer from './ImageViewer';
import { CatInfo, MediaItem } from '@/types/catInfo';

interface CatDetailProps {
  catInfo: CatInfo;
}

const CatDetail: React.FC<CatDetailProps> = ({ catInfo }) => {
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
          alt={`${catInfo.name} - ${index + 1}`}
          width={80}
          height={80}
          style={{ objectFit: 'cover' }}
          className="rounded cursor-pointer"
          onClick={() => openViewer(index)}
        />
      );
    } 
    else {
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
          {catInfo.medias[currentMediaIndex].type === 'image' ? (
            <Image
              src={catInfo.medias[currentMediaIndex].url}
              alt={catInfo.name}
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg cursor-pointer"
              onClick={() => openViewer(currentMediaIndex)}
            />
          ) : (
            <video
              src={catInfo.medias[currentMediaIndex].url}
              className="w-full h-full object-cover rounded-lg cursor-pointer"
              onClick={() => openViewer(currentMediaIndex)}
            />
          )}
        </div>
        <div className="mt-4 flex space-x-2 overflow-x-auto">
          {catInfo.medias.map((item, index) => renderMediaItem(item, index))}
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <h1 className="text-3xl font-bold mb-6">名字： {catInfo.name}</h1>
        <h2 className="text-xl text-gray-600 mt-2 mb-6">价格： {catInfo.price}</h2>
        <p className="mt-4 text-gray-800">{catInfo.description}</p>
      </div>
      {isViewerOpen && (
        <ImageViewer
          media={catInfo.medias}
          currentIndex={currentMediaIndex}
          onClose={closeViewer}
          onChangeMedia={setCurrentMediaIndex}
        />
      )}
    </div>
  );
};

export default CatDetail;