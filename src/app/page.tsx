import { getAllArtworks } from '@/lib/artworks';
import Gallery from '@/components/Gallery';

export default async function Home() {
  const artworks = await getAllArtworks();

  return (
    <div>
      <Gallery artworks={artworks} />
    </div>
  );
}