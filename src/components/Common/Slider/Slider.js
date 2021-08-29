import React, { useEffect, useState } from "react";

import classes from "./Slider.module.css";
import { touchSlider } from "./../../../lib/touchSlider";

import Button from "../Button/Button";

const Slider = (props) => {
  const { dataSliders } = props;
  touchSlider(
    classes["container-slider"],
    classes.slider,
    classes["slider-img"]
  );

  const [widthDevice, setWidthDevice] = useState(0);
  useEffect(() => {
    const widthFunc = () => {
      setWidthDevice(window.innerWidth);
    };
    window.addEventListener("resize", widthFunc);
    widthFunc();
    return () => {
      window.removeEventListener("resize", widthFunc);
    };
  }, []);

  const showSliders = () => {
    return dataSliders.map((slider, index) => {
      return (
        <div key={slider.id} className={classes.slider}>
          <img
            src={slider.img}
            alt=""
            className={classes["slider-img"]}
            style={
              widthDevice < 960 ? { width: `${window.innerWidth}px` } : null
            }
          />
          <div className={classes.content}>
            <h2 className={classes.title}>{slider.title}</h2>
            <div className={classes.judge}>
              <span className={classes.rating}>
                <i className="fas fa-star"></i>
                {slider.voteAverage}
              </span>
              <span className={classes["first-air-date"]}>
                {slider.firstAirDate}
              </span>
            </div>
            <p className={classes.overview}>{slider.overview}</p>
            <Button
              type="button"
              value="Watch"
              className={classes["btn-watch"]}
            />
          </div>
        </div>
      );
    });
  };

  return (
    <div className={classes.container}>
      <div className={`${classes["container-slider"]} ${props.className}`}>
        {showSliders()}
      </div>
    </div>
  );
};

export default Slider;
