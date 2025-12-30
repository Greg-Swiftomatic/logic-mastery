"use client";

import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import {
  UserProgress,
  ModuleProgress,
  DEFAULT_PROGRESS,
  getModuleProgress,
  calculateModuleCompletion,
  calculateAccuracy,
} from "@/types/progress";
import { Difficulty } from "@/types/module";

const STORAGE_KEY = "logic-mastery-progress";

export function useProgress() {
  const [progress, setProgress] = useLocalStorage<UserProgress>(
    STORAGE_KEY,
    DEFAULT_PROGRESS
  );

  const getModule = useCallback(
    (moduleSlug: string): ModuleProgress => {
      return getModuleProgress(progress, moduleSlug);
    },
    [progress]
  );

  const markLessonComplete = useCallback(
    (moduleSlug: string) => {
      setProgress((prev) => ({
        ...prev,
        modules: {
          ...prev.modules,
          [moduleSlug]: {
            ...getModuleProgress(prev, moduleSlug),
            lessonCompleted: true,
            lessonCompletedAt: new Date().toISOString(),
          },
        },
        lastVisited: moduleSlug,
        lastVisitedAt: new Date().toISOString(),
      }));
    },
    [setProgress]
  );

  const markExamplesViewed = useCallback(
    (moduleSlug: string) => {
      setProgress((prev) => ({
        ...prev,
        modules: {
          ...prev.modules,
          [moduleSlug]: {
            ...getModuleProgress(prev, moduleSlug),
            examplesViewed: true,
            examplesViewedAt: new Date().toISOString(),
          },
        },
        lastVisited: moduleSlug,
        lastVisitedAt: new Date().toISOString(),
      }));
    },
    [setProgress]
  );

  const recordExerciseAttempt = useCallback(
    (moduleSlug: string, exerciseId: string, correct: boolean) => {
      setProgress((prev) => {
        const moduleProgress = getModuleProgress(prev, moduleSlug);
        const existingExercise = moduleProgress.exercises[exerciseId] || {
          completed: false,
          correct: false,
          attempts: 0,
        };

        return {
          ...prev,
          modules: {
            ...prev.modules,
            [moduleSlug]: {
              ...moduleProgress,
              exercises: {
                ...moduleProgress.exercises,
                [exerciseId]: {
                  completed: true,
                  correct: existingExercise.correct || correct, // Keep true if ever correct
                  attempts: existingExercise.attempts + 1,
                  lastAttempt: new Date().toISOString(),
                },
              },
            },
          },
          lastVisited: moduleSlug,
          lastVisitedAt: new Date().toISOString(),
        };
      });
    },
    [setProgress]
  );

  const markSummaryViewed = useCallback(
    (moduleSlug: string) => {
      setProgress((prev) => ({
        ...prev,
        modules: {
          ...prev.modules,
          [moduleSlug]: {
            ...getModuleProgress(prev, moduleSlug),
            summaryViewed: true,
            summaryViewedAt: new Date().toISOString(),
          },
        },
        lastVisited: moduleSlug,
        lastVisitedAt: new Date().toISOString(),
      }));
    },
    [setProgress]
  );

  const setDifficulty = useCallback(
    (difficulty: Difficulty) => {
      setProgress((prev) => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          difficulty,
        },
      }));
    },
    [setProgress]
  );

  const setTheme = useCallback(
    (theme: "light" | "dark") => {
      setProgress((prev) => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          theme,
        },
      }));
    },
    [setProgress]
  );

  const getModuleCompletion = useCallback(
    (moduleSlug: string): number => {
      return calculateModuleCompletion(getModuleProgress(progress, moduleSlug), moduleSlug);
    },
    [progress]
  );

  const getModuleAccuracy = useCallback(
    (moduleSlug: string): number => {
      return calculateAccuracy(getModuleProgress(progress, moduleSlug));
    },
    [progress]
  );

  const resetProgress = useCallback(() => {
    setProgress(DEFAULT_PROGRESS);
  }, [setProgress]);

  return {
    progress,
    getModule,
    markLessonComplete,
    markExamplesViewed,
    recordExerciseAttempt,
    markSummaryViewed,
    setDifficulty,
    setTheme,
    getModuleCompletion,
    getModuleAccuracy,
    resetProgress,
  };
}
