"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Button } from "@/components/ui/Button";
import { MODULES } from "@/types/module";
import { useProgress } from "@/hooks/useProgress";

export default function HomePage() {
  const { getModuleCompletion } = useProgress();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-terracotta/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-sage/5 rounded-full blur-3xl" />
          {/* Logic symbols floating */}
          <motion.span
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-32 right-1/4 text-6xl text-terracotta/10 font-mono"
          >
            ∧
          </motion.span>
          <motion.span
            animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-48 left-1/4 text-5xl text-sage/10 font-mono"
          >
            →
          </motion.span>
          <motion.span
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity }}
            className="absolute bottom-32 left-1/3 text-7xl text-gold/10 font-mono"
          >
            ∀
          </motion.span>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-24 text-center relative">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-warm-white border border-border rounded-full text-sm text-slate mb-8"
          >
            <span className="w-2 h-2 bg-sage rounded-full animate-pulse" />
            Interactive Logic Course
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-6xl font-semibold text-charcoal mb-6 leading-tight"
          >
            Master Logic Through{" "}
            <span className="text-terracotta">Real-World</span> Thinking
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Every <code className="px-2 py-1 bg-parchment rounded text-terracotta">if</code> statement,
            contract clause, and scientific hypothesis uses logic. Learn the foundations through
            interactive exercises connected to domains you already understand.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/module/propositional/lesson">
              <Button size="lg">
                Start Learning →
              </Button>
            </Link>
            <Link href="#modules">
              <Button variant="secondary" size="lg">
                View Curriculum
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center gap-8 mt-16 text-center"
          >
            {[
              { value: "5", label: "Modules" },
              { value: "60+", label: "Exercises" },
              { value: "4", label: "Domains" },
            ].map((stat, i) => (
              <div key={i}>
                <p className="font-display text-3xl font-semibold text-terracotta">
                  {stat.value}
                </p>
                <p className="text-sm text-muted">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Domains Section */}
      <section className="py-16 bg-parchment/50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-2xl font-semibold text-charcoal text-center mb-2">
            Logic in Every Domain
          </h2>
          <p className="text-slate text-center mb-10">
            See how formal logic applies to the fields you care about
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "{ }", label: "Programming", color: "bg-[#6B8CAE]", desc: "Debug conditionals" },
              { icon: "§", label: "Law", color: "bg-[#8B7355]", desc: "Analyze contracts" },
              { icon: "⚗", label: "Science", color: "bg-[#7BA387]", desc: "Test hypotheses" },
              { icon: "☀", label: "Everyday", color: "bg-[#9B8AA6]", desc: "Spot fallacies" },
            ].map((domain, i) => (
              <motion.div
                key={domain.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-warm-white border border-border rounded-lg p-4 text-center hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-12 h-12 ${domain.color} text-warm-white rounded-lg flex items-center justify-center font-mono text-xl mx-auto mb-3`}
                >
                  {domain.icon}
                </div>
                <p className="font-medium text-charcoal">{domain.label}</p>
                <p className="text-xs text-muted mt-1">{domain.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section id="modules" className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-3xl font-semibold text-charcoal text-center mb-4">
            Your Learning Path
          </h2>
          <p className="text-slate text-center mb-12 max-w-xl mx-auto">
            Five progressive modules, each with lessons, worked examples, interactive exercises, and quick reference summaries.
          </p>

          <div className="space-y-4">
            {MODULES.map((module, index) => {
              const completion = getModuleCompletion(module.slug);
              const prevCompletion = index > 0 ? getModuleCompletion(MODULES[index - 1].slug) : 100;
              const isLocked = index > 0 && prevCompletion < 50;

              return (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={isLocked ? "#" : `/module/${module.slug}/lesson`}
                    className={isLocked ? "cursor-not-allowed" : ""}
                    onClick={(e) => isLocked && e.preventDefault()}
                  >
                    <Card
                      variant={isLocked ? "default" : "interactive"}
                      className={isLocked ? "opacity-60" : ""}
                    >
                      <div className="flex items-center gap-4">
                        {/* Module number/icon */}
                        <div
                          className={`w-14 h-14 rounded-lg flex items-center justify-center font-mono text-2xl ${
                            isLocked
                              ? "bg-parchment text-muted"
                              : "bg-terracotta/10 text-terracotta"
                          }`}
                        >
                          {isLocked ? "🔒" : module.icon}
                        </div>

                        {/* Module info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-muted">Module {module.id}</span>
                            {completion > 0 && completion < 100 && (
                              <span className="text-xs text-terracotta">In Progress</span>
                            )}
                            {completion === 100 && (
                              <span className="text-xs text-sage">✓ Complete</span>
                            )}
                          </div>
                          <h3 className="font-display text-lg font-medium text-charcoal">
                            {module.title}
                          </h3>
                          <p className="text-sm text-slate">{module.description}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {module.topics.slice(0, 3).map((topic) => (
                              <span
                                key={topic}
                                className="text-xs px-2 py-0.5 bg-parchment rounded text-muted"
                              >
                                {topic}
                              </span>
                            ))}
                            {module.topics.length > 3 && (
                              <span className="text-xs px-2 py-0.5 text-muted">
                                +{module.topics.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Progress */}
                        <div className="flex items-center gap-4">
                          <div className="text-right hidden sm:block">
                            <p className="text-sm text-slate">{module.exerciseCount} exercises</p>
                            <p className="text-xs text-muted">{module.estimatedTime}</p>
                          </div>
                          {!isLocked && <ProgressRing percentage={completion} size="md" />}
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-parchment/30">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-2xl font-semibold text-charcoal text-center mb-12">
            How You'll Learn
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: "📖",
                title: "Interactive Lessons",
                desc: "Concept explanations with toggleable truth tables, mini-quizzes, and animated diagrams embedded right in the content.",
              },
              {
                icon: "✏️",
                title: "Worked Examples",
                desc: "Step-by-step walkthroughs of problems showing exactly how to approach each type, with common mistakes highlighted.",
              },
              {
                icon: "🎯",
                title: "Practice Exercises",
                desc: "60+ exercises across four real-world domains with immediate feedback and detailed explanations.",
              },
              {
                icon: "📋",
                title: "Quick References",
                desc: "Cheat sheets for each module summarizing key symbols, rules, and connections to other topics.",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-warm-white border border-border rounded-lg p-6"
              >
                <span className="text-3xl mb-4 block">{feature.icon}</span>
                <h3 className="font-display font-medium text-charcoal mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-terracotta/5 border border-terracotta/20 rounded-2xl p-10"
          >
            <h2 className="font-display text-3xl font-semibold text-charcoal mb-4">
              Ready to think more clearly?
            </h2>
            <p className="text-slate mb-8">
              Start with propositional logic — the foundation of all logical reasoning.
              No sign-up required, just click and learn.
            </p>
            <Link href="/module/propositional/lesson">
              <Button size="lg">
                Begin Module 1 →
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
