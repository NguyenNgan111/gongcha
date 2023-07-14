import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import Login from "../page";
import CallAPI from "../common/callAPI";
import * as nextRouter from "next/navigation";

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
  useRouter: jest.fn()
}));

const localStorageMock = (function () {
  let store = {};

  return {
    getItem(key) {
      return store[key];
    },

    setItem(key, value) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

const setLocalStorage = (id, data) => {
  window.localStorage.setItem(id, JSON.stringify(data));
};

test("test Login page", () => {
  render(<Login />);
  const button = screen.getByTestId("submit");
  const username = screen.getByTestId("username");
  const pwd = screen.getByTestId("pwd");

  // Firing
  fireEvent.change(username, { target: { value: "nghia" } });
  fireEvent.change(pwd, { target: { value: "123" } });
  fireEvent.click(button);


  // Expect 
  expect(button).toBeDefined();
  expect(username).toBeDefined();
  expect(pwd).toBeDefined();
  expect(useRouter).toHaveBeenCalled();
  // expect(localStorage.getItem("token")).toBeDefined()
});
