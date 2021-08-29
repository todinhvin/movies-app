export const navbar = [
  {
    id: "1",
    title: "HOME",
    to: "/",
    subnav: null,
  },
  {
    id: "2",
    title: "MOVIES",
    to: "/movie",
    subnav: null,
  },
  {
    id: "3",
    title: "TIVI SHOWS",
    to: "/tv",
    subnav: null,
  },
  {
    id: "4",
    title: "TRENDING",
    to: "/trending/all/day",
    subnav: [
      { title: "ALL", to: "/trending/all/day", subnav: null },
      {
        title: "MOVIES",
        to: "/trending/movie/day",
        subnav: null,
      },
      {
        title: "Tivi",
        to: "/trending/tv/day",
        subnav: null,
      },
    ],
  },
];
