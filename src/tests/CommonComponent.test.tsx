import CommonComponent from "../components/CommonComponent";
import { renderWithClient } from "./utils";
import { waitFor } from "@testing-library/react";
import * as ReactRouter from "react-router";
import {
  fetchPopularItems,
  fetchTrendingItems,
  fetchNewestItems,
  fetchSearchItems,
  fetchTopRatedItems,
} from "../api/service";
import { cleanup } from "@testing-library/react";
import { contextDefaultValues, FilterContext } from "../contexts/FilterContext";
import { MovieTVType } from "../enums";
import { mockMovieResponse, mockTVResponse } from "./mockedConstants";

jest.mock("../api/service");

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

jest.mock("react-router", () => ({
  __esModule: true,
  useLocation: jest.fn(),
}));

describe("Test Suite for Common Component", () => {
  it("When no items is returned", async () => {
    (ReactRouter.useLocation as any).mockImplementation(() => ({
      pathname: "/popular",
    }));
    (fetchPopularItems as any).mockResolvedValueOnce([]);
    const { getByText } = renderWithClient(
      <FilterContext.Provider value={contextDefaultValues}>
        <CommonComponent searchString="" />
      </FilterContext.Provider>
    );
    await waitFor(() => {
      getByText("No Items found");
    });
    await waitFor(() => {
      expect(fetchPopularItems).toHaveBeenCalledTimes(1);
    });
  });

  it("Component is calling the right api at the given url path", async () => {
    (ReactRouter.useLocation as any).mockImplementation(() => ({
      pathname: "/popular",
    }));
    (fetchPopularItems as any).mockResolvedValueOnce([]);
    (fetchNewestItems as any).mockResolvedValueOnce([]);
    (fetchTrendingItems as any).mockResolvedValueOnce([]);
    (fetchTopRatedItems as any).mockResolvedValueOnce([]);
    const { getByText } = renderWithClient(
      <FilterContext.Provider value={contextDefaultValues}>
        <CommonComponent searchString="" />
      </FilterContext.Provider>
    );
    await waitFor(() => {
      getByText("No Items found");
    });
    await waitFor(() => {
      expect(fetchPopularItems).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(fetchNewestItems).toHaveBeenCalledTimes(0);
    });
    await waitFor(() => {
      expect(fetchTrendingItems).toHaveBeenCalledTimes(0);
    });
    await waitFor(() => {
      expect(fetchTopRatedItems).toHaveBeenCalledTimes(0);
    });
  });

  it("Shows loading spinner when no search query is provided", async () => {
    (ReactRouter.useLocation as any).mockImplementation(() => ({
      pathname: "/search",
    }));
    (fetchSearchItems as any).mockResolvedValueOnce(() => {
      throw "Hello world";
    });
    const { container } = renderWithClient(
      <FilterContext.Provider value={contextDefaultValues}>
        <CommonComponent searchString="" />
      </FilterContext.Provider>
    );
    await waitFor(() => {
      expect(
        container.getElementsByClassName("ms-Spinner")[0]
      ).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(fetchSearchItems).toHaveBeenCalledTimes(1);
    });
  });

  it("Renders the Movie response items", async () => {
    (ReactRouter.useLocation as any).mockImplementation(() => ({
      pathname: "/newest",
    }));
    (fetchNewestItems as any).mockResolvedValueOnce(mockMovieResponse);
    const { getByText } = renderWithClient(
      <FilterContext.Provider value={contextDefaultValues}>
        <CommonComponent searchString="" />
      </FilterContext.Provider>
    );
    await waitFor(() => {
      getByText("Shang-Chi and the Legend of the Ten Rings");
      getByText("Jungle Cruise");
    });
    await waitFor(() => {
      expect(fetchNewestItems).toHaveBeenCalledTimes(1);
    });
  });

  it("Renders the TV Response Items", async () => {
    (ReactRouter.useLocation as any).mockImplementation(() => ({
      pathname: "/newest",
    }));
    (fetchNewestItems as any).mockResolvedValueOnce(mockTVResponse);
    const { getByText } = renderWithClient(
      <FilterContext.Provider
        value={{ ...contextDefaultValues, type: MovieTVType.TV }}
      >
        <CommonComponent searchString="" />
      </FilterContext.Provider>
    );
    await waitFor(() => {
      getByText("Arcane");
    });
    await waitFor(() => {
      expect(fetchNewestItems).toHaveBeenCalledTimes(1);
    });
  });
});
