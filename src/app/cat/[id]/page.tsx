import CatDetail from "@/components/CatDetail";
import { queryCatInfoById } from "@/lib/catInfoMapper";
import { notFound } from "next/navigation";

export default async function CatDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const catInfo = await queryCatInfoById(params.id);

  if (!catInfo) {
    notFound();
  }

  return <CatDetail catInfo={catInfo} />;
}
