"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useProgress } from "@/hooks/useProgress";
import { getModule } from "@/types/module";

// Dynamic MDX imports would go here
// For now, we'll create inline content for Module 1

import { TruthTable } from "@/components/learning/TruthTable";
import { MiniQuiz } from "@/components/learning/MiniQuiz";
import { Callout } from "@/components/learning/Callout";
import { Expandable } from "@/components/learning/Expandable";
import { Definition } from "@/components/learning/Definition";
import { AnimatedDiagram } from "@/components/learning/AnimatedDiagram";
import { LogicExpression } from "@/components/learning/LogicExpression";

export default function LessonPage() {
  const params = useParams();
  const slug = params.slug as string;
  const module = getModule(slug);
  const { markLessonComplete } = useProgress();

  useEffect(() => {
    // Mark lesson as viewed after 30 seconds (or on scroll to bottom)
    const timer = setTimeout(() => {
      markLessonComplete(slug);
    }, 30000);

    return () => clearTimeout(timer);
  }, [slug, markLessonComplete]);

  if (!module) return null;

  // Render different content based on module
  if (slug === "propositional") {
    return <PropositionalLesson moduleSlug={slug} />;
  }

  // Placeholder for other modules
  return (
    <div className="prose prose-slate max-w-none">
      <h1 className="font-display text-4xl font-semibold text-charcoal mt-0">
        {module.title}
      </h1>
      <p className="text-slate text-lg">
        Lesson content for this module is coming soon.
      </p>
      <div className="mt-8">
        <Link href={`/module/${slug}/examples`}>
          <Button>Continue to Examples →</Button>
        </Link>
      </div>
    </div>
  );
}

