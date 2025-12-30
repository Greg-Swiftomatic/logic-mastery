import { Difficulty, MODULES } from "./module";

export interface ExerciseProgress {
  completed: boolean;
  correct: boolean;
  attempts: number;
  lastAttempt?: string; // ISO date string
}

export interface ModuleProgress {
  lessonCompleted: boolean;
  lessonCompletedAt?: string;
  examplesViewed: boolean;
  examplesViewedAt?: string;
  exercises: Record<string, ExerciseProgress>;
  summaryViewed: boolean;
  summaryViewedAt?: string;
}

export interface UserProgress {
  modules: Record<string, ModuleProgress>;
  lastVisited?: string; // module slug
  lastVisitedAt?: string;
  preferences: {
    difficulty: Difficulty;
    theme: "light" | "dark";
  };
}

export const DEFAULT_PROGRESS: UserProgress = {
  modules: {},
  preferences: {
    difficulty: "beginner",
    theme: "light",
  },
};

export function getModuleProgress(
  progress: UserProgress,
  moduleSlug: string
): ModuleProgress {
  return (
    progress.modules[moduleSlug] || {
      lessonCompleted: false,
      examplesViewed: false,
      exercises: {},
      summaryViewed: false,
    }
  );
}

export function calculateModuleCompletion(
  moduleProgress: ModuleProgress,
  moduleSlug?: string
): number {
  const sections = [
    moduleProgress.lessonCompleted,
    moduleProgress.examplesViewed,
    moduleProgress.summaryViewed,
  ];
  
  // Get total exercises from module definition
  const module = moduleSlug ? MODULES.find((m) => m.slug === moduleSlug) : null;
  const totalExercises = module?.exerciseCount || 0;
  
  const completedExercises = Object.values(moduleProgress.exercises).filter(
    (e) => e.completed
  ).length;
  
  const sectionWeight = 0.1; // 10% each for lesson, examples, summary
  const exerciseWeight = 0.7; // 70% for exercises
  
  const sectionScore = sections.filter(Boolean).length * sectionWeight;
  const exerciseScore = totalExercises > 0 
    ? (completedExercises / totalExercises) * exerciseWeight 
    : 0;
  
  return Math.round((sectionScore + exerciseScore) * 100);
}

export function calculateAccuracy(moduleProgress: ModuleProgress): number {
  const exercises = Object.values(moduleProgress.exercises);
  if (exercises.length === 0) return 0;
  
  const correctCount = exercises.filter((e) => e.correct).length;
  return Math.round((correctCount / exercises.length) * 100);
}
