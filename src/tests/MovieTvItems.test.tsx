import { render } from "@testing-library/react";
import {} from "@testing-library/react";
import MovieTvItems from "../components/MovieTvItems";

const mockItems = [
  {
    adult: false,
    backdrop_path: "/cinER0ESG0eJ49kXlExM0MEWGxW.jpg",
    genre_ids: [28, 12, 14],
    id: 566525,
    original_language: "en",
    original_title: "Shang-Chi and the Legend of the Ten Rings",
    overview:
      "Shang-Chi must confront the past he thought he left behind when he is drawn into the web of the mysterious Ten Rings organization.",
    popularity: 7750.478,
    poster_path: "/1BIoJGKbXjdFDAqUEiA2VHqkK1Z.jpg",
    release_date: "2021-09-01",
    title: "Shang-Chi and the Legend of the Ten Rings",
    video: false,
    vote_average: 7.9,
    vote_count: 3181,
  },
  {
    adult: false,
    backdrop_path: "/7WJjFviFBffEJvkAms4uWwbcVUk.jpg",
    genre_ids: [12, 14, 35, 28],
    id: 451048,
    original_language: "en",
    original_title: "Jungle Cruise",
    overview:
      "Dr. Lily Houghton enlists the aid of wisecracking skipper Frank Wolff to take her down the Amazon in his dilapidated boat. Together, they search for an ancient tree that holds the power to heal – a discovery that will change the future of medicine.",
    popularity: 715.808,
    poster_path: "/9dKCd55IuTT5QRs989m9Qlb7d2B.jpg",
    release_date: "2021-07-28",
    title: "Jungle Cruise",
    video: false,
    vote_average: 7.7,
    vote_count: 3319,
  },
];

// jest.mock("../../src/contexts/FilterContext", () => {
//     return jest.fn(() => ({
//        isLoggedIn: mockIsLoggedIn
//     }))
// })

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
    // const { getByText } = render(
    //   <MovieTvItems isLoading={false} items={mockItems} />
    // );
  });
});
