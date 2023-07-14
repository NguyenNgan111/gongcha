import { render, screen } from "@testing-library/react";
import Cart from "../Cart";
import "@testing-library/jest-dom";

describe("Cart", () => {
  it("renders a heading", () => {
    render(<Cart />);
  });
});
