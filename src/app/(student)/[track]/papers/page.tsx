import { redirect } from "next/navigation";

/**
 * Mock tests and official papers are two separate products. The combined
 * browse view was removed so no page ever lists both together.
 */
export default async function PapersPage({ params }: { params: Promise<{ track: string }> }) {
  const { track } = await params;
  redirect(`/${track}/mocks`);
}
