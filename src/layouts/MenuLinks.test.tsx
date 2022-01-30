import { prettyDOM, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { LINKS } from "@app/constants/routes";
import MenuLinks from "@app/layouts/MenuLinks";

const mockUseNavigate = jest.fn();
const mockUseLocation = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockUseNavigate,
  useLocation: () => mockUseLocation,
}));

test("Render header menu correctly", () => {
  render(<MenuLinks />);

  LINKS.forEach((link) => screen.getByText(link.name));
  screen.getByText("Ingresar");
});

test("Should activate the menu item correctly", () => {
  render(<MenuLinks />);

  const el = screen.getByText(LINKS[1].name);
  userEvent.click(el);

  expect(mockUseNavigate).toBeCalled();
});
