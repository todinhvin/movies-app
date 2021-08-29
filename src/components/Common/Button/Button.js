import React from "react";

import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      className={`${classes.button} ${props.className} ${
        props.isMore ? classes["button-wide"] : ""
      }`}
      type={props.type}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
};

export default Button;
