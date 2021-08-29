import { BASE_URL  } from "../constant/baseURL";
import { transformData } from "../lib/transformData";

export async function getDetail({ type = "", id = "" }) {
  const response = await fetch(
    `${DOMAIN_URL}/${type}/${id}?api_key=797d08dc86cbab298803421b8affd522&language=en-US`
  );
  const data = await response.json();
  if (!response.ok) {
    return new Error(data.message || "Load fail");
  }
  return {
    id: data.id,
    backdropPath: `https://image.tmdb.org/t/p/w500/${data.backdrop_path}`,
    posterPath: `https://image.tmdb.org/t/p/w500/${data.poster_path}`,
    genres: data.genres,
    overview: data.overview,
    title: data.title ? data.title : data.name,
    releaseDate: data.release_date,
    firstAirDate: data.first_air_date,
    voteAverage: data.vote_average,
    voteCount: data.vote_count,
    tagline: data.tagline,
  };
}

export async function getVideo({ type = "", id = "" }) {
  const response = await fetch(
    `${DOMAIN_URL}/${type}/${id}/videos?api_key=797d08dc86cbab298803421b8affd522&language=en-US`
  );
  const data = await response.json();
  if (!response.ok) {
    return new Error(data.message || "Load fail");
  }
  return data.results[0].key;
}

export async function getRecommendation({ type = "", id = "" }) {
  const response = await fetch(
    `${DOMAIN_URL}/${type}/${id}/recommendations?api_key=797d08dc86cbab298803421b8affd522&language=en-US&page=1`
  );
  const data = await response.json();
  if (!response.ok) {
    return new Error(data.message || "Load fail");
  }
  return transformData(data);
}

export async function getSimilar({ type = "", id = "" }) {
  const response = await fetch(
    `${DOMAIN_URL}/${type}/${id}/similar?api_key=797d08dc86cbab298803421b8affd522&language=en-US&page=1`
  );
  const data = await response.json();
  if (!response.ok) {
    return new Error(data.message || "Load fail");
  }
  return transformData(data);
}
