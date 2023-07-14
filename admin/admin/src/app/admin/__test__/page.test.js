import { render, screen, fireEvent } from "@testing-library/react";
import * as Page from "../page"
import * as React from "react";
// import * as nextRouter from "next/navigation";

jest.mock("react", () => ({
  useState: jest.fn(),
}));
test("test", () => {
  render(<Page.default />);
});
