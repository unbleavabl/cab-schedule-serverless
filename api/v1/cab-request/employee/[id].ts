import { VercelRequest, VercelResponse } from "@vercel/node";
import { getCabRequests } from "../../../../services/cabRequest.service";

const handler = (req: VercelRequest, res: VercelResponse) => {
  if (req.method === "GET") {
    return getCabRequestsForEmployeeController(req, res);
  }
  if (req.method === "OPTIONS") {
    return res.status(200).json({ body: "OK" });
  }

  return res.status(404);
};

/**
 * @api {get} /v1/cab-request/employee/:id Get Cab requests for an employee
 * @apiName GetCabRequestsForEmployee
 * @apiGroup Cab Requests
 *
 * @apiParam {String} id Employee unique ID.
 *
 * @apiSuccess {Object[]} cabRequests List of cab requests
 * @apiSuccess {Number} cabRequests.id Id of the cab request.
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

const getCabRequestsForEmployeeController = async (
  req: VercelRequest,
  res: VercelResponse
) => {
  const { id } = req.query;
  const result = await getCabRequests({
    filters: {
      employeeId: id as string,
    },
  });

  res.status(200).json(result);
};

export default handler;
