import express, { Request, Response } from 'express';
import { AppDataSource } from './app-data-source';
import { Flight } from './entities/flight.entity';



async function configureDatabaseConnection() {
  const appDataSource = await AppDataSource.initialize();
  console.log("Data Source has been initialized!")

  const queryRunner = await appDataSource.createQueryRunner();

  const [checkFlightSeatCapacityConstraint] = await queryRunner.query(
    "SELECT * FROM information_schema.TABLE_CONSTRAINTS WHERE TABLE_NAME = 'flight' AND CONSTRAINT_NAME = 'check_flight_seat_capacity'"
  );

  const [preventRepeatingValuesWhenInsertingTrigger] = await queryRunner.query(
    "SELECT * FROM information_schema.TRIGGERS WHERE TRIGGER_NAME = 'prevent_repeating_values_when_inserting';"
  );

  const [preventRepeatingValuesWhenUpdatingTrigger] = await queryRunner.query(
    "SELECT * FROM information_schema.TRIGGERS WHERE TRIGGER_NAME = 'prevent_repeating_values_when_updating';"
  );

  const [checkCheckinTimeWhenInsertingTrigger] = await queryRunner.query(
    "SELECT * FROM information_schema.TRIGGERS WHERE TRIGGER_NAME = 'check_checkin_time_when_inserting';"
  );

  const [checkCheckinTimeWhenUpdatingTrigger] = await queryRunner.query(
    "SELECT * FROM information_schema.TRIGGERS WHERE TRIGGER_NAME = 'check_checkin_time_when_updating';"
  );

  const [assignSeatNumberTrigger] = await queryRunner.query(
    "SELECT * FROM information_schema.TRIGGERS WHERE TRIGGER_NAME = 'assign_seat_number';"
  );

  const [updateFlightTableAfterReservationInsertTrigger] = await queryRunner.query(
    "SELECT * FROM information_schema.TRIGGERS WHERE TRIGGER_NAME = 'update_flight_table_after_reservation_insert';"
  );

  const [updateFlightTableAfterReservationDeleteTrigger] = await queryRunner.query(
    "SELECT * FROM information_schema.TRIGGERS WHERE TRIGGER_NAME = 'update_flight_table_after_reservation_delete';"
  );

  const [preventFlightDeletion] = await queryRunner.query(
    "SELECT * FROM information_schema.TRIGGERS WHERE TRIGGER_NAME = 'prevent_flight_deletion';"
  );


  if (!checkFlightSeatCapacityConstraint) {
    await queryRunner.manager.query(
      `
        ALTER TABLE flight
        ADD CONSTRAINT check_flight_seat_capacity CHECK (seat_capacity BETWEEN 0 AND 800);
      `
    );
  }

  if (!preventRepeatingValuesWhenInsertingTrigger) {
    await queryRunner.manager.query(
      `
        CREATE TRIGGER prevent_repeating_values_when_inserting
        BEFORE INSERT ON flight
        FOR EACH ROW
        BEGIN
            DECLARE value_count INT;
            SELECT COUNT(*) INTO value_count FROM flight WHERE departure_time = NEW.departure_time;
            IF value_count >= 2 THEN
                SIGNAL SQLSTATE '45000'
                SET MESSAGE_TEXT = 'No more than two flights may depart at the same time';
            END IF;
        END;
      `
    );
  }

  if (!preventRepeatingValuesWhenUpdatingTrigger) {
    await queryRunner.manager.query(
      `
        CREATE TRIGGER prevent_repeating_values_when_updating
        BEFORE UPDATE ON flight
        FOR EACH ROW
        BEGIN
            DECLARE value_count INT;
        
            IF NEW.departure_time != OLD.departure_time THEN
                SELECT COUNT(*) INTO value_count FROM flight WHERE departure_time = NEW.departure_time;
        
                IF value_count >= 2 THEN
                    SIGNAL SQLSTATE '45000'
                    SET MESSAGE_TEXT = 'No more than two flights may depart at the same time';
                END IF;
            END IF;
        END;
      `
    );
  }

  if (!checkCheckinTimeWhenInsertingTrigger) {
    await queryRunner.manager.query(
      `
      CREATE TRIGGER check_checkin_time_when_inserting
        BEFORE INSERT ON flight
        FOR EACH ROW
        BEGIN
            IF NEW.checkin_time > (NEW.departure_time - INTERVAL 30 MINUTE) THEN
                SIGNAL SQLSTATE '45000'
                SET MESSAGE_TEXT = 'Check-in time must be at least 30 minutes earlier than departure time';
            END IF;
        END;
      `
    );
  }

  if (!checkCheckinTimeWhenUpdatingTrigger) {
    await queryRunner.manager.query(
      `
      CREATE TRIGGER check_checkin_time_when_updating
        BEFORE UPDATE ON flight
        FOR EACH ROW
        BEGIN
            IF NEW.checkin_time > (NEW.departure_time - INTERVAL 30 MINUTE) THEN
                SIGNAL SQLSTATE '45000'
                SET MESSAGE_TEXT = 'Check-in time must be at least 30 minutes earlier than departure time';
            END IF;
        END;
      `
    );
  }

  if (!assignSeatNumberTrigger) {
    await queryRunner.manager.query(
      `
      CREATE TRIGGER assign_seat_number
      BEFORE INSERT ON flight_reservation
      FOR EACH ROW
      BEGIN
          DECLARE next_seat_number SMALLINT;
          DECLARE capacity SMALLINT;

          SELECT seat_capacity INTO capacity 
          FROM flight 
          WHERE flight_id = NEW.flight_id;
      
          IF capacity <= 0 THEN
              SIGNAL SQLSTATE '45000'
              SET MESSAGE_TEXT = 'Capacity exceeded. The flight is full, there are no more seats';
          END IF;
          
          SET next_seat_number = 1;
          
          WHILE (SELECT seat_number  FROM flight_reservation WHERE flight_id = NEW.flight_id AND seat_number = next_seat_number) IS NOT NULL DO
              SET next_seat_number = next_seat_number + 1;
          END WHILE;
          
          SET NEW.seat_number = next_seat_number;
      END;
    `
    );
  }

  if (!updateFlightTableAfterReservationInsertTrigger) {
    await queryRunner.manager.query(
      `
        CREATE TRIGGER update_flight_table_after_reservation_insert
        AFTER INSERT ON flight_reservation
        FOR EACH ROW
        BEGIN
          UPDATE flight
          SET seat_capacity = seat_capacity - 1
          WHERE flight_id = NEW.flight_id;
        END;
      `
    );
  }

  if (!updateFlightTableAfterReservationDeleteTrigger) {
    await queryRunner.manager.query(
      `
      CREATE TRIGGER update_flight_table_after_reservation_delete
      AFTER DELETE ON flight_reservation
      FOR EACH ROW
      BEGIN
        UPDATE flight
        SET seat_capacity = seat_capacity + 1
        WHERE flight_id = OLD.flight_id;
      END;
    `);
  }
  
  if (!preventFlightDeletion) {
    await queryRunner.manager.query(
      `
      CREATE TRIGGER prevent_flight_deletion
      BEFORE DELETE ON flight
      FOR EACH ROW
      BEGIN
          IF EXISTS (SELECT 1 FROM flight_reservation WHERE flight_id = OLD.flight_id LIMIT 1) THEN
              SIGNAL SQLSTATE '45000'
              SET MESSAGE_TEXT = 'Cannot delete flight with existing reservations';
          END IF;
      END;
    `);
  }

}

configureDatabaseConnection().catch((err) => {
  console.error("Error during Data Source initialization:", err)
});

const app = express();
app.use(express.json());



// register routes
app.get("/flights", async function (req: Request, res: Response) {
  const flights = await AppDataSource.getRepository(Flight).find()
  res.json(flights)
})


app.listen(8081, () => {
  console.log('server is running on port 8081');
});