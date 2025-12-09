import React from "react";
import { useCardFlip } from "./hooks/useCardFlip";
import { CardGrid } from "./components/CardGrid";
import { CardDetail } from "./components/CardDetail";

/**
 * Home page component displaying a grid of 12 flippable cards.
 * When a card is clicked, it flips to show detailed view.
 */
const Home: React.FC = () => {
  const { isCardFlipped, selectedCard, openCard, closeCard } = useCardFlip();

  return (
    <div className="flip-container">
      <div
        className={`flipper h-screen w-screen ${
          isCardFlipped ? "rotate-block" : ""
        }`}
      >
        <CardGrid onCardClick={openCard} />
        <CardDetail cardNumber={selectedCard} onClose={closeCard} />
      </div>
    </div>
  );
};

export default Home;
