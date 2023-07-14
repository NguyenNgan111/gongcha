import { screen, render, fireEvent, act } from "@testing-library/react";
import TopHeader from "./TopHeader";
import store from "../../../store/store";
import { Provider } from "react-redux";
import React from "react";

describe("Top header", () => {
  const setShowCart = jest.fn();
  const useStateSpy = jest.spyOn(React, "useState");
  useStateSpy.mockImplementation((initState) => [initState, setShowCart]);
  test("triggers function on mouse leave", () => {
    render(
      <Provider store={store}>
        <TopHeader />
      </Provider>
    );
    const topHeader = screen.getByTestId("top_header");
    fireEvent.mouseLeave(topHeader);
    expect(setShowCart).toHaveBeenCalledWith(false);
  });
  test("triggers function on mouse enter", () => {
    store.dispatch({ type: "SIGN_IN_SUCCESS" });
    render(
      <Provider store={store}>
        <TopHeader />
      </Provider>
    );
    const cartIcon = screen.getByTestId("cart_icon");
    fireEvent.mouseEnter(cartIcon);
    expect(setShowCart).toHaveBeenCalledWith(true);
  });
  test("dispatches sign out when clicking sign out", () => {
    store.dispatch({ type: "SIGN_IN_SUCCESS" });
    const mockDispatch = jest.fn();
    render(
      <Provider store={store}>
        <TopHeader />
      </Provider>
    );
    const signOut = screen.getByText("Sign Out");
    fireEvent.click(signOut);
    expect(mockDispatch).toHaveBeenCalled();
  });
  test("renders cart when user is logged in and cart icon is moused over", () => {
    store.dispatch({ type: "SIGN_IN_SUCCESS" });
    screen.debug();
    render(
      <Provider store={store}>
        <TopHeader />
      </Provider>
    );
    fireEvent.mouseEnter(screen.getByTestId("cart_icon"));
    expect(screen.getByTestId("cart")).toBeInTheDocument();
  });
});
