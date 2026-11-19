import { redirect } from "next/navigation";

/** Review modules now live in the official papers library as a tab. */
export default async function ReviewSetsPage({ params }: { params: Promise<{ track: string }> }) {
  const { track } = await params;
  redirect(`/${track}/official?tab=review`);
}
