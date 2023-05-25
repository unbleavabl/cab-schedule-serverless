import { VercelRequest, VercelResponse } from "@vercel/node";
import { deleteRoute, updateRoute } from "../../../services/route.service";

const handler = (req: VercelRequest, res: VercelResponse) => {
  if (req.method === "PUT") {
    return updateRouteController(req, res);
  }
  if (req.method === "DELETE") {
    return deleteRouteController(req, res);
  }
  return res.status(404);
};

const updateRouteController = async (
  req: VercelRequest,
  res: VercelResponse
) => {
  const body = req.body;
  const { id } = req.query;
  const result = await updateRoute({
    id: parseInt(id as string),
    pickupTime: body.pickupTime,
    startLocation: body.startLocation,
    endLocation: body.endLocation,
    startDate: body.startDate,
    expireDate: body.expireDate,
  });
  res.status(200).json(result);
};

const deleteRouteController = async (
  req: VercelRequest,
  res: VercelResponse
) => {
  const { id } = req.query;
  const result = await deleteRoute({
    id: parseInt(id as string),
  });
  res.status(200).json(result);
};

export default handler;
