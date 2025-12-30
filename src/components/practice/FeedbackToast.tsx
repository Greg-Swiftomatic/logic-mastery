"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface FeedbackToastProps {
  isVisible: boolean;
  isCorrect: boolean;
  message?: string;
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

export function FeedbackToast({
  isVisible,
  isCorrect,
  message,
  onClose,
  autoClose = true,
  duration = 3000,
}: FeedbackToastProps) {
  useEffect(() => {
    if (isVisible && autoClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, autoClose, duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        >
          <div
            className={cn(
              "flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg",
              isCorrect ? "bg-sage text-warm-white" : "bg-dusty-rose text-warm-white"
            )}
          >
            {/* Icon */}
            <span className="text-2xl">{isCorrect ? "✓" : "✗"}</span>

            {/* Message */}
            <div>
              <p className="font-medium">
                {isCorrect ? "Correct!" : "Not quite..."}
              </p>
              {message && <p className="text-sm opacity-90">{message}</p>}
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="ml-4 opacity-70 hover:opacity-100 transition-opacity"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
