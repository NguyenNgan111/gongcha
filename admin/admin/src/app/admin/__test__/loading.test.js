import { render, screen, fireEvent } from "@testing-library/react";
import Loading from "../loading";


jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

test("test layout of Login page", () => {
  render(<Loading />);
});
