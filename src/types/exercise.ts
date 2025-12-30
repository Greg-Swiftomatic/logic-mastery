import { Domain, Difficulty } from "./module";

export type AnswerType = boolean | string | string[];

export interface Exercise {
  id: string;
  moduleId: number;
  domain: Domain;
  difficulty: Difficulty;
  question: string;
  context?: string;
  answer: AnswerType;
  alternatives?: AnswerType[];
  explanation: string;
  hint?: string;
}

export interface ExerciseResult {
  exerciseId: string;
  correct: boolean;
  attempts: number;
  completedAt?: Date;
}
