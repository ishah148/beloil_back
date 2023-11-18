import { Repository } from "typeorm";
import { AppDataSource } from "../database/app-data-source";
import { Flight } from '../entities/flight.entity'

// export interface IFlightPayload {
//   content: string;
//   userId: number;
//   postId: number;
// }

export default class FlightService {
  private flightRepository: Repository<Flight>;

  constructor() {
    this.flightRepository = AppDataSource.getRepository(Flight);
  }

  public async getFlights(): Promise<Array<Flight>> {
    return this.flightRepository.find();
  }

  public async getFlightByID(id: string): Promise<Flight | null> {
    return this.flightRepository.findOne({ where: [{ flightId: id }] })
  }


  // public async createFlight( body: IFlightPayload): Promise<Flight> {
  //   return createComment(body)
  // }
}

