import { Repository, SelectQueryBuilder } from "typeorm";
import { AppDataSource } from "../database/app-data-source";
import { Flight } from '../entities/flight.entity'
import { FlightParams } from "../types/flights";


export default class FlightService {
  private flightRepository: Repository<Flight>;

  constructor() {
    this.flightRepository = AppDataSource.getRepository(Flight);
  }

  public async getFlights({ page, limit, airlineName, checkinTime, city, departureTime, notes, seatCapacity, sort, sortOrder }: FlightParams): Promise<Array<Flight>> {

    const queryBuilder: SelectQueryBuilder<Flight> = this.flightRepository.createQueryBuilder('flight');

    if (airlineName) {
      queryBuilder.andWhere(`flight.airlineName = :airlineName`, { airlineName: `${airlineName}%` });
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
      queryBuilder.andWhere(`flight.notes = :notes`, { notes: `${notes}%` });
    }

    if (seatCapacity) {
      queryBuilder.andWhere(`flight.seatCapacity >= :seatCapacity`, { seatCapacity: seatCapacity });
    }

    queryBuilder
      .orderBy(
        `flight.${sort ? sort : 'departureTime'}`,
        `${sortOrder == 1 ? 'ASC' : sortOrder == 0 ? 'DESC' : 'ASC'}`
      )
      .skip((page - 1) * limit)
      .take(limit)
    return await queryBuilder.getMany();
  }

  public async getFlightByID(id: string): Promise<Flight | null> {
    return this.flightRepository.findOne({ where: [{ flightId: id }] })
  }
}

