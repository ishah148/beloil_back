import { Flight } from "../entities/flight.entity";


export type FlightParams = {
  limit: number;
  page: number;
  flightId?: string;
  city?: string;
  departureTime?: Date;
  airlineName?: string;
  checkinTime?: Date;
  seatCapacity?: number;
  notes?: string;
  sort?: keyof Flight;
  sortOrder?: 0 | 1;
}

export type FlightCreateDTO = {
  flightId: string;
  city: string;
  departureTime: Date;
  airlineName: string;
  checkinTime: Date;
  seatCapacity: number;
  notes: string;
}

export type FlightUpdateDTO = {
  flightId: string;
  departureTime: Date;
  checkinTime: Date;
}

type Stringify<T> = {
  [K in keyof T]: string;
};

export type FlightRequestQueryParams = Stringify<FlightParams>;


export type NumericField = {
  [K in keyof FlightParams]: FlightParams[K] extends number ? K : never;
} [Exclude<keyof FlightParams, "sortOrder">] ;

export type StringField = {
  [K in keyof FlightParams]: FlightParams[K] extends string ? K : never;
}[Exclude<keyof FlightParams, "sort">];

export type DateField = {
  [K in keyof FlightParams]: FlightParams[K] extends Date ? K : never;
}[keyof FlightParams];