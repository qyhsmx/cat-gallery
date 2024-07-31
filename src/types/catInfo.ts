
export interface MediaItem {
    type: 'video' | 'image';
    url: string;
}

export interface CatInfo {
    id: string;
    name: string;
    category: string;
    age: number;
    price: number;
    description: string;
    medias: MediaItem[];
}