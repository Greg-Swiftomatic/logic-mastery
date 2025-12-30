export type Domain = "programming" | "law" | "science" | "everyday";
export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface Module {
  id: number;
  slug: string;
  title: string;
  description: string;
  icon: string;
  exerciseCount: number;
  estimatedTime: string;
  topics: string[];
}

export const MODULES: Module[] = [
  {
    id: 1,
    slug: "propositional",
    title: "Propositional Logic",
    description: "Connectives, truth tables, and compound expressions",
    icon: "∧",
    exerciseCount: 12,
    estimatedTime: "45 min",
    topics: ["Connectives", "Truth Tables", "De Morgan's Laws", "Logical Equivalence"],
  },
  {
    id: 2,
    slug: "translation",
    title: "Translation",
    description: "Converting natural language to logical notation",
    icon: "↔",
    exerciseCount: 15,
    estimatedTime: "60 min",
    topics: ["Direct Translation", "Ambiguous Sentences", "Tricky Patterns", "Legal Clauses"],
  },
  {
    id: 3,
    slug: "validity",
    title: "Validity & Proofs",
    description: "Constructing and verifying logical arguments",
    icon: "⊢",
    exerciseCount: 10,
    estimatedTime: "75 min",
    topics: ["Modus Ponens", "Modus Tollens", "Proof Construction", "Inference Rules"],
  },
  {
    id: 4,
    slug: "predicate",
    title: "Predicate Logic",
    description: "Quantifiers, relations, and structure",
    icon: "∀",
    exerciseCount: 12,
    estimatedTime: "60 min",
    topics: ["Universal Quantifier", "Existential Quantifier", "Nested Quantifiers", "SQL Parallels"],
  },
  {
    id: 5,
    slug: "applications",
    title: "Applications",
    description: "Fallacies, puzzles, and real-world reasoning",
    icon: "◊",
    exerciseCount: 15,
    estimatedTime: "90 min",
    topics: ["Formal Fallacies", "Informal Fallacies", "Knights & Knaves", "Logic Puzzles"],
  },
];

export function getModule(idOrSlug: number | string): Module | undefined {
  if (typeof idOrSlug === "number") {
    return MODULES.find((m) => m.id === idOrSlug);
  }
  return MODULES.find((m) => m.slug === idOrSlug);
}
