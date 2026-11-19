import { redirect } from "next/navigation";

export default async function ChineseAlias({ params }: { params: Promise<{ track: string }> }) {
  const { track } = await params;
  redirect(`/${track}/dashboard`);
}
