import { VercelRequest, VercelResponse } from "@vercel/node";
import { updateCabRequest } from "../../../services/cabRequest.service";

const handler = (req: VercelRequest, res: VercelResponse) => {
  if (req.method === "PUT") {
    return updateCabRequestController(req, res);
  }
  return res.status(404);
};

const updateCabRequestController = async (
  req: VercelRequest,
  res: VercelResponse
) => {
  const { id } = req.query;
  const { body } = req;
  const result = await updateCabRequest({
    id: parseInt(id as string),
    employeeId: body.employeeId,
    employeeName: body.employeeName,
    pickupLocation: body.pickupLocation,
    dropLocation: body.dropLocation,
    pickupTime: body.pickupTime,
    status: body.status,
    routeId: body.routeId,
  });

  res.status(200).json(result);
};

export default handler;
