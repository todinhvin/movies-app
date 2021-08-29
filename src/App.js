import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";

import Header from "./components/Header/Header";
import AiringToday from "./components/RatingTb/AiringToday";
import Popular from "./components/RatingTb/Popular";
import TopRated from "./components/Tivi/TopRated";
import Trending from "./components/Trending/Trending";
import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/MoviesPage";
import TiviPage from "./pages/TiviPage";
import TrendingPage from "./pages/TrendingPage";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <Fragment>
      <Header />
      <div className="grid wide body-app">
        <Trending />
        <div className="row">
          <div className="col l-9 m-12 c-12">
            <Switch>
              <Route path="/" exact>
                <TopRated />
                <HomePage />
              </Route>
              <Route path="/trending/:type/:time">
                <TrendingPage />
              </Route>
              <Route path="/movie" exact>
                <MoviesPage />
              </Route>
              <Route path="/movie/:id">
                <DetailPage type="movie" />
              </Route>
              <Route path="/tv" exact>
                <TiviPage />
              </Route>
              <Route path="/tv/:id">
                <DetailPage type="tv" />
              </Route>
            </Switch>
          </div>
          <div className="col l-3 m-0 c-0">
            <Popular />
            <AiringToday />
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}

export default App;
