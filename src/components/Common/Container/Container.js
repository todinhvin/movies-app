import React from "react";

import classes from "./Container.module.css";

import Item from "./../Item/Item";
import SelectBox from "../SelectBox/SelectBox";

const Container = (props) => {
  const { data, indexTitle, filterTime } = props;
  const showItems = () => {
    if (data) {
      return data.items.map((item, index) => {
        if (data.items.length - 9 === index) {
          return (
            <Item
              key={index}
              index={index + 1}
              ref={props.lastItemRef}
              data={{
                className: data.itemClassName ? data.itemClassName : "",
                isRatingTb: data.isRatingTb ? data.isRatingTb : false,
                isShowItem: data.isShowItem ? data.isShowItem : false,
                link: `${item.type}/${item.id}`,
                img: item.img,
                alt: item.title,
                voteAverage: item.voteAverage,
                title: item.title,
                releaseDate: item.releaseDate,
                overview: item.overview,
                firstAirDate: item.firstAirDate,
                isTableSearch: data.isTableSearch,
                handleSearch: data.handleSearch,
              }}
            />
          );
        }
        return (
          <Item
            key={index}
            index={index + 1}
            data={{
              className: data.itemClassName ? data.itemClassName : "",
              isRatingTb: data.isRatingTb ? data.isRatingTb : false,
              isTableSearch: data.isTableSearch,
              isShowItem: data.isShowItem ? data.isShowItem : false,
              link: `${item.type}/${item.id}`,
              img: item.img,
              alt: item.title,
              voteAverage: item.voteAverage,
              title: item.title,
              releaseDate: item.releaseDate,
              overview: item.overview,
              firstAirDate: item.firstAirDate,
              handleSearch: data.handleSearch,
            }}
          />
        );
      });
    }
  };
  const handleClick = (title) => {
    if (props.onClick) {
      props.onClick(title);
    }
  };

  const showTitle = () => {
    if (data.titleList) {
      return data.titleList.map((item) => {
        return (
          <span
            key={item.id}
            id={item.id}
            className={`${classes["title-item"]} ${
              indexTitle === item.id ? classes.active : ""
            }`}
            onClick={() => handleClick(item)}
          >
            {item.title}
          </span>
        );
      });
    }
  };
  return (
    <div className={classes.container}>
      <div
        className={`${classes["container-item"]} ${
          data.isRatingTb ? classes["container-ratting-item"] : ""
        }`}
      >
        {data.title && (
          <div className={classes.header}>
            <p className={classes.title}>{data.title}</p>
            <div className={classes["title-list"]}>{showTitle()}</div>
            {props.filterTime && (
              <SelectBox
                onClick={filterTime.onChangeTime}
                time={filterTime.timeTrending}
                filterList={filterTime.filterList}
              />
            )}
          </div>
        )}
        <div className="row">
          <ul
            className={`list ${data.isRatingTb ? "list-ratingtb" : ""} ${
              data.isTableSearch ? classes["table-search"] : ""
            }`}
          >
            {showItems()}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Container;
