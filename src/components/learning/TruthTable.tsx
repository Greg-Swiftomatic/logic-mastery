"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TruthTableProps {
  variables: string[];
  expression: string;
  editable?: boolean;
  showAnswer?: boolean;
}

// Logic evaluation functions
const evaluate = (
  expression: string,
  values: Record<string, boolean>
): boolean => {
  let expr = expression;
  for (const [variable, value] of Object.entries(values)) {
    expr = expr.replace(new RegExp(variable, "g"), value ? "T" : "F");
  }

  while (expr.includes("¬T")) expr = expr.replace("¬T", "F");
  while (expr.includes("¬F")) expr = expr.replace("¬F", "T");

  while (expr.includes("T∧T")) expr = expr.replace("T∧T", "T");
  while (expr.includes("T∧F") || expr.includes("F∧T") || expr.includes("F∧F")) {
    expr = expr.replace(/[TF]∧[TF]/, "F");
  }

  while (expr.includes("F∨F")) expr = expr.replace("F∨F", "F");
  while (expr.includes("T∨T") || expr.includes("T∨F") || expr.includes("F∨T")) {
    expr = expr.replace(/[TF]∨[TF]/, "T");
  }

  while (expr.includes("T→F")) expr = expr.replace("T→F", "F");
  while (expr.includes("T→T") || expr.includes("F→T") || expr.includes("F→F")) {
    expr = expr.replace(/[TF]→[TF]/, "T");
  }

  while (expr.includes("T↔T") || expr.includes("F↔F")) {
    expr = expr.replace(/[TF]↔[TF]/, "T");
  }
  while (expr.includes("T↔F") || expr.includes("F↔T")) {
    expr = expr.replace(/[TF]↔[TF]/, "F");
  }

  const parenMatch = expr.match(/\(([TF])\)/);
  if (parenMatch) {
    return evaluate(expr.replace(parenMatch[0], parenMatch[1]), {});
  }

  return expr === "T";
};

const generateCombinations = (variables: string[]): Record<string, boolean>[] => {
  const n = variables.length;
  const combinations: Record<string, boolean>[] = [];

  for (let i = 0; i < Math.pow(2, n); i++) {
    const combo: Record<string, boolean> = {};
    for (let j = 0; j < n; j++) {
      combo[variables[j]] = !!(i & (1 << (n - 1 - j)));
    }
    combinations.push(combo);
  }

  return combinations;
};

