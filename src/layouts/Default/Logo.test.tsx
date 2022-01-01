import { render, screen } from "@testing-library/react";

import Logo from "./Logo";

test("Render app logo correctly", () => {
  render(<Logo />);
  const text = "Crypto";
  const text2 = "App";

  const result = screen.getByText(text);
  const result2 = screen.getByText(text2);

  expect(result.textContent).toBe(text);
  expect(result2.textContent).toBe(text2);
});
