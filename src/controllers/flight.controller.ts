import { Flight } from '../entities/flight.entity'
import FlightService from "../services/flight.service";


// export interface IFlightPayload {
//   flightId: string;
//   date: Date;
// }

export default class FlightController {
  private flightService: FlightService;

  constructor() {
    this.flightService = new FlightService();
  }

  public async getFlights(): Promise<Array<Flight>> {
    return this.flightService.getFlights()
  }

  public async getFlight(id: string): Promise<Flight | null> {
    return this.flightService.getFlightByID(id)
  }


  // public async createFlight( body: IFlightPayload): Promise<Flight> {
  //   return createComment(body)
  // }
}