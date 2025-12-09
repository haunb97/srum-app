import React from "react";

interface CardProps {
  number: number;
  onClick: (number: number) => void;
}

export const Card: React.FC<CardProps> = ({ number, onClick }) => {
  return (
    <div
      onClick={() => onClick(number)}
      className="bg-blue-200 w-full h-full rounded-md text-white text-4xl flex items-center justify-center cursor-pointer hover:bg-blue-300 transition-colors"
      role="button"
      aria-label={`Card ${number}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(number);
        }
      }}
    >
      {number}
    </div>
  );
};
