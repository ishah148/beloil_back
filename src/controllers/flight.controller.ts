import { Flight } from '../entities/flight.entity'
import FlightService from "../services/flight.service";
import { FlightParams } from '../types/flights';


export default class FlightController {
  private flightService: FlightService;

  constructor() {
    this.flightService = new FlightService();
  }

  public async getFlights(flightParams: FlightParams): Promise<Array<Flight>> {
    return this.flightService.getFlights(flightParams)
  }

  public async getFlight(id: string): Promise<Flight | null> {
    return this.flightService.getFlightByID(id)
  }
}