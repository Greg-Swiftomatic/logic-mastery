"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useProgress } from "@/hooks/useProgress";
import { getModule } from "@/types/module";

import { TruthTable } from "@/components/learning/TruthTable";
import { MiniQuiz } from "@/components/learning/MiniQuiz";
import { Callout } from "@/components/learning/Callout";
import { Expandable } from "@/components/learning/Expandable";
import { Definition } from "@/components/learning/Definition";
import { LogicExpression } from "@/components/learning/LogicExpression";

export default function LessonPage() {
  const params = useParams();
  const slug = params.slug as string;
  const module = getModule(slug);
  const { markLessonComplete } = useProgress();

  useEffect(() => {
    const timer = setTimeout(() => {
      markLessonComplete(slug);
    }, 30000);
    return () => clearTimeout(timer);
  }, [slug, markLessonComplete]);

  if (!module) return null;

  const lessons: Record<string, React.ReactNode> = {
    propositional: <PropositionalLesson moduleSlug={slug} />,
    translation: <TranslationLesson moduleSlug={slug} />,
    validity: <ValidityLesson moduleSlug={slug} />,
    predicate: <PredicateLesson moduleSlug={slug} />,
    applications: <ApplicationsLesson moduleSlug={slug} />,
  };

  return lessons[slug] || <PlaceholderLesson moduleSlug={slug} title={module.title} />;
}

function LessonNav({ moduleSlug, onComplete }: { moduleSlug: string; onComplete?: () => void }) {
  return (
    <div className="mt-16 pt-8 border-t border-ink/10 flex justify-between items-center">
      <div />
      <Link href={`/module/${moduleSlug}/examples`}>
        <motion.button
          whileHover={{ x: 4 }}
          onClick={onComplete}
          className="btn-primary flex items-center gap-2 px-8 py-3"
        >
          Continue to Examples
          <span>→</span>
        </motion.button>
      </Link>
    </div>
  );
}

function PlaceholderLesson({ moduleSlug, title }: { moduleSlug: string; title: string }) {
  return (
    <article>
      <h1 className="font-display text-4xl text-ink mb-6">{title}</h1>
      <p className="text-ink-medium text-lg">Lesson content coming soon.</p>
      <LessonNav moduleSlug={moduleSlug} />
    </article>
  );
}

