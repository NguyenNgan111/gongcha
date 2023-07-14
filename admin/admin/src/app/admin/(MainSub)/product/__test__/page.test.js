import { render, screen, fireEvent } from "@testing-library/react";
import Page from "../page";
import { useState } from "react";


// import * as nextRouter from "next/navigation";

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});



jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

test("test", () => {
  render(<Page />);
  const gotoCreate = screen.getByTestId('gotoCreate')

  
});
