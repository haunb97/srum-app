import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CardDetail } from "../components/CardDetail";

// Mock BigCard component
jest.mock("../../../components/BigCards", () => ({
  __esModule: true,
  default: ({
    backToListCard,
    number,
  }: {
    backToListCard: () => void;
    number?: number;
  }) => (
    <div data-testid="big-card">
      <div>Card Number: {number ?? "None"}</div>
      <button onClick={backToListCard}>Close</button>
    </div>
  ),
}));

describe("CardDetail", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it("should render with card number", () => {
    render(<CardDetail cardNumber={7} onClose={mockOnClose} />);

    expect(screen.getByTestId("big-card")).toBeInTheDocument();
    expect(screen.getByText("Card Number: 7")).toBeInTheDocument();
  });

  it("should render with null card number", () => {
    render(<CardDetail cardNumber={null} onClose={mockOnClose} />);

    expect(screen.getByTestId("big-card")).toBeInTheDocument();
    expect(screen.getByText("Card Number: None")).toBeInTheDocument();
  });

  it("should call onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    render(<CardDetail cardNumber={3} onClose={mockOnClose} />);

    await user.click(screen.getByRole("button", { name: "Close" }));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
