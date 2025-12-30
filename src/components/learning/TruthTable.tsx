"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

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
  // Replace variables with their boolean values
  let expr = expression;
  for (const [variable, value] of Object.entries(values)) {
    expr = expr.replace(new RegExp(variable, "g"), value ? "T" : "F");
  }

  // Evaluate the expression
  // Handle NOT (¬)
  while (expr.includes("¬T")) expr = expr.replace("¬T", "F");
  while (expr.includes("¬F")) expr = expr.replace("¬F", "T");

  // Handle AND (∧)
  while (expr.includes("T∧T")) expr = expr.replace("T∧T", "T");
  while (expr.includes("T∧F") || expr.includes("F∧T") || expr.includes("F∧F")) {
    expr = expr.replace(/[TF]∧[TF]/, "F");
  }

  // Handle OR (∨)
  while (expr.includes("F∨F")) expr = expr.replace("F∨F", "F");
  while (expr.includes("T∨T") || expr.includes("T∨F") || expr.includes("F∨T")) {
    expr = expr.replace(/[TF]∨[TF]/, "T");
  }

  // Handle IMPLIES (→)
  while (expr.includes("T→F")) expr = expr.replace("T→F", "F");
  while (expr.includes("T→T") || expr.includes("F→T") || expr.includes("F→F")) {
    expr = expr.replace(/[TF]→[TF]/, "T");
  }

  // Handle IFF (↔)
  while (expr.includes("T↔T") || expr.includes("F↔F")) {
    expr = expr.replace(/[TF]↔[TF]/, "T");
  }
  while (expr.includes("T↔F") || expr.includes("F↔T")) {
    expr = expr.replace(/[TF]↔[TF]/, "F");
  }

  // Handle parentheses recursively
  const parenMatch = expr.match(/\(([TF])\)/);
  if (parenMatch) {
    return evaluate(expr.replace(parenMatch[0], parenMatch[1]), {});
  }

  return expr === "T";
};

// Generate all combinations of truth values
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

  const handleCellClick = (rowIndex: number) => {
    if (!editable || revealed) return;

    setUserAnswers((prev) => ({
      ...prev,
      [rowIndex]:
        prev[rowIndex] === null ? true : prev[rowIndex] === true ? false : null,
    }));
  };

  const checkAnswers = () => {
    setRevealed(true);
  };

  const reset = () => {
    setUserAnswers(Object.fromEntries(combinations.map((_, i) => [i, null])));
    setRevealed(false);
  };

  const allAnswered = Object.values(userAnswers).every((v) => v !== null);
  const score = revealed
    ? correctAnswers.filter((correct, i) => userAnswers[i] === correct).length
    : null;

  return (
    <div className="my-6">
      <div className="bg-warm-white border border-border rounded-lg overflow-hidden">
        {/* Table header */}
        <div className="bg-parchment px-4 py-2 border-b border-border">
          <span className="font-mono text-sm text-charcoal">{expression}</span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {variables.map((v) => (
                  <th
                    key={v}
                    className="px-4 py-3 text-center font-mono font-semibold text-charcoal bg-parchment/50"
                  >
                    {v}
                  </th>
                ))}
                <th className="px-4 py-3 text-center font-mono font-semibold text-terracotta bg-parchment/50 border-l border-border">
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
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: rowIndex * 0.05 }}
                    className={cn(
                      "border-b border-border last:border-b-0",
                      isCorrect && "bg-sage-light",
                      isIncorrect && "bg-dusty-rose-light"
                    )}
                  >
                    {variables.map((v) => (
                      <td
                        key={v}
                        className="px-4 py-3 text-center font-mono text-slate"
                      >
                        <TruthBadge value={combo[v]} />
                      </td>
                    ))}
                    <td className="px-4 py-3 text-center border-l border-border">
                      {editable && !revealed ? (
                        <button
                          onClick={() => handleCellClick(rowIndex)}
                          className={cn(
                            "w-10 h-10 rounded-md font-mono font-bold transition-all",
                            userAnswer === null
                              ? "bg-parchment text-muted hover:bg-border"
                              : userAnswer
                              ? "bg-sage text-warm-white"
                              : "bg-dusty-rose text-warm-white"
                          )}
                        >
                          {userAnswer === null ? "?" : userAnswer ? "T" : "F"}
                        </button>
                      ) : (
                        <TruthBadge
                          value={revealed ? correctAnswer : null}
                          highlight
                        />
                      )}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Controls */}
        {editable && (
          <div className="px-4 py-3 bg-parchment/50 border-t border-border flex items-center justify-between">
            <div className="text-sm text-slate">
              {revealed ? (
                <span>
                  Score:{" "}
                  <span
                    className={cn(
                      "font-semibold",
                      score === combinations.length ? "text-sage" : "text-terracotta"
                    )}
                  >
                    {score}/{combinations.length}
                  </span>
                </span>
              ) : (
                <span>Click cells to toggle T/F</span>
              )}
            </div>
            <div className="flex gap-2">
              {revealed ? (
                <button
                  onClick={reset}
                  className="px-3 py-1.5 text-sm font-medium text-slate hover:text-charcoal transition-colors"
                >
                  Try Again
                </button>
              ) : (
                <button
                  onClick={checkAnswers}
                  disabled={!allAnswered}
                  className={cn(
                    "px-3 py-1.5 text-sm font-medium rounded transition-colors",
                    allAnswered
                      ? "bg-terracotta text-warm-white hover:bg-terracotta-dark"
                      : "bg-border text-muted cursor-not-allowed"
                  )}
                >
                  Check Answers
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TruthBadge({
  value,
  highlight = false,
}: {
  value: boolean | null;
  highlight?: boolean;
}) {
  if (value === null) {
    return <span className="text-muted">—</span>;
  }

  return (
    <span
      className={cn(
        "inline-block w-8 h-8 leading-8 rounded font-mono font-bold text-sm",
        value
          ? highlight
            ? "bg-sage text-warm-white"
            : "text-sage"
          : highlight
          ? "bg-dusty-rose text-warm-white"
          : "text-dusty-rose"
      )}
    >
      {value ? "T" : "F"}
    </span>
  );
}
