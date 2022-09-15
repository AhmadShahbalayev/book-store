import { render, screen, cleanup } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { Paginated } from "../Paginated";
import { GET_ALL_BOOKS } from "../../graphql/queries/book.query";
import { BrowserRouter } from "react-router-dom";
import { MockBooks } from "../../mocks/books";

afterEach(cleanup);

const mocks = [
  {
    request: {
      query: GET_ALL_BOOKS,
      variables: { limit: 4, skip: 0 },
    },
    result: MockBooks,
  },
];

it("should render paginated items correctly", async () => {
  render(
    <MockedProvider mocks={mocks}>
      <BrowserRouter>
        <Paginated />
      </BrowserRouter>
    </MockedProvider>
  );
  const paginatedAppCards = await screen.findAllByTestId("app-card-title");
  expect(paginatedAppCards).toHaveLength(
    mocks[0].result.data.all_book.items.length
  );
});
