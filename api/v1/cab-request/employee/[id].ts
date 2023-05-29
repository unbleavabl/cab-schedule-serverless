import { VercelRequest, VercelResponse } from "@vercel/node";
import { getCabRequests } from "../../../../services/cabRequest.service";

const handler = (req: VercelRequest, res: VercelResponse) => {
  if (req.method === "GET") {
    return getCabRequestsForEmployeeController(req, res);
  }
  if (req.method === "OPTIONS") {
    return res.status(200).json({ body: "OK" });
  }

  return res.status(404);
};

const getCabRequestsForEmployeeController = async (
  req: VercelRequest,
  res: VercelResponse
) => {
  const { id } = req.query;
  const result = await getCabRequests({
    filters: {
      employeeId: id as string,
    },
  });

  res.status(200).json(result);
};

export default handler;
