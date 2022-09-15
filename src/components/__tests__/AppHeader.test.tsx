import { render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AppHeader } from "../AppHeader";

afterEach(cleanup);

it("should render header title correctly", () => {
  const testTitle = "This is the test label";
  render(
    <BrowserRouter>
      <AppHeader
        opened={false}
        setOpened={() => null}
        imgPath="test"
        burgerColor="test"
        title={testTitle}
      />
    </BrowserRouter>
  );
  const headerTitle = screen.getByTestId("header-title");
  expect(headerTitle).toBeInTheDocument();
  expect(headerTitle).toHaveTextContent(testTitle);
});
