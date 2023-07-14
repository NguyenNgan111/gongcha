import { render, screen } from "@testing-library/react";
import MoreInfo from "./MoreInfo";

describe("More info component", () => {
  test("renders a heading title the scrumptious tea", () => {
    render(<MoreInfo />);
    const heading = screen.getByRole("heading", {
      name: /the scrumptious tea/i,
    });
    expect(heading).toBeInTheDocument();
  });
  test("renders a button", () => {
    render(<MoreInfo />);
    const button = screen.getByRole("button", {
      name: "MORE INFORMATION",
    });
    expect(button).toBeInTheDocument();
  });
});
