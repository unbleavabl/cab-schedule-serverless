import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  createCabRequest,
  getCabRequests,
} from "../../../services/v2/cabRequest.service";

const handler = (req: VercelRequest, res: VercelResponse) => {
  if (req.method === "GET") {
    return getCabRequestsController(req, res);
  }
  if (req.method === "POST") {
    return createCabRequestsController(req, res);
  }
  if (req.method === "OPTIONS") {
    return res.status(200).json({ body: "OK" });
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
    projectCode: body.projectCode,
    phoneNumber: body.phoneNumber,
    expireDate: body.expireDate,
  });

  res.status(200).json(result);
};

export default handler;
