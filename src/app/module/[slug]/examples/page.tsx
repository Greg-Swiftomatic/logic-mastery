"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useProgress } from "@/hooks/useProgress";
import { getModule } from "@/types/module";
import { WorkedProblem, Problem, Step, CommonMistake } from "@/components/examples/WorkedProblem";
import { LogicExpression } from "@/components/learning/LogicExpression";
import { Callout } from "@/components/learning/Callout";

export default function ExamplesPage() {
  const params = useParams();
  const slug = params.slug as string;
  const module = getModule(slug);
  const { markExamplesViewed } = useProgress();

  useEffect(() => {
    // Mark examples as viewed after 10 seconds
    const timer = setTimeout(() => {
      markExamplesViewed(slug);
    }, 10000);

    return () => clearTimeout(timer);
  }, [slug, markExamplesViewed]);

  if (!module) return null;

  if (slug === "propositional") {
    return <PropositionalExamples moduleSlug={slug} />;
  }

  return (
    <div className="animate-fade-in">
      <h1 className="font-display text-4xl font-semibold text-charcoal mt-0 mb-6">
        Worked Examples
      </h1>
      <p className="text-slate text-lg">
        Examples for this module are coming soon.
      </p>
      <div className="mt-8">
        <Link href={`/module/${slug}/practice`}>
          <Button>Continue to Practice →</Button>
        </Link>
      </div>
    </div>
  );
}

function PropositionalExamples({ moduleSlug }: { moduleSlug: string }) {
  const { markExamplesViewed } = useProgress();

  return (
    <article className="animate-fade-in">
      <h1 className="font-display text-4xl font-semibold text-charcoal mt-0 mb-2">
        Worked Examples
      </h1>
      <p className="text-slate mb-8">
        Let's walk through some problems step-by-step to see the reasoning process.
      </p>

      {/* Example 1 */}
      <WorkedProblem number={1}>
        <Problem>
          Evaluate: <LogicExpression>(P ∨ Q) ∧ ¬P</LogicExpression> where P = true, Q = false
        </Problem>

        <Step number={1}>
          <strong>Identify the main connective.</strong> Looking at the expression, the main connective is <LogicExpression>∧</LogicExpression> (AND), which connects <LogicExpression>(P ∨ Q)</LogicExpression> and <LogicExpression>¬P</LogicExpression>.
        </Step>

        <Step number={2}>
          <strong>Evaluate the left side:</strong> <LogicExpression>P ∨ Q</LogicExpression><br />
          P = true, Q = false<br />
          true ∨ false = <strong className="text-sage">true</strong> (OR is true if at least one is true)
        </Step>

        <Step number={3}>
          <strong>Evaluate the right side:</strong> <LogicExpression>¬P</LogicExpression><br />
          P = true<br />
          ¬true = <strong className="text-dusty-rose">false</strong>
        </Step>

        <Step number={4}>
          <strong>Combine with AND:</strong> <LogicExpression>(P ∨ Q) ∧ ¬P</LogicExpression><br />
          true ∧ false = <strong className="text-dusty-rose">false</strong><br />
          (AND requires both to be true)
        </Step>

        <CommonMistake>
          Don't evaluate left-to-right like reading text! Always identify the main connective first and work from the inside out, respecting operator precedence.
        </CommonMistake>
      </WorkedProblem>

      {/* Example 2 */}
      <WorkedProblem number={2}>
        <Problem>
          A programmer writes: <code className="bg-parchment px-2 py-1 rounded">if (x {'>'} 0 && y {'>'} 0 || z == 0)</code><br />
          This is ambiguous. How might it be interpreted?
        </Problem>

        <Step number={1}>
          <strong>Identify the ambiguity.</strong> The expression has both && and || without parentheses. In most languages, && has higher precedence than ||.
        </Step>

        <Step number={2}>
          <strong>Interpretation 1 (common precedence):</strong><br />
          <code className="bg-parchment px-2 py-1 rounded">(x {'>'} 0 && y {'>'} 0) || z == 0</code><br />
          In logic: <LogicExpression>(P ∧ Q) ∨ R</LogicExpression><br />
          "Either both x and y are positive, OR z is zero"
        </Step>

        <Step number={3}>
          <strong>Interpretation 2 (what the programmer might have meant):</strong><br />
          <code className="bg-parchment px-2 py-1 rounded">x {'>'} 0 && (y {'>'} 0 || z == 0)</code><br />
          In logic: <LogicExpression>P ∧ (Q ∨ R)</LogicExpression><br />
          "x is positive AND (y is positive OR z is zero)"
        </Step>

        <Step number={4}>
          <strong>These are NOT equivalent!</strong> Consider x=1, y=0, z=0:<br />
          • Interpretation 1: (false ∧ false) ∨ true = <strong className="text-sage">true</strong><br />
          • Interpretation 2: true ∧ (false ∨ true) = <strong className="text-sage">true</strong><br />
          <br />
          But consider x=0, y=1, z=0:<br />
          • Interpretation 1: (false ∧ true) ∨ true = <strong className="text-sage">true</strong><br />
          • Interpretation 2: false ∧ (true ∨ true) = <strong className="text-dusty-rose">false</strong>
        </Step>

        <CommonMistake>
          Always use parentheses to make your intent explicit! Relying on precedence rules makes code harder to read and is a common source of bugs.
        </CommonMistake>
      </WorkedProblem>

      {/* Example 3 */}
      <WorkedProblem number={3}>
        <Problem>
          Translate to logic: "A student passes if they score at least 60 or complete the extra credit, but not if they're caught cheating."
        </Problem>

        <Step number={1}>
          <strong>Identify the atomic propositions:</strong><br />
          • P = "The student scores at least 60"<br />
          • E = "The student completes extra credit"<br />
          • C = "The student is caught cheating"<br />
          • Pass = "The student passes"
        </Step>

        <Step number={2}>
          <strong>Identify the conditions for passing:</strong><br />
          "score at least 60 OR complete extra credit" → <LogicExpression>P ∨ E</LogicExpression>
        </Step>

        <Step number={3}>
          <strong>Handle the exception:</strong><br />
          "but not if caught cheating" means cheating cancels everything.<br />
          We need: (satisfied conditions) AND (not cheating)<br />
          → <LogicExpression>(P ∨ E) ∧ ¬C</LogicExpression>
        </Step>

        <Step number={4}>
          <strong>Final translation:</strong><br />
          <LogicExpression>Pass ↔ (P ∨ E) ∧ ¬C</LogicExpression><br />
          "A student passes if and only if (they score at least 60 or complete extra credit) and they're not caught cheating."
        </Step>

        <CommonMistake>
          Watch out for "but" — it often introduces a negation or exception. "X but not Y" typically translates to <LogicExpression>X ∧ ¬Y</LogicExpression>.
        </CommonMistake>
      </WorkedProblem>

      <Callout type="tip">
        When solving logic problems:
        <ol className="list-decimal list-inside mt-2 space-y-1">
          <li>Identify the main connective first</li>
          <li>Work from innermost parentheses outward</li>
          <li>Double-check by testing with specific values</li>
          <li>When in doubt, build a truth table</li>
        </ol>
      </Callout>

      {/* Navigation */}
      <div className="mt-12 pt-8 border-t border-border flex justify-between items-center">
        <Link href={`/module/${moduleSlug}/lesson`}>
          <Button variant="secondary">← Back to Lesson</Button>
        </Link>
        <Link href={`/module/${moduleSlug}/practice`}>
          <Button onClick={() => markExamplesViewed(moduleSlug)}>
            Continue to Practice →
          </Button>
        </Link>
      </div>
    </article>
  );
}
