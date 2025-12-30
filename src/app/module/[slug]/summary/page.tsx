"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useProgress } from "@/hooks/useProgress";
import { getModule, MODULES } from "@/types/module";

export default function SummaryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const module = getModule(slug);
  const { markSummaryViewed, getModuleCompletion, getModuleAccuracy } = useProgress();

  useEffect(() => {
    markSummaryViewed(slug);
  }, [slug, markSummaryViewed]);

  if (!module) return null;

  const completion = getModuleCompletion(slug);
  const accuracy = getModuleAccuracy(slug);
  const currentIndex = MODULES.findIndex((m) => m.slug === slug);
  const nextModule = MODULES[currentIndex + 1];

  const summaries: Record<string, React.ReactNode> = {
    propositional: <PropositionalSummary completion={completion} accuracy={accuracy} nextModule={nextModule} />,
    translation: <TranslationSummary completion={completion} accuracy={accuracy} nextModule={nextModule} />,
    validity: <ValiditySummary completion={completion} accuracy={accuracy} nextModule={nextModule} />,
    predicate: <PredicateSummary completion={completion} accuracy={accuracy} nextModule={nextModule} />,
    applications: <ApplicationsSummary completion={completion} accuracy={accuracy} />,
  };

  return summaries[slug] || <PlaceholderSummary nextModule={nextModule} />;
}

interface SummaryProps {
  completion: number;
  accuracy: number;
  nextModule?: typeof MODULES[0];
}

