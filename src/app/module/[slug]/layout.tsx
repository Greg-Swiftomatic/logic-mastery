"use client";

import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { getModule, MODULES } from "@/types/module";
import { useProgress } from "@/hooks/useProgress";
import { notFound } from "next/navigation";

const tabs = [
  { id: "lesson", label: "Lesson", num: "01" },
  { id: "examples", label: "Examples", num: "02" },
  { id: "practice", label: "Practice", num: "03" },
  { id: "summary", label: "Summary", num: "04" },
];

export default function ModuleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const pathname = usePathname();
  const slug = params.slug as string;
  const module = getModule(slug);
  const { getModuleCompletion, getModuleAccuracy } = useProgress();

  if (!module) {
    notFound();
  }

  const completion = getModuleCompletion(slug);
  const accuracy = getModuleAccuracy(slug);
  const activeTab = tabs.find((tab) => pathname.includes(`/${tab.id}`))?.id || "lesson";

  return (
    <div className="min-h-screen bg-paper">
      {/* Top navigation bar */}
      <header className="border-b border-ink/10">
        <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
          {/* Back and logo */}
          <div className="flex items-center gap-6">
            <Link 
              href="/"
              className="flex items-center gap-2 text-ink-light hover:text-vermillion transition-colors"
            >
              <span>←</span>
              <span className="text-sm">Back</span>
            </Link>
            <span className="w-px h-6 bg-ink/10"></span>
            <Link href="/" className="flex items-center gap-2">
              <span className="font-mono text-lg text-vermillion font-semibold">∴</span>
              <span className="font-display text-base">Logic Mastery</span>
            </Link>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <p className="text-sm text-ink-light">Progress</p>
              <p className="font-mono text-lg text-ink">{completion}%</p>
            </div>
            {accuracy > 0 && (
              <div className="text-right hidden sm:block">
                <p className="text-sm text-ink-light">Accuracy</p>
                <p className={`font-mono text-lg ${accuracy >= 70 ? "text-correct" : "text-vermillion"}`}>
                  {accuracy}%
                </p>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Module header - editorial style */}
      <div className="border-b border-ink/10 bg-paper-aged">
        <div className="max-w-6xl mx-auto px-8 py-12">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            {/* Module info */}
            <div className="lg:col-span-8">
              <p className="caption mb-4 flex items-center gap-3">
                <span className="text-vermillion font-mono">{module.id.toString().padStart(2, '0')}</span>
                <span className="w-8 h-px bg-ink/20"></span>
                Module {module.id} of 5
              </p>
              <h1 className="font-display text-4xl lg:text-5xl text-ink mb-4 leading-tight">
                {module.title}
              </h1>
              <p className="text-ink-medium text-lg max-w-xl">{module.description}</p>
            </div>

            {/* Symbol decoration */}
            <div className="lg:col-span-4 flex justify-end">
              <span className="text-[8rem] leading-none text-ink/5 font-mono select-none">
                {module.icon}
              </span>
            </div>
          </div>

          {/* Topics */}
          <div className="flex flex-wrap gap-3 mt-8">
            {module.topics.map((topic) => (
              <span
                key={topic}
                className="px-3 py-1 text-sm bg-paper border border-ink/10 text-ink-light"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tab navigation - editorial style */}
      <nav className="border-b border-ink/10 sticky top-0 bg-paper z-40">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const href = `/module/${slug}/${tab.id}`;

              return (
                <Link
                  key={tab.id}
                  href={href}
                  className={`
                    relative px-6 py-4 flex items-center gap-2 text-sm font-medium transition-colors
                    ${isActive ? "text-ink" : "text-ink-light hover:text-ink"}
                  `}
                >
                  <span className={`font-mono text-xs ${isActive ? "text-vermillion" : "text-ink-faded"}`}>
                    {tab.num}
                  </span>
                  <span>{tab.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeModuleTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-vermillion"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-8 py-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-ink/10 mt-16">
        <div className="max-w-6xl mx-auto px-8 py-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-ink-light hover:text-ink transition-colors">
            <span className="font-mono text-sm text-vermillion">∴</span>
            <span className="text-sm">Logic Mastery</span>
          </Link>
          <p className="text-sm text-ink-faded">
            Module {module.id} of 5
          </p>
        </div>
      </footer>
    </div>
  );
}
