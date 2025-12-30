"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { DomainTag } from "@/components/ui/DomainTag";
import { Exercise, AnswerType } from "@/types/exercise";

interface ExerciseCardProps {
  exercise: Exercise;
  onAnswer: (correct: boolean) => void;
  onNext: () => void;
  showHint?: boolean;
}

export function ExerciseCard({
  exercise,
  onAnswer,
  onNext,
  showHint = false,
}: ExerciseCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<AnswerType | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);

  const isCorrect = () => {
    if (selectedAnswer === null) return false;

    // Check against main answer
    if (selectedAnswer === exercise.answer) return true;

    // Check against alternatives
    if (exercise.alternatives?.includes(selectedAnswer as string)) return true;

    return false;
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    const correct = isCorrect();
    setIsRevealed(true);
    onAnswer(correct);
  };

  const handleContinue = () => {
    setSelectedAnswer(null);
    setIsRevealed(false);
    setHintVisible(false);
    onNext();
  };

  // Determine answer type and render appropriate input
  const renderAnswerInput = () => {
    // Boolean answer (True/False)
    if (typeof exercise.answer === "boolean") {
      return (
        <div className="flex gap-4 justify-center">
          {[true, false].map((value) => (
            <motion.button
              key={String(value)}
              whileHover={{ scale: isRevealed ? 1 : 1.05 }}
              whileTap={{ scale: isRevealed ? 1 : 0.95 }}
              onClick={() => !isRevealed && setSelectedAnswer(value)}
              disabled={isRevealed}
              className={cn(
                "px-8 py-4 rounded-lg font-mono font-bold text-lg transition-all",
                "border-2",
                !isRevealed && selectedAnswer === null && "border-border bg-warm-white hover:border-terracotta",
                !isRevealed && selectedAnswer === value && "border-terracotta bg-terracotta/10",
                !isRevealed && selectedAnswer !== value && selectedAnswer !== null && "border-border bg-warm-white opacity-50",
                isRevealed && value === exercise.answer && "border-sage bg-sage-light",
                isRevealed && selectedAnswer === value && value !== exercise.answer && "border-dusty-rose bg-dusty-rose-light"
              )}
            >
              {value ? "TRUE" : "FALSE"}
            </motion.button>
          ))}
        </div>
      );
    }

    // String answer (text input or multiple choice - simplified as buttons for common answers)
    if (typeof exercise.answer === "string") {
      return (
        <div className="max-w-md mx-auto">
          <input
            type="text"
            value={(selectedAnswer as string) || ""}
            onChange={(e) => !isRevealed && setSelectedAnswer(e.target.value)}
            disabled={isRevealed}
            placeholder="Type your answer..."
            className={cn(
              "w-full px-4 py-3 rounded-lg border-2 font-mono text-center",
              "focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2",
              !isRevealed && "border-border bg-warm-white",
              isRevealed && isCorrect() && "border-sage bg-sage-light",
              isRevealed && !isCorrect() && "border-dusty-rose bg-dusty-rose-light"
            )}
          />
        </div>
      );
    }

    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-warm-white border border-border rounded-lg overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 py-4 bg-parchment border-b border-border flex items-center justify-between">
        <DomainTag domain={exercise.domain} size="sm" />
        <span className="text-xs text-muted capitalize">{exercise.difficulty}</span>
      </div>

      {/* Question */}
      <div className="p-6">
        {/* Context if provided */}
        {exercise.context && (
          <div className="mb-4 p-4 bg-parchment rounded-lg font-mono text-sm text-charcoal">
            {exercise.context}
          </div>
        )}

        {/* Question text */}
        <p className="text-lg text-charcoal text-center mb-8">{exercise.question}</p>

        {/* Answer input */}
        {renderAnswerInput()}

        {/* Hint */}
        {exercise.hint && !isRevealed && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setHintVisible(!hintVisible)}
              className="text-sm text-slate hover:text-terracotta transition-colors"
            >
              {hintVisible ? "Hide hint" : "💡 Show hint"}
            </button>
            <AnimatePresence>
              {hintVisible && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 p-3 bg-gold-light rounded-lg text-sm text-charcoal"
                >
                  {exercise.hint}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Feedback */}
        <AnimatePresence>
          {isRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "mt-6 p-4 rounded-lg",
                isCorrect() ? "bg-sage-light" : "bg-dusty-rose-light"
              )}
            >
              <p
                className={cn(
                  "font-medium mb-2",
                  isCorrect() ? "text-sage" : "text-dusty-rose"
                )}
              >
                {isCorrect() ? "✓ Correct!" : "✗ Not quite..."}
              </p>
              <p className="text-sm text-charcoal">{exercise.explanation}</p>
              {!isCorrect() && (
                <p className="text-sm text-slate mt-2">
                  The correct answer was:{" "}
                  <span className="font-mono font-medium">
                    {String(exercise.answer)}
                  </span>
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Actions */}
      <div className="px-6 py-4 border-t border-border flex justify-end gap-3">
        {!isRevealed ? (
          <Button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            variant={selectedAnswer === null ? "secondary" : "primary"}
          >
            Check Answer
          </Button>
        ) : (
          <Button onClick={handleContinue}>
            Continue →
          </Button>
        )}
      </div>
    </motion.div>
  );
}
