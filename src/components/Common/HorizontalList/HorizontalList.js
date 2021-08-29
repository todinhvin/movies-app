import React, { useEffect } from "react";
import scrollHorizontal from "../../../lib/scroll";
import Item from "../Item/Item";

import classes from "./HorizontalList.module.css";

const HorizontalList = (props) => {
  const { data, className } = props;
  useEffect(() => {
    scrollHorizontal(`.${className}`, 500);
  }, [data, className]);
  const showData = () => {
    return data.map((item) => {
      return (
        <Item
          key={item.id}
          listRow8={true}
          data={{
            className: `${
              props.classNameItem ? props.classNameItem : " l-1-8 m-2-4 c-6"
            } col ${classes["list-item"]}`,
            img: item.img,
            link: `${item.type}/${item.id}`,
            title: item.title,
            alt: item.title,
            releaseDate: item.releaseDate,
            firstAirDate: item.firstAirDate,
            voteAverage: item.voteAverage,
          }}
        />
      );
    });
  };
  return (
    <ul
      className={`row sm-gutters  ${classes["list-horizontal"]} ${
        props.className ? props.className : ""
      }`}
    >
      {showData()}
    </ul>
  );
};

export default HorizontalList;
