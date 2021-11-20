import { useFilter } from "../../contexts/FilterContext";
import { MovieTVType } from "../../enums";
import { getYearFromDateString } from "../../utils";

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

      return (
        <div>
          <img
            key={item.id}
            src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
          />
          <h2>{getName()}</h2>
          <h3>{getGenreName()}</h3>
          <h3>{getYear()}</h3>
        </div>
      );
    });
  };

  return isLoading === true ? (
    <div>Loading...</div>
  ) : (
    <div>
      {items?.length === 0 ? <div>No items found</div> : renderItems(items)}
    </div>
  );
};

export default MovieTvItems;
