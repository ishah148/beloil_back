import { DataSource } from "typeorm"
import databaseConfig from "./config";



export const AppDataSource = new DataSource(databaseConfig);

export const queryRunner = await AppDataSource.createQueryRunner();

export const queryBuilder = await AppDataSource.createQueryBuilder();