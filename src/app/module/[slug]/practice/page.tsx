"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { StepIndicator } from "@/components/ui/StepIndicator";
import { ExerciseCard } from "@/components/practice/ExerciseCard";
import { useProgress } from "@/hooks/useProgress";
import { getModule } from "@/types/module";
import { Exercise } from "@/types/exercise";

// Module 1 exercises
const propositionalExercises: Exercise[] = [
  {
    id: "prop-1-01",
    moduleId: 1,
    domain: "programming",
    difficulty: "beginner",
    context: "let isLoggedIn = true;\nlet hasPermission = false;",
    question: "What does (isLoggedIn && hasPermission) evaluate to?",
    answer: false,
    explanation: "The AND operator (&&) requires BOTH operands to be true. Since hasPermission is false, the entire expression is false.",
    hint: "AND returns true only when both sides are true.",
  },
  {
    id: "prop-1-02",
    moduleId: 1,
    domain: "programming",
    difficulty: "beginner",
    context: "let isLoggedIn = true;\nlet hasPermission = false;",
    question: "What does (isLoggedIn || hasPermission) evaluate to?",
    answer: true,
    explanation: "The OR operator (||) returns true if AT LEAST ONE operand is true. Since isLoggedIn is true, the expression is true.",
    hint: "OR returns true if either side (or both) is true.",
  },
  {
    id: "prop-1-03",
    moduleId: 1,
    domain: "everyday",
    difficulty: "beginner",
    question: "If P is false, what is ¬P?",
    answer: true,
    explanation: "Negation (¬) flips the truth value. If P is false, then ¬P (not P) is true.",
  },
  {
    id: "prop-1-04",
    moduleId: 1,
    domain: "science",
    difficulty: "intermediate",
    question: "In logic, if the hypothesis 'The chemical is acidic' is FALSE, and the conclusion 'The litmus paper turns red' is also FALSE, is the implication TRUE or FALSE?",
    answer: true,
    explanation: "An implication P → Q is only false when P is true and Q is false. When P is false (regardless of Q), the implication is vacuously true. This is often counterintuitive but mathematically consistent.",
    hint: "Recall: an implication is only false when we have T → F.",
  },
  {
    id: "prop-1-05",
    moduleId: 1,
    domain: "programming",
    difficulty: "intermediate",
    context: "let a = true;\nlet b = false;\nlet c = true;",
    question: "What does (a && b) || c evaluate to?",
    answer: true,
    explanation: "First evaluate (a && b): true && false = false. Then evaluate false || c: false || true = true. The && has higher precedence than ||.",
    hint: "Remember: AND is evaluated before OR.",
  },
  {
    id: "prop-1-06",
    moduleId: 1,
    domain: "law",
    difficulty: "intermediate",
    question: "A contract states: 'The warranty is valid if the product was purchased within 30 days AND registered online.' If the product was purchased within 30 days (TRUE) but NOT registered (FALSE), is the warranty valid?",
    answer: false,
    explanation: "The contract uses AND, meaning BOTH conditions must be met. Since registration is false, the entire condition is false, so the warranty is not valid.",
  },
  {
    id: "prop-1-07",
    moduleId: 1,
    domain: "everyday",
    difficulty: "intermediate",
    question: "If P ↔ Q is true, and P is true, what must Q be?",
    answer: true,
    explanation: "The biconditional P ↔ Q is true only when P and Q have the SAME truth value. If P is true and P ↔ Q is true, then Q must also be true.",
  },
  {
    id: "prop-1-08",
    moduleId: 1,
    domain: "programming",
    difficulty: "advanced",
    context: "let x = false;\nlet y = true;\nlet z = false;",
    question: "What does !x && (y || z) evaluate to?",
    answer: true,
    explanation: "Step by step: !x = !false = true. Then (y || z) = true || false = true. Finally, true && true = true.",
    hint: "Evaluate the negation first, then parentheses, then AND.",
  },
  {
    id: "prop-1-09",
    moduleId: 1,
    domain: "science",
    difficulty: "advanced",
    question: "De Morgan's Law states that ¬(P ∧ Q) is equivalent to (¬P ∨ ¬Q). If P is true and Q is false, verify this is correct by evaluating both sides.",
    answer: true,
    explanation: "Left side: ¬(P ∧ Q) = ¬(true ∧ false) = ¬false = true. Right side: (¬P ∨ ¬Q) = (false ∨ true) = true. Both sides equal true, confirming the equivalence.",
    hint: "Evaluate each side separately, then compare.",
  },
  {
    id: "prop-1-10",
    moduleId: 1,
    domain: "law",
    difficulty: "advanced",
    question: "A clause states: 'The defendant is guilty if and only if they had motive AND opportunity, OR there is DNA evidence.' Let M=motive (T), O=opportunity (F), D=DNA (T). Is the defendant guilty according to this clause?",
    answer: true,
    explanation: "The logical form is: Guilty ↔ ((M ∧ O) ∨ D). Evaluating: (M ∧ O) = (T ∧ F) = F. Then (F ∨ D) = (F ∨ T) = T. So Guilty ↔ T, meaning the defendant is guilty.",
    hint: "Parse the sentence carefully: (motive AND opportunity) OR DNA evidence.",
  },
  {
    id: "prop-1-11",
    moduleId: 1,
    domain: "programming",
    difficulty: "advanced",
    context: "function check(a, b) {\n  return !(a && b) === (!a || !b);\n}",
    question: "This function tests De Morgan's Law. Will check(true, false) return true?",
    answer: true,
    explanation: "Left side: !(true && false) = !false = true. Right side: (!true || !false) = (false || true) = true. Since true === true, the function returns true. De Morgan's Law holds!",
  },
  {
    id: "prop-1-12",
    moduleId: 1,
    domain: "everyday",
    difficulty: "beginner",
    question: "Is the statement 'If 2+2=5, then pigs can fly' true or false in propositional logic?",
    answer: true,
    explanation: "In propositional logic, an implication with a false premise is always true (vacuously true). Since '2+2=5' is false, the entire implication is true regardless of the conclusion.",
    hint: "What's the truth value of P → Q when P is false?",
  },
];

export default function PracticePage() {
  const params = useParams();
  const slug = params.slug as string;
  const module = getModule(slug);
  const { recordExerciseAttempt, getModule: getModuleProgress } = useProgress();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<Record<string, boolean>>({});

  // Get exercises for current module
  const exercises = slug === "propositional" ? propositionalExercises : [];

  const currentExercise = exercises[currentIndex];
  const progress = getModuleProgress(slug);

  const handleAnswer = (correct: boolean) => {
    if (currentExercise) {
      recordExerciseAttempt(slug, currentExercise.id, correct);
      setResults((prev) => ({
        ...prev,
        [currentExercise.id]: correct,
      }));
    }
  };

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (!module || exercises.length === 0) {
    return (
      <div className="animate-fade-in">
        <h1 className="font-display text-4xl font-semibold text-charcoal mt-0 mb-6">
          Practice Exercises
        </h1>
        <p className="text-slate text-lg">
          Exercises for this module are coming soon.
        </p>
        <div className="mt-8">
          <Link href={`/module/${slug}/summary`}>
            <Button>Continue to Summary →</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Calculate completion stats
  const completedCount = Object.keys(results).length;
  const correctCount = Object.values(results).filter(Boolean).length;
  const isComplete = completedCount === exercises.length;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-semibold text-charcoal mt-0 mb-1">
            Practice Exercises
          </h1>
          <p className="text-slate">
            Test your understanding with {exercises.length} exercises
          </p>
        </div>
        <StepIndicator current={currentIndex + 1} total={exercises.length} />
      </div>

      {/* Exercise */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentExercise.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <ExerciseCard
            exercise={currentExercise}
            onAnswer={handleAnswer}
            onNext={handleNext}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="mt-6 flex items-center justify-between">
        <Button
          variant="secondary"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          ← Previous
        </Button>

        <div className="text-sm text-slate">
          {completedCount > 0 && (
            <span>
              {correctCount}/{completedCount} correct
            </span>
          )}
        </div>

        {currentIndex === exercises.length - 1 ? (
          <Link href={`/module/${slug}/summary`}>
            <Button>Finish & View Summary →</Button>
          </Link>
        ) : (
          <Button
            variant="secondary"
            onClick={handleNext}
          >
            Skip →
          </Button>
        )}
      </div>

      {/* Completion message */}
      {isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 bg-sage-light rounded-lg text-center"
        >
          <h3 className="font-display text-xl font-semibold text-sage mb-2">
            🎉 All Exercises Complete!
          </h3>
          <p className="text-charcoal mb-4">
            You scored {correctCount} out of {exercises.length} (
            {Math.round((correctCount / exercises.length) * 100)}%)
          </p>
          <Link href={`/module/${slug}/summary`}>
            <Button>View Summary →</Button>
          </Link>
        </motion.div>
      )}
    </div>
  );
}
