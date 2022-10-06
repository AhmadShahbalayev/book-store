import { ColorSchemeProvider, MediaQuery } from "@mantine/core";
import { render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { AppHeader } from "../AppHeader";

import { setupIntersectionObserverMock } from "../../common/utils";

beforeEach(() => setupIntersectionObserverMock());
afterEach(cleanup);

it("should render header title correctly", () => {
  const testTitle = "This is the test label";
  render(
    <BrowserRouter>
      <ColorSchemeProvider colorScheme="light" toggleColorScheme={() => null}>
        <AppHeader
          opened={false}
          setOpened={() => null}
          imgPath="test"
          burgerColor="test"
          title={testTitle}
        />
      </ColorSchemeProvider>
    </BrowserRouter>
  );
  const headerTitle = screen.getByTestId("header-title");
  expect(headerTitle).toBeInTheDocument();
  expect(headerTitle).toHaveTextContent(testTitle);
});
