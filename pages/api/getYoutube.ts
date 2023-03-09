// API TO GET YOUTUBE VIDEOS WITHOUT LEAKING MY YOUTUBE KEY

import type { NextApiRequest, NextApiResponse } from "next";
const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
import axios from "axios";
const BASE_URL = "https://www.googleapis.com/youtube/v3/search?";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Process a POST request
    if (typeof req.body.query !== "string") res.status(400);
    const { data } = await axios(
      `${BASE_URL}key=${API_KEY}&q=${req.body.query}&type=video&maxResults=3&regionCode=BR&videoEmbeddable=true&part=id`
    ).then((res) => res);
    res.status(200).json(data.items);
  } else {
    // Handle any other HTTP method
  }
}
