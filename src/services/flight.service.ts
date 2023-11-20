import { Repository, SelectQueryBuilder } from "typeorm";
import { AppDataSource } from "../database/app-data-source";
import { Flight } from '../entities/flight.entity'
import { FlightCreateDTO, FlightParams, FlightUpdateDTO } from "../types/flights";


export default class FlightService {
  private flightRepository: Repository<Flight>;

  constructor() {
    this.flightRepository = AppDataSource.getRepository(Flight);
  }

  public async getFlights({ page, limit, flightId, airlineName, checkinTime, city, departureTime, notes, seatCapacity, sort, sortOrder }: FlightParams): Promise<{ flights: Flight[], count: number }> {

    const queryBuilder: SelectQueryBuilder<Flight> = this.flightRepository.createQueryBuilder('flight');

    if (flightId) {
      queryBuilder.andWhere(`flight.flightId LIKE :flightId`, { flightId: `${flightId}%` });
    }

    if (airlineName) {
      queryBuilder.andWhere(`flight.airlineName LIKE :airlineName`, { airlineName: `${airlineName}%` });
    }

    if (checkinTime) {
      queryBuilder.andWhere(`DATE(flight.checkinTime) = DATE(:checkinTime)`, { checkinTime: checkinTime });
    }

    if (city) {
      queryBuilder.andWhere(`flight.city LIKE :city`, { city: `${city}%` });
    }

    if (departureTime) {
      queryBuilder.andWhere(`DATE(flight.departureTime) = DATE(:departureTime)`, { departureTime: departureTime });
    }

    if (notes) {
      queryBuilder.andWhere(`flight.notes LIKE :notes`, { notes: `${notes}%` });
    }

    if (seatCapacity) {
      queryBuilder.andWhere(`flight.seatCapacity >= :seatCapacity`, { seatCapacity: seatCapacity });
    }

    const count = await queryBuilder.getCount();

    queryBuilder
      .orderBy(
        `flight.${sort ? sort : 'departureTime'}`,
        `${sortOrder == 1 ? 'ASC' : sortOrder == 0 ? 'DESC' : 'ASC'}`
      )
      .skip((page - 1) * limit)
      .take(limit)

    const flights = await queryBuilder.getMany();

    return {
      flights,
      count
    }
  }

  public async getFlightByID(id: string): Promise<Flight | null> {
    return this.flightRepository.findOne({ where: [{ flightId: id }] })
  }

  public async createFlight(flightDTO: FlightCreateDTO): Promise<Flight> {
    const existingFlight = await this.flightRepository.findOne({
      where: { flightId: flightDTO.flightId },
    });

    if (existingFlight) {
      throw new Error('Flight with the given flightId already exists');
    }

    return await this.flightRepository.save(flightDTO);
  }

  public async updateFlight({ flightId, departureTime, checkinTime }: FlightUpdateDTO): Promise<Flight> {
    return await this.flightRepository.save({
      flightId,
      departureTime,
      checkinTime
    });
  }

  public async deleteFlight(id: string): Promise<void> {
    await this.flightRepository.delete({ flightId: id });
  }
}

