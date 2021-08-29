import React from "react";

import classes from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={classes.loading}>
      <img
        src="https://i.pinimg.com/originals/85/e2/4b/85e24bd18e3658cd321688b4c34cc576.gif"
        className={classes["loading-img"]}
        alt=""
      />
    </div>
  );
};

export default Loading;
