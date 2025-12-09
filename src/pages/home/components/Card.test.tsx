import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Card } from "../components/Card";

describe("Card", () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it("should render card with number", () => {
    render(<Card number={5} onClick={mockOnClick} />);

    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Card 5" })).toBeInTheDocument();
  });

  it("should call onClick when card is clicked", async () => {
    const user = userEvent.setup();
    render(<Card number={3} onClick={mockOnClick} />);

    await user.click(screen.getByRole("button", { name: "Card 3" }));

    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith(3);
  });

  it("should call onClick when Enter key is pressed", async () => {
    const user = userEvent.setup();
    render(<Card number={7} onClick={mockOnClick} />);

    const card = screen.getByRole("button", { name: "Card 7" });
    card.focus();
    await user.keyboard("{Enter}");

    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith(7);
  });

  it("should call onClick when Space key is pressed", async () => {
    const user = userEvent.setup();
    render(<Card number={9} onClick={mockOnClick} />);

    const card = screen.getByRole("button", { name: "Card 9" });
    card.focus();
    await user.keyboard(" ");

    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith(9);
  });

  it("should not call onClick for other keys", async () => {
    const user = userEvent.setup();
    render(<Card number={2} onClick={mockOnClick} />);

    const card = screen.getByRole("button", { name: "Card 2" });
    card.focus();
    await user.keyboard("a");

    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