// ============================================
// MODULE 1: PROPOSITIONAL LOGIC
// ============================================
function PropositionalLesson({ moduleSlug }: { moduleSlug: string }) {
  const { markLessonComplete } = useProgress();

  return (
    <article className="stagger-reveal">
      <h1 className="font-display text-4xl lg:text-5xl text-ink mb-8 leading-tight">
        What is Propositional Logic?
      </h1>

      <Callout type="why">
        Every <code className="logic-expression">if</code> statement you write, every contract clause you read, and every argument you evaluate uses propositional logic. It's the foundation of clear thinking.
      </Callout>

      <p className="body-large text-ink-medium mb-8">
        Propositional logic is the study of <strong>propositions</strong> — statements that are either true or false — and how to combine them using <strong>logical connectives</strong> like "and", "or", and "not".
      </p>

      <h2 className="heading-1 mt-12">Core Concepts</h2>

      <Definition term="Proposition">
        A declarative statement that is either <strong>true</strong> or <strong>false</strong>, but not both. Questions, commands, and exclamations are not propositions.
      </Definition>

      <div className="grid md:grid-cols-2 gap-4 my-8">
        <div className="p-5 bg-correct/5 border-l-4 border-correct">
          <p className="caption text-correct mb-3">✓ Propositions</p>
          <ul className="space-y-2 text-ink-medium">
            <li>• "The sky is blue"</li>
            <li>• "2 + 2 = 5" (false, but still a proposition)</li>
            <li>• <code className="logic-expression">user.isAdmin == true</code></li>
          </ul>
        </div>
        <div className="p-5 bg-incorrect/5 border-l-4 border-incorrect">
          <p className="caption text-incorrect mb-3">✗ Not Propositions</p>
          <ul className="space-y-2 text-ink-medium">
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
        explanation="'x > 5' is a propositional function. It becomes a proposition only when x is assigned a value."
      />

      <h2 className="heading-1 mt-12">Logical Connectives</h2>

      <h3 className="heading-2 mt-8">Conjunction (AND) — <LogicExpression>∧</LogicExpression></h3>
      <p className="text-ink-medium mb-4">
        <LogicExpression>P ∧ Q</LogicExpression> is true <em>only when both</em> P and Q are true.
      </p>
      <TruthTable variables={["P", "Q"]} expression="P ∧ Q" editable />

      <h3 className="heading-2 mt-8">Disjunction (OR) — <LogicExpression>∨</LogicExpression></h3>
      <p className="text-ink-medium mb-4">
        <LogicExpression>P ∨ Q</LogicExpression> is true when <em>at least one</em> of P or Q is true.
      </p>
      <Callout type="warning">
        In everyday English, "or" often means "one or the other, but not both" (exclusive or). In logic, <LogicExpression>∨</LogicExpression> is <strong>inclusive</strong>.
      </Callout>
      <TruthTable variables={["P", "Q"]} expression="P ∨ Q" editable />

      <h3 className="heading-2 mt-8">Negation (NOT) — <LogicExpression>¬</LogicExpression></h3>
      <p className="text-ink-medium mb-4">
        <LogicExpression>¬P</LogicExpression> flips the truth value.
      </p>
      <TruthTable variables={["P"]} expression="¬P" showAnswer />

      <h3 className="heading-2 mt-8">Implication (IF...THEN) — <LogicExpression>→</LogicExpression></h3>
      <p className="text-ink-medium mb-4">
        <LogicExpression>P → Q</LogicExpression> is only false when P is true but Q is false.
      </p>
      <Callout type="info">
        Think of a promise: "If it rains, I'll bring an umbrella." You only break it if it rains AND you don't bring one.
      </Callout>
      <TruthTable variables={["P", "Q"]} expression="P → Q" editable />

      <h3 className="heading-2 mt-8">Biconditional (IFF) — <LogicExpression>↔</LogicExpression></h3>
      <p className="text-ink-medium mb-4">
        <LogicExpression>P ↔ Q</LogicExpression> is true when P and Q have the same truth value.
      </p>
      <TruthTable variables={["P", "Q"]} expression="P ↔ Q" editable />

      <Expandable title="Deep Dive: Operator Precedence">
        <p className="mb-4">From highest to lowest priority:</p>
        <ol className="list-decimal list-inside space-y-1 text-ink-medium">
          <li><strong>¬</strong> (NOT) — evaluated first</li>
          <li><strong>∧</strong> (AND)</li>
          <li><strong>∨</strong> (OR)</li>
          <li><strong>→</strong> (IMPLIES)</li>
          <li><strong>↔</strong> (IFF) — evaluated last</li>
        </ol>
      </Expandable>

      <LessonNav moduleSlug={moduleSlug} onComplete={() => markLessonComplete(moduleSlug)} />
    </article>
  );
}

// ============================================
// MODULE 2: TRANSLATION
// ============================================
function TranslationLesson({ moduleSlug }: { moduleSlug: string }) {
  const { markLessonComplete } = useProgress();

  return (
    <article className="stagger-reveal">
      <h1 className="font-display text-4xl lg:text-5xl text-ink mb-8 leading-tight">
        Translating Natural Language
      </h1>

      <Callout type="why">
        The hardest part of logic isn't the symbols—it's figuring out what someone actually means. Natural language is ambiguous, vague, and full of traps. Translation is where logic meets the real world.
      </Callout>

      <p className="body-large text-ink-medium mb-8">
        This module teaches you to convert everyday English into precise logical notation—and to recognize when a statement can be interpreted multiple ways.
      </p>

      <h2 className="heading-1 mt-12">Basic Patterns</h2>

      <div className="overflow-x-auto my-8">
        <table className="w-full border-collapse bg-paper">
          <thead>
            <tr className="bg-ink text-paper">
              <th className="px-4 py-3 text-left font-medium">English</th>
              <th className="px-4 py-3 text-left font-medium">Logic</th>
              <th className="px-4 py-3 text-left font-medium">Notes</th>
            </tr>
          </thead>
          <tbody className="text-ink-medium">
            <tr className="border-b border-ink/10"><td className="px-4 py-3">P and Q</td><td className="px-4 py-3 font-mono">P ∧ Q</td><td className="px-4 py-3">Both required</td></tr>
            <tr className="border-b border-ink/10"><td className="px-4 py-3">P or Q</td><td className="px-4 py-3 font-mono">P ∨ Q</td><td className="px-4 py-3">Inclusive or</td></tr>
            <tr className="border-b border-ink/10"><td className="px-4 py-3">not P</td><td className="px-4 py-3 font-mono">¬P</td><td className="px-4 py-3">Negation</td></tr>
            <tr className="border-b border-ink/10"><td className="px-4 py-3">if P then Q</td><td className="px-4 py-3 font-mono">P → Q</td><td className="px-4 py-3">Implication</td></tr>
            <tr className="border-b border-ink/10"><td className="px-4 py-3">P if and only if Q</td><td className="px-4 py-3 font-mono">P ↔ Q</td><td className="px-4 py-3">Biconditional</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="heading-1 mt-12">Tricky Patterns</h2>

      <h3 className="heading-2 mt-8">"Only if"</h3>
      <Definition term="A only if B">
        Translates to <LogicExpression>A → B</LogicExpression>. "I'll go only if you come" means if I go, you must come. My going requires your coming.
      </Definition>
      <Callout type="warning">
        Don't confuse "A only if B" with "A if B". They have opposite arrow directions!
        <br />• "A if B" = B → A (B is sufficient for A)
        <br />• "A only if B" = A → B (B is necessary for A)
      </Callout>

      <h3 className="heading-2 mt-8">"Unless"</h3>
      <Definition term="A unless B">
        Translates to <LogicExpression>¬B → A</LogicExpression> or equivalently <LogicExpression>¬A → B</LogicExpression>. "Unless" means "if not".
      </Definition>
      <p className="text-ink-medium mb-4">
        "You can't enter unless you pay" = If you don't pay, you can't enter = <LogicExpression>¬P → ¬E</LogicExpression>
      </p>

      <h3 className="heading-2 mt-8">"Neither...nor"</h3>
      <Definition term="Neither A nor B">
        Translates to <LogicExpression>¬A ∧ ¬B</LogicExpression>. Both are false. Equivalent to <LogicExpression>¬(A ∨ B)</LogicExpression> by De Morgan's Law.
      </Definition>

      <MiniQuiz
        question="Translate: 'You will pass only if you study and attend class.'"
        options={[
          "(S ∧ A) → P",
          "P → (S ∧ A)",
          "(S ∨ A) → P",
        ]}
        correct={1}
        explanation="'Only if' creates an implication FROM the main clause. If you pass, then you studied and attended. Passing requires both."
      />

      <h2 className="heading-1 mt-12">Ambiguity</h2>
      <p className="text-ink-medium mb-4">
        Some sentences have multiple valid translations. Consider: "You can have cake or ice cream."
      </p>
      <ul className="list-disc list-inside text-ink-medium space-y-2 mb-6">
        <li><strong>Inclusive:</strong> <LogicExpression>C ∨ I</LogicExpression> — at least one (maybe both)</li>
        <li><strong>Exclusive:</strong> <LogicExpression>(C ∨ I) ∧ ¬(C ∧ I)</LogicExpression> — exactly one</li>
      </ul>
      <Callout type="tip">
        When in doubt, ask for clarification. In formal contexts, assume inclusive OR unless explicitly stated otherwise.
      </Callout>

      <LessonNav moduleSlug={moduleSlug} onComplete={() => markLessonComplete(moduleSlug)} />
    </article>
  );
}

// ============================================
// MODULE 3: VALIDITY & PROOFS
// ============================================
function ValidityLesson({ moduleSlug }: { moduleSlug: string }) {
  const { markLessonComplete } = useProgress();

  return (
    <article className="stagger-reveal">
      <h1 className="font-display text-4xl lg:text-5xl text-ink mb-8 leading-tight">
        Validity & Proof Construction
      </h1>

      <Callout type="why">
        An argument can have true premises and a true conclusion but still be logically invalid. Validity is about the <em>structure</em> of reasoning, not the truth of individual claims.
      </Callout>

      <p className="body-large text-ink-medium mb-8">
        A valid argument is one where <em>if</em> the premises are true, the conclusion <em>must</em> be true. We'll learn the fundamental inference rules that let us construct valid proofs.
      </p>

      <h2 className="heading-1 mt-12">Key Inference Rules</h2>

      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div className="p-6 bg-paper border border-ink/10">
          <h3 className="heading-3 text-vermillion">Modus Ponens</h3>
          <div className="font-mono text-lg my-4 space-y-1">
            <p>P → Q</p>
            <p>P</p>
            <p className="border-t border-ink pt-1">∴ Q</p>
          </div>
          <p className="text-sm text-ink-light">If P implies Q, and P is true, then Q is true.</p>
        </div>

        <div className="p-6 bg-paper border border-ink/10">
          <h3 className="heading-3 text-vermillion">Modus Tollens</h3>
          <div className="font-mono text-lg my-4 space-y-1">
            <p>P → Q</p>
            <p>¬Q</p>
            <p className="border-t border-ink pt-1">∴ ¬P</p>
          </div>
          <p className="text-sm text-ink-light">If P implies Q, and Q is false, then P is false.</p>
        </div>

        <div className="p-6 bg-paper border border-ink/10">
          <h3 className="heading-3 text-vermillion">Hypothetical Syllogism</h3>
          <div className="font-mono text-lg my-4 space-y-1">
            <p>P → Q</p>
            <p>Q → R</p>
            <p className="border-t border-ink pt-1">∴ P → R</p>
          </div>
          <p className="text-sm text-ink-light">Chain implications together.</p>
        </div>

        <div className="p-6 bg-paper border border-ink/10">
          <h3 className="heading-3 text-vermillion">Disjunctive Syllogism</h3>
          <div className="font-mono text-lg my-4 space-y-1">
            <p>P ∨ Q</p>
            <p>¬P</p>
            <p className="border-t border-ink pt-1">∴ Q</p>
          </div>
          <p className="text-sm text-ink-light">If one disjunct is false, the other must be true.</p>
        </div>
      </div>

      <h2 className="heading-1 mt-12">Common Fallacies</h2>

      <Callout type="warning" title="Affirming the Consequent">
        <strong>Invalid:</strong> P → Q, Q, therefore P.
        <br />The conclusion doesn't follow! Q could be true for other reasons.
      </Callout>

      <Callout type="warning" title="Denying the Antecedent">
        <strong>Invalid:</strong> P → Q, ¬P, therefore ¬Q.
        <br />Just because P didn't happen doesn't mean Q can't happen another way.
      </Callout>

      <MiniQuiz
        question="Is this valid? 'If it rains, the ground is wet. The ground is wet. Therefore, it rained.'"
        options={[
          "Valid — Modus Ponens",
          "Invalid — Affirming the Consequent",
          "Invalid — Denying the Antecedent",
        ]}
        correct={1}
        explanation="This is Affirming the Consequent. The ground could be wet from sprinklers, a broken pipe, or morning dew. We can't conclude it rained."
      />

      <h2 className="heading-1 mt-12">Constructing Proofs</h2>
      <p className="text-ink-medium mb-4">
        A proof is a sequence of statements, each justified by an inference rule, leading from premises to conclusion.
      </p>

      <Expandable title="Example Proof: From (P → Q) and (Q → R) and P, prove R">
        <div className="font-mono bg-paper-aged p-4 space-y-2 text-sm">
          <p>1. P → Q <span className="text-ink-faded ml-4">(Premise)</span></p>
          <p>2. Q → R <span className="text-ink-faded ml-4">(Premise)</span></p>
          <p>3. P <span className="text-ink-faded ml-4">(Premise)</span></p>
          <p>4. Q <span className="text-ink-faded ml-4">(Modus Ponens: 1, 3)</span></p>
          <p>5. R <span className="text-ink-faded ml-4">(Modus Ponens: 2, 4)</span></p>
        </div>
      </Expandable>

      <LessonNav moduleSlug={moduleSlug} onComplete={() => markLessonComplete(moduleSlug)} />
    </article>
  );
}

// ============================================
// MODULE 4: PREDICATE LOGIC
// ============================================
function PredicateLesson({ moduleSlug }: { moduleSlug: string }) {
  const { markLessonComplete } = useProgress();

  return (
    <article className="stagger-reveal">
      <h1 className="font-display text-4xl lg:text-5xl text-ink mb-8 leading-tight">
        Predicate Logic & Quantifiers
      </h1>

      <Callout type="why">
        Propositional logic can't express "All humans are mortal" or "Some birds can't fly". Predicate logic adds <em>quantifiers</em> and <em>predicates</em> to handle these structures—the same structures you use in SQL queries every day.
      </Callout>

      <h2 className="heading-1 mt-12">Predicates</h2>
      <Definition term="Predicate">
        A function that takes objects and returns a truth value. <code className="logic-expression">Mortal(x)</code> is true if x is mortal.
      </Definition>

      <h2 className="heading-1 mt-12">Quantifiers</h2>

      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div className="p-6 bg-paper border-l-4 border-prussian">
          <h3 className="heading-3 text-prussian">Universal: ∀</h3>
          <p className="font-mono text-xl my-3">∀x P(x)</p>
          <p className="text-ink-medium">"For all x, P(x) is true"</p>
          <div className="mt-4 p-3 bg-paper-aged font-mono text-sm">
            <p className="text-ink-faded">SQL equivalent:</p>
            <p>NOT EXISTS (... WHERE NOT P)</p>
          </div>
        </div>

        <div className="p-6 bg-paper border-l-4 border-gold">
          <h3 className="heading-3 text-gold">Existential: ∃</h3>
          <p className="font-mono text-xl my-3">∃x P(x)</p>
          <p className="text-ink-medium">"There exists an x where P(x) is true"</p>
          <div className="mt-4 p-3 bg-paper-aged font-mono text-sm">
            <p className="text-ink-faded">SQL equivalent:</p>
            <p>EXISTS (SELECT * WHERE P)</p>
          </div>
        </div>
      </div>

      <h2 className="heading-1 mt-12">Negating Quantifiers</h2>
      <div className="bg-paper-aged p-6 my-6 font-mono text-lg space-y-2">
        <p>¬(∀x P(x)) ≡ ∃x ¬P(x)</p>
        <p>¬(∃x P(x)) ≡ ∀x ¬P(x)</p>
      </div>
      <p className="text-ink-medium">
        "Not all are P" = "At least one is not P"<br />
        "None exist with P" = "All lack P"
      </p>

      <h2 className="heading-1 mt-12">SQL Parallels</h2>
      <div className="overflow-x-auto my-8">
        <table className="w-full border-collapse bg-paper">
          <thead>
            <tr className="bg-ink text-paper">
              <th className="px-4 py-3 text-left">Logic</th>
              <th className="px-4 py-3 text-left">English</th>
              <th className="px-4 py-3 text-left">SQL Pattern</th>
            </tr>
          </thead>
          <tbody className="text-ink-medium font-mono text-sm">
            <tr className="border-b border-ink/10">
              <td className="px-4 py-3">∃x P(x)</td>
              <td className="px-4 py-3 font-sans">Some x has P</td>
              <td className="px-4 py-3">WHERE ... LIMIT 1</td>
            </tr>
            <tr className="border-b border-ink/10">
              <td className="px-4 py-3">∀x P(x)</td>
              <td className="px-4 py-3 font-sans">All x have P</td>
              <td className="px-4 py-3">NOT EXISTS (... WHERE NOT P)</td>
            </tr>
            <tr className="border-b border-ink/10">
              <td className="px-4 py-3">∀x(A(x)→B(x))</td>
              <td className="px-4 py-3 font-sans">All A are B</td>
              <td className="px-4 py-3">NOT EXISTS (A WHERE NOT B)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <MiniQuiz
        question="∀x∃y Loves(x,y) vs ∃y∀x Loves(x,y) — are these the same?"
        options={[
          "Yes, quantifier order doesn't matter",
          "No — first says everyone loves someone, second says someone is loved by everyone",
          "No — first says someone loves everyone, second says everyone is loved by someone",
        ]}
        correct={1}
        explanation="Order matters! ∀x∃y: Everyone loves someone (different people). ∃y∀x: There's ONE person everyone loves (same person)."
      />

      <Callout type="tip">
        When reading nested quantifiers, work outside-in. The outer quantifier has the larger scope.
      </Callout>

      <LessonNav moduleSlug={moduleSlug} onComplete={() => markLessonComplete(moduleSlug)} />
    </article>
  );
}

