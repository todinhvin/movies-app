import React, { useEffect } from "react";

import classes from "./Trending.module.css";

import useHttp from "../../hooks/use-http";
import Loading from "../Common/Loading/Loading";
import HorizontalList from "../Common/HorizontalList/HorizontalList";
import { getTopTrending } from "../../apis/Trending";

const Trending = () => {
  const {
    data,
    isLoading,
    error,
    sendRequest: getTrending,
  } = useHttp(getTopTrending);

  useEffect(() => {
    getTrending();
  }, [getTrending]);

  let content = "";

  if (isLoading) {
    content = <Loading />;
  } else if (!error) {
    content = (
      <HorizontalList data={data} className={classes["trending-list"]} />
    );
  }

  return <>{content}</>;
};

export default Trending;
