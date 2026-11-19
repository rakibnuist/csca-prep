import { redirect } from "next/navigation";

/** Practice sets are a tab inside the mock tests library. */
export default async function PracticeSetsPage({ params }: { params: Promise<{ track: string }> }) {
  const { track } = await params;
  redirect(`/${track}/mocks?tab=sets`);
}
