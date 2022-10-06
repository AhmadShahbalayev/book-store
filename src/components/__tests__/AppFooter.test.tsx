import { render, screen, cleanup } from "@testing-library/react";

import { AppFooter } from "../AppFooter";

afterEach(cleanup);

it("should render footer copyright correctly", () => {
  const testCopyright = "This is the test copyright";
  render(<AppFooter copyright={testCopyright} />);
  const footerCopyright = screen.getByTestId("footer-copyright");
  expect(footerCopyright).toBeInTheDocument();
  expect(footerCopyright).toHaveTextContent(testCopyright);
});
