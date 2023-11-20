import { DataSourceOptions} from 'typeorm'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

type databases = "mysql" | "postgres" | "sqlite" | "oracle"|"mongodb"

const databaseConfig :  DataSourceOptions = {
  type: process.env.DB_TYPE as databases || "mysql",
  host: process.env.MYSQL_HOST || "localhost",
  port: Number(process.env.MYSQL_PORT) || 3306,
  username: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "admin",
  database: process.env.MYSQL_DATABASE || "avia",
  entities: [__dirname + "/../entities/*.entity.{js,ts}"],
  multipleStatements: true,
  logging: true,
  synchronize: true,
  // migrations: [__dirname + "/migrations/*.ts"],
}

export default databaseConfig;