import { render, screen, cleanup } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { Paginated } from "../Paginated";
import { GET_ALL_BOOKS } from "../../graphql/queries/book.query";
import { BrowserRouter } from "react-router-dom";
import { MockBooks } from "../../mocks/books";
import { InfiniteScroll } from "../InfiniteScroll";
import { setupIntersectionObserverMock } from "../../common/utils";

beforeEach(() => setupIntersectionObserverMock());
afterEach(cleanup);

const limit = MockBooks.data.all_book.items.length;

const mocks = [
  {
    request: {
      query: GET_ALL_BOOKS,
      variables: { limit, skip: 0 },
    },
    result: MockBooks,
  },
];

it("should render infinitely scrolled items correctly", async () => {
  render(
    <MockedProvider mocks={mocks}>
      <BrowserRouter>
        <InfiniteScroll />
      </BrowserRouter>
    </MockedProvider>
  );
  const paginatedAppCards = await screen.findAllByTestId("app-card-title");
  expect(paginatedAppCards).toHaveLength(limit);
});
