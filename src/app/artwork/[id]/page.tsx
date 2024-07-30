import { getArtworkById } from "../../../lib/artworks";
import ArtworkDetail from "../../../components/ArtworkDetail";
import { notFound } from "next/navigation";

export default async function ArtworkPage({
  params,
}: {
  params: { id: string };
}) {
  const artwork = await getArtworkById(params.id);

  if (!artwork) {
    notFound();
  }

  return <ArtworkDetail artwork={artwork} />;
}
