import React, { useEffect, useState } from "react";

import useHttp from "../../hooks/use-http";

import Slider from "../Common/Slider/Slider";
import Loading from "../Common/Loading/Loading";
import { transformNData } from "../../lib/transformData";

const TopRated = (props) => {
  const [topRated, setTopRated] = useState([]);
  const { isLoading, error, sendRequest: getTopRated } = useHttp();

  useEffect(() => {
    getTopRated(
      {
        url: "https://api.themoviedb.org/3/tv/top_rated?api_key=797d08dc86cbab298803421b8affd522&language=en-US&page=1",
      },
      transformNData.bind(null, setTopRated, 10, 5)
    );
  }, [getTopRated]);
  if (isLoading) {
    return <Loading />;
  } else if (error) {
    return "";
  }

  return <Slider className="" dataSliders={topRated} />;
};

export default TopRated;
