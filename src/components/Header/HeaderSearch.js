import React, { Fragment, useState, useEffect } from "react";

import classes from "./styles/HeaderSearch.module.css";

import Button from "../Common/Button/Button";

const HeaderSearch = (props) => {
  const [value, setValue] = useState("");
  const { handleSearch } = props;

  const handleClick = () => {
    props.setHiddenSubnav();
    setTimeout(() => {
      props.onToggleNav();
    }, 200);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(value);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [value, handleSearch]);

  const resetDataSearched = () => {
    handleSearch("");
    setValue("");
  };
  return (
    <Fragment>
      <div className={classes["input-search"]}>
        <i className="fas fa-search"></i>
        <input
          placeholder="Enter films name"
          onChange={handleChange}
          value={value}
        />
        {value && (
          <i
            className={`fas fa-times ${classes["btn-close"]}`}
            onClick={resetDataSearched}
          ></i>
        )}
      </div>
      <Button
        type="button"
        value="Đăng nhập"
        className={classes["btn-login"]}
      />
      <Button
        type="button"
        value={
          props.isNavMb ? (
            <i className="fas fa-times"></i>
          ) : (
            <i className="fas fa-bars"></i>
          )
        }
        onClick={handleClick}
        className={classes["btn-bars"]}
      />
    </Fragment>
  );
};

export default HeaderSearch;
