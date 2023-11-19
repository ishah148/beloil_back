import express from 'express';
import Router from './routes';
import initDatabaseConnection from './database/init-db-connection';
import cors from "cors";
import shouldGenerateDBValues from "./utils/should-generate-DB-values";
import { generateTablesData } from "./database/generate-tables-data";


async function configureApplication() {
    try {
        await initDatabaseConnection();
        console.log("DataBase has been successfully initialized!")
    } catch (err) {
        console.error("Error during Data Source initialization: ", err.code)
    }

    if (shouldGenerateDBValues) {
        try {
            await generateTablesData();
            console.log('generate was successful');
        } catch (err) {
            console.log(`Error during tables data generation: `, err.code);
        }
        process.exit();
    } else {
        const app = express();

        app.use(express.json());
        app.use(cors())
        app.use(Router);

        app.listen(+process.env.APP_PORT, async () => {
            console.log('server is running on port 8081');
        });
    }
}

configureApplication();
