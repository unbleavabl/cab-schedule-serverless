import { VercelRequest, VercelResponse } from "@vercel/node";
import { updateCabRequest } from "../../../services/cabRequest.service";

const handler = (req: VercelRequest, res: VercelResponse) => {
  if (req.method === "PUT") {
    return updateCabRequestController(req, res);
  }
  if (req.method === "OPTIONS") {
    return res.status(200).json({ body: "OK" });
  }
  return res.status(404);
};

/**
 * @api {put} /v1/cab-request/:id Get Cab requests for an employee
 * @apiName UpdateCabRequest
 * @apiGroup Cab Requests
 *
 * @apiParam {String} id Cab Request id.
 *
 * @apiBody {Object} cabRequest List of cab requests
 * @apiBody {Number} cabRequest.id Id of the cab request.
 * @apiBody {String} cabRequest.employeeName  Employee Name.
 * @apiBody {String} cabRequest.pickupLocation  Pickup Location.
 * @apiBody {String} cabRequest.dropLocation  Drop Location.
 * @apiBody {String} cabRequest.pickupTime  Pickup date and time for the first pickup.
 * @apiBody {String} cabRequest.status  Status of the cab request - "PENDING" / "APPROVED" / "REJECTED".
 * @apiBody {Boolean} cabRequest.deleted  Soft delete flag
 * @apiBody {Number} [cabRequest.routeId]  Id of route if assigned or null
 *
 * @apiSuccess {Object} cabRequest List of cab requests
 * @apiSuccess {Number} cabRequest.id Id of the cab request.
 * @apiSuccess {Date} cabRequest.createdAt  Timestamp of create.
 * @apiSuccess {Date} cabRequest.updatedAt  Timestamp of update.
 * @apiSuccess {String} cabRequest.employeeName  Employee Name.
 * @apiSuccess {String} cabRequest.pickupLocation  Pickup Location.
 * @apiSuccess {String} cabRequest.dropLocation  Drop Location.
 * @apiSuccess {String} cabRequest.pickupTime  Pickup date and time for the first pickup.
 * @apiSuccess {String} cabRequest.status  Status of the cab request - "PENDING" / "APPROVED" / "REJECTED".
 * @apiSuccess {Boolean} cabRequest.deleted  Soft delete flag
 * @apiSuccess {Number} [cabRequest.routeId]  Id of route if assigned or null
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *      {
 *          "id": 7,
 *          "createdAt": "2023-05-31T07:03:00.221Z",
 *          "updatedAt": "2023-05-31T07:03:00.221Z",
 *          "employeeId": "11111",
 *          "employeeName": "xyz",
 *          "pickupLocation": "here",
 *          "dropLocation": "there",
 *          "pickupTime": "2023-06-30T08:55:18.252Z",
 *          "status": "PENDING",
 *          "deleted": false,
 *          "routeId": null
 *      },
 *      {
 *          "id": 9,
 *          "createdAt": "2023-05-31T07:03:00.221Z",
 *          "updatedAt": "2023-05-31T07:03:00.221Z",
 *          "employeeId": "11111",
 *          "employeeName": "xyz",
 *          "pickupLocation": "here",
 *          "dropLocation": "there",
 *          "pickupTime": "2023-06-30T08:55:18.252Z",
 *          "status": "APPROVED",
 *          "deleted": false,
 *          "routeId": 1234
 *      },
 *    ]
 */
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
