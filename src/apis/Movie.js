import { DOMAIN_URL } from "../constant/domain";
import { transformData, transformNData } from "../lib/transformData";

export async function getTopMovies(type) {
  const response = await fetch(
    `${DOMAIN_URL}/movie/${type}?api_key=797d08dc86cbab298803421b8affd522&language=en-US&page=1`
  );
  const data = await response.json();
  if (!response.ok) {
    return new Error(data.message || "Load fail");
  }
  return transformNData(0, 10, data);
}

export async function getMovies(requestData) {
  const response = await fetch(
    `${DOMAIN_URL}/discover/movie?language=en-US&${requestData.params}&include_video=true&api_key=797d08dc86cbab298803421b8affd522&page=${requestData.pageNumber}&with_watch_monetization_types=flatrate`
  );
  const data = await response.json();
  if (!response.ok) {
    return new Error(data.message || "Load fail");
  }
  return transformData(data);
}