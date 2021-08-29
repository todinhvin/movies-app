import React, { Fragment, useEffect, useState } from "react";

import useHttp from "../hooks/use-http";

import Movies from "../components/Movies/Movies";
import Loading from "../components/Common/Loading/Loading";
import Tivi from "../components/Tivi/Tivi";
import { getTopMovies } from "../apis/Movie";
import { getTopTivi } from "../apis/Tivi";
import { titleListMV, titleListTv } from "../menus/HomePage";

const HomePage = () => {
  const [indexMV, setIndexMV] = useState("0");
  const [typeMv, setTypeMv] = useState("popular");

  const [indexTvShows, setIndexTVShows] = useState("0");
  const [typeTv, setTypeTV] = useState("popular");

  const {
    data: dataMovies,
    isLoading: isLoadingMovies,
    error: errorMovies,
    sendRequest: sendRequestMovies,
  } = useHttp(getTopMovies);

  useEffect(() => {
    sendRequestMovies(typeMv);
  }, [sendRequestMovies, typeMv]);

  const {
    data: dataTivi,
    isLoading: isLoadingTVShows,
    error: errorTVShows,
    sendRequest: sendRequestTVShows,
  } = useHttp(getTopTivi);

  useEffect(() => {
    sendRequestTVShows(typeTv);
  }, [sendRequestTVShows, typeTv]);

  const changeTitleMV = (item) => {
    setTypeMv(item.type);
    setIndexMV(item.id);
  };

  const changeTitleTVShows = (item) => {
    setIndexTVShows(item.id);
    setTypeTV(item.type);
  };

  let contentMovies;
  if (isLoadingMovies) {
    contentMovies = <Loading />;
  } else if (!errorMovies) {
    contentMovies = (
      <Movies
        movies={dataMovies}
        titleList={titleListMV}
        changeTitleMV={changeTitleMV}
        indexMV={indexMV}
        isBtnMore={true}
      />
    );
  }

  let contentTVShows;
  if (isLoadingTVShows) {
    contentTVShows = <Loading />;
  } else if (!errorTVShows) {
    contentTVShows = (
      <Tivi
        tvShows={dataTivi}
        changeTitleTVShows={changeTitleTVShows}
        indexTvShows={indexTvShows}
        titleList={titleListTv}
      />
    );
  }

  return (
    <Fragment>
      {contentMovies}
      {contentTVShows}
    </Fragment>
  );
};

export default HomePage;
