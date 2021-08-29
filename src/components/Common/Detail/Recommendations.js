import React, { useEffect } from "react";

import classes from "./styles/Recommendations.module.css";

import useHttp from "../../../hooks/use-http";
import HorizontalList from "../HorizontalList/HorizontalList";
import Loading from "../Loading/Loading";
import { getRecommendation } from "../../../apis/Detail";

const Recommendations = (props) => {
  const { id } = props;
  const { data, isLoading, error, sendRequest } = useHttp(getRecommendation);
  useEffect(() => {
    sendRequest({ id, type: props.type });
  }, [sendRequest, id, props.type]);
  let content = "";

  if (isLoading) {
    content = <Loading />;
  } else if (!error) {
    content = (
      <HorizontalList
        data={data}
        className={classes.list}
        classNameItem="l-2-4 m-3 c-6"
      />
    );
  }
  if (data.length !== 0) {
    return (
      <div className={classes.container}>
        <h2 className={classes.title}>Recommendations</h2>
        {content}
      </div>
    );
  }
  return <> </>;
};

export default Recommendations;
