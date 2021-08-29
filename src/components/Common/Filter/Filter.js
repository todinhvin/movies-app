import React, { useEffect, useState } from "react";

import classes from "./styles/Filter.module.css";
import useHttp from "./../../../hooks/use-http";

import Card from "../Card/Card";
import FilterItem from "./FilterItem";
import Button from "./../Button/Button";
import { sortArray } from "../../../menus/Filter";
import { getGenres } from "../../../apis/Genres";

const Filter = (props) => {
  const [genreSelected, setGenreSelected] = useState(null);
  const [sortBy, setSortBy] = useState("popularity.desc");

  const { data, sendRequest } = useHttp(getGenres);

  const handleGenreSelected = (item) => {
    setGenreSelected(item.id);
  };

  const handleSortBy = (item) => {
    setSortBy(item.type);
  };

  useEffect(() => {
    sendRequest(props.type);
  }, [sendRequest, props.type]);
  return (
    <Card className={classes.filter}>
      <FilterItem name="SORT BY" data={sortArray} onClick={handleSortBy} />
      <FilterItem name="GENRE" data={data} onClick={handleGenreSelected} />
      <Button
        className={classes["btn-search"]}
        value="SEARCH"
        onClick={() => {
          props.handleFilter({ genreSelected, sortBy });
        }}
      />
    </Card>
  );
};

export default Filter;
