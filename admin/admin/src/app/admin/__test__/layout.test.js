import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import Layout from "../layout";

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
  useRouter: jest.fn(),
}));

test("test layout of Login page", () => {
  render(<Layout />);
  // const menu = screen.getByTestId("menu");
  const sider = screen.getByTestId("sider");
  // fireEvent.click(menu);
  fireEvent.click(sider);

  expect(sider).toBeDefined();
  // expect(menu).toBeDefined()
});
