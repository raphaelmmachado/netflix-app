import type { NextApiRequest, NextApiResponse } from "next";
import { dinamicRequests } from "../../utils/requests";
interface Req {
  data: {};
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Req>
) {
  if (req.method === "POST") {
    // Process a POST request
    const id = req.body.id;
    const { fecthIndividualMovie } = dinamicRequests(id);
    const response = await fetch(fecthIndividualMovie);
    const data = await response.json();
    res.status(200).json({ data: data });
  } else {
    // Handle any other HTTP method
  }
}
