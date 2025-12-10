import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BigCard from "./BigCard";

describe("BigCard", () => {
  const mockBackToListCard = jest.fn();

  beforeEach(() => {
    mockBackToListCard.mockClear();
  });

  it("should render with card number", () => {
    render(<BigCard backToListCard={mockBackToListCard} number={5} />);

    expect(screen.getByLabelText(/Card 5/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /back/i })).toBeInTheDocument();
  });

  it("should render without card number", () => {
    render(<BigCard backToListCard={mockBackToListCard} />);

    expect(screen.getByLabelText(/Card/i)).toBeInTheDocument();
  });

  it("should flip card when clicked", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <BigCard backToListCard={mockBackToListCard} number={7} />
    );

    const flipper = container.querySelector(".flipper");
    expect(flipper).toHaveClass("rotate-block");

    await user.click(screen.getByLabelText(/Card 7/i));

    await waitFor(() => {
      expect(flipper).not.toHaveClass("rotate-block");
    });
  });

  it("should flip card when Enter key is pressed", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <BigCard backToListCard={mockBackToListCard} number={3} />
    );

    const flipper = container.querySelector(".flipper");
    const card = screen.getByLabelText(/Card 3/i);
    card.focus();

    await user.keyboard("{Enter}");

    await waitFor(() => {
      expect(flipper).not.toHaveClass("rotate-block");
    });
  });

  it("should flip card when Space key is pressed", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <BigCard backToListCard={mockBackToListCard} number={9} />
    );

    const flipper = container.querySelector(".flipper");
    const card = screen.getByLabelText(/Card 9/i);
    card.focus();

    await user.keyboard(" ");

    await waitFor(() => {
      expect(flipper).not.toHaveClass("rotate-block");
    });
  });

  it("should call backToListCard and reset flip when back button is clicked", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <BigCard backToListCard={mockBackToListCard} number={8} />
    );

    // First flip the card
    await user.click(screen.getByLabelText(/Card 8/i));
    await waitFor(() => {
      expect(container.querySelector(".flipper")).not.toHaveClass(
        "rotate-block"
      );
    });

    // Then click back
    await user.click(screen.getByRole("button", { name: /back/i }));

    expect(mockBackToListCard).toHaveBeenCalledTimes(1);
    expect(container.querySelector(".flipper")).toHaveClass("rotate-block");
  });

  it("should show number only when flipped", async () => {
    const user = userEvent.setup();
    render(<BigCard backToListCard={mockBackToListCard} number={12} />);

    const card = screen.getByLabelText(/Card 12/i);
    const cardContent = card.querySelector(".font");

    // Initially flipped (showing nothing)
    expect(cardContent?.textContent).toBe("");

    // Click to flip
    await user.click(card);

    // After flip, should show number
    await waitFor(() => {
      expect(cardContent?.textContent).toBe("12");
    });
  });
});
