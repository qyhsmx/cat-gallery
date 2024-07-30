// export interface Artwork {
//   id: string;
//   title: string;
//   artist: string;
//   description: string;
//   images: string[];
//   video?: string;
// }

export interface MediaItem {
  type: 'image' | 'video';
  url: string;
}

export interface Artwork {
  id: string;
  title: string;
  artist: string;
  description: string;
  media: MediaItem[];
}