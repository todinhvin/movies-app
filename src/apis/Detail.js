import { DOMAIN_URL } from "../constant/domain";
import { transformData } from "../lib/transformData";

export async function getDetail(requestData) {
  const response = await fetch(
    `${DOMAIN_URL}/${requestData.type}/${requestData.id}?api_key=797d08dc86cbab298803421b8affd522&language=en-US`
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

export async function getVideo(requestData) {
  const response = await fetch(
    `${DOMAIN_URL}/${requestData.type}/${requestData.id}/videos?api_key=797d08dc86cbab298803421b8affd522&language=en-US`
  );
  const data = await response.json();
  if (!response.ok) {
    return new Error(data.message || "Load fail");
  }
  return data.results[0].key;
}

export async function getRecommendation(requestData) {
  const response = await fetch(
    `${DOMAIN_URL}/${requestData.type}/${requestData.id}/recommendations?api_key=797d08dc86cbab298803421b8affd522&language=en-US&page=1`
  );
  const data = await response.json();
  if (!response.ok) {
    return new Error(data.message || "Load fail");
  }
  return transformData(data);
}

export async function getSimilar(requestData) {
  const response = await fetch(
    `${DOMAIN_URL}/${requestData.type}/${requestData.id}/similar?api_key=797d08dc86cbab298803421b8affd522&language=en-US&page=1`
  );
  const data = await response.json();
  if (!response.ok) {
    return new Error(data.message || "Load fail");
  }
  return transformData(data);
}
