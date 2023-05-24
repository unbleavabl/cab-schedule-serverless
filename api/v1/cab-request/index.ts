import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  createCabRequest,
  getCabRequests,
} from "../../services/cabRequest.service";

const handler = (req: VercelRequest, res: VercelResponse) => {
  if (req.method === "GET") {
    return res.json(getCabRequestsController(req, res));
  }
  if (req.method === "POST") {
    return res.json(createCabRequestsController(req, res));
  }
  return res.status(404);
};

const getCabRequestsController = async (
  _: VercelRequest,
  res: VercelResponse
) => {
  const result = await getCabRequests();
  res.status(200).json(result);
};

const createCabRequestsController = async (
  req: VercelRequest,
  res: VercelResponse
) => {
  const { body } = req;
  const result = await createCabRequest({
    employeeId: body.employeeId,
    employeeName: body.employeeName,
    pickupLocation: body.pickupLocation,
    dropLocation: body.dropLocation,
    pickupTime: body.pickupTime,
  });

  res.status(200).json(result);
};

export default handler;