function ProgressHeader({ completion, accuracy, title }: { completion: number; accuracy: number; title: string }) {
  return (
    <div className="bg-paper-aged border-2 border-ink p-6 mb-10" style={{ boxShadow: '4px 4px 0 var(--color-ink)' }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="caption text-correct mb-2">Module Complete</p>
          <h1 className="font-display text-2xl text-ink">{title}</h1>
        </div>
        <div className="flex gap-8">
          <div className="text-center">
            <p className="font-mono text-3xl text-ink">{completion}%</p>
            <p className="text-xs text-ink-faded">Completion</p>
          </div>
          {accuracy > 0 && (
            <div className="text-center">
              <p className={`font-mono text-3xl ${accuracy >= 70 ? 'text-correct' : 'text-vermillion'}`}>
                {accuracy}%
              </p>
              <p className="text-xs text-ink-faded">Accuracy</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CheatSheetTable({ rows }: { rows: { symbol: string; name: string; truth: string }[] }) {
  return (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse bg-paper">
        <thead>
          <tr className="bg-ink text-paper">
            <th className="px-4 py-3 text-left font-medium">Symbol</th>
            <th className="px-4 py-3 text-left font-medium">Name</th>
            <th className="px-4 py-3 text-left font-medium">Truth Condition</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-ink/10">
              <td className="px-4 py-3 font-mono text-xl text-vermillion font-semibold">{row.symbol}</td>
              <td className="px-4 py-3 text-ink">{row.name}</td>
              <td className="px-4 py-3 text-ink-medium text-sm">{row.truth}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function KeyTakeaways({ items }: { items: string[] }) {
  return (
    <div className="space-y-3 my-8">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex gap-4 p-4 bg-paper border border-ink/10"
        >
          <span className="w-8 h-8 flex items-center justify-center bg-vermillion/10 text-vermillion font-mono font-semibold text-sm flex-shrink-0">
            {i + 1}
          </span>
          <p className="text-ink-medium">{item}</p>
        </motion.div>
      ))}
    </div>
  );
}

function NextModuleLink({ nextModule }: { nextModule: typeof MODULES[0] }) {
  return (
    <Link href={`/module/${nextModule.slug}/lesson`}>
      <motion.div
        whileHover={{ x: 4 }}
        className="mt-10 p-6 bg-paper border-2 border-ink cursor-pointer"
        style={{ boxShadow: '4px 4px 0 var(--color-ink)' }}
      >
        <div className="flex items-center gap-6">
          <span className="text-4xl font-mono text-ink/20">{nextModule.icon}</span>
          <div className="flex-1">
            <p className="caption text-ink-faded mb-1">Up Next</p>
            <p className="font-display text-xl text-ink">Module {nextModule.id}: {nextModule.title}</p>
            <p className="text-ink-medium text-sm">{nextModule.description}</p>
          </div>
          <span className="text-2xl text-vermillion">→</span>
        </div>
      </motion.div>
    </Link>
  );
}

function SummaryNav() {
  return (
    <div className="mt-16 pt-8 border-t border-ink/10 flex justify-between">
      <Link href="/">
        <button className="btn-secondary px-6 py-3">← Return Home</button>
      </Link>
    </div>
  );
}

function PlaceholderSummary({ nextModule }: { nextModule?: typeof MODULES[0] }) {
  return (
    <article>
      <h1 className="font-display text-4xl text-ink mb-6">Quick Reference</h1>
      <p className="text-ink-medium">Summary coming soon.</p>
      {nextModule && <NextModuleLink nextModule={nextModule} />}
      <SummaryNav />
    </article>
  );
}

// ============================================
// MODULE SUMMARIES
// ============================================

function PropositionalSummary({ completion, accuracy, nextModule }: SummaryProps) {
  return (
    <article className="stagger-reveal">
      <ProgressHeader completion={completion} accuracy={accuracy} title="Propositional Logic — Quick Reference" />

      <h2 className="heading-2">Logical Connectives</h2>
      <CheatSheetTable rows={[
        { symbol: "∧", name: "AND (Conjunction)", truth: "True only when BOTH are true" },
        { symbol: "∨", name: "OR (Disjunction)", truth: "True when AT LEAST ONE is true" },
        { symbol: "¬", name: "NOT (Negation)", truth: "Flips the truth value" },
        { symbol: "→", name: "IMPLIES (Conditional)", truth: "False only when T → F" },
        { symbol: "↔", name: "IFF (Biconditional)", truth: "True when both SAME value" },
      ]} />

      <h2 className="heading-2 mt-10">Key Equivalences</h2>
      <div className="bg-paper-aged p-6 font-mono space-y-2 my-6">
        <p><strong>De Morgan's:</strong> ¬(P ∧ Q) ≡ ¬P ∨ ¬Q</p>
        <p><strong>De Morgan's:</strong> ¬(P ∨ Q) ≡ ¬P ∧ ¬Q</p>
        <p><strong>Implication:</strong> P → Q ≡ ¬P ∨ Q</p>
        <p><strong>Contrapositive:</strong> P → Q ≡ ¬Q → ¬P</p>
      </div>

      <h2 className="heading-2 mt-10">Key Takeaways</h2>
      <KeyTakeaways items={[
        "Propositions have definite truth values (T or F)",
        "AND requires both; OR requires at least one",
        "Implication is only false for T → F",
        "Use parentheses to clarify precedence",
        "De Morgan's Laws help negate compound statements",
      ]} />

      {nextModule && <NextModuleLink nextModule={nextModule} />}
      <SummaryNav />
    </article>
  );
}

function TranslationSummary({ completion, accuracy, nextModule }: SummaryProps) {
  return (
    <article className="stagger-reveal">
      <ProgressHeader completion={completion} accuracy={accuracy} title="Translation — Quick Reference" />

      <h2 className="heading-2">Translation Patterns</h2>
      <CheatSheetTable rows={[
        { symbol: "if P then Q", name: "Implication", truth: "P → Q" },
        { symbol: "P only if Q", name: "Necessary Condition", truth: "P → Q" },
        { symbol: "P if Q", name: "Sufficient Condition", truth: "Q → P" },
        { symbol: "unless P", name: "If not", truth: "¬P → ..." },
        { symbol: "neither...nor", name: "Both false", truth: "¬A ∧ ¬B" },
      ]} />

      <h2 className="heading-2 mt-10">Tricky Patterns</h2>
      <div className="bg-paper-aged p-6 space-y-4 my-6">
        <div>
          <p className="font-semibold text-vermillion">Only if ≠ If</p>
          <p className="text-ink-medium text-sm">"A only if B" = A → B (B necessary)</p>
          <p className="text-ink-medium text-sm">"A if B" = B → A (B sufficient)</p>
        </div>
        <div>
          <p className="font-semibold text-vermillion">Unless = If not</p>
          <p className="text-ink-medium text-sm">"A unless B" = ¬B → A</p>
        </div>
      </div>

      <h2 className="heading-2 mt-10">Key Takeaways</h2>
      <KeyTakeaways items={[
        "\"Only if\" creates forward implication",
        "\"Unless\" means \"if not\"",
        "\"Neither...nor\" = both negated with AND",
        "When ambiguous, ask for clarification",
        "Assume inclusive OR unless stated otherwise",
      ]} />

      {nextModule && <NextModuleLink nextModule={nextModule} />}
      <SummaryNav />
    </article>
  );
}

function ValiditySummary({ completion, accuracy, nextModule }: SummaryProps) {
  return (
    <article className="stagger-reveal">
      <ProgressHeader completion={completion} accuracy={accuracy} title="Validity & Proofs — Quick Reference" />

      <h2 className="heading-2">Inference Rules</h2>
      <div className="grid md:grid-cols-2 gap-4 my-6">
        {[
          { name: "Modus Ponens", rule: "P→Q, P ∴ Q" },
          { name: "Modus Tollens", rule: "P→Q, ¬Q ∴ ¬P" },
          { name: "Hypothetical Syllogism", rule: "P→Q, Q→R ∴ P→R" },
          { name: "Disjunctive Syllogism", rule: "P∨Q, ¬P ∴ Q" },
        ].map((item) => (
          <div key={item.name} className="p-4 bg-paper border border-ink/10">
            <p className="font-semibold text-ink">{item.name}</p>
            <p className="font-mono text-sm text-vermillion mt-1">{item.rule}</p>
          </div>
        ))}
      </div>

      <h2 className="heading-2 mt-10">Common Fallacies</h2>
      <div className="bg-incorrect/5 border-l-4 border-incorrect p-6 my-6">
        <p className="font-semibold text-incorrect mb-2">Affirming the Consequent</p>
        <p className="font-mono text-sm">P→Q, Q ∴ P — INVALID</p>
        <p className="text-ink-medium text-sm mt-2">Just because Q is true doesn't mean P caused it.</p>
      </div>
      <div className="bg-incorrect/5 border-l-4 border-incorrect p-6 my-6">
        <p className="font-semibold text-incorrect mb-2">Denying the Antecedent</p>
        <p className="font-mono text-sm">P→Q, ¬P ∴ ¬Q — INVALID</p>
        <p className="text-ink-medium text-sm mt-2">Q could be true for other reasons.</p>
      </div>

      <h2 className="heading-2 mt-10">Key Takeaways</h2>
      <KeyTakeaways items={[
        "Valid = if premises true, conclusion MUST be true",
        "Modus Ponens and Tollens are your core tools",
        "Affirming consequent and denying antecedent are traps",
        "Build proofs step-by-step with clear justifications",
      ]} />

      {nextModule && <NextModuleLink nextModule={nextModule} />}
      <SummaryNav />
    </article>
  );
}

function PredicateSummary({ completion, accuracy, nextModule }: SummaryProps) {
  return (
    <article className="stagger-reveal">
      <ProgressHeader completion={completion} accuracy={accuracy} title="Predicate Logic — Quick Reference" />

      <h2 className="heading-2">Quantifiers</h2>
      <CheatSheetTable rows={[
        { symbol: "∀x", name: "Universal (For all)", truth: "Every x satisfies the predicate" },
        { symbol: "∃x", name: "Existential (There exists)", truth: "At least one x satisfies" },
        { symbol: "∃!x", name: "Unique Existence", truth: "Exactly one x satisfies" },
      ]} />

      <h2 className="heading-2 mt-10">Negation Rules</h2>
      <div className="bg-paper-aged p-6 font-mono space-y-2 my-6">
        <p>¬(∀x P(x)) ≡ ∃x ¬P(x)</p>
        <p>¬(∃x P(x)) ≡ ∀x ¬P(x)</p>
      </div>

      <h2 className="heading-2 mt-10">SQL Equivalents</h2>
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse bg-paper text-sm">
          <thead>
            <tr className="bg-ink text-paper">
              <th className="px-4 py-3 text-left">Logic</th>
              <th className="px-4 py-3 text-left">SQL Pattern</th>
            </tr>
          </thead>
          <tbody className="font-mono">
            <tr className="border-b border-ink/10">
              <td className="px-4 py-3">∃x P(x)</td>
              <td className="px-4 py-3">EXISTS (SELECT ... WHERE P)</td>
            </tr>
            <tr className="border-b border-ink/10">
              <td className="px-4 py-3">∀x P(x)</td>
              <td className="px-4 py-3">NOT EXISTS (... WHERE NOT P)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="heading-2 mt-10">Key Takeaways</h2>
      <KeyTakeaways items={[
        "∀ = all, ∃ = some",
        "Quantifier ORDER matters: ∀x∃y ≠ ∃y∀x",
        "Negating ∀ gives ∃¬, negating ∃ gives ∀¬",
        "Universal in SQL = NOT EXISTS (counterexample)",
      ]} />

      {nextModule && <NextModuleLink nextModule={nextModule} />}
      <SummaryNav />
    </article>
  );
}

function ApplicationsSummary({ completion, accuracy }: Omit<SummaryProps, 'nextModule'>) {
  return (
    <article className="stagger-reveal">
      <ProgressHeader completion={completion} accuracy={accuracy} title="Applications — Quick Reference" />

      <h2 className="heading-2">Formal Fallacies</h2>
      <div className="grid md:grid-cols-2 gap-4 my-6">
        {[
          { name: "Affirming Consequent", ex: "P→Q, Q ∴ P" },
          { name: "Denying Antecedent", ex: "P→Q, ¬P ∴ ¬Q" },
        ].map((f) => (
          <div key={f.name} className="p-4 bg-incorrect/5 border-l-4 border-incorrect">
            <p className="font-semibold text-incorrect">{f.name}</p>
            <p className="font-mono text-xs mt-1">{f.ex}</p>
          </div>
        ))}
      </div>

      <h2 className="heading-2 mt-10">Informal Fallacies</h2>
      <div className="grid md:grid-cols-2 gap-4 my-6">
        {[
          { name: "Ad Hominem", desc: "Attack person, not argument" },
          { name: "Straw Man", desc: "Misrepresent to attack" },
          { name: "False Dilemma", desc: "Only two options presented" },
          { name: "Slippery Slope", desc: "Assumed extreme cascade" },
          { name: "Appeal to Authority", desc: "Wrong-field expert" },
          { name: "Appeal to Popularity", desc: "Many believe ≠ true" },
        ].map((f) => (
          <div key={f.name} className="p-4 bg-paper border border-ink/10">
            <p className="font-semibold text-vermillion">{f.name}</p>
            <p className="text-ink-medium text-sm mt-1">{f.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="heading-2 mt-10">Knights & Knaves Strategy</h2>
      <div className="bg-gold-wash border-l-4 border-gold p-6 my-6">
        <ol className="list-decimal list-inside space-y-2 text-ink-medium">
          <li>Assume one person is a Knight</li>
          <li>Trace ALL implications of their statements</li>
          <li>Check for contradictions</li>
          <li>If contradiction, try Knave assumption</li>
          <li>Consistent scenario = answer</li>
        </ol>
      </div>

      <h2 className="heading-2 mt-10">Key Takeaways</h2>
      <KeyTakeaways items={[
        "Formal fallacies are structural errors",
        "Informal fallacies are content/context errors",
        "Correlation ≠ causation",
        "Expertise doesn't transfer across fields",
        "For puzzles: assume, trace, check contradictions",
      ]} />

      <div className="mt-12 p-8 bg-correct/5 border-2 border-correct text-center">
        <h3 className="font-display text-2xl text-correct mb-4">🎉 Course Complete!</h3>
        <p className="text-ink-medium mb-6">
          You've mastered the foundations of formal logic. You can now analyze arguments, translate natural language, construct proofs, and spot fallacies.
        </p>
        <Link href="/">
          <button className="btn-primary px-8 py-3">Return Home</button>
        </Link>
      </div>

      <SummaryNav />
    </article>
  );
}
