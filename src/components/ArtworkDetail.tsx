"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Artwork } from "../types";
import ImageViewer from "./ImageViewer";

interface ArtworkDetailProps {
  artwork: Artwork;
}

const ArtworkDetail: React.FC<ArtworkDetailProps> = ({ artwork }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/2">
        <div className="relative h-96">
          <Image
            src={artwork.images[currentImageIndex]}
            alt={artwork.title}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-lg cursor-pointer"
            onClick={() => setIsViewerOpen(true)}
          />
        </div>
        <div className="mt-4 flex space-x-2 overflow-x-auto">
          {artwork.images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`${artwork.title} - ${index + 1}`}
              width={80}
              height={80}
              style={{ objectFit: "cover" }}
              className="rounded cursor-pointer"
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
        {artwork.video && (
          <div className="mt-4">
            <video controls className="w-full rounded">
              <source src={artwork.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
      <div className="w-full md:w-1/2">
        <h1 className="text-3xl font-bold">{artwork.title}</h1>
        <h2 className="text-xl text-gray-600 mt-2">{artwork.artist}</h2>
        <p className="mt-4 text-gray-800">{artwork.description}</p>
      </div>
      {isViewerOpen && (
        <ImageViewer
          images={artwork.images}
          currentIndex={currentImageIndex}
          onClose={() => setIsViewerOpen(false)}
          onChangeImage={setCurrentImageIndex}
        />
      )}
    </div>
  );
};

export default ArtworkDetail;
