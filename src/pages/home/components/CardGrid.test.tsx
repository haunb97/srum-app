import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CardGrid } from "../components/CardGrid";
import { CARD_COUNT } from "../constants";

describe("CardGrid", () => {
  const mockOnCardClick = jest.fn();

  beforeEach(() => {
    mockOnCardClick.mockClear();
  });

  it("should render 12 cards", () => {
    render(<CardGrid onCardClick={mockOnCardClick} />);

    for (let i = 1; i <= CARD_COUNT; i++) {
      expect(
        screen.getByRole("button", { name: `Card ${i}` })
      ).toBeInTheDocument();
    }
  });

  it("should call onCardClick with correct number when card is clicked", async () => {
    const user = userEvent.setup();
    render(<CardGrid onCardClick={mockOnCardClick} />);

    await user.click(screen.getByRole("button", { name: "Card 5" }));

    expect(mockOnCardClick).toHaveBeenCalledTimes(1);
    expect(mockOnCardClick).toHaveBeenCalledWith(5);
  });

  it("should render all cards with unique keys", () => {
    const { container } = render(<CardGrid onCardClick={mockOnCardClick} />);

    const cards = container.querySelectorAll('[role="button"]');
    expect(cards).toHaveLength(CARD_COUNT);
  });

  it("should display numbers in correct order", () => {
    render(<CardGrid onCardClick={mockOnCardClick} />);

    const cards = screen.getAllByRole("button");
    expect(cards[0]).toHaveTextContent("1");
    expect(cards[11]).toHaveTextContent("12");
  });
});
