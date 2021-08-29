import React, { useEffect, useState } from "react";
import { getDataSearched } from "../../apis/Search";
import useHttp from "../../hooks/use-http";
import Card from "../Common/Card/Card";
import Container from "../Common/Container/Container";
import Loading from "../Common/Loading/Loading";
import HeaderNavbar from "./HeaderNavbar";
import HeaderSearch from "./HeaderSearch";
import classes from "./styles/Header.module.css";

const Header = (props) => {
  const [isNavMb, setIsNavMb] = useState(false);
  const [hiddenSubnav, setHiddenSubnav] = useState(true);
  const [dataSearched, setDataSearched] = useState([]);
  const { data, isLoading, error, sendRequest } = useHttp(getDataSearched);
  const [valueSearch, setValueSearch] = useState("");
  const onCloseNavbar = () => {
    setIsNavMb(false);
  };

  const onToggleNav = () => {
    setIsNavMb((prev) => {
      return !prev;
    });
  };

  useEffect(() => {
    setDataSearched(data);
  }, [data]);

  useEffect(() => {
    if (valueSearch.trim().length !== 0) {
      sendRequest({ query: valueSearch });
    } else {
      setDataSearched([]);
    }
  }, [sendRequest, valueSearch]);

  let content;
  if (isLoading) {
    content = <Loading />;
  } else if (!error) {
    content = (
      <Container
        data={{
          isShowItem: true,
          items: dataSearched,
          itemClassName: "col l-3 m-3 c-6",
          isTableSearch: true,
          handleSearch: setValueSearch,
        }}
      />
    );
  }

  return (
    <>
      <section className={classes["header-section"]}>
        <div className="grid wide">
          <div className={classes.header}>
            <a href="/" className="logo">
              MOTV
            </a>
            <HeaderNavbar
              isNavMb={isNavMb}
              onCloseNavbar={onCloseNavbar}
              onToggleNav={onToggleNav}
              hiddenSubnav={hiddenSubnav}
              setHiddenSubnav={() => {
                setHiddenSubnav(!hiddenSubnav);
              }}
            />
            <HeaderSearch
              isNavMb={isNavMb}
              onToggleNav={onToggleNav}
              setHiddenSubnav={() => {
                setHiddenSubnav(!hiddenSubnav);
              }}
              handleSearch={setValueSearch}
            />
            {dataSearched.length !== 0 && (
              <Card
                className={`${classes["table-search"]} ${
                  dataSearched ? classes.show : ""
                }`}
              >
                {content}
              </Card>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
