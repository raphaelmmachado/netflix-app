import type { NextApiRequest, NextApiResponse } from "next";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Process a POST request
  } else {
    // Handle any other HTTP method
    res.status(200).json({ secret: API_KEY });
  }
}
