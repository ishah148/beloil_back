import { Flight } from '../entities/flight.entity'
import FlightService from "../services/flight.service";
import { FlightCreateDTO, FlightParams, FlightUpdateDTO } from '../types/flights';


export default class FlightController {
  private flightService: FlightService;

  constructor() {
    this.flightService = new FlightService();
  }

  public async getFlights(flightParams: FlightParams): Promise<{ flights: Flight[], count: number }> {
    return this.flightService.getFlights(flightParams)
  }

  public async getFlight(id: string): Promise<Flight | null> {
    return this.flightService.getFlightByID(id)
  }

  public async createFlight(flightDTO: FlightCreateDTO): Promise<Flight> {
    return this.flightService.createFlight(flightDTO);
    // try {
    //   const newFlight = this.flightService.createFlight(flightDTO);
    //   res.status(200).send();
    // } catch(e) {
    //   if(!e.status) {
    //     res.status(500).json( { error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } });
    //   } else {
    //     res.status(e.status).json( { error: { code: e.code, message: e.message } });
    //   }
    // }

    // try {
    //   const user = await UserService.loginUser(req.body.email, req.body.password);
    //   res.status(200).json({ data: user });
    // } catch (e) {
      
    // }
  }

  public async updateFlight(flightDTO: FlightUpdateDTO): Promise<Flight> {
    return this.flightService.updateFlight(flightDTO)
  }

  public async deleteFlight(id: string): Promise<void> {
    await this.flightService.deleteFlight(id);
  }
}