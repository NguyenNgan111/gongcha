import { render, screen, fireEvent } from "@testing-library/react";
import Page from "../page";
import { useParams } from "next/navigation";


// import * as nextRouter from "next/navigation";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

jest.mock("next/navigation", () => ({
  ...jest.requireActual('next/navigation'),
  useParams: () => ({
    id: '123',
  }),
  useRouteMatch: () => ({ url: '/admin/product/123' }),
}));

test("test", () => {
  render(<Page />);
});
