import { Repository, SelectQueryBuilder } from "typeorm";
import { AppDataSource } from "../database/app-data-source";
import { Flight } from '../entities/flight.entity'
import { FlightParams } from "../types/flights";


export default class FlightService {
  private flightRepository: Repository<Flight>;

  constructor() {
    this.flightRepository = AppDataSource.getRepository(Flight);
  }

  public async getFlights(flightParams: FlightParams): Promise<Array<Flight>> {

    const queryBuilder: SelectQueryBuilder<Flight> = this.flightRepository.createQueryBuilder('flight');
    //присылать только объект с фильтрами, чтобы это можно было сделать универсально
    // Object.keys(filters).forEach((key) => {
    //   const value = filters[key];

    //   queryBuilder.andWhere(`entity.${key} = :${key}`, { [key]: value });
    // });

    if (flightParams.airlineNameFilter) {
      queryBuilder.andWhere(`flight.airlineName = :airlineName`, { airlineName: flightParams.airlineNameFilter });
    }

    if (flightParams.checkinTimeFilter) {
      queryBuilder.andWhere(`flight.checkinTime = :checkinTime`, { checkinTime: flightParams.checkinTimeFilter });
    }

    if (flightParams.cityFilter) {
      queryBuilder.andWhere(`flight.city = :city`, { city: flightParams.cityFilter });
    }

    if (flightParams.departureTimeFilter) {
      queryBuilder.andWhere(`flight.departureTime = :departureTime`, { departureTime: flightParams.departureTimeFilter });
    }

    if (flightParams.notesFilter) {
      queryBuilder.andWhere(`flight.notes = :notes`, { notes: flightParams.notesFilter });
    }

    if (flightParams.seatCapacityFilter) {
      queryBuilder.andWhere(`flight.seatCapacity = :seatCapacity`, { seatCapacity: flightParams.seatCapacityFilter });
    }

    queryBuilder.orderBy(`flight.${flightParams.sortField}`, `${flightParams.sortOrder == 1 ? 'ASC' : flightParams.sortOrder == 0 ? 'DESC' : 'ASC'}`)

    return await queryBuilder.getMany();
  }

  public async getFlightByID(id: string): Promise<Flight | null> {
    return this.flightRepository.findOne({ where: [{ flightId: id }] })
  }
}

