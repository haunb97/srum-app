import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./index";

// Mock child components
jest.mock("./components/CardGrid", () => ({
  CardGrid: ({ onCardClick }: { onCardClick: (n: number) => void }) => (
    <div data-testid="card-grid">
      {[1, 2, 3].map((n) => (
        <button key={n} onClick={() => onCardClick(n)}>
          Card {n}
        </button>
      ))}
    </div>
  ),
}));

jest.mock("./components/CardDetail", () => ({
  CardDetail: ({
    cardNumber,
    onClose,
  }: {
    cardNumber: number | null;
    onClose: () => void;
  }) => (
    <div data-testid="card-detail">
      <div>Selected: {cardNumber ?? "None"}</div>
      <button onClick={onClose}>Back</button>
    </div>
  ),
}));

describe("Home", () => {
  it("should render card grid and card detail", () => {
    render(<Home />);

    expect(screen.getByTestId("card-grid")).toBeInTheDocument();
    expect(screen.getByTestId("card-detail")).toBeInTheDocument();
  });

  it("should not show flipped state initially", () => {
    const { container } = render(<Home />);

    const flipper = container.querySelector(".flipper");
    expect(flipper).not.toHaveClass("rotate-block");
    expect(screen.getByText("Selected: None")).toBeInTheDocument();
  });

  it("should flip card when card is clicked", async () => {
    const user = userEvent.setup();
    const { container } = render(<Home />);

    await user.click(screen.getByRole("button", { name: "Card 2" }));

    await waitFor(() => {
      const flipper = container.querySelector(".flipper");
      expect(flipper).toHaveClass("rotate-block");
      expect(screen.getByText("Selected: 2")).toBeInTheDocument();
    });
  });

  it("should close card detail when back button is clicked", async () => {
    const user = userEvent.setup();
    const { container } = render(<Home />);

    // First open a card
    await user.click(screen.getByRole("button", { name: "Card 1" }));

    await waitFor(() => {
      expect(screen.getByText("Selected: 1")).toBeInTheDocument();
    });

    // Then close it
    await user.click(screen.getByRole("button", { name: "Back" }));

    await waitFor(() => {
      const flipper = container.querySelector(".flipper");
      expect(flipper).not.toHaveClass("rotate-block");
      expect(screen.getByText("Selected: None")).toBeInTheDocument();
    });
  });

  it("should update selected card when different cards are clicked", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.click(screen.getByRole("button", { name: "Card 1" }));
    await waitFor(() => {
      expect(screen.getByText("Selected: 1")).toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: "Card 3" }));
    await waitFor(() => {
      expect(screen.getByText("Selected: 3")).toBeInTheDocument();
    });
  });
});
