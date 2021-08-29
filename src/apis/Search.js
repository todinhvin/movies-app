import { BASE_URL  } from "../constant/baseURL";
import { transformData } from "../lib/transformData";

export async function getDataSearched({ query = "" }) {
  const response = await fetch(
    `${DOMAIN_URL}/search/multi?api_key=797d08dc86cbab298803421b8affd522&language=en-US&query=${query}&page=1&include_adult=false`
  );
  const data = await response.json();
  if (!response.ok) {
    return new Error(data.message || "Load fail");
  }
  return transformData(data);
}
