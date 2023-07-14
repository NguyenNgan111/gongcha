import { render, screen, fireEvent } from "@testing-library/react";
import { metadata } from "../layout";
import Layout from "../layout";

// import * as nextRouter from "next/navigation";

test("test layout of Login page", () => {
  render(<Layout />);
  expect(metadata).toBeDefined()
});
