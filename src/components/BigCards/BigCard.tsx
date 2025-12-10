import React from "react";
import { useCardFlip } from "./hooks/useCardFlip";
import { FLIP_DELAY_MS, CARD_STYLES, BUTTON_STYLES } from "./constants";

interface BigCardProps {
  backToListCard: () => void;
  number?: number;
}

const BigCard: React.FC<BigCardProps> = ({ backToListCard, number }) => {
  const { isFlipped, flipCard, resetFlip } = useCardFlip(FLIP_DELAY_MS);

  const handleFlip = async () => {
    await flipCard();
  };

  const handleBack = () => {
    resetFlip();
    backToListCard();
  };

  const cardClasses = `font ${CARD_STYLES.bgColor} ${CARD_STYLES.width} ${CARD_STYLES.height} mx-auto ${CARD_STYLES.fontSize} flex items-center justify-center self-center ${CARD_STYLES.textColor} z-50 ${CARD_STYLES.rounded}`;
  const buttonClasses = `${BUTTON_STYLES.bgColor} ${BUTTON_STYLES.width} ${BUTTON_STYLES.height} ${BUTTON_STYLES.rounded} ${BUTTON_STYLES.textColor} mt-auto`;

  return (
    <div className="relative bg-white w-full h-full flip-container">
      <div
        className={`flipper w-full h-full flex items-stretch ${
          isFlipped ? "rotate-block" : ""
        }`}
        onClick={handleFlip}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleFlip();
          }
        }}
        aria-label={`Card ${number || ""}, click to flip`}
      >
        <div className={cardClasses}>{isFlipped ? "" : number}</div>
      </div>
      <div className="absolute bottom-10 w-full h-1/6 flex justify-center p-4">
        <button
          className={buttonClasses}
          onClick={handleBack}
          aria-label="Go back to card list"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default BigCard;
