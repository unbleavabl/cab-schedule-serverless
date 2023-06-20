import prisma from "../../lib/prisma";
import { CreateCabRequest, UpdateCabRequest } from "./cabRequest.service";

export type CreateVendor = {
  name: string;
  cabRequests: any;
};

export type UpdateVendor = {
  id: number;
  name: string;
  cabRequests: any;
};

export const getVendors = async () => {
  const result = await prisma.vendor.findMany({
    where: {},
  });
  return result;
};

export const createVendor = async ({ name, cabRequests }: CreateVendor) => {
  const result = await prisma.vendor.create({
    data: {
      name,
      cabRequests: cabRequests,
    },
  });
  return result;
};

export const updateVendor = async ({ id, name, cabRequests }: UpdateVendor) => {
  const result = await prisma.vendor.update({
    where: {
      id,
    },
    data: {
      name,
      cabRequests: cabRequests,
    },
  });
  return result;
};
