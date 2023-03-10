import { YTIds } from "../../typing";

export async function searchYoutubeVideos(query: string) {
  try {
    const headers = new Headers({
      "Content-Type": "application/json",
    });
    const init = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ query: query }),
    };

    const data: YTIds[] = await fetch("/api/getYoutube", init)
      .then((res) => res.json())
      .catch((e) => {
        return { msg: "erro ao buscar video", err: e };
      });
    return data;
  } catch (error) {
    console.error("Failed to get youtube videos");
  }
}
