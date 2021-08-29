import React, { Fragment, useEffect, useState } from "react";

import classes from "./styles/HeaderNavbar.module.css";

import HeaderNavItem from "./HeaderNavItem";
import Modal from "../Common/Modal/Modal";
import { useHistory } from "react-router-dom";
import { navbar } from "../../menus/NavbarHeader";

const HeaderNavbar = (props) => {
  const history = useHistory();
  console.log(history.location);
  const { isNavMb, hiddenSubnav } = props;
  const [isRender, setIsRender] = useState(false);

  useEffect(() => {
    const funcRender = () => {
      if (window.innerWidth < 1023) {
        setIsRender(true);
      } else {
        setIsRender(false);
      }
    };
    window.addEventListener("resize", funcRender);
    funcRender();
    return () => {
      window.removeEventListener("resize", funcRender);
    };
  }, []);

  const showSubNavMb = (event) => {
    const subnav = document.getElementById(`subnav${event.target.id}`);
    if (subnav) {
      if (!subnav.classList.contains(`${classes.subnav}`)) {
        subnav.classList.add(`${classes.subnav}`);
      } else {
        subnav.classList.remove(`${classes.subnav}`);
      }
    }
  };

  useEffect(() => {}, [hiddenSubnav]);

  const showNavbar = () => {
    return navbar.map((item, index) => {
      return (
        <HeaderNavItem
          key={item.id}
          id={item.id}
          className={`${classes["navbar-item"]} `}
          onClick={showSubNavMb}
          classNameLink={classes["navbar-item-link"]}
          link={item.to}
          title={item.title}
          subnav={item.subnav}
          classNameSubNav={classes["navbar-subnav"]}
          classSubNavLink={classes["navbar-subnav-link"]}
        />
      );
    });
  };

  const handleClick = () => {
    props.setHiddenSubnav();
    setTimeout(() => {
      props.onCloseNavbar();
    }, 200);
  };

  return (
    <Fragment>
      <ul className={classes["header-navbar"]}>
        {showNavbar(
          classes["navbar-item"],
          classes["navbar-item-link"],
          classes["navbar-subnav"],
          classes["navbar-subnav-link"]
        )}
      </ul>
      {isNavMb && isRender && (
        <Modal
          className={`${classes["modal-navbar"]} ${
            !hiddenSubnav ? classes.subnav : ""
          }`}
          onClick={handleClick}
        >
          <ul className={classes["header-navbar-mb"]}>{showNavbar()}</ul>
        </Modal>
      )}
    </Fragment>
  );
};

export default HeaderNavbar;
