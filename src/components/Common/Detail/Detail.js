import React, { useState } from "react";

import classes from "./styles/Detail.module.css";

import Card from "./../Card/Card";
import Recommendations from "./Recommendations";
import Similar from "./Similar";

const handleRating = (event) => {
  for (let i = 0; i <= +event.target.id.slice(6); i++) {
    const elm = document.getElementById(`rating${i}`);
    if ([...elm.classList].includes("far")) {
      elm.classList.remove("far");
    }
    if (![...elm.classList].includes("fas")) {
      elm.classList.add("fas");
    }
  }
  for (let i = 9; i > event.target.id.slice(6); i--) {
    const elm = document.getElementById(`rating${i}`);
    if (![...elm.classList].includes("far")) {
      elm.classList.add("far");
    }
    if ([...elm.classList].includes("fas")) {
      elm.classList.remove("fas");
    }
  }
};

const Detail = (props) => {
  const [toogleReload, setToogleReload] = useState(false);
  const { data, type, id, isLoading, error, videoKey } = props;

  const onMouseLeaveRating = () => {
    setToogleReload((prev) => {
      return !prev;
    });
  };

  const showRating = () => {
    return Array.from({ length: 10 }).map((item, index) => {
      if (index + 1 <= Math.round(data.voteAverage)) {
        return (
          <i
            key={index}
            id={`rating${index}`}
            className={`${classes["rating-icon"]} fas fa-star`}
            onMouseEnter={handleRating}
          ></i>
        );
      }
      return (
        <i
          key={index}
          id={`rating${index}`}
          className={`${classes["rating-icon"]} far fa-star`}
          onMouseEnter={handleRating}
        ></i>
      );
    });
  };
  if (!isLoading && !error && data) {
    return (
      <Card>
        <div
          className={classes.container}
          style={{ backgroundImage: `url(${data.backdropPath})` }}
        >
          <div className={classes["container-detail"]}>
            <div className={classes.detail}>
              <img className={classes.img} src={data.posterPath} alt="" />
              <div className={classes.content}>
                <h2 className={classes.title}>{data.title}</h2>
                <h4 className={classes.tagline}>{data.tagline}</h4>
                <p className={classes.overview}>{data.overview}</p>
                <div className={classes.footer}>
                  <div className={classes.ratting}>
                    <p>{`( ${data.voteAverage}/10 from ${data.voteCount} vote)`}</p>
                    <span onMouseLeave={onMouseLeaveRating}>
                      {!toogleReload && showRating()}
                      {toogleReload && showRating()}
                    </span>
                  </div>
                  <p className={classes.date}>
                    <span className={classes["date-title"]}>
                      {data.releaseDate ? "Release Date:" : "First Air Date: "}
                    </span>
                    <span>
                      {data.releaseDate ? data.releaseDate : data.firstAirDate}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            {/* Mobile */}
            <div className={classes["detail-mb"]}>
              <div className={classes.content}>
                <h2 className={classes.title}>{data.title}</h2>
                <h4 className={classes.tagline}>{data.tagline}</h4>
                <img className={classes.img} src={data.posterPath} alt="" />
                <p className={classes.overview}>{data.overview}</p>
                <div className={classes.footer}>
                  <div className={classes.rating}>
                    <span onMouseLeave={onMouseLeaveRating}>
                      {!toogleReload && showRating()}
                      {toogleReload && showRating()}
                    </span>
                    <p>{`( ${data.voteAverage}/10 from ${data.voteCount} vote)`}</p>
                  </div>
                  <p className={classes.date}>
                    <span className={classes["date-title"]}>
                      {data.releaseDate ? "Release Date:" : "First Air Date: "}
                    </span>
                    <span>
                      {data.releaseDate ? data.releaseDate : data.firstAirDate}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20">
          <h2 className={classes.title}>TRAILER</h2>
          <iframe
            width="100%"
            height="500"
            src={`https://www.youtube.com/embed/${videoKey}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <Similar type={type} id={id} />
        <Recommendations type={type} id={id} />
      </Card>
    );
  }
  return <></>;
};

export default Detail;
