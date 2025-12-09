import React from "react";
import BigCard from "../../../components/BigCards";

interface CardDetailProps {
  cardNumber: number | null;
  onClose: () => void;
}

export const CardDetail: React.FC<CardDetailProps> = ({
  cardNumber,
  onClose,
}) => {
  return (
    <div className="back">
      <BigCard backToListCard={onClose} number={cardNumber ?? undefined} />
    </div>
  );
};
