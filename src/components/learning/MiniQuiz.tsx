"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="my-10 relative">
      {/* Decorative corner */}
      <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-gold"></div>
      <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-gold"></div>

      {/* Main container */}
      <div className="bg-gold-wash border border-gold/30 p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-8 flex items-center justify-center bg-gold text-paper font-mono font-bold text-sm">
            ?
          </span>
          <span className="caption text-gold">Quick Check</span>
        </div>

        {/* Question */}
        <p className="font-display text-xl text-ink mb-8 leading-relaxed">{question}</p>

        {/* Options */}
        <div className="space-y-3">
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
                whileHover={{ x: revealed ? 0 : 4 }}
                whileTap={{ scale: revealed ? 1 : 0.99 }}
                className={`
                  w-full text-left px-5 py-4 border-2 transition-all duration-200
                  flex items-center gap-4 group
                  ${!revealed && !isSelected && "border-ink/10 bg-paper hover:border-ink/30"}
                  ${!revealed && isSelected && "border-ink bg-paper-aged"}
                  ${showAsCorrect && "border-correct bg-correct/5"}
                  ${showAsIncorrect && "border-incorrect bg-incorrect/5"}
                `}
              >
                {/* Letter indicator */}
                <span
                  className={`
                    w-8 h-8 flex items-center justify-center font-mono font-semibold text-sm
                    border transition-all
                    ${!revealed && !isSelected && "border-ink/20 text-ink-light group-hover:border-ink/40"}
                    ${!revealed && isSelected && "border-ink bg-ink text-paper"}
                    ${showAsCorrect && "border-correct bg-correct text-paper"}
                    ${showAsIncorrect && "border-incorrect bg-incorrect text-paper"}
                  `}
                >
                  {String.fromCharCode(65 + index)}
                </span>

                {/* Option text */}
                <span className={`
                  flex-1 
                  ${showAsCorrect && "text-correct font-medium"}
                  ${showAsIncorrect && "text-incorrect"}
                  ${!revealed && "text-ink"}
                `}>
                  {option}
                </span>

                {/* Result indicator */}
                {revealed && (
                  <motion.span
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    className="text-xl"
                  >
                    {showAsCorrect && <span className="text-correct">✓</span>}
                    {showAsIncorrect && <span className="text-incorrect">✗</span>}
                  </motion.span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Explanation */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 24 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="overflow-hidden"
            >
              <div
                className={`
                  p-5 border-l-4
                  ${isCorrect ? "border-correct bg-correct/5" : "border-incorrect bg-incorrect/5"}
                `}
              >
                <p className={`
                  font-semibold mb-2 text-sm uppercase tracking-wide
                  ${isCorrect ? "text-correct" : "text-incorrect"}
                `}>
                  {isCorrect ? "Correct" : "Not quite"}
                </p>
                <p className="text-ink-medium leading-relaxed">{explanation}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-4">
          {revealed ? (
            <button
              onClick={handleReset}
              className="btn-secondary text-sm"
            >
              Try Again
            </button>
          ) : (
            <button
              onClick={handleCheck}
              disabled={selected === null}
              className={`
                font-medium text-sm px-6 py-3 transition-all
                ${selected !== null
                  ? "btn-primary"
                  : "bg-paper-dark text-ink-faded border border-ink/20 cursor-not-allowed"
                }
              `}
            >
              Check Answer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
