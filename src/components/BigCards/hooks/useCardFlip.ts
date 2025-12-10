import { useState, useCallback } from "react";

interface UseCardFlipReturn {
  isFlipped: boolean;
  flipCard: () => Promise<void>;
  resetFlip: () => void;
}

const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const useCardFlip = (delayMs: number = 50): UseCardFlipReturn => {
  const [isFlipped, setIsFlipped] = useState(true);

  const flipCard = useCallback(async () => {
    await delay(delayMs);
    setIsFlipped((prev) => !prev);
  }, [delayMs]);

  const resetFlip = useCallback(() => {
    setIsFlipped(true);
  }, []);

  return {
    isFlipped,
    flipCard,
    resetFlip,
  };
};
