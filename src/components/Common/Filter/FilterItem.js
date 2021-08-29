import React, { useEffect, useState } from "react";

import classes from "./styles/FilterItem.module.css";

const FilterItem = (props) => {
  const { data } = props;
  const [isShowList, setIsShowList] = useState(false);
  const [dataSelected, setDataSelected] = useState("");
  const toogleList = () => {
    setIsShowList((prevStatus) => {
      return !prevStatus;
    });
  };

  const closeList = () => {
    setIsShowList(false);
  };

  const handleClick = (item) => {
    setDataSelected(item.name);
    props.onClick(item);
    closeList();
  };

  useEffect(() => {
    setDataSelected(data.length > 0 ? data[0].name : "");
  }, [data]);

  const showList = () => {
    if (data) {
      return data.map((item, index) => {
        return (
          <li
            key={index}
            className={classes["item-list-item"]}
            onClick={() => handleClick(item)}
          >
            {item.name}
          </li>
        );
      });
    }
  };
  return (
    <div className={classes["filter-item"]}>
      <p className={classes.label}>{props.name}</p>
      <p className={classes.selected} onClick={toogleList}>
        {dataSelected}
        <i className="fas fa-sort-down"></i>
      </p>
      <ul
        className={`${classes["item-list"]} ${
          isShowList ? classes.active : ""
        }`}
      >
        {showList()}
      </ul>
    </div>
  );
};

export default FilterItem;
