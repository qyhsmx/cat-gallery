import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CatInfo, MediaItem } from '@/types/catInfo';

interface GalleryProps {
  catInfos: CatInfo[];
}

const Gallery: React.FC<GalleryProps> = ({ catInfos }) => {
   
  const getFirstImage = (media: MediaItem[]): string => {
    const firstImage = media.find(item => item.type === 'image');
    return firstImage ? firstImage.url : '/placeholder-image.jpg'; // 使用占位图，以防没有图片
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {catInfos.map((catInfo) => (
        <Link href={`/cat/${catInfo.id}`} key={catInfo.id}>
          <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105">
            <Image
              src={getFirstImage(catInfo.medias)}
              alt={catInfo.name}
              width={300}
              height={300}
              style={{ objectFit: 'cover' }}
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{catInfo.name}</h2>
              <p className="text-gray-600">{catInfo.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Gallery;