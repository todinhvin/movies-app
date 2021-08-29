import React, {
  useState,
  useEffect,
  useRef,
  Fragment,
  useCallback,
} from "react";

import useHttp from "./../hooks/use-http";

import Movies from "./../components/Movies/Movies";
import Loading from "./../components/Common/Loading/Loading";
import Filter from "../components/Common/Filter/Filter";
import { getMovies } from "../apis/Movie";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [params, setParams] = useState("sort_by=popularity.desc");

  const {
    data,
    isLoading: isLoadingMovies,
    error: errorMovies,
    sendRequest: sendRequestMovies,
    hasMore: hasMoreMovies,
  } = useHttp(getMovies);

  useEffect(() => {
    sendRequestMovies({ params, pageNumber });
  }, [sendRequestMovies, params, pageNumber]);

  useEffect(() => {
    setMovies((prevMovies) => {
      return [...prevMovies, ...data];
    });
  }, [data]);

  const handleFilter = (data) => {
    const params = `${
      data.genreSelected ? `with_genres=${data.genreSelected}&` : ""
    }sort_by=${data.sortBy}`;
    setParams(params);
    setMovies([]);
  };

  const observer = useRef();
  const lastItemRef = useCallback(
    (node) => {
      if (isLoadingMovies) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreMovies) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoadingMovies, hasMoreMovies]
  );

  let contentMovies;
  if (isLoadingMovies && pageNumber === 1) {
    contentMovies = <Loading />;
  } else if (!errorMovies) {
    contentMovies = <Movies movies={movies} lastItemRef={lastItemRef} />;
  }

  return (
    <Fragment>
      <Filter handleFilter={handleFilter} type="movie" />
      {contentMovies}
    </Fragment>
  );
};

export default MoviesPage;
