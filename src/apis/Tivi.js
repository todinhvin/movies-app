import { BASE_URL  } from "../constant/baseURL";
import { transformData, transformNData } from "../lib/transformData";

export async function getTopTivi(type) {
  const response = await fetch(
    `${DOMAIN_URL}/tv/${type}?api_key=797d08dc86cbab298803421b8affd522&language=en-US&page=1`
  );
  const data = await response.json();
  if (!response.ok) {
    return new Error(data.message || "Load fail");
  }
  return transformNData(0, 10, data);
}

export async function getTivi({ params = "", pageNumber = 1 }) {
  const response = await fetch(
    `${DOMAIN_URL}/discover/tv?language=en-US&${params}&include_video=true&api_key=797d08dc86cbab298803421b8affd522&page=${pageNumber}&with_watch_monetization_types=flatrate`
  );
  const data = await response.json();
  if (!response.ok) {
    return new Error(data.message || "Load fail");
  }
  return transformData(data);
}
