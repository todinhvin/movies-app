import { DOMAIN_URL } from "../constant/domain";
import { transformData } from "../lib/transformData";

export async function getTopTrending() {
  const response = await fetch(
    `${DOMAIN_URL}/trending/all/day?api_key=797d08dc86cbab298803421b8affd522`
  );
  const data = await response.json();
  if (!response.ok) {
    return new Error(data.message || "Load fail");
  }
  return transformData(data);
}

export async function getTrending(dataRequest) {
  const response = await fetch(
    `${DOMAIN_URL}/trending/${dataRequest.type}/${dataRequest.time}?api_key=797d08dc86cbab298803421b8affd522&page=${dataRequest.pageNumber}`
  );
  const data = await response.json();
  if (!response.ok) {
    return new Error(data.message || "Load fail");
  }
  return transformData(data);
}
