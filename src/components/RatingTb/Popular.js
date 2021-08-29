import React, { useState, useEffect } from "react";
import { getTopPopular } from "../../apis/RatingTb";

import useHttp from "../../hooks/use-http";
import { titleList } from "../../menus/Rating";
import Card from "../Common/Card/Card";
import Container from "../Common/Container/Container";
import Loading from "../Common/Loading/Loading";

const Popular = () => {
  const [indexTitle, setIndexTitle] = useState(titleList[0].id);
  const [type, setType] = useState("tv");

  const {
    data,
    isLoading,
    error,
    sendRequest: getPopular,
  } = useHttp(getTopPopular);

  useEffect(() => {
    getPopular(type);
  }, [getPopular, type]);

  const changeTitle = (item) => {
    setType(item.type);
    setIndexTitle(item.id);
  };

  let content;
  if (isLoading) {
    content = <Loading />;
  } else if (!error) {
    content = (
      <Container
        onClick={changeTitle}
        indexTitle={indexTitle}
        data={{
          isRatingTb: true,
          items: data,
          titleList: titleList,
          title: "POPULAR",
        }}
      />
    );
  }

  return <Card>{content}</Card>;
};

export default Popular;
