import { redirect } from "next/navigation";

/** Review modules are studied in the official papers library. */
export default async function ReviewSetDetailPage({
  params,
}: {
  params: Promise<{ track: string; slug: string }>;
}) {
  const { track, slug } = await params;
  redirect(`/${track}/official/${slug}`);
}
