import { VercelRequest, VercelResponse } from "@vercel/node";
import {
  createVehicle,
  getVehicles,
} from "../../../services/v2/vehicle.service";

const handler = (req: VercelRequest, res: VercelResponse) => {
  if (req.method === "GET") {
    return getVehiclesController(req, res);
  }
  if (req.method === "POST") {
    return createVehicleController(req, res);
  }
  if (req.method === "OPTIONS") {
    return res.status(200).json({ body: "OK" });
  }
  return res.status(404);
};

const getVehiclesController = async (
  req: VercelRequest,
  res: VercelResponse
) => {
  const { vendorId } = req.query;
  const result = await getVehicles({
    filters: {
      vendorId: vendorId ? parseInt(vendorId as string) : undefined,
    },
  });
  res.status(200).json(result);
};

const createVehicleController = async (
  req: VercelRequest,
  res: VercelResponse
) => {
  const body = req.body;
  const result = await createVehicle({
    id: body.id,
    driverName: body.driverName,
    vendorId: body.vendorId,
    vendor: body.vendor,
  });
  res.status(200).send(result);
};

export default handler;
