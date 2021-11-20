interface MovieTvItemsProps {
  isLoading: boolean;
  items: Movie[] | TV[] | undefined;
}

const MovieTvItems: React.FunctionComponent<MovieTvItemsProps> = ({
  isLoading,
  items,
}) => {
  return isLoading === true ? (
    <div>Loading...</div>
  ) : (
    <div>
      {items?.map((item) => {
        return (
          <img
            key={item.id}
            src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
          />
        );
      })}
    </div>
  );
};

export default MovieTvItems;
