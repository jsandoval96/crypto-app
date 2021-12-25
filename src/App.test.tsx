import { render, screen } from "@testing-library/react";
import App from "./App";

test("Render app correctly", () => {
  render(<App />);
  const text = "Hello World!!";

  const result = screen.getByText(text);

  expect(result.textContent).toBe(text);
});
