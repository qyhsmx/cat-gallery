import Gallery from '@/components/Gallery';
import { queryAllCats } from '@/lib/catInfoMapper';

export default async function Home() {
  const catInfos = await queryAllCats();

  return (
    <div>
      <Gallery catInfos={catInfos} />
    </div>
  );
}