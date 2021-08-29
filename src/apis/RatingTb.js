import { BASE_URL  } from "../constant/baseURL";
import { transformNData } from "../lib/transformData";

export async function getTopPopular(type) {
  const response = await fetch(
    `${DOMAIN_URL}/${type}/popular?api_key=797d08dc86cbab298803421b8affd522&language=en-US&page=1`
  );
  const data = await response.json();
  if (!response.ok) {
    return new Error(data.message || "Load fail");
  }
  return transformNData(0, 6, data);
}

export async function getTopToday(type) {
  const response = await fetch(
    `${DOMAIN_URL}/${
      type === "tv" ? `${type}/airing_today` : `${type}/now_playing`
    }?api_key=797d08dc86cbab298803421b8affd522&language=en-US&page=1`
  );
  const data = await response.json();
  if (!response.ok) {
    return new Error(data.message || "Load fail");
  }
  return transformNData(0, 6, data);
}
