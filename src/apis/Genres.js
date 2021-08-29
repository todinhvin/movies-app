import { BASE_URL  } from "../constant/baseURL";

export async function getGenres(type) {
  const response = await fetch(
    `${DOMAIN_URL}/genre/${type}/list?api_key=797d08dc86cbab298803421b8affd522&language=en-US`
  );
  const data = await response.json();
  if (!response.ok) {
    return new Error(data.message || "Load fail");
  }
  return [{ id: null, name: "All" }, ...data.genres];
}
