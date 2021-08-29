import React from "react";
import { Link } from "react-router-dom";
import classes from "./styles/HeaderNavbar.module.css";

const HeaderNavItem = (props) => {
  const { subnav } = props;
  return (
    <li id={props.id} className={props.className} onClick={props.onClick}>
      <Link id={props.id} className={props.classNameLink} to={props.link}>
        {props.title}
      </Link>
      {subnav && (
        <i
          id={props.id}
          className={`fas fa-chevron-down ${classes["navbar-icon-down"]}`}
        ></i>
      )}
      {subnav && (
        <ul id={`subnav${props.id}`} className={props.classNameSubNav}>
          {subnav.map((item, index) => {
            return (
              <HeaderNavItem
                key={index}
                className={classes["navbar-item-mb"]}
                onClick={props.onClick}
                classNameLink={props.classSubNavLink}
                link={item.to}
                title={item.title}
                subnav={item.subnav}
              />
            );
          })}
        </ul>
      )}
    </li>
  );
};

export default HeaderNavItem;
