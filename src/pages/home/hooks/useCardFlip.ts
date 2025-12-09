import { useState, useCallback } from "react";

interface UseCardFlipReturn {
  isCardFlipped: boolean;
  selectedCard: number | null;
  openCard: (cardNumber: number) => void;
  closeCard: () => void;
}

export const useCardFlip = (): UseCardFlipReturn => {
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const openCard = useCallback((cardNumber: number) => {
    setSelectedCard(cardNumber);
    setIsCardFlipped(true);
  }, []);

  const closeCard = useCallback(() => {
    setIsCardFlipped(false);
    setSelectedCard(null);
  }, []);

  return {
    isCardFlipped,
    selectedCard,
    openCard,
    closeCard,
  };
};
