import { renderHook, act } from "@testing-library/react";
import { useCardFlip } from "../hooks/useCardFlip";

describe("useCardFlip", () => {
  it("should initialize with default values", () => {
    const { result } = renderHook(() => useCardFlip());

    expect(result.current.isCardFlipped).toBe(false);
    expect(result.current.selectedCard).toBe(null);
  });

  it("should open a card when openCard is called", () => {
    const { result } = renderHook(() => useCardFlip());

    act(() => {
      result.current.openCard(5);
    });

    expect(result.current.isCardFlipped).toBe(true);
    expect(result.current.selectedCard).toBe(5);
  });

  it("should close a card when closeCard is called", () => {
    const { result } = renderHook(() => useCardFlip());

    // First open a card
    act(() => {
      result.current.openCard(3);
    });

    // Then close it
    act(() => {
      result.current.closeCard();
    });

    expect(result.current.isCardFlipped).toBe(false);
    expect(result.current.selectedCard).toBe(null);
  });

  it("should update selected card when opening different cards", () => {
    const { result } = renderHook(() => useCardFlip());

    act(() => {
      result.current.openCard(1);
    });
    expect(result.current.selectedCard).toBe(1);

    act(() => {
      result.current.openCard(12);
    });
    expect(result.current.selectedCard).toBe(12);
  });
});