// ============================================
// MODULE 5: APPLICATIONS
// ============================================
function ApplicationsLesson({ moduleSlug }: { moduleSlug: string }) {
  const { markLessonComplete } = useProgress();

  return (
    <article className="stagger-reveal">
      <h1 className="font-display text-4xl lg:text-5xl text-ink mb-8 leading-tight">
        Fallacies & Logic Puzzles
      </h1>

      <Callout type="why">
        Logic isn't just academic—it's a defense against manipulation and a tool for puzzle-solving. This module applies everything you've learned to real-world fallacies and classic puzzles.
      </Callout>

      <h2 className="heading-1 mt-12">Formal Fallacies</h2>
      <p className="text-ink-medium mb-6">
        Formal fallacies are structural errors—the argument form itself is invalid, regardless of content.
      </p>

      <div className="space-y-4 my-8">
        <div className="p-5 bg-incorrect/5 border-l-4 border-incorrect">
          <h3 className="font-semibold text-ink mb-2">Affirming the Consequent</h3>
          <p className="font-mono text-sm mb-2">P → Q, Q ∴ P</p>
          <p className="text-ink-medium text-sm">"If it rains, the ground is wet. The ground is wet. Therefore it rained." (Could be sprinklers!)</p>
        </div>
        <div className="p-5 bg-incorrect/5 border-l-4 border-incorrect">
          <h3 className="font-semibold text-ink mb-2">Denying the Antecedent</h3>
          <p className="font-mono text-sm mb-2">P → Q, ¬P ∴ ¬Q</p>
          <p className="text-ink-medium text-sm">"If you study, you'll pass. You didn't study. Therefore you'll fail." (Could pass anyway!)</p>
        </div>
      </div>

      <h2 className="heading-1 mt-12">Informal Fallacies</h2>

      <div className="grid md:grid-cols-2 gap-4 my-8">
        {[
          { name: "Ad Hominem", desc: "Attacking the person, not the argument" },
          { name: "Straw Man", desc: "Misrepresenting an argument to attack it" },
          { name: "Appeal to Authority", desc: "Expertise doesn't transfer across fields" },
          { name: "False Dilemma", desc: "Presenting only two options when more exist" },
          { name: "Slippery Slope", desc: "Assuming extreme consequences without evidence" },
          { name: "Appeal to Popularity", desc: "Popularity ≠ truth" },
        ].map((f) => (
          <div key={f.name} className="p-4 bg-paper border border-ink/10">
            <h4 className="font-semibold text-vermillion">{f.name}</h4>
            <p className="text-sm text-ink-medium mt-1">{f.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="heading-1 mt-12">Knights & Knaves Puzzles</h2>
      <Definition term="Knights & Knaves">
        On an island, <strong>Knights</strong> always tell the truth and <strong>Knaves</strong> always lie. Given statements, deduce who is what.
      </Definition>

      <Expandable title="Example: A says 'B is a knave.' B says 'We are both knights.'">
        <div className="space-y-3 text-ink-medium">
          <p><strong>Assume B is a knight:</strong></p>
          <p className="ml-4">Then "We are both knights" is true → A is a knight</p>
          <p className="ml-4">But A (knight) says "B is a knave" → contradiction!</p>
          <p><strong>So B must be a knave:</strong></p>
          <p className="ml-4">"We are both knights" is false ✓ (B is a knave)</p>
          <p className="ml-4">A says "B is a knave" — this is TRUE</p>
          <p className="ml-4">So A must be a knight ✓</p>
          <p className="mt-4 font-semibold">Answer: A is a knight, B is a knave.</p>
        </div>
      </Expandable>

      <MiniQuiz
        question="A says: 'I am a knave.' What is A?"
        options={[
          "A is a knight",
          "A is a knave",
          "This is a paradox — impossible",
        ]}
        correct={2}
        explanation="If A is a knight (truth-teller), then 'I am a knave' must be true — contradiction. If A is a knave (liar), then 'I am a knave' must be false, meaning A is a knight — contradiction. No consistent assignment exists!"
      />

      <Callout type="tip">
        For Knights & Knaves: Assume one answer, trace the implications, check for contradictions. If contradiction, try the other assumption.
      </Callout>

      <LessonNav moduleSlug={moduleSlug} onComplete={() => markLessonComplete(moduleSlug)} />
    </article>
  );
}
