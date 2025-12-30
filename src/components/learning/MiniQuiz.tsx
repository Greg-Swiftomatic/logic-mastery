"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface MiniQuizProps {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export function MiniQuiz({ question, options, correct, explanation }: MiniQuizProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = (index: number) => {
    if (revealed) return;
    setSelected(index);
  };

  const handleCheck = () => {
    if (selected === null) return;
    setRevealed(true);
  };

  const handleReset = () => {
    setSelected(null);
    setRevealed(false);
  };

  const isCorrect = selected === correct;

  return (
    <div className="my-6 bg-warm-white border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gold-light px-4 py-2 border-b border-border flex items-center gap-2">
        <span className="text-gold">✦</span>
        <span className="text-sm font-medium text-charcoal">Quick Check</span>
      </div>

      {/* Question */}
      <div className="p-4">
        <p className="text-charcoal font-medium mb-4">{question}</p>

        {/* Options */}
        <div className="space-y-2">
          {options.map((option, index) => {
            const isSelected = selected === index;
            const isCorrectOption = index === correct;
            const showAsCorrect = revealed && isCorrectOption;
            const showAsIncorrect = revealed && isSelected && !isCorrectOption;

            return (
              <motion.button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={revealed}
                whileHover={{ scale: revealed ? 1 : 1.01 }}
                whileTap={{ scale: revealed ? 1 : 0.99 }}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-md border transition-all",
                  "flex items-center gap-3",
                  !revealed && !isSelected && "border-border hover:border-terracotta-light hover:bg-parchment",
                  !revealed && isSelected && "border-terracotta bg-terracotta/5",
                  showAsCorrect && "border-sage bg-sage-light",
                  showAsIncorrect && "border-dusty-rose bg-dusty-rose-light"
                )}
              >
                {/* Radio indicator */}
                <span
                  className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                    !revealed && !isSelected && "border-border",
                    !revealed && isSelected && "border-terracotta bg-terracotta",
                    showAsCorrect && "border-sage bg-sage",
                    showAsIncorrect && "border-dusty-rose bg-dusty-rose"
                  )}
                >
                  {(isSelected || showAsCorrect) && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 rounded-full bg-warm-white"
                    />
                  )}
                </span>

                {/* Option text */}
                <span
                  className={cn(
                    "text-sm",
                    showAsCorrect && "text-sage font-medium",
                    showAsIncorrect && "text-dusty-rose",
                    !revealed && "text-charcoal"
                  )}
                >
                  {option}
                </span>

                {/* Correct/incorrect indicator */}
                {revealed && (
                  <span className="ml-auto">
                    {showAsCorrect && <span className="text-sage">✓</span>}
                    {showAsIncorrect && <span className="text-dusty-rose">✗</span>}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Explanation */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 overflow-hidden"
            >
              <div
                className={cn(
                  "p-4 rounded-md",
                  isCorrect ? "bg-sage-light" : "bg-dusty-rose-light"
                )}
              >
                <p
                  className={cn(
                    "text-sm font-medium mb-1",
                    isCorrect ? "text-sage" : "text-dusty-rose"
                  )}
                >
                  {isCorrect ? "Correct!" : "Not quite..."}
                </p>
                <p className="text-sm text-charcoal">{explanation}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="mt-4 flex justify-end gap-2">
          {revealed ? (
            <button
              onClick={handleReset}
              className="px-4 py-2 text-sm font-medium text-slate hover:text-charcoal transition-colors"
            >
              Try Again
            </button>
          ) : (
            <button
              onClick={handleCheck}
              disabled={selected === null}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                selected !== null
                  ? "bg-terracotta text-warm-white hover:bg-terracotta-dark"
                  : "bg-border text-muted cursor-not-allowed"
              )}
            >
              Check Answer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
