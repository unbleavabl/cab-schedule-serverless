import { VercelRequest, VercelResponse } from "@vercel/node";
import { createVendor, getVendors } from "../../../services/vendor.service";

const handler = (req: VercelRequest, res: VercelResponse) => {
  if (req.method === "GET") {
    return getVendorsController(req, res);
  }
  if (req.method === "POST") {
    return createVendorController(req, res);
  }
  if (req.method === "OPTIONS") {
    return res.status(200).json({ body: "OK" });
  }
  return res.status(404);
};

const getVendorsController = async (_: VercelRequest, res: VercelResponse) => {
  const result = await getVendors();
  res.status(200).json(result);
};

const createVendorController = async (
  req: VercelRequest,
  res: VercelResponse
) => {
  const body = req.body;
  const result = await createVendor({
    name: body.name,
    vehicles: body.vehicles,
  });
  res.status(200).json(result);
};

export default handler;
