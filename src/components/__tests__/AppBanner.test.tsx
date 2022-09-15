import { render, screen, cleanup } from "@testing-library/react";
import { AppBanner } from "../AppBanner";

afterEach(cleanup);

it("should render app banner title correctly", () => {
  const testLabel = "This is the test label";
  render(<AppBanner imgPath="test" label={testLabel} />);
  const appBannerTitle = screen.getByTestId("banner-title");
  expect(appBannerTitle).toBeInTheDocument();
  expect(appBannerTitle).toHaveTextContent(testLabel);
});
