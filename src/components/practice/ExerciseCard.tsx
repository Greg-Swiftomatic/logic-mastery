"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Exercise, AnswerType } from "@/types/exercise";
import { Domain } from "@/types/module";

interface ExerciseCardProps {
  exercise: Exercise;
  onAnswer: (correct: boolean) => void;
  onNext: () => void;
  showHint?: boolean;
}

const domainConfig: Record<Domain, { icon: string; label: string; color: string }> = {
  programming: { icon: "{ }", label: "Programming", color: "prussian" },
  law: { icon: "§", label: "Law", color: "gold" },
  science: { icon: "⚗", label: "Science", color: "correct" },
  everyday: { icon: "∿", label: "Everyday", color: "vermillion" },
};

export function ExerciseCard({
  exercise,
  onAnswer,
  onNext,
}: ExerciseCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<AnswerType | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);

  const domain = domainConfig[exercise.domain];

  const isCorrect = () => {
    if (selectedAnswer === null) return false;
    if (selectedAnswer === exercise.answer) return true;
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

  const renderAnswerInput = () => {
    if (typeof exercise.answer === "boolean") {
      return (
        <div className="flex gap-6 justify-center">
          {[true, false].map((value) => {
            const isSelected = selectedAnswer === value;
            const isCorrectAnswer = value === exercise.answer;
            const showAsCorrect = isRevealed && isCorrectAnswer;
            const showAsIncorrect = isRevealed && isSelected && !isCorrectAnswer;

            return (
              <motion.button
                key={String(value)}
                whileHover={{ scale: isRevealed ? 1 : 1.03, y: isRevealed ? 0 : -2 }}
                whileTap={{ scale: isRevealed ? 1 : 0.97 }}
                onClick={() => !isRevealed && setSelectedAnswer(value)}
                disabled={isRevealed}
                className={`
                  relative w-32 py-6 font-mono font-bold text-xl
                  border-2 transition-all duration-200
                  ${!isRevealed && !isSelected && "border-ink/20 bg-paper text-ink hover:border-ink/40"}
                  ${!isRevealed && isSelected && "border-ink bg-ink text-paper"}
                  ${showAsCorrect && "border-correct bg-correct text-paper"}
                  ${showAsIncorrect && "border-incorrect bg-incorrect text-paper"}
                `}
                style={{
                  boxShadow: !isRevealed && !isSelected
                    ? '0 4px 0 var(--color-ink-faded), 0 6px 12px rgba(26,24,20,0.1)'
                    : isSelected && !isRevealed
                    ? 'inset 0 2px 4px rgba(0,0,0,0.2)'
                    : 'none'
                }}
              >
                {value ? "TRUE" : "FALSE"}
                
                {/* Stamp effect on reveal */}
                {showAsCorrect && (
                  <motion.span
                    initial={{ scale: 2, opacity: 0, rotate: -15 }}
                    animate={{ scale: 1, opacity: 1, rotate: -5 }}
                    className="absolute -top-3 -right-3 bg-correct text-paper text-xs px-2 py-1 font-bold"
                  >
                    ✓
                  </motion.span>
                )}
                {showAsIncorrect && (
                  <motion.span
                    initial={{ scale: 2, opacity: 0, rotate: 15 }}
                    animate={{ scale: 1, opacity: 1, rotate: 5 }}
                    className="absolute -top-3 -right-3 bg-incorrect text-paper text-xs px-2 py-1 font-bold"
                  >
                    ✗
                  </motion.span>
                )}
              </motion.button>
            );
          })}
        </div>
      );
    }

    if (typeof exercise.answer === "string") {
      return (
        <div className="max-w-md mx-auto">
          <input
            type="text"
            value={(selectedAnswer as string) || ""}
            onChange={(e) => !isRevealed && setSelectedAnswer(e.target.value)}
            disabled={isRevealed}
            placeholder="Type your answer..."
            className={`
              w-full px-5 py-4 font-mono text-center text-lg
              border-2 transition-all
              focus:outline-none focus:ring-2 focus:ring-vermillion focus:ring-offset-2
              ${!isRevealed && "border-ink/20 bg-paper"}
              ${isRevealed && isCorrect() && "border-correct bg-correct/5"}
              ${isRevealed && !isCorrect() && "border-incorrect bg-incorrect/5"}
            `}
          />
        </div>
      );
    }

    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      {/* Main card */}
      <div 
        className="bg-paper border-2 border-ink"
        style={{
          boxShadow: '4px 4px 0 var(--color-ink)'
        }}
      >
        {/* Header strip */}
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-ink bg-paper-aged">
          {/* Domain badge */}
          <div className="flex items-center gap-3">
            <span 
              className="w-8 h-8 flex items-center justify-center font-mono text-sm"
              style={{
                background: `var(--color-${domain.color}-wash, var(--color-paper))`,
                color: `var(--color-${domain.color})`,
                border: `1px solid var(--color-${domain.color})`
              }}
            >
              {domain.icon}
            </span>
            <span className="caption" style={{ color: `var(--color-${domain.color})` }}>
              {domain.label}
            </span>
          </div>

          {/* Difficulty */}
          <span className="text-xs text-ink-faded uppercase tracking-wider">
            {exercise.difficulty}
          </span>
        </div>

        {/* Question body */}
        <div className="p-8">
          {/* Context block */}
          {exercise.context && (
            <div className="mb-6 p-4 bg-paper-dark border border-ink/10 font-mono text-sm text-ink">
              <pre className="whitespace-pre-wrap">{exercise.context}</pre>
            </div>
          )}

          {/* Question */}
          <p className="font-display text-xl text-ink text-center mb-10 leading-relaxed">
            {exercise.question}
          </p>

          {/* Answer input */}
          {renderAnswerInput()}

          {/* Hint section */}
          {exercise.hint && !isRevealed && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setHintVisible(!hintVisible)}
                className="text-sm text-ink-light hover:text-gold transition-colors flex items-center gap-2 mx-auto"
              >
                <span className="font-mono">?</span>
                {hintVisible ? "Hide hint" : "Show hint"}
              </button>
              <AnimatePresence>
                {hintVisible && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 p-4 bg-gold-wash border-l-4 border-gold text-sm text-ink-medium">
                      {exercise.hint}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Feedback */}
          <AnimatePresence>
            {isRevealed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8"
              >
                <div
                  className={`
                    p-6 border-l-4
                    ${isCorrect() 
                      ? "border-correct bg-correct/5" 
                      : "border-incorrect bg-incorrect/5"
                    }
                  `}
                >
                  <p className={`
                    font-semibold mb-2 flex items-center gap-2
                    ${isCorrect() ? "text-correct" : "text-incorrect"}
                  `}>
                    <span className="text-lg">{isCorrect() ? "✓" : "✗"}</span>
                    {isCorrect() ? "Correct" : "Not quite"}
                  </p>
                  <p className="text-ink-medium leading-relaxed">{exercise.explanation}</p>
                  {!isCorrect() && (
                    <p className="text-sm text-ink-light mt-3 pt-3 border-t border-ink/10">
                      The correct answer was:{" "}
                      <span className="font-mono font-semibold text-ink">
                        {String(exercise.answer).toUpperCase()}
                      </span>
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action bar */}
        <div className="px-6 py-4 border-t-2 border-ink bg-paper-aged flex justify-end gap-4">
          {!isRevealed ? (
            <button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className={`
                font-medium px-8 py-3 transition-all
                ${selectedAnswer !== null
                  ? "btn-primary"
                  : "bg-paper-dark text-ink-faded border border-ink/20 cursor-not-allowed"
                }
              `}
            >
              Check Answer
            </button>
          ) : (
            <motion.button
              whileHover={{ x: 4 }}
              onClick={handleContinue}
              className="btn-primary flex items-center gap-2 px-8 py-3"
            >
              Continue
              <span>→</span>
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
