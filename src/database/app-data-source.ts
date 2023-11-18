import { DataSource, QueryRunner } from "typeorm"
import databaseConfig from "./config";


async function createQueryRunner(appDataSource: DataSource): Promise<QueryRunner> {
  return appDataSource.createQueryRunner();
}

export const AppDataSource = new DataSource(databaseConfig);

export const queryRunner = await createQueryRunner(AppDataSource);