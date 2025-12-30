"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ExerciseCard } from "@/components/practice/ExerciseCard";
import { useProgress } from "@/hooks/useProgress";
import { getModule } from "@/types/module";
import { getExercisesForModule } from "@/lib/exercises";

export default function PracticePage() {
  const params = useParams();
  const slug = params.slug as string;
  const module = getModule(slug);
  const { recordExerciseAttempt } = useProgress();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<Record<string, boolean>>({});

  const exercises = getExercisesForModule(slug);
  const currentExercise = exercises[currentIndex];

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
      <article>
        <h1 className="font-display text-4xl text-ink mb-6">Practice Exercises</h1>
        <p className="text-ink-medium text-lg">Exercises for this module are coming soon.</p>
        <div className="mt-8">
          <Link href={`/module/${slug}/summary`}>
            <button className="btn-primary">Continue to Summary →</button>
          </Link>
        </div>
      </article>
    );
  }

  const completedCount = Object.keys(results).length;
  const correctCount = Object.values(results).filter(Boolean).length;
  const isComplete = completedCount === exercises.length;

  return (
    <article>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl text-ink mb-2">Practice Exercises</h1>
          <p className="text-ink-light">
            {exercises.length} exercises • Test your understanding
          </p>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {exercises.map((_, i) => (
              <div
                key={i}
                className={`
                  w-2.5 h-2.5 transition-all
                  ${i < currentIndex 
                    ? results[exercises[i].id] 
                      ? 'bg-correct' 
                      : 'bg-incorrect' 
                    : i === currentIndex 
                      ? 'bg-vermillion' 
                      : 'bg-ink/20'
                  }
                `}
              />
            ))}
          </div>
          <span className="font-mono text-sm text-ink-light">
            {currentIndex + 1}/{exercises.length}
          </span>
        </div>
      </div>

      {/* Current exercise */}
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
      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className={`
            btn-secondary px-6 py-3
            ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          ← Previous
        </button>

        <div className="text-sm text-ink-light">
          {completedCount > 0 && (
            <span className="font-mono">
              {correctCount}/{completedCount} correct
            </span>
          )}
        </div>

        {currentIndex === exercises.length - 1 ? (
          <Link href={`/module/${slug}/summary`}>
            <button className="btn-primary px-6 py-3">
              View Summary →
            </button>
          </Link>
        ) : (
          <button
            onClick={handleNext}
            className="btn-secondary px-6 py-3"
          >
            Skip →
          </button>
        )}
      </div>

      {/* Completion celebration */}
      {isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 p-8 bg-correct/5 border-2 border-correct text-center"
        >
          <h3 className="font-display text-2xl text-correct mb-2">
            All Exercises Complete!
          </h3>
          <p className="text-ink-medium mb-6">
            You scored <span className="font-mono font-semibold">{correctCount}</span> out of{" "}
            <span className="font-mono font-semibold">{exercises.length}</span>{" "}
            ({Math.round((correctCount / exercises.length) * 100)}%)
          </p>
          <Link href={`/module/${slug}/summary`}>
            <button className="btn-primary px-8 py-3">
              Continue to Summary →
            </button>
          </Link>
        </motion.div>
      )}
    </article>
  );
}
