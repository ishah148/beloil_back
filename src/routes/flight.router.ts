import express, { Request } from "express";
import FlightController from "../controllers/flight.controller";
import { FlightCreateDTO, FlightParams, FlightRequestQueryParams, FlightUpdateDTO } from "../types/flights";
import { getFlightParamsFromQuery } from "../utils/get-flight-params-from-query";
import { RequestWithBody, RequestWithParams, RequestWithQuery } from "../types/routes";

const router = express.Router();

router.get("/", async (req: RequestWithQuery<FlightRequestQueryParams>, res) => {
  const flightController = new FlightController();
  
  const flightParams: FlightParams = getFlightParamsFromQuery(req.query);

  console.log(flightParams);
  const { flights, count }= await flightController.getFlights(flightParams);
  res.header('X-Total-Count', `${count}`);
  res.header('Access-Control-Expose-Headers', 'X-Total-Count');
  return res.status(200).send(flights);
});


router.get("/:id", async (req: RequestWithParams<{id: string}>, res) => {
  const controller = new FlightController();
  const flight = await controller.getFlight(req.params.id);
  if (!flight) {
    return res.status(404).send({ message: "No flight found" })
  }
  return res.status(200).send(flight);
});


router.post("/create", async (req: RequestWithBody<FlightCreateDTO>, res) => {
  const flightController = new FlightController();

  const newFlight = await flightController.createFlight(req.body);
  return  res.status(201).send(newFlight);
});


router.patch("/update", async (req: RequestWithBody<FlightUpdateDTO>, res) => {
  const flightController = new FlightController();

  const updatedFlight = await flightController.updateFlight(req.body);
  return  res.status(200).send(updatedFlight);
});


router.delete("/delete/:id", async (req: RequestWithParams<{id: string}>, res) => {
  const flightController = new FlightController();

  await flightController.deleteFlight(req.params.id);
  
  return res.status(200).send({message: 'remove succesful'});
});

export default router;