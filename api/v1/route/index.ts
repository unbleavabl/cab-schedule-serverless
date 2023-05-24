import { VercelRequest, VercelResponse } from "@vercel/node";
import { createRoute, getRoutes } from "../../services/route.service";

const handler = (req: VercelRequest, res: VercelResponse) => {
  if (req.method === "GET") {
    return res.json(getRoutesController(req, res));
  }
  if (req.method === "POST") {
    return res.json(createRoutesController(req, res));
  }
  return res.status(404);
};

const getRoutesController = async (req: VercelRequest, res: VercelResponse) => {
  const queryParams = req.query;
  const id = queryParams?.id ? parseInt(queryParams.id as string) : undefined;
  const date = queryParams?.date as string;
  const result = await getRoutes({
    filters: {
      id,
      date,
    },
  });
  res.status(200).json(result);
};

const createRoutesController = async (req: VercelRequest, res: VercelResponse) => {
  const body = req.body;
  const result = await createRoute({
    pickupTime: body.pickupTime,
    startLocation: body.startLocation,
    endLocation: body.endLocation,
    startDate: body.startDate,
    expireDate: body.expireDate,
    vehicleId: body.vehicleId,
    vehicle: body.vehicle,
  });
  res.status(200).send(result);
};

export default handler;
