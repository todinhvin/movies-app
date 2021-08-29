import React from "react";
import { Link } from "react-router-dom";

import classes from "./Footer.module.css";

import Card from "../Common/Card/Card";
import Button from "../Common/Button/Button";

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

const Footer = () => {
  return (
    <div className="grid wide">
      <Card className={classes.footer}>
        <Link to="/" className="logo">
          MOTV
        </Link>
        <div className={classes.society}>
          <a
            className={classes["society-item"]}
            href="https://www.facebook.com/profile.php?id=100009558346598"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            className={classes["society-item"]}
            href="https://github.com/todinhvin"
          >
            <i className="fab fa-github"></i>
          </a>
          <Button
            className={classes["btn-footer"]}
            value={<i className="fas fa-arrow-up"></i>}
            onClick={topFunction}
          />
        </div>
      </Card>
    </div>
  );
};

export default Footer;
