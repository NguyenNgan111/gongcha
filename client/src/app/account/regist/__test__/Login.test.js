import { render, screen, fireEvent } from "@testing-library/react";
import Account from "../page";
// import * as nextRouter from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
test("asdasd", () => {
  render(<Account />);
  screen.debug();
  const button = screen.queryByTestId("buttonid");
  const phoneInput = screen.queryByTestId("phoneInput");
  const rePwd = screen.queryByTestId("repeatPwd");
  const inputPwd = screen.queryByTestId("inputPwd");

  //firing
  fireEvent.change(phoneInput, { target: { value: "092" } });
  fireEvent.change(rePwd, { target: { value: "123" } });
  fireEvent.change(inputPwd, { target: { value: "1234" } });
  fireEvent.click(button);
  fireEvent.change(inputPwd, { target: { value: "123" } });
  fireEvent.click(button);

  //expect
  expect(button).toBeDefined();
  expect(phoneInput).toBeDefined();
  expect(rePwd).toBeDefined();
  expect(inputPwd).toBeDefined();
});
