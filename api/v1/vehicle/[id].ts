import { VercelRequest, VercelResponse } from "@vercel/node";
import { updateVehicle } from "../../../services/vehicle.service";

const handler = (req: VercelRequest, res: VercelResponse) => {
  if (req.method === "PUT") {
    return updateVehicleController(req, res);
  }
  return res.status(404);
};

const updateVehicleController = async (
  req: VercelRequest,
  res: VercelResponse
) => {
  const body = req.body;
  const { id } = req.query;
  const result = await updateVehicle({
    id: id as string,
    driverName: body.driverName,
  });
  res.status(200).send(result);
};

export default handler;
