import React, { useCallback, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getTrending } from "../apis/Trending";
import Card from "../components/Common/Card/Card";
import Container from "../components/Common/Container/Container";
import useHttp from "../hooks/use-http";
import { timeList, titleList } from "../menus/TrendingPage";
import Loading from "./../components/Common/Loading/Loading";

const TrendingPage = () => {
  const history = useHistory();
  const { type, time } = useParams();
  const [list, setList] = useState([]);
  const [indexTl, setIndexTl] = useState("0");
  const [pageNumber, setPageNumber] = useState(1);
  const [typeTrending, setTypeTrending] = useState("all");
  const [timeTrending, setTimeTrending] = useState("day");
  const { data, isLoading, error, sendRequest, hasMore } = useHttp(getTrending);

  useEffect(() => {
    setList((prevList) => {
      return [...prevList, ...data];
    });
  }, [data]);

  useEffect(() => {
    setList([]);
    setTimeTrending(time);
  }, [time]);

  useEffect(() => {
    setList([]);
    setTypeTrending(type);
  }, [type]);

  useEffect(() => {
    sendRequest({ type: typeTrending, time: timeTrending, pageNumber });
  }, [sendRequest, typeTrending, timeTrending, pageNumber]);

  const changeTitle = (title) => {
    const path = `/trending/${title.type}/${timeTrending}`;
    history.push(path);
    setIndexTl(title.id);
  };

  const handleChangeTime = (data) => {
    const path = `/trending/${typeTrending}/${data}`;
    history.push(path);
    setTimeTrending(data);
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
  if (isLoading) {
    content = <Loading />;
  } else if (!error) {
    content = (
      <Container
        onClick={changeTitle}
        indexTitle={indexTl}
        filterTime={{
          onChangeTime: handleChangeTime,
          timeTrending: timeTrending,
          filterList: timeList,
        }}
        lastItemRef={lastItemRef}
        data={{
          isShowItem: true,
          items: list,
          titleList,
          title: "TRENDING",
          itemClassName: "col l-2-4 m-3 c-6",
        }}
      />
    );
  }

  return <Card>{content}</Card>;
};

export default TrendingPage;
