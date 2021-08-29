import React, { useEffect, useState } from "react";
import Button from "../Button/Button";

import classes from "./SelectBox.module.css";

const SelectBox = (props) => {
  const { time } = props;
  const [active, setAvtive] = useState(false);
  const [value, setValue] = useState("DAY");

  useEffect(() => {
    setValue(time);
  }, [time]);
  const setSelected = (item) => {
    setValue(item.title);
    toggleSelection();
    if (props.onClick) {
      props.onClick(item.type);
    }
  };

  const showSelection = () => {
    if (props.filterList) {
      return props.filterList.map((item, index) => {
        return (
          <Button
            key={index}
            type="button"
            value={item.title}
            className={classes["btn-select-item"]}
            onClick={() => setSelected(item)}
          />
        );
      });
    }
  };

  const toggleSelection = () => {
    setAvtive((prevActive) => {
      return !prevActive;
    });
  };
  return (
    <div className={classes.container}>
      <Button
        type="button"
        value={value}
        className={classes["btn-select"]}
        onClick={toggleSelection}
      />
      <div className={classes["select-box"]}>
        <div
          className={`${classes["options-container"]} ${
            active ? classes.active : ""
          }`}
        >
          {showSelection()}
        </div>
      </div>
    </div>
  );
};

export default SelectBox;
