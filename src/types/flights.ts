import { Flight } from "../entities/flight.entity";


export type FlightParams = {
  limit: number;
  page: number;
  pageCount: number;
  flightIdFilter?: string;
  cityFilter?: string;
  departureTimeFilter?: Date;
  airlineNameFilter?: string;
  checkinTimeFilter?: Date;
  seatCapacityFilter?: number;
  notesFilter?: string;
  sortField: keyof Flight;
  sortOrder: 0 | 1;
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
}[Exclude<keyof FlightParams, "sortField">];

export type DateField = {
  [K in keyof FlightParams]: FlightParams[K] extends Date ? K : never;
}[keyof FlightParams];