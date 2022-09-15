import { render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AppCard } from "../AppCard";

afterEach(cleanup);

it("should render app card title correctly", () => {
  const testTitle = "This is the test title";
  render(
    <BrowserRouter>
      <AppCard image="test" url="test" title={testTitle} />
    </BrowserRouter>
  );
  const appCardTitle = screen.getByTestId("app-card-title");
  expect(appCardTitle).toBeInTheDocument();
  expect(appCardTitle).toHaveTextContent(testTitle);
});
