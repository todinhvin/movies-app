import React from "react";
import { Link } from "react-router-dom";

import classes from "./Item.module.css";

const Item = React.forwardRef((props, ref) => {
  const { data, listRow8 } = props;

  const handleClick = () => {
    if (data.isTableSearch) {
      data.handleSearch("");
    }
  };

  return (
    <li
      ref={ref}
      className={`${classes.item} ${data.className} ${
        data.isRatingTb ? classes["ratingtb-item"] : ""
      }  ${data.isShowItem ? classes["table-item"] : ""} `}
    >
      <Link
        to={`/${data.link}`}
        href="/#"
        className={classes.link}
        onClick={handleClick}
      >
        <div className={classes["item-img"]}>
          <img
            src={
              !data.img.includes("/null")
                ? data.img
                : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAALVBMVEXz9Pa5vsq2u8j29/jN0dno6u7V2N++ws3w8fTf4efi5OnFydPY2+HJztbR1txPmUB/AAAC0klEQVR4nO3b55aqMBiFYUoioXn/l3ukKSVBJGH4ctb7/JxRVrYbCDVJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArPLQ7g60YnSjwmoqc3eouarOwmsrOT026TXKu4NNyosCioloissSFndn6+VlNgwn6EY4LrKUsCnm7TCaNuiudFqoiIT9Spo9Ak+Hj77GWsKUMSasAi+2lJMwIeE5JPxLtoRGa8+xiU5YqX5urBuf4UlO+Eyn+br2OHaWm9DU2eeoK2tOL1Vuwucs4Is+u1SxCctlwLQ4O0SpCfN6fXpw9thZakK9qjDN1MmlSk24Xkm/jdG9sxWaMG82CXc3ROXe2UpN+PgpYbffbRwtCk3421qqug+7WpSa0Pywp5lmTnuLUhNaZgvHt4yafgx7i1ITbq4sOoeoZm3bWhSbcDHyF8d0YNRiVba0KDdhMj/yTl2Twep3sLQoOOGrnmn4hePEf9mg/acQnDDJK1V013Trh3HMdesGbS1KTpj0FzG0cQ3O0qClReEJd9ka3LYYb0LzdARcRYw3oavB9YoabUJ3g6sWY0241+CyxUgSmtWFqP0GFy3GkVCnhZ7vPdqvAT8txpAw10WazYf4vcFZizEk1P3fPy0eabD7xnC+JT9h12D/j3o8djvWYH83ufu4/IT6PeKhxYMNdqdSUSScGny3eLTBaBLqxaAL/W0ejC3hvMEh4uF8kSTU+xmiT7hp8L9L6NVgBAk9G4wgoWeD4hN6Nyg+oXeD0hPmxw9dYk24vX9IQhLem21AQhKS8H6hE8q+TtPdVvM1hJKaMBwS/iUSnpILSji+FaTCvgk83oer707XmR70uuTdNSXh3bX384hXvH8Yeus+x2ye1gtGxjukSVJdllBGhUn3QKL/wdpWJmQd7em2CLoV9ltiq0XsZia6fITVCCoQAAAAAAAAAAAAAAAAAAAAAAAAAAAAuMU/B0kslFd7c1EAAAAASUVORK5CYII="
            }
            className={`${classes.img} ${
              data.img.includes("/null") ? classes["img-not-found"] : ""
            } ${listRow8 ? classes["list-row-8-img"] : ""}`}
            alt={data.alt}
          />
          <span className={classes["icon-play"]}>
            <i className="far fa-play-circle"></i>
          </span>
        </div>
        {data.isRatingTb && (
          <span className={classes.label}>
            <span>{props.index}</span>{" "}
          </span>
        )}
        {!data.isTableSearch && (
          <div className={classes.info}>
            <p className={classes.title}>{data.title}</p>
            <span className={classes["vote-average"]}>
              <i className="fas fa-star"></i>
              {data.voteAverage}
            </span>
            <p className={classes["release-date"]}>
              {data.isRatingTb && <i className="fas fa-calendar-alt"></i>}
              {data.releaseDate ? data.releaseDate : data.firstAirDate}
            </p>
          </div>
        )}
      </Link>
    </li>
  );
});

export default Item;
