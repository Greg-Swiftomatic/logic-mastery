"use client";

import { useParams } from "next/navigation";
import { ModuleHeader } from "@/components/layout/ModuleHeader";
import { ModuleNav } from "@/components/layout/ModuleNav";
import { getModule, MODULES } from "@/types/module";
import { notFound } from "next/navigation";

export default function ModuleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const slug = params.slug as string;
  const module = getModule(slug);

  if (!module) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-cream">
      <ModuleHeader module={module} />
      <ModuleNav moduleSlug={slug} />
      <div className="max-w-4xl mx-auto px-6 py-8">{children}</div>
    </div>
  );
}
