import React, { useState, useEffect } from "react";
import { getTopToday } from "../../apis/RatingTb";

import useHttp from "../../hooks/use-http";
import { titleList } from "../../menus/Rating";
import Card from "../Common/Card/Card";
import Container from "../Common/Container/Container";
import Loading from "../Common/Loading/Loading";

const AiringToday = () => {
  const [indexTitle, setIndexTitle] = useState(titleList[0].id);
  const [type, setType] = useState("tv");

  const {
    data,
    isLoading,
    error,
    sendRequest: getAiringToday,
  } = useHttp(getTopToday);

  useEffect(() => {
    getAiringToday(type);
  }, [getAiringToday, type]);

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
          title: "Airing Today",
        }}
      />
    );
  }

  return <Card className="mt-20">{content}</Card>;
};

export default AiringToday;
