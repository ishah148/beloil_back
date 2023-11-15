import { DataSource } from "typeorm"
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));


export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "admin",
  database: "avia",
  logging: true,
  synchronize: true,
  entities: [__dirname + "/entities/*.entity.{js,ts}"],
  // migrations: [__dirname + "/migrations/*.ts"],
})