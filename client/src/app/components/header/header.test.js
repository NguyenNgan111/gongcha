import { screen, render, fireEvent, within, act } from "@testing-library/react";
import Header from "./header";
import { menu } from "../../data/menu";
import { Provider } from "react-redux";
import store from "../../store/store";
import React from "react";

describe("Header component", () => {
  const setToggleSideBar = jest.fn();
  const useStateSpy = jest.spyOn(React, "useState");
  useStateSpy.mockImplementation((initState) => [initState, setToggleSideBar]);
  test("renders a correct number of items on desktop navbar", () => {
    const numItems = menu.length;
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    const list = screen.getByTestId("desktop_nav");
    const listItems = within(list).getAllByRole("listitem");
    expect(listItems.length).toBe(numItems + 3);
  });
  test("triggers toggle side bar when clicking on the icon", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    const menuIcon = screen.getByTestId("menu_icon");
    fireEvent.click(menuIcon);
    expect(setToggleSideBar).toHaveBeenCalled();
  });
});
