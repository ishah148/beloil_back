import express, { Request } from "express";
import FlightController from "../controllers/flight.controller";
import { FlightParams, FlightRequestQueryParams } from "../types/flights";
import { getFlightParamsFromQuery } from "../utils/get-flight-params-from-query";
import { RequestWithParams, RequestWithQuery } from "../types/routes";

const router = express.Router();

router.get("/", async (req: RequestWithQuery<FlightRequestQueryParams>, res) => {
  const controller = new FlightController();

  try {
    const flightParams: FlightParams = getFlightParamsFromQuery(req.query);
    console.log(flightParams);
    const response = await controller.getFlights(flightParams);
    return res.send(response);
  }catch (e) {
    console.log("path:/",e)
  }

});

router.get("/:id", async (req: RequestWithParams<{id: string}>, res) => {
  const controller = new FlightController();
  const response = await controller.getFlight(req.params.id);
  if (!response) {
    return res.status(404).send({ message: "No flight found" })
  }
  return res.send(response);
});

export default router;
