import express from "express";
import FlightController from "../controllers/flight.controller";

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new FlightController();
  const response = await controller.getFlights();
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const controller = new FlightController();
  const response = await controller.getFlight(req.params.id);
  if (!response) {
    return res.status(404).send({message: "No flight found"})
  }
  return res.send(response);
});

export default router;