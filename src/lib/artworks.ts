import { Artwork } from '../types';

export const artworks: Artwork[] = [
  {
    id: '1',
    title: 'Starry Night',
    artist: 'Vincent van Gogh',
    description: 'A famous oil on canvas painting by the Dutch post-impressionist painter Vincent van Gogh.',
    images: ['/images/微信图片_20240414145458.jpg', '/images/微信图片_20240414145432.jpg','/images/微信图片_20240414145452.jpg'],
  },
  // Add more artwork entries...
];

export async function getAllArtworks(): Promise<Artwork[]> {
  // In a real application, you might fetch this data from an API
  return artworks;
}

export async function getArtworkById(id: string): Promise<Artwork | undefined> {
  // In a real application, you might fetch this data from an API
  return artworks.find(artwork => artwork.id === id);
}