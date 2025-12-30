"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useProgress } from "@/hooks/useProgress";
import { getModule } from "@/types/module";
import { WorkedProblem, Problem, Step, CommonMistake } from "@/components/examples/WorkedProblem";
import { Callout } from "@/components/learning/Callout";

export default function ExamplesPage() {
  const params = useParams();
  const slug = params.slug as string;
  const module = getModule(slug);
  const { markExamplesViewed } = useProgress();

  useEffect(() => {
    const timer = setTimeout(() => markExamplesViewed(slug), 10000);
    return () => clearTimeout(timer);
  }, [slug, markExamplesViewed]);

  if (!module) return null;

  const examples: Record<string, React.ReactNode> = {
    propositional: <PropositionalExamples moduleSlug={slug} />,
    translation: <TranslationExamples moduleSlug={slug} />,
    validity: <ValidityExamples moduleSlug={slug} />,
    predicate: <PredicateExamples moduleSlug={slug} />,
    applications: <ApplicationsExamples moduleSlug={slug} />,
  };

  return examples[slug] || <PlaceholderExamples moduleSlug={slug} />;
}

function ExamplesNav({ moduleSlug, onComplete }: { moduleSlug: string; onComplete?: () => void }) {
  return (
    <div className="mt-16 pt-8 border-t border-ink/10 flex justify-between items-center">
      <Link href={`/module/${moduleSlug}/lesson`}>
        <button className="btn-secondary px-6 py-3">← Back to Lesson</button>
      </Link>
      <Link href={`/module/${moduleSlug}/practice`}>
        <motion.button
          whileHover={{ x: 4 }}
          onClick={onComplete}
          className="btn-primary flex items-center gap-2 px-8 py-3"
        >
          Continue to Practice
          <span>→</span>
        </motion.button>
      </Link>
    </div>
  );
}

function PlaceholderExamples({ moduleSlug }: { moduleSlug: string }) {
  return (
    <article>
      <h1 className="font-display text-4xl text-ink mb-6">Worked Examples</h1>
      <p className="text-ink-medium">Examples coming soon.</p>
      <ExamplesNav moduleSlug={moduleSlug} />
    </article>
  );
}

// ============================================
// MODULE 1: PROPOSITIONAL LOGIC EXAMPLES
// ============================================
function PropositionalExamples({ moduleSlug }: { moduleSlug: string }) {
  const { markExamplesViewed } = useProgress();

  return (
    <article className="stagger-reveal">
      <h1 className="font-display text-4xl text-ink mb-2">Worked Examples</h1>
      <p className="text-ink-light mb-8">Step-by-step solutions showing the reasoning process.</p>

      <WorkedProblem number={1}>
        <Problem>
          Evaluate: <code className="logic-expression">(P ∨ Q) ∧ ¬P</code> where P = true, Q = false
        </Problem>
        <Step number={1}>
          <strong>Identify the main connective.</strong> The main operator is ∧ (AND), connecting (P ∨ Q) and ¬P.
        </Step>
        <Step number={2}>
          <strong>Evaluate P ∨ Q:</strong> true ∨ false = <span className="text-correct font-semibold">true</span>
        </Step>
        <Step number={3}>
          <strong>Evaluate ¬P:</strong> ¬true = <span className="text-incorrect font-semibold">false</span>
        </Step>
        <Step number={4}>
          <strong>Combine:</strong> true ∧ false = <span className="text-incorrect font-semibold">false</span>
        </Step>
        <CommonMistake>
          Don't evaluate left-to-right! Identify the main connective and work from inside out.
        </CommonMistake>
      </WorkedProblem>

      <WorkedProblem number={2}>
        <Problem>
          A programmer writes: <code className="logic-expression">if (x {'>'} 0 && y {'>'} 0 || z == 0)</code><br />
          How is this interpreted?
        </Problem>
        <Step number={1}>
          In most languages, && has higher precedence than ||.
        </Step>
        <Step number={2}>
          So it parses as: <code className="logic-expression">(x {'>'} 0 && y {'>'} 0) || z == 0</code>
        </Step>
        <Step number={3}>
          In logic: <code className="logic-expression">(P ∧ Q) ∨ R</code> — "Either both x,y positive OR z is zero"
        </Step>
        <CommonMistake>
          Always use parentheses to make intent explicit! Don't rely on precedence rules.
        </CommonMistake>
      </WorkedProblem>

      <WorkedProblem number={3}>
        <Problem>
          Translate: "A student passes if they score ≥60 or do extra credit, but not if caught cheating."
        </Problem>
        <Step number={1}>
          <strong>Define variables:</strong> P = score ≥60, E = extra credit, C = cheating, Pass = passes
        </Step>
        <Step number={2}>
          "Score ≥60 or extra credit" → <code className="logic-expression">P ∨ E</code>
        </Step>
        <Step number={3}>
          "But not if cheating" → AND NOT cheating → <code className="logic-expression">∧ ¬C</code>
        </Step>
        <Step number={4}>
          <strong>Final:</strong> <code className="logic-expression">Pass ↔ (P ∨ E) ∧ ¬C</code>
        </Step>
        <CommonMistake>
          "But" often signals an exception via negation. "X but not Y" = X ∧ ¬Y
        </CommonMistake>
      </WorkedProblem>

      <Callout type="tip">
        When solving logic problems: (1) Find main connective, (2) Work inside-out, (3) Test with values, (4) When stuck, build a truth table.
      </Callout>

      <ExamplesNav moduleSlug={moduleSlug} onComplete={() => markExamplesViewed(moduleSlug)} />
    </article>
  );
}

// ============================================
// MODULE 2: TRANSLATION EXAMPLES
// ============================================
function TranslationExamples({ moduleSlug }: { moduleSlug: string }) {
  const { markExamplesViewed } = useProgress();

  return (
    <article className="stagger-reveal">
      <h1 className="font-display text-4xl text-ink mb-2">Worked Examples</h1>
      <p className="text-ink-light mb-8">Master the art of converting English to logic.</p>

      <WorkedProblem number={1}>
        <Problem>
          Translate: "You can enter only if you have a ticket."<br />
          Let E = enter, T = have ticket.
        </Problem>
        <Step number={1}>
          Identify "only if" — this creates an implication FROM the main action.
        </Step>
        <Step number={2}>
          "A only if B" means A → B (B is necessary for A)
        </Step>
        <Step number={3}>
          <strong>Answer:</strong> <code className="logic-expression">E → T</code> — If you enter, you have a ticket.
        </Step>
        <CommonMistake>
          "Only if" ≠ "if". "A only if B" is A→B, but "A if B" is B→A. Opposite directions!
        </CommonMistake>
      </WorkedProblem>

      <WorkedProblem number={2}>
        <Problem>
          Translate: "Unless you apologize, we're done."<br />
          Let A = apologize, D = done.
        </Problem>
        <Step number={1}>
          "Unless" means "if not". Rewrite: "If you don't apologize, we're done."
        </Step>
        <Step number={2}>
          <strong>Answer:</strong> <code className="logic-expression">¬A → D</code>
        </Step>
        <Step number={3}>
          Equivalently: <code className="logic-expression">¬D → A</code> (contrapositive) — If we're not done, you apologized.
        </Step>
        <CommonMistake>
          "Unless" always introduces a negated condition in the antecedent.
        </CommonMistake>
      </WorkedProblem>

      <WorkedProblem number={3}>
        <Problem>
          Translate: "Neither the manager nor the director approved the budget."<br />
          Let M = manager approved, D = director approved.
        </Problem>
        <Step number={1}>
          "Neither A nor B" means both are false.
        </Step>
        <Step number={2}>
          <strong>Direct form:</strong> <code className="logic-expression">¬M ∧ ¬D</code>
        </Step>
        <Step number={3}>
          <strong>De Morgan equivalent:</strong> <code className="logic-expression">¬(M ∨ D)</code> — "It's not the case that either approved."
        </Step>
      </WorkedProblem>

      <Callout type="tip">
        Key patterns: "only if" → forward implication, "unless" → negated condition, "neither...nor" → both negated with AND.
      </Callout>

      <ExamplesNav moduleSlug={moduleSlug} onComplete={() => markExamplesViewed(moduleSlug)} />
    </article>
  );
}

// ============================================
// MODULE 3: VALIDITY EXAMPLES
// ============================================
function ValidityExamples({ moduleSlug }: { moduleSlug: string }) {
  const { markExamplesViewed } = useProgress();

  return (
    <article className="stagger-reveal">
      <h1 className="font-display text-4xl text-ink mb-2">Worked Examples</h1>
      <p className="text-ink-light mb-8">Building and verifying logical arguments.</p>

      <WorkedProblem number={1}>
        <Problem>
          Prove R from premises: (1) P → Q, (2) Q → R, (3) P
        </Problem>
        <Step number={1}>
          We have P → Q and P. Apply <strong>Modus Ponens</strong> to get Q.
        </Step>
        <Step number={2}>
          Now we have Q → R and Q. Apply <strong>Modus Ponens</strong> again to get R.
        </Step>
        <Step number={3}>
          <strong>Formal proof:</strong><br />
          <code className="block bg-paper-aged p-3 my-2 font-mono text-sm">
            1. P → Q (Premise)<br />
            2. Q → R (Premise)<br />
            3. P (Premise)<br />
            4. Q (MP: 1, 3)<br />
            5. R (MP: 2, 4) ✓
          </code>
        </Step>
      </WorkedProblem>

      <WorkedProblem number={2}>
        <Problem>
          Is this valid? "All cats are mammals. Felix is a cat. Therefore, Felix is a mammal."
        </Problem>
        <Step number={1}>
          Let C(x) = x is a cat, M(x) = x is a mammal.
        </Step>
        <Step number={2}>
          Premise 1: ∀x(C(x) → M(x)) — All cats are mammals.
        </Step>
        <Step number={3}>
          Premise 2: C(Felix) — Felix is a cat.
        </Step>
        <Step number={4}>
          By <strong>Universal Instantiation</strong>: C(Felix) → M(Felix)
        </Step>
        <Step number={5}>
          By <strong>Modus Ponens</strong>: M(Felix) ✓ Valid!
        </Step>
      </WorkedProblem>

      <WorkedProblem number={3}>
        <Problem>
          Identify the fallacy: "If you studied, you passed. You passed. So you studied."
        </Problem>
        <Step number={1}>
          Structure: P → Q, Q, therefore P
        </Step>
        <Step number={2}>
          This is <strong>Affirming the Consequent</strong> — INVALID!
        </Step>
        <Step number={3}>
          Q (passing) could be true for other reasons: easy test, cheating, luck, etc.
        </Step>
        <CommonMistake>
          Affirming the Consequent looks like Modus Ponens but isn't! MP needs P, not Q.
        </CommonMistake>
      </WorkedProblem>

      <ExamplesNav moduleSlug={moduleSlug} onComplete={() => markExamplesViewed(moduleSlug)} />
    </article>
  );
}

// ============================================
// MODULE 4: PREDICATE LOGIC EXAMPLES
// ============================================
function PredicateExamples({ moduleSlug }: { moduleSlug: string }) {
  const { markExamplesViewed } = useProgress();

  return (
    <article className="stagger-reveal">
      <h1 className="font-display text-4xl text-ink mb-2">Worked Examples</h1>
      <p className="text-ink-light mb-8">Quantifiers and their SQL equivalents.</p>

      <WorkedProblem number={1}>
        <Problem>
          Translate: "Every student has at least one advisor."<br />
          Domain: students. A(x,y) = y advises x.
        </Problem>
        <Step number={1}>
          "Every student" → Universal quantifier over students: ∀x
        </Step>
        <Step number={2}>
          "Has at least one advisor" → Existential over advisors: ∃y A(x,y)
        </Step>
        <Step number={3}>
          <strong>Answer:</strong> <code className="logic-expression">∀x ∃y A(x,y)</code>
        </Step>
        <Step number={4}>
          <strong>SQL:</strong><br />
          <code className="block bg-paper-aged p-3 my-2 font-mono text-sm">
            NOT EXISTS (<br />
            &nbsp;&nbsp;SELECT * FROM students s<br />
            &nbsp;&nbsp;WHERE NOT EXISTS (<br />
            &nbsp;&nbsp;&nbsp;&nbsp;SELECT * FROM advises WHERE student_id = s.id<br />
            &nbsp;&nbsp;)<br />
            )
          </code>
        </Step>
      </WorkedProblem>

      <WorkedProblem number={2}>
        <Problem>
          What's the negation of "All birds can fly"?<br />
          Let B(x) = bird, F(x) = can fly.
        </Problem>
        <Step number={1}>
          Original: <code className="logic-expression">∀x(B(x) → F(x))</code>
        </Step>
        <Step number={2}>
          Negate: <code className="logic-expression">¬∀x(B(x) → F(x))</code>
        </Step>
        <Step number={3}>
          Push negation in: <code className="logic-expression">∃x ¬(B(x) → F(x))</code>
        </Step>
        <Step number={4}>
          Simplify ¬(P→Q) = P ∧ ¬Q: <code className="logic-expression">∃x(B(x) ∧ ¬F(x))</code>
        </Step>
        <Step number={5}>
          <strong>English:</strong> "Some bird can't fly" (penguins, ostriches!)
        </Step>
      </WorkedProblem>

      <WorkedProblem number={3}>
        <Problem>
          Distinguish: ∀x∃y L(x,y) vs ∃y∀x L(x,y) where L = "loves"
        </Problem>
        <Step number={1}>
          <strong>∀x∃y L(x,y):</strong> For each person x, there exists someone y that x loves.
        </Step>
        <Step number={2}>
          English: "Everyone loves someone" (possibly different people)
        </Step>
        <Step number={3}>
          <strong>∃y∀x L(x,y):</strong> There exists a person y such that everyone loves y.
        </Step>
        <Step number={4}>
          English: "There's someone everyone loves" (same person!)
        </Step>
        <CommonMistake>
          Quantifier order MATTERS. The outer quantifier's variable can depend on inner choices.
        </CommonMistake>
      </WorkedProblem>

      <ExamplesNav moduleSlug={moduleSlug} onComplete={() => markExamplesViewed(moduleSlug)} />
    </article>
  );
}

