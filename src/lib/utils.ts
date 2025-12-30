import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatTime(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

export function getDomainColor(domain: string): { bg: string; text: string; border: string } {
  const colors: Record<string, { bg: string; text: string; border: string }> = {
    programming: {
      bg: "bg-[#E8EEF4]",
      text: "text-[#6B8CAE]",
      border: "border-[#6B8CAE]",
    },
    law: {
      bg: "bg-[#F0EBE4]",
      text: "text-[#8B7355]",
      border: "border-[#8B7355]",
    },
    science: {
      bg: "bg-[#E8F0EA]",
      text: "text-[#7BA387]",
      border: "border-[#7BA387]",
    },
    everyday: {
      bg: "bg-[#F0EBF2]",
      text: "text-[#9B8AA6]",
      border: "border-[#9B8AA6]",
    },
  };
  return colors[domain] || colors.everyday;
}

export function getDifficultyLabel(difficulty: string): string {
  const labels: Record<string, string> = {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
  };
  return labels[difficulty] || difficulty;
}
