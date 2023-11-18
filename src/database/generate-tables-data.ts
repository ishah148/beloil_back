import { AppDataSource } from "./app-data-source";
import { generateFlightsData } from "./generate-flights-data";
import { queryRunner } from "./app-data-source";

export async function generateTablesData() {

  await queryRunner.query(
    `SET FOREIGN_KEY_CHECKS = 0;
     TRUNCATE TABLE flight;
     TRUNCATE TABLE flight_reservation;
     SET FOREIGN_KEY_CHECKS = 1
    `
  );

  await generateFlightsData();
}