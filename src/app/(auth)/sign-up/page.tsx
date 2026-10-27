import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SignUpForm } from "@/components/auth/auth-forms";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Create your free account",
  description:
    "Create a free CSCA Master account: one full mock per subject, topic drills and the syllabus explorer.",
};

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const session = await getSession();
  if (session) redirect("/app/dashboard");

  const { next } = await searchParams;

  return (
    <div>
      <p className="eyebrow">Free account</p>
      <h1 className="display-md mt-3">Start with one honest mock.</h1>
      <p className="mt-2 mb-7 text-[13.5px] text-ink-soft">
        No card. No trial countdown. One full paper per subject, then decide.
      </p>

      <SignUpForm next={next} />
    </div>
  );
}
