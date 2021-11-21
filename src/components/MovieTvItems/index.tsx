import { Spinner, SpinnerSize } from "@fluentui/react";
import { useFilter } from "../../contexts/FilterContext";
import { MovieTVType } from "../../enums";
import { getYearFromDateString } from "../../utils";
import SC from "./styles";

interface MovieTvItemsProps {
  isLoading: boolean;
  items: Movie[] | TV[] | undefined;
}

const MovieTvItems: React.FunctionComponent<MovieTvItemsProps> = ({
  isLoading,
  items,
}) => {
  const { type, genreId, movieGenres, tvGenres } = useFilter();

  const renderItems = (items: Movie[] | TV[] | undefined) => {
    return items?.map((item) => {
      function getGenreName() {
        let idToSearch = genreId;
        if (genreId === "all") {
          if (item.genre_ids.length === 0) {
            return "No Genre Found";
          }
          idToSearch = item.genre_ids[0]; //Taking the first genre
        }
        if (type === MovieTVType.Movie) {
          return movieGenres.find((element) => element.id === idToSearch)?.name;
        } else {
          return tvGenres.find((element) => element.id === idToSearch)?.name;
        }
      }
      function getName() {
        return type === MovieTVType.Movie
          ? (item as Movie).original_title
          : (item as TV).original_name;
      }
      function getYear() {
        return type === MovieTVType.Movie
          ? getYearFromDateString((item as Movie).release_date)
          : getYearFromDateString((item as TV).first_air_date);
      }
      function imageSource() {
        if (item.poster_path === null) {
          return "https://via.placeholder.com/500x750.jpg?text=No+Image+Found";
        } else return `https://image.tmdb.org/t/p/w500/${item.poster_path}`;
      }

      return (
        <SC.ItemContainer key={item.id}>
          <img
            key={item.id}
            src={imageSource()}
            alt="poster"
            style={{ width: "100%" }}
          />
          <SC.TitleName>{getName()}</SC.TitleName>
          <SC.GenreYear>{`${getGenreName()} ${getYear()}`}</SC.GenreYear>
        </SC.ItemContainer>
      );
    });
  };
  if (isLoading === true) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Spinner size={SpinnerSize.large} />
      </div>
    );
  } else if (items?.length === 0) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        No Items found
      </div>
    );
  } else {
    return <SC.ItemsContainer>{renderItems(items)}</SC.ItemsContainer>;
  }
};

export default MovieTvItems;
