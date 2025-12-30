"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { MODULES } from "@/types/module";
import { useProgress } from "@/hooks/useProgress";

export default function HomePage() {
  const { getModuleCompletion } = useProgress();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  return (
    <div className="min-h-screen bg-paper">
      {/* ============================================
          HERO - EDITORIAL MAGAZINE SPREAD
          ============================================ */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden">
        {/* Decorative logic symbols - architectural elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Large faded symbol backdrop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.03, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute -top-32 -right-32 text-[40rem] font-mono leading-none text-ink select-none"
            style={{ fontFamily: "var(--font-symbol)" }}
          >
            ∴
          </motion.div>

          {/* Floating symbols with parallax */}
          <motion.span
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, 200]) }}
            className="absolute top-[20%] left-[10%] text-8xl text-vermillion/10 font-mono"
          >
            ∧
          </motion.span>
          <motion.span
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, 150]) }}
            className="absolute top-[40%] right-[15%] text-7xl text-prussian/10 font-mono"
          >
            →
          </motion.span>
          <motion.span
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, 250]) }}
            className="absolute bottom-[30%] left-[20%] text-9xl text-ink/5 font-mono"
          >
            ∀
          </motion.span>
          <motion.span
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
            className="absolute top-[60%] right-[25%] text-6xl text-gold/15 font-mono"
          >
            ¬
          </motion.span>
        </div>

        {/* Main content */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 min-h-screen flex flex-col"
        >
          {/* Top bar */}
          <header className="flex items-center justify-between px-8 py-6 border-b border-ink/10">
            <div className="flex items-center gap-3">
              <span className="font-mono text-2xl text-vermillion font-semibold">∴</span>
              <span className="font-display text-xl tracking-tight">Logic Mastery</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="#curriculum" className="text-sm text-ink-light hover:text-vermillion transition-colors">
                Curriculum
              </Link>
              <Link href="#about" className="text-sm text-ink-light hover:text-vermillion transition-colors">
                Method
              </Link>
              <Link
                href="/module/propositional/lesson"
                className="btn-primary text-sm"
              >
                Begin Learning
              </Link>
            </nav>
          </header>

          {/* Hero content - asymmetric editorial layout */}
          <div className="flex-1 grid lg:grid-cols-12 gap-8 px-8 py-16 lg:py-0 items-center">
            {/* Left column - dramatic typography */}
            <div className="lg:col-span-7 lg:pl-8">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Eyebrow */}
                <p className="caption mb-6 flex items-center gap-3">
                  <span className="w-12 h-px bg-vermillion"></span>
                  An Interactive Course
                </p>

                {/* Main headline */}
                <h1 className="display-1 text-ink mb-8 max-w-2xl">
                  The Art of{" "}
                  <span className="relative">
                    <span className="text-vermillion">Clear</span>
                    <svg className="absolute -bottom-2 left-0 w-full h-3 text-vermillion/30" viewBox="0 0 200 12" preserveAspectRatio="none">
                      <path d="M0,8 Q50,0 100,8 T200,8" stroke="currentColor" strokeWidth="3" fill="none" />
                    </svg>
                  </span>{" "}
                  Thinking
                </h1>

                {/* Subhead */}
                <p className="body-large text-ink-medium max-w-xl mb-12 leading-relaxed">
                  Every conditional statement, legal clause, and scientific hypothesis 
                  follows the rules of formal logic. Master these foundations through 
                  interactive lessons that connect theory to the domains you know.
                </p>

                {/* CTA group */}
                <div className="flex flex-wrap items-center gap-6">
                  <Link href="/module/propositional/lesson">
                    <motion.button
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-primary flex items-center gap-3 text-base px-8 py-4"
                    >
                      Start Module One
                      <span className="text-xl">→</span>
                    </motion.button>
                  </Link>
                  <Link href="#curriculum" className="text-ink-light hover:text-ink transition-colors">
                    View all 5 modules
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Right column - visual element */}
            <div className="lg:col-span-5 hidden lg:flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                {/* Stacked paper card effect */}
                <div className="card-paper p-8 w-[340px]">
                  <p className="caption mb-4 text-vermillion">Sample Exercise</p>
                  <p className="font-display text-xl text-ink mb-6">
                    Given P = true and Q = false, evaluate:
                  </p>
                  <div className="bg-paper-aged p-4 font-mono text-2xl text-center border border-ink/10 mb-6">
                    P <span className="text-vermillion font-semibold">∧</span> Q
                  </div>
                  <div className="flex gap-4">
                    <button className="flex-1 py-3 bg-correct text-paper font-mono font-semibold text-sm transition-all hover:bg-correct/90">
                      TRUE
                    </button>
                    <button className="flex-1 py-3 bg-paper-dark text-ink font-mono font-semibold text-sm border border-ink/20 transition-all hover:bg-paper-aged">
                      FALSE
                    </button>
                  </div>
                  <p className="text-xs text-ink-faded mt-4 text-center">
                    Interactive exercises with instant feedback
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom stats bar */}
          <div className="border-t border-ink/10 px-8 py-6">
            <div className="flex justify-center lg:justify-start gap-12 lg:gap-24">
              {[
                { value: "5", label: "Modules", sublabel: "Progressive curriculum" },
                { value: "60+", label: "Exercises", sublabel: "With explanations" },
                { value: "4", label: "Domains", sublabel: "Real-world contexts" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="text-center lg:text-left"
                >
                  <p className="font-display text-4xl text-ink">{stat.value}</p>
                  <p className="text-sm text-ink-medium font-medium">{stat.label}</p>
                  <p className="text-xs text-ink-faded hidden lg:block">{stat.sublabel}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ============================================
          CURRICULUM SECTION
          ============================================ */}
      <section id="curriculum" className="py-24 lg:py-32 bg-paper-aged">
        <div className="max-w-5xl mx-auto px-8">
          {/* Section header */}
          <div className="text-center mb-16">
            <p className="caption mb-4 flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-ink-faded"></span>
              The Curriculum
              <span className="w-8 h-px bg-ink-faded"></span>
            </p>
            <h2 className="display-2 text-ink mb-6">Five Modules to Mastery</h2>
            <p className="body-regular text-ink-medium max-w-xl mx-auto">
              Each module builds on the last, taking you from foundational concepts 
              to advanced applications in programming, law, and everyday reasoning.
            </p>
          </div>

          {/* Module cards */}
          <div className="space-y-6 stagger-reveal">
            {MODULES.map((module, index) => {
              const completion = getModuleCompletion(module.slug);
              const prevCompletion = index > 0 ? getModuleCompletion(MODULES[index - 1].slug) : 100;
              const isLocked = index > 0 && prevCompletion < 50;
              const isComplete = completion === 100;
              const isInProgress = completion > 0 && completion < 100;

              return (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={isLocked ? "#" : `/module/${module.slug}/lesson`}
                    onClick={(e) => isLocked && e.preventDefault()}
                    className={isLocked ? "cursor-not-allowed" : "block"}
                  >
                    <div
                      className={`
                        module-card group
                        ${isLocked ? "opacity-50 pointer-events-none" : ""}
                        ${isComplete ? "border-l-correct" : ""}
                      `}
                    >
                      {/* Module number */}
                      <div className="module-number">
                        {isLocked ? (
                          <span className="text-ink-faded">✦</span>
                        ) : (
                          module.id
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="caption">Module {module.id}</span>
                          {isInProgress && (
                            <span className="text-xs text-vermillion font-medium">In Progress</span>
                          )}
                          {isComplete && (
                            <span className="text-xs text-correct font-medium">Complete</span>
                          )}
                          {isLocked && (
                            <span className="text-xs text-ink-faded">Complete previous module to unlock</span>
                          )}
                        </div>
                        <h3 className="font-display text-2xl text-ink mb-2 group-hover:text-vermillion transition-colors">
                          {module.title}
                        </h3>
                        <p className="text-ink-medium mb-4">{module.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {module.topics.map((topic) => (
                            <span
                              key={topic}
                              className="text-xs px-3 py-1 bg-paper border border-ink/10 text-ink-light"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Progress / Meta */}
                      <div className="text-right">
                        <p className="font-mono text-sm text-ink-light mb-1">
                          {module.exerciseCount} exercises
                        </p>
                        <p className="text-xs text-ink-faded mb-4">{module.estimatedTime}</p>
                        {!isLocked && (
                          <div className="progress-gauge">
                            <svg viewBox="0 0 64 64" className="w-16 h-16">
                              <circle className="track" cx="32" cy="32" r="28" />
                              <circle
                                className="progress"
                                cx="32"
                                cy="32"
                                r="28"
                                strokeDasharray={`${completion * 1.76} 176`}
                              />
                            </svg>
                            <span className="label">{completion}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================
          METHOD SECTION - EDITORIAL LAYOUT
          ============================================ */}
      <section id="about" className="py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Text */}
            <div>
              <p className="caption mb-4 flex items-center gap-3">
                <span className="w-8 h-px bg-vermillion"></span>
                The Method
              </p>
              <h2 className="display-2 text-ink mb-8">
                Learn. Understand. Practice. Apply.
              </h2>

              <div className="space-y-8">
                {[
                  {
                    num: "01",
                    title: "Interactive Lessons",
                    desc: "Concepts explained with embedded truth tables you can manipulate, diagrams that animate, and checkpoints that test understanding in real-time.",
                  },
                  {
                    num: "02",
                    title: "Worked Examples",
                    desc: "Step-by-step walkthroughs showing exactly how to approach each problem type, with common mistakes highlighted so you don't repeat them.",
                  },
                  {
                    num: "03",
                    title: "Practice Exercises",
                    desc: "Problems drawn from programming, law, science, and everyday reasoning — immediate feedback with detailed explanations for every answer.",
                  },
                  {
                    num: "04",
                    title: "Quick Reference",
                    desc: "Cheat sheets distilling each module into the essential symbols, rules, and patterns you'll actually use.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.num}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6"
                  >
                    <span className="font-mono text-vermillion text-sm font-semibold pt-1">
                      {item.num}
                    </span>
                    <div>
                      <h3 className="font-display text-xl text-ink mb-2">{item.title}</h3>
                      <p className="text-ink-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right - Visual */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Domain cards stacked */}
              <div className="space-y-4">
                {[
                  { icon: "{ }", domain: "Programming", example: "if (user.isAdmin && !user.isBanned)", color: "prussian" },
                  { icon: "§", domain: "Law", example: "The warranty is void if A and B, unless C", color: "gold" },
                  { icon: "⚗", domain: "Science", example: "If temperature rises, then pressure increases", color: "correct" },
                  { icon: "∿", domain: "Everyday", example: "Either it rained, or the sprinklers were on", color: "vermillion" },
                ].map((item, i) => (
                  <motion.div
                    key={item.domain}
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="card-index p-6"
                    style={{ marginLeft: `${i * 16}px` }}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className={`w-10 h-10 flex items-center justify-center font-mono text-lg bg-${item.color}/10 text-${item.color}`}
                        style={{
                          backgroundColor: `var(--color-${item.color}-wash, var(--color-paper-aged))`,
                          color: `var(--color-${item.color})`,
                        }}
                      >
                        {item.icon}
                      </span>
                      <div>
                        <p className="caption mb-1">{item.domain}</p>
                        <p className="font-mono text-sm text-ink-medium">{item.example}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================
          CTA SECTION
          ============================================ */}
      <section className="py-24 lg:py-32 bg-ink text-paper">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-mono text-vermillion text-sm mb-6">Ready to begin?</p>
            <h2 className="font-display text-4xl lg:text-5xl text-paper mb-6">
              Start thinking more clearly today.
            </h2>
            <p className="text-paper/70 text-lg mb-10 max-w-xl mx-auto">
              No sign-up required. No payment needed. Just click and start learning 
              propositional logic — the foundation of all logical reasoning.
            </p>
            <Link href="/module/propositional/lesson">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 bg-paper text-ink px-10 py-5 font-medium text-lg transition-all hover:bg-vermillion hover:text-paper"
              >
                Begin Module One
                <span className="text-2xl">→</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ============================================
          FOOTER
          ============================================ */}
      <footer className="py-12 border-t border-ink/10">
        <div className="max-w-5xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xl text-vermillion font-semibold">∴</span>
              <span className="font-display text-lg">Logic Mastery</span>
            </div>
            <p className="text-sm text-ink-faded">
              An interactive course in formal logic. No account required.
            </p>
            <p className="text-xs text-ink-faded">
              © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