function PropositionalLesson({ moduleSlug }: { moduleSlug: string }) {
  const { markLessonComplete } = useProgress();

  return (
    <article className="animate-fade-in">
      {/* Title */}
      <h1 className="font-display text-4xl font-semibold text-charcoal mt-0 mb-6">
        What is Propositional Logic?
      </h1>

      <Callout type="why">
        Every <code>if</code> statement you write, every contract clause you read, and every argument you evaluate uses propositional logic. It's the foundation of clear thinking.
      </Callout>

      {/* Introduction */}
      <p className="text-slate leading-relaxed mb-6">
        Propositional logic is the study of <strong>propositions</strong> — statements that are either true or false — and how to combine them using <strong>logical connectives</strong> like "and", "or", and "not".
      </p>

      <p className="text-slate leading-relaxed mb-6">
        Unlike everyday language, which is often vague or context-dependent, propositional logic gives us precise tools to express and evaluate statements with mathematical certainty.
      </p>

      {/* Definition: Proposition */}
      <h2 className="font-display text-2xl font-medium text-charcoal mt-10 mb-4 border-b border-border pb-2">
        Core Concepts
      </h2>

      <Definition term="Proposition">
        A declarative statement that is either <strong>true</strong> or <strong>false</strong>, but not both. Questions, commands, and exclamations are not propositions.
      </Definition>

      <div className="my-6 grid gap-4 md:grid-cols-2">
        <div className="bg-sage-light p-4 rounded-lg">
          <p className="text-sm font-medium text-sage mb-2">✓ Propositions</p>
          <ul className="text-sm text-charcoal space-y-1">
            <li>• "The sky is blue"</li>
            <li>• "2 + 2 = 5"</li>
            <li>• "user.isAdmin == true"</li>
          </ul>
        </div>
        <div className="bg-dusty-rose-light p-4 rounded-lg">
          <p className="text-sm font-medium text-dusty-rose mb-2">✗ Not Propositions</p>
          <ul className="text-sm text-charcoal space-y-1">
            <li>• "What time is it?"</li>
            <li>• "Close the door!"</li>
            <li>• "Wow, amazing!"</li>
          </ul>
        </div>
      </div>

      <MiniQuiz
        question="Is 'x > 5' a proposition?"
        options={[
          "Yes, it's always a proposition",
          "No, it depends on the value of x",
          "It becomes a proposition once x has a value",
        ]}
        correct={2}
        explanation="'x > 5' is a propositional function or predicate. It becomes a proposition only when x is assigned a specific value. For example, when x = 3, it becomes the false proposition '3 > 5'."
      />

      {/* Logical Connectives */}
      <h2 className="font-display text-2xl font-medium text-charcoal mt-10 mb-4 border-b border-border pb-2">
        Logical Connectives
      </h2>

      <p className="text-slate leading-relaxed mb-6">
        We use symbols to represent logical operations. Let's explore each one:
      </p>

      {/* AND */}
      <h3 className="font-display text-xl font-medium text-charcoal mt-8 mb-3">
        Conjunction (AND) — <LogicExpression>∧</LogicExpression>
      </h3>

      <p className="text-slate leading-relaxed mb-4">
        <LogicExpression>P ∧ Q</LogicExpression> is true <em>only when both</em> P and Q are true.
      </p>

      <div className="bg-parchment p-4 rounded-lg mb-4 font-mono text-sm">
        <span className="text-muted">// Programming equivalent:</span><br />
        <span className="text-charcoal">if (user.isLoggedIn <span className="text-terracotta font-bold">&&</span> user.hasPermission)</span>
      </div>

      <TruthTable variables={["P", "Q"]} expression="P ∧ Q" editable />

      <AnimatedDiagram type="conjunction" />

      {/* OR */}
      <h3 className="font-display text-xl font-medium text-charcoal mt-8 mb-3">
        Disjunction (OR) — <LogicExpression>∨</LogicExpression>
      </h3>

      <p className="text-slate leading-relaxed mb-4">
        <LogicExpression>P ∨ Q</LogicExpression> is true <em>when at least one</em> of P or Q is true (or both).
      </p>

      <Callout type="warning">
        In everyday English, "or" often means "one or the other, but not both" (exclusive or). In logic, <LogicExpression>∨</LogicExpression> is <strong>inclusive</strong> — it includes the case where both are true.
      </Callout>

      <TruthTable variables={["P", "Q"]} expression="P ∨ Q" editable />

      {/* NOT */}
      <h3 className="font-display text-xl font-medium text-charcoal mt-8 mb-3">
        Negation (NOT) — <LogicExpression>¬</LogicExpression>
      </h3>

      <p className="text-slate leading-relaxed mb-4">
        <LogicExpression>¬P</LogicExpression> flips the truth value: true becomes false, false becomes true.
      </p>

      <TruthTable variables={["P"]} expression="¬P" showAnswer />

      {/* Implication */}
      <h3 className="font-display text-xl font-medium text-charcoal mt-8 mb-3">
        Implication (IF...THEN) — <LogicExpression>→</LogicExpression>
      </h3>

      <p className="text-slate leading-relaxed mb-4">
        <LogicExpression>P → Q</LogicExpression> reads as "if P, then Q". This is the trickiest connective because of how we handle false premises.
      </p>

      <Callout type="info">
        <strong>The key insight:</strong> An implication is only false when the premise (P) is true but the conclusion (Q) is false. If the premise is false, the implication is <em>vacuously true</em>.
      </Callout>

      <p className="text-slate leading-relaxed mb-4">
        Think of it as a promise: "If it rains, I'll bring an umbrella." You only break the promise if it rains AND you don't bring an umbrella. If it doesn't rain, you haven't broken anything.
      </p>

      <TruthTable variables={["P", "Q"]} expression="P → Q" editable />

      <AnimatedDiagram type="implication" />

      <MiniQuiz
        question="If 'The moon is made of cheese' (false), then 'I can fly' (false). What is the truth value of this implication?"
        options={["True", "False", "Undefined"]}
        correct={0}
        explanation="When the premise (antecedent) is false, the implication is always true regardless of the conclusion. This is called 'vacuous truth'. The implication P → Q is only false when P is true and Q is false."
      />

      {/* Biconditional */}
      <h3 className="font-display text-xl font-medium text-charcoal mt-8 mb-3">
        Biconditional (IF AND ONLY IF) — <LogicExpression>↔</LogicExpression>
      </h3>

      <p className="text-slate leading-relaxed mb-4">
        <LogicExpression>P ↔ Q</LogicExpression> is true when P and Q have the <em>same truth value</em> — both true or both false.
      </p>

      <TruthTable variables={["P", "Q"]} expression="P ↔ Q" editable />

      <AnimatedDiagram type="biconditional" />

      {/* Deep Dive */}
      <Expandable title="Deep Dive: Operator Precedence">
        <p>
          Just like in math and programming, logical operators have precedence. From highest to lowest:
        </p>
        <ol className="list-decimal list-inside my-4 space-y-1">
          <li><strong>¬</strong> (NOT) — evaluated first</li>
          <li><strong>∧</strong> (AND)</li>
          <li><strong>∨</strong> (OR)</li>
          <li><strong>→</strong> (IMPLIES)</li>
          <li><strong>↔</strong> (IFF) — evaluated last</li>
        </ol>
        <p>
          So <LogicExpression>P ∨ Q ∧ R</LogicExpression> means <LogicExpression>P ∨ (Q ∧ R)</LogicExpression>, not <LogicExpression>(P ∨ Q) ∧ R</LogicExpression>.
        </p>
        <p className="mt-2">
          When in doubt, use parentheses to make your intent explicit!
        </p>
      </Expandable>

      {/* Summary */}
      <h2 className="font-display text-2xl font-medium text-charcoal mt-10 mb-4 border-b border-border pb-2">
        Key Takeaways
      </h2>

      <ul className="list-disc list-inside text-slate mb-4 space-y-2">
        <li>Propositions are statements with definite truth values</li>
        <li>Connectives (∧, ∨, ¬, →, ↔) combine propositions</li>
        <li>Truth tables show all possible combinations</li>
        <li>Implication (→) is only false when T → F</li>
        <li>Logical "or" is inclusive (both can be true)</li>
      </ul>

      {/* Navigation */}
      <div className="mt-12 pt-8 border-t border-border flex justify-between items-center">
        <div />
        <Link href={`/module/${moduleSlug}/examples`}>
          <Button
            onClick={() => markLessonComplete(moduleSlug)}
          >
            Continue to Examples →
          </Button>
        </Link>
      </div>
    </article>
  );
}
