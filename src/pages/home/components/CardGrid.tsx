import React from "react";
import { Card } from "./Card";
import { CARD_NUMBERS } from "../constants";

interface CardGridProps {
  onCardClick: (cardNumber: number) => void;
}

export const CardGrid: React.FC<CardGridProps> = ({ onCardClick }) => {
  return (
    <div className="font grid grid-flow-row grid-cols-3 grid-rows-4 gap-x-2 gap-y-2 h-full p-10">
      {CARD_NUMBERS.map((number) => (
        <Card key={number} number={number} onClick={onCardClick} />
      ))}
    </div>
  );
};