export function TruthTable({
  variables,
  expression,
  editable = false,
  showAnswer = false,
}: TruthTableProps) {
  const combinations = useMemo(() => generateCombinations(variables), [variables]);
  const [userAnswers, setUserAnswers] = useState<Record<number, boolean | null>>(
    () => Object.fromEntries(combinations.map((_, i) => [i, null]))
  );
  const [revealed, setRevealed] = useState(!editable || showAnswer);

  const correctAnswers = useMemo(
    () => combinations.map((combo) => evaluate(expression, combo)),
    [combinations, expression]
  );

  const handleToggle = (rowIndex: number, value: boolean) => {
    if (!editable || revealed) return;
    setUserAnswers((prev) => ({
      ...prev,
      [rowIndex]: prev[rowIndex] === value ? null : value,
    }));
  };

  const checkAnswers = () => setRevealed(true);

  const reset = () => {
    setUserAnswers(Object.fromEntries(combinations.map((_, i) => [i, null])));
    setRevealed(false);
  };

  const allAnswered = Object.values(userAnswers).every((v) => v !== null);
  const score = revealed
    ? correctAnswers.filter((correct, i) => userAnswers[i] === correct).length
    : null;

  return (
    <div className="my-10">
      {/* Expression header - editorial style */}
      <div className="flex items-center gap-4 mb-4">
        <span className="caption">Truth Table</span>
        <span className="flex-1 h-px bg-ink/10"></span>
        <span className="font-mono text-lg text-vermillion font-medium">{expression}</span>
      </div>

      {/* Main table container - mechanical/instrument feel */}
      <div 
        className="relative bg-paper border-2 border-ink"
        style={{
          boxShadow: `
            inset 0 1px 0 rgba(255,255,255,0.5),
            0 4px 0 var(--color-ink-medium),
            0 6px 12px rgba(26,24,20,0.15)
          `
        }}
      >
        {/* Corner rivets */}
        <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-ink/20 shadow-inner"></div>
        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-ink/20 shadow-inner"></div>
        <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-ink/20 shadow-inner"></div>
        <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-ink/20 shadow-inner"></div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {variables.map((v, i) => (
                  <th
                    key={v}
                    className="px-6 py-4 text-center font-mono text-sm font-semibold text-paper bg-ink tracking-wider"
                    style={{
                      borderRight: i === variables.length - 1 ? '2px solid var(--color-ink)' : '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    {v}
                  </th>
                ))}
                <th 
                  className="px-6 py-4 text-center font-mono text-sm font-semibold tracking-wider"
                  style={{
                    background: 'var(--color-gold)',
                    color: 'var(--color-ink)'
                  }}
                >
                  {expression}
                </th>
              </tr>
            </thead>
            <tbody>
              {combinations.map((combo, rowIndex) => {
                const correctAnswer = correctAnswers[rowIndex];
                const userAnswer = userAnswers[rowIndex];
                const isCorrect = revealed && userAnswer === correctAnswer;
                const isIncorrect = revealed && userAnswer !== null && userAnswer !== correctAnswer;

                return (
                  <motion.tr
                    key={rowIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: rowIndex * 0.05 }}
                    className={`
                      border-b border-ink/10 transition-colors duration-200
                      ${isCorrect ? 'bg-correct/10' : ''}
                      ${isIncorrect ? 'bg-incorrect/10' : ''}
                      ${!revealed ? 'hover:bg-paper-aged' : ''}
                    `}
                  >
                    {variables.map((v, i) => (
                      <td
                        key={v}
                        className="px-6 py-4 text-center font-mono"
                        style={{
                          borderRight: i === variables.length - 1 ? '2px solid var(--color-ink)' : '1px solid var(--color-ink-faded)'
                        }}
                      >
                        <TruthIndicator value={combo[v]} />
                      </td>
                    ))}
                    <td className="px-6 py-4 text-center" style={{ background: 'var(--color-gold-wash)' }}>
                      {editable && !revealed ? (
                        <div className="flex justify-center gap-2">
                          <TruthSwitch
                            value={true}
                            selected={userAnswer === true}
                            onClick={() => handleToggle(rowIndex, true)}
                          />
                          <TruthSwitch
                            value={false}
                            selected={userAnswer === false}
                            onClick={() => handleToggle(rowIndex, false)}
                          />
                        </div>
                      ) : (
                        <TruthIndicator 
                          value={revealed ? correctAnswer : null} 
                          large 
                          showResult={revealed}
                          isCorrect={isCorrect}
                          isIncorrect={isIncorrect}
                        />
                      )}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Control panel */}
        {editable && (
          <div 
            className="flex items-center justify-between px-6 py-4 border-t-2 border-ink"
            style={{ background: 'var(--color-paper-dark)' }}
          >
            <div className="text-sm">
              {revealed ? (
                <span className="font-mono">
                  Result:{" "}
                  <span className={score === combinations.length ? "text-correct font-semibold" : "text-incorrect font-semibold"}>
                    {score}/{combinations.length}
                  </span>
                  {score === combinations.length && (
                    <motion.span 
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="ml-2 text-correct"
                    >
                      ✓ Perfect
                    </motion.span>
                  )}
                </span>
              ) : (
                <span className="text-ink-light">Select T or F for each row</span>
              )}
            </div>
            <div className="flex gap-3">
              {revealed ? (
                <button
                  onClick={reset}
                  className="btn-secondary text-sm"
                >
                  Reset
                </button>
              ) : (
                <button
                  onClick={checkAnswers}
                  disabled={!allAnswered}
                  className={`
                    font-medium text-sm px-5 py-2 transition-all
                    ${allAnswered
                      ? "btn-primary"
                      : "bg-paper-dark text-ink-faded border border-ink/20 cursor-not-allowed"
                    }
                  `}
                >
                  Verify Answers
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Truth value indicator - like an old instrument readout
function TruthIndicator({
  value,
  large = false,
  showResult = false,
  isCorrect = false,
  isIncorrect = false,
}: {
  value: boolean | null;
  large?: boolean;
  showResult?: boolean;
  isCorrect?: boolean;
  isIncorrect?: boolean;
}) {
  if (value === null) {
    return <span className="text-ink-faded text-lg">—</span>;
  }

  return (
    <motion.span
      initial={showResult ? { scale: 1.5, opacity: 0 } : false}
      animate={{ scale: 1, opacity: 1 }}
      className={`
        inline-flex items-center justify-center font-mono font-bold
        ${large ? 'text-xl w-10 h-10' : 'text-base w-8 h-8'}
        ${value 
          ? isCorrect 
            ? 'text-correct' 
            : isIncorrect 
              ? 'text-ink-light line-through' 
              : 'text-correct'
          : isCorrect 
            ? 'text-incorrect' 
            : isIncorrect 
              ? 'text-ink-light line-through' 
              : 'text-incorrect'
        }
      `}
    >
      {value ? "T" : "F"}
      {showResult && isCorrect && (
        <motion.span 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="ml-1 text-correct text-sm"
        >
          ✓
        </motion.span>
      )}
    </motion.span>
  );
}

// Mechanical toggle switch for T/F selection
function TruthSwitch({
  value,
  selected,
  onClick,
}: {
  value: boolean;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        w-10 h-10 font-mono font-bold text-sm
        border-2 transition-all duration-100
        ${selected
          ? value
            ? "bg-correct text-paper border-correct shadow-inner"
            : "bg-incorrect text-paper border-incorrect shadow-inner"
          : "bg-paper text-ink-light border-ink/30 hover:border-ink/50"
        }
      `}
      style={{
        boxShadow: selected 
          ? 'inset 0 2px 4px rgba(0,0,0,0.2)'
          : '0 2px 0 var(--color-ink-faded), 0 3px 6px rgba(26,24,20,0.1)'
      }}
    >
      {value ? "T" : "F"}
    </motion.button>
  );
}
