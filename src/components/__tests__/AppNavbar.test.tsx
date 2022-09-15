import { render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AppNavbar } from "../AppNavbar";

afterEach(cleanup);

it("should render navbar correctly", () => {
  render(
    <BrowserRouter>
      <AppNavbar opened={false} />
    </BrowserRouter>
  );
  const navbar = screen.getByTestId("navbar");
  expect(navbar).toBeInTheDocument();
});
