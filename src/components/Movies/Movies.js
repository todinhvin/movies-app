import React from "react";

import classes from "./styles/Movies.module.css";

import Container from "../Common/Container/Container";
import Button from "../Common/Button/Button";
import Card from "../Common/Card/Card";

const Movies = (props) => {
  const { movies, changeTitleMV, indexMV, titleList, lastItemRef } = props;

  return (
    <Card
      className={`${classes.movies} ${props.className ? props.className : ""}`}
    >
      <Container
        onClick={changeTitleMV}
        indexTitle={indexMV}
        lastItemRef={lastItemRef}
        data={{
          isShowItem: true,
          items: movies,
          titleList,
          title: "MOVIES",
          itemClassName: "col l-2-4 m-3 c-6",
        }}
      />
      {props.isBtnMore && <Button value="MORE ..." isMore={true} />}
    </Card>
  );
};

export default Movies;
