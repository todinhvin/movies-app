import React, {
  useState,
  useEffect,
  useRef,
  Fragment,
  useCallback,
} from "react";

import useHttp from "./../hooks/use-http";
import Loading from "./../components/Common/Loading/Loading";
import Filter from "../components/Common/Filter/Filter";
import Tivi from "./../components/Tivi/Tivi";
import { getTivi } from "../apis/Tivi";

const TiviPage = () => {
  const [tivi, setTivi] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [params, setParams] = useState("sort_by=popularity.desc");

  const { data, isLoading, error, sendRequest, hasMore } = useHttp(getTivi);

  useEffect(() => {
    setTivi((prevMovies) => {
      return [...prevMovies, ...data];
    });
  }, [data]);

  useEffect(() => {
    sendRequest({ params, pageNumber });
  }, [sendRequest, params, pageNumber]);

  const handleFilter = (data) => {
    const params = `${
      data.genreSelected ? `with_genres=${data.genreSelected}&` : ""
    }sort_by=${data.sortBy}`;
    setParams(params);
    setTivi([]);
  };

  const observer = useRef();
  const lastItemRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  let content;
  if (isLoading && pageNumber === 1) {
    content = <Loading />;
  } else if (!error) {
    content = <Tivi tvShows={tivi} lastItemRef={lastItemRef} />;
  }

  return (
    <Fragment>
      <Filter handleFilter={handleFilter} type="tv" />
      {content}
    </Fragment>
  );
};

export default TiviPage;
