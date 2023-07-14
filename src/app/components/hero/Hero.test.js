import { getByTestId, render } from "@testing-library/react";
import Hero from "./Hero";

describe("Hero component", () => {
  test("should render with the provided props", () => {
    const props = {
      title: "This is the title",
      desc: "This is the description",
      url: "This is the url",
    };

    const { getAllByText, getByText, getByTestId } = render(
      <Hero {...props} />
    );

    const headingElement = getAllByText(props.title);
    const pElement = getByText(props.desc);
    const heroElement = getByTestId("hero");

    expect(pElement).toBeInTheDocument();
    expect(headingElement).toHaveLength(2);
    expect(heroElement).toBeInTheDocument();
    expect(heroElement).toHaveStyle(`background-image: url(${props.url})`);
  });
});
