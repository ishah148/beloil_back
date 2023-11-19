import { Flight } from "../entities/flight.entity";
import { DateField, FlightParams, FlightRequestQueryParams, NumericField, StringField } from "../types/flights";


export function getFlightParamsFromQuery(flightRequestQueryParams: FlightRequestQueryParams): FlightParams {
  const flightParams: FlightParams = {} as FlightParams;

  for (const key in flightRequestQueryParams) {
    const typedKey = key as keyof FlightRequestQueryParams;
    if (flightRequestQueryParams[key] !== undefined) {

      if (isNumericParam(typedKey)) {
        flightParams[typedKey] = +flightRequestQueryParams[typedKey];
      }

      if (isStringParam(typedKey)) {
        flightParams[typedKey] = flightRequestQueryParams[typedKey];
      }

      if(isDateParam(typedKey)) {
        flightParams[typedKey] = new Date(+flightRequestQueryParams[typedKey]);
      }

      if(typedKey === 'sortOrder') {
        flightParams[typedKey] = +flightRequestQueryParams[typedKey] as 0 | 1;
      }

      if(typedKey === 'sortField') {
        flightParams[typedKey] = flightRequestQueryParams[typedKey] as keyof Flight;
      }
    }
  }

  return flightParams;
}


function isNumericParam(key: keyof FlightParams): key is NumericField {
  return key === 'limit' || key === 'page' || key === 'pageCount' || key === 'seatCapacityFilter';
}

function isStringParam(key: keyof FlightParams): key is StringField {
  return key === 'flightIdFilter' || key === 'cityFilter' || key === 'airlineNameFilter' || key === 'notesFilter';
}

function isDateParam(key: keyof FlightParams): key is DateField {
  return key === 'departureTimeFilter' || key === 'checkinTimeFilter';
}