import { screen, render } from "@testing-library/react";
import Cart from "./Cart";

describe("Cart component", () => {
  test("renders text empty cart", () => {
    render(<Cart />);
    const text = screen.getByText("Cart Empty");
    expect(text).toBeInTheDocument();
  });
});