// ============================================
// MODULE 5: APPLICATIONS EXAMPLES
// ============================================
function ApplicationsExamples({ moduleSlug }: { moduleSlug: string }) {
  const { markExamplesViewed } = useProgress();

  return (
    <article className="stagger-reveal">
      <h1 className="font-display text-4xl text-ink mb-2">Worked Examples</h1>
      <p className="text-ink-light mb-8">Fallacies and puzzle-solving strategies.</p>

      <WorkedProblem number={1}>
        <Problem>
          Identify the fallacy: "Professor Jones says climate change is a hoax. He's a professor, so he must be right."
        </Problem>
        <Step number={1}>
          This appeals to authority — but what is the professor's field?
        </Step>
        <Step number={2}>
          If Prof. Jones teaches literature, his opinion on climate science carries no special weight.
        </Step>
        <Step number={3}>
          <strong>Fallacy: Appeal to Authority</strong> — Expertise doesn't transfer across fields.
        </Step>
        <CommonMistake>
          Not all authority appeals are fallacious — citing a climate scientist ON climate is fine!
        </CommonMistake>
      </WorkedProblem>

      <WorkedProblem number={2}>
        <Problem>
          Knights & Knaves: A says "B is a knave." B says "We are different types." What are A and B?
        </Problem>
        <Step number={1}>
          <strong>Assume A is a Knight (truth-teller):</strong>
        </Step>
        <Step number={2}>
          Then "B is a knave" is TRUE → B is a knave.
        </Step>
        <Step number={3}>
          B (knave) says "We are different types" — this must be FALSE.
        </Step>
        <Step number={4}>
          But A=Knight, B=Knave ARE different types! Contradiction. ✗
        </Step>
        <Step number={5}>
          <strong>Assume A is a Knave (liar):</strong>
        </Step>
        <Step number={6}>
          Then "B is a knave" is FALSE → B is a knight.
        </Step>
        <Step number={7}>
          B (knight) says "We are different types" — this must be TRUE.
        </Step>
        <Step number={8}>
          A=Knave, B=Knight ARE different types! ✓ Consistent.
        </Step>
        <Step number={9}>
          <strong>Answer: A is a Knave, B is a Knight.</strong>
        </Step>
      </WorkedProblem>

      <WorkedProblem number={3}>
        <Problem>
          Identify the fallacy: "We shouldn't raise the minimum wage. Next thing you know, they'll want $100/hour, and all businesses will close."
        </Problem>
        <Step number={1}>
          This claims a modest action will lead to extreme consequences.
        </Step>
        <Step number={2}>
          No causal chain is provided for why this progression is inevitable.
        </Step>
        <Step number={3}>
          <strong>Fallacy: Slippery Slope</strong> — Assumes cascade without evidence.
        </Step>
      </WorkedProblem>

      <Callout type="tip">
        For Knights & Knaves: Assume one case, trace ALL implications, check for contradictions. No contradiction = valid solution.
      </Callout>

      <ExamplesNav moduleSlug={moduleSlug} onComplete={() => markExamplesViewed(moduleSlug)} />
    </article>
  );
}
