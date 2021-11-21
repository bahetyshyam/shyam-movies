import { render } from "@testing-library/react";
import MovieTvItems from "../components/MovieTvItems";
import { contextDefaultValues, FilterContext } from "../contexts/FilterContext";
import { mockMovieResponse } from "./mockedConstants";

describe("Test Suite for MovieTvItems", () => {
  it("Is showing spinner", () => {
    const { container } = render(<MovieTvItems isLoading={true} items={[]} />);
    expect(
      container.getElementsByClassName("ms-Spinner")[0]
    ).toBeInTheDocument();
  });
  it("Is showing message when no items are found", () => {
    const { getByText } = render(<MovieTvItems isLoading={false} items={[]} />);
    getByText("No Items found");
  });
  it("Renders the right content", () => {
    const { getByText } = render(
      <FilterContext.Provider value={contextDefaultValues}>
        <MovieTvItems isLoading={false} items={mockMovieResponse} />
      </FilterContext.Provider>
    );
    getByText("Shang-Chi and the Legend of the Ten Rings");
    getByText("Jungle Cruise");
  });
});
