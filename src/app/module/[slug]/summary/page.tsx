"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useProgress } from "@/hooks/useProgress";
import { getModule, MODULES } from "@/types/module";
import { CheatSheet, Symbol } from "@/components/summary/CheatSheet";
import { ModuleLink } from "@/components/summary/ModuleLink";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Callout } from "@/components/learning/Callout";

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

  if (slug === "propositional") {
    return (
      <PropositionalSummary
        moduleSlug={slug}
        completion={completion}
        accuracy={accuracy}
        nextModule={nextModule}
      />
    );
  }

  return (
    <div className="animate-fade-in">
      <h1 className="font-display text-4xl font-semibold text-charcoal mt-0 mb-6">
        Quick Reference
      </h1>
      <p className="text-slate text-lg">
        Summary for this module is coming soon.
      </p>
      {nextModule && (
        <div className="mt-8">
          <ModuleLink to={nextModule.id}>
            Continue your journey with {nextModule.title}
          </ModuleLink>
        </div>
      )}
    </div>
  );
}

interface SummaryProps {
  moduleSlug: string;
  completion: number;
  accuracy: number;
  nextModule?: typeof MODULES[0];
}

function PropositionalSummary({ moduleSlug, completion, accuracy, nextModule }: SummaryProps) {
  return (
    <article className="animate-fade-in">
      {/* Progress Summary */}
      <div className="bg-warm-white border border-border rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-semibold text-charcoal mt-0 mb-1">
              Module 1 Complete!
            </h1>
            <p className="text-slate">
              Here's your quick reference for Propositional Logic
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <ProgressRing percentage={completion} size="md" />
              <p className="text-xs text-muted mt-1">Completion</p>
            </div>
            {accuracy > 0 && (
              <div className="text-center">
                <div className="w-16 h-16 flex items-center justify-center">
                  <span
                    className={`font-display text-2xl font-semibold ${
                      accuracy >= 70 ? "text-sage" : "text-terracotta"
                    }`}
                  >
                    {accuracy}%
                  </span>
                </div>
                <p className="text-xs text-muted mt-1">Accuracy</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cheat Sheet */}
      <h2 className="font-display text-xl font-medium text-charcoal mb-4">
        Logical Connectives
      </h2>

      <CheatSheet>
        <Symbol name="∧" meaning="AND (Conjunction)" truth="True only when BOTH are true" />
        <Symbol name="∨" meaning="OR (Disjunction)" truth="True when AT LEAST ONE is true" />
        <Symbol name="¬" meaning="NOT (Negation)" truth="Flips the truth value" />
        <Symbol name="→" meaning="IMPLIES (Conditional)" truth="False only when T → F" />
        <Symbol name="↔" meaning="IFF (Biconditional)" truth="True when both have SAME value" />
      </CheatSheet>

      {/* Key Rules */}
      <h2 className="font-display text-xl font-medium text-charcoal mt-8 mb-4">
        Key Rules & Equivalences
      </h2>

      <div className="bg-warm-white border border-border rounded-lg p-6 space-y-4">
        <div>
          <h3 className="font-medium text-charcoal mb-2">De Morgan's Laws</h3>
          <div className="font-mono text-sm bg-parchment p-3 rounded space-y-1">
            <p>¬(P ∧ Q) ≡ (¬P ∨ ¬Q)</p>
            <p>¬(P ∨ Q) ≡ (¬P ∧ ¬Q)</p>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-charcoal mb-2">Implication Equivalence</h3>
          <div className="font-mono text-sm bg-parchment p-3 rounded">
            <p>P → Q ≡ ¬P ∨ Q</p>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-charcoal mb-2">Contrapositive</h3>
          <div className="font-mono text-sm bg-parchment p-3 rounded">
            <p>P → Q ≡ ¬Q → ¬P</p>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-charcoal mb-2">Double Negation</h3>
          <div className="font-mono text-sm bg-parchment p-3 rounded">
            <p>¬¬P ≡ P</p>
          </div>
        </div>
      </div>

      {/* Operator Precedence */}
      <h2 className="font-display text-xl font-medium text-charcoal mt-8 mb-4">
        Operator Precedence (Highest to Lowest)
      </h2>

      <div className="bg-warm-white border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-parchment/50">
              <th className="px-4 py-3 text-left text-sm font-medium text-muted">Priority</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted">Operator</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted">Name</th>
            </tr>
          </thead>
          <tbody>
            {[
              { priority: 1, op: "¬", name: "NOT" },
              { priority: 2, op: "∧", name: "AND" },
              { priority: 3, op: "∨", name: "OR" },
              { priority: 4, op: "→", name: "IMPLIES" },
              { priority: 5, op: "↔", name: "IFF" },
            ].map((row) => (
              <tr key={row.priority} className="border-t border-border">
                <td className="px-4 py-3 text-sm text-slate">{row.priority}</td>
                <td className="px-4 py-3 font-mono text-lg text-terracotta">{row.op}</td>
                <td className="px-4 py-3 text-sm text-charcoal">{row.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Key Takeaways */}
      <h2 className="font-display text-xl font-medium text-charcoal mt-8 mb-4">
        Key Takeaways
      </h2>

      <div className="space-y-3">
        {[
          "Propositions are statements with definite truth values (T or F)",
          "AND (∧) is true only when BOTH operands are true",
          "OR (∨) is inclusive — true when at least one operand is true",
          "An implication is only false when T → F (true implies false)",
          "When in doubt, use parentheses to clarify precedence",
          "De Morgan's Laws help simplify negations of compound statements",
        ].map((point, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-3 bg-warm-white border border-border rounded-lg"
          >
            <span className="w-6 h-6 bg-terracotta/10 text-terracotta rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
              {i + 1}
            </span>
            <p className="text-sm text-charcoal">{point}</p>
          </div>
        ))}
      </div>

      {/* Programming Quick Reference */}
      <Callout type="tip" title="For Programmers">
        <div className="font-mono text-sm space-y-1 mt-2">
          <p>∧ → <code>&&</code> (AND)</p>
          <p>∨ → <code>||</code> (OR)</p>
          <p>¬ → <code>!</code> (NOT)</p>
          <p>Remember: <code>&&</code> has higher precedence than <code>||</code></p>
        </div>
      </Callout>

      {/* Next Module */}
      {nextModule && (
        <>
          <h2 className="font-display text-xl font-medium text-charcoal mt-10 mb-4">
            What's Next?
          </h2>
          <ModuleLink to={nextModule.id}>
            Learn to translate natural language into logical notation
          </ModuleLink>
        </>
      )}

      {/* Navigation */}
      <div className="mt-12 pt-8 border-t border-border flex justify-between items-center">
        <Link href={`/module/${moduleSlug}/practice`}>
          <Button variant="secondary">← Back to Practice</Button>
        </Link>
        <Link href="/">
          <Button variant="secondary">Return Home</Button>
        </Link>
      </div>
    </article>
  );
}
