import express from "express";
import FlightRouter from "./flight.router";

const router = express.Router();

router.use("/flights", FlightRouter)

export default router;