import React from "react";

import classes from "./styles/Tivi.module.css";

import Container from "../Common/Container/Container";
import Button from "../Common/Button/Button";
import Card from "../Common/Card/Card";

const Tivi = (props) => {
  const { tvShows, changeTitleTVShows, titleList, indexTvShows, lastItemRef } =
    props;
  return (
    <Card className={classes.tivi}>
      <Container
        onClick={changeTitleTVShows}
        indexTitle={indexTvShows}
        lastItemRef={lastItemRef}
        data={{
          isShowItem: true,
          items: tvShows,
          titleList: titleList,
          title: "TIVI SHOWS",
          itemClassName: "col l-2-4 m-3 c-6",
        }}
      />
      <Button value="MORE ..." isMore={true} />
    </Card>
  );
};

export default Tivi;
