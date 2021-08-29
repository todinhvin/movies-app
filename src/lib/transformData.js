export const transformData = (data) => {
  let dataTransformed = [];
  dataTransformed = data.results
    .filter((item) => item.poster_path)
    .map((item) => {
      return {
        id: item.id,
        img: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
        backdropPath: `https://image.tmdb.org/t/p/w500/${item.backdrop_path}`,
        mediaType: item.media_type,
        overview: item.overview,
        title: item.title ? item.title : item.name,
        type: item.release_date ? "movie" : "tv",
        releaseDate: item.release_date,
        firstAirDate: item.first_air_date,
        voteAverage: item.vote_average.toFixed(2),
      };
    });
  return dataTransformed;
};

// export const transformNData = (setDataFnc, start, amount, data) => {
//   let dataTransformed = [];
//   for (let key = start; key < start + amount; key++) {
//     dataTransformed.push({
//       id: data.results[key].id,
//       img: `https://image.tmdb.org/t/p/w500/${data.results[key].poster_path}`,
//       backdropPath: `https://image.tmdb.org/t/p/w500/${data.results[key].backdrop_path}`,
//       overview: data.results[key].overview,
//       title: data.results[key].title
//         ? data.results[key].title
//         : data.results[key].name,
//       type: data.results[key].release_date ? "movie" : "tv",
//       releaseDate: data.results[key].release_date,
//       firstAirDate: data.results[key].first_air_date,
//       voteAverage: data.results[key].vote_average,
//     });
//   }
//   setDataFnc(dataTransformed);
// };

export const transformNData = (start, amount, data) => {
  let dataTransformed = [];
  for (let key = start; key < start + amount; key++) {
    dataTransformed.push({
      id: data.results[key].id,
      img: `https://image.tmdb.org/t/p/w500/${data.results[key].poster_path}`,
      backdropPath: `https://image.tmdb.org/t/p/w500/${data.results[key].backdrop_path}`,
      overview: data.results[key].overview,
      title: data.results[key].title
        ? data.results[key].title
        : data.results[key].name,
      type: data.results[key].release_date ? "movie" : "tv",
      releaseDate: data.results[key].release_date,
      firstAirDate: data.results[key].first_air_date,
      voteAverage: data.results[key].vote_average,
    });
  }
  return dataTransformed;
};

// export const transformNDataSlider = (setDataFnc, amount, data) => {
//   let dataTransformed = [];
//   for (let key = 5; key < 5 + amount; key++) {
//     dataTransformed.push({
//       id: data.results[key].id,
//       img: `https://image.tmdb.org/t/p/w500/${data.results[key].backdrop_path}`,
//       overview: data.results[key].overview,
//       title: data.results[key].title
//         ? data.results[key].title
//         : data.results[key].name,
//       releaseDate: data.results[key].release_date,
//       firstAirDate: data.results[key].first_air_date,
//       voteAverage: data.results[key].vote_average,
//     });
//   }
//   setDataFnc(dataTransformed);
// };
