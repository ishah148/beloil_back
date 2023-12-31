import { AppDataSource } from "./app-data-source";

export async function generateFlightsData() {
  const queryRunner = await AppDataSource.createQueryRunner();

  await queryRunner.manager.query(`
        INSERT INTO flight (flight_id, city, departure_time, airline_name, checkin_time, seat_capacity, notes)
        VALUES ('BА-884', 'Gomel', '2024-01-01 14:30:00', 'Belavia', '2024-01-01 13:29:59', 78, 'none'),
               ('BB-3453', 'Moskow', '2024-01-12 14:30:00', 'Emirates', '2024-01-12 10:20:00', 99, 'none'),
               ('AC-3453', 'Tokyo', '2024-01-21 13:30:00', 'Air France', '2024-01-21 12:20:00', 99, 'none'),
               ('XC-888', 'Qatar', '2024-01-21 21:30:00', 'Turkish Airlines', '2024-01-21 20:30:00', 12, 'none'),
               ('XI-567', 'Qatar', '2024-01-13 21:30:00', 'Turkish Airlines', '2024-01-13 20:30:00', 1, 'none'),
               ('XP-567', 'Chicago', '2024-01-13 09:30:00', 'Japan Airlines', '2024-01-13 08:30:00', 1, 'none'),
               ('OP-5647', 'Minsk', '2024-02-08 09:30:00', 'Belavia', '2024-02-08 07:30:00', 90, 'none'),
               ('AA-123', 'New York', '2024-03-10 08:45:00', 'Delta Airlines', '2024-03-10 08:00:00', 58, 'none'),
               ('BB-456', 'Los Angeles', '2024-06-15 17:20:00', 'American Airlines', '2024-06-15 16:40:00', 71, 'none'),
               ('CC-789', 'London', '2024-02-20 12:10:00', 'British Airways', '2024-02-20 11:30:00', 33, 'none'),
               ('DD-234', 'Paris', '2024-07-05 09:55:00', 'Lufthansa', '2024-07-05 09:20:00', 92, 'none'),
               ('EE-567', 'Sydney', '2024-11-30 14:45:00', 'Qantas', '2024-11-30 14:00:00', 5, 'none'),
               ('FF-890', 'Tokyo', '2024-09-08 21:30:00', 'Cathay Pacific', '2024-09-08 21:00:00', 87, 'none'),
               ('GG-123', 'Beijing', '2024-04-18 16:20:00', 'Emirates', '2024-04-18 15:40:00', 23, 'none'),
               ('HH-456', 'Dubai', '2024-05-12 10:40:00', 'Singapore Airlines', '2024-05-12 10:00:00', 64, 'none'),
               ('II-789', 'Mumbai', '2024-08-25 23:15:00', 'Delta Airlines', '2024-08-25 22:30:00', 41, 'none'),
               ('JJ-234', 'New York', '2024-11-15 07:55:00', 'Emirates', '2024-11-15 07:20:00', 79, 'none'),
               ('KK-567', 'Los Angeles', '2024-04-03 15:30:00', 'British Airways', '2024-04-03 14:50:00', 12, 'none'),
               ('LL-890', 'London', '2024-03-19 18:20:00', 'Qantas', '2024-03-19 17:40:00', 68, 'none'),
               ('MM-123', 'Paris', '2024-07-22 14:15:00', 'Cathay Pacific', '2024-07-22 13:35:00', 86, 'none'),
               ('NN-456', 'Sydney', '2024-01-29 10:25:00', 'Lufthansa', '2024-01-29 09:45:00', 7, 'none'),
               ('OO-789', 'Tokyo', '2024-06-11 19:50:00', 'Singapore Airlines', '2024-06-11 19:10:00', 50, 'none'),
               ('PP-234', 'Beijing', '2024-09-28 16:40:00', 'American Airlines', '2024-09-28 16:00:00', 31, 'none'),
               ('QQ-567', 'Dubai', '2024-10-04 11:20:00', 'Delta Airlines', '2024-10-04 10:45:00', 18, 'none'),
               ('RR-890', 'Mumbai', '2024-11-19 22:05:00', 'British Airways', '2024-11-19 21:30:00', 43, 'none'),
               ('SS-234', 'New York', '2024-03-14 06:40:00', 'Emirates', '2024-03-14 06:05:00', 55, 'none'),
               ('TT-567', 'Los Angeles', '2024-06-27 18:30:00', 'Qantas', '2024-06-27 17:50:00', 70, 'none'),
               ('UU-890', 'London', '2024-02-07 12:25:00', 'Cathay Pacific', '2024-02-07 11:45:00', 13, 'none'),
               ('VV-234', 'Paris', '2024-12-10 13:15:00', 'Lufthansa', '2024-12-10 12:30:00', 29, 'none'),
               ('WW-567', 'Sydney', '2024-07-03 08:55:00', 'Singapore Airlines', '2024-07-03 08:20:00', 60, 'none'),
               ('XX-890', 'Tokyo', '2024-04-26 20:40:00', 'American Airlines', '2024-04-26 20:10:00', 45, 'none'),
               ('YY-234', 'Beijing', '2024-01-20 15:10:00', 'Delta Airlines', '2024-01-20 14:30:00', 88, 'none'),
               ('ZZ-567', 'Dubai', '2024-03-08 09:30:00', 'British Airways', '2024-03-08 08:50:00', 2, 'none'),
               ('AA-001', 'New York', '2024-01-01 15:00:00', 'American Airlines', '2024-01-01 14:15:00', 45, 'none'),
               ('AB-123', 'Los Angeles', '2024-01-02 16:45:00', 'Delta Air Lines', '2024-01-02 16:00:00', 67,
                'Optional note 1'),
               ('BC-456', 'London', '2024-01-03 12:30:00', 'British Airways', '2024-01-03 12:00:00', 34, 'none'),
               ('DE-789', 'Paris', '2024-01-04 17:15:00', 'Air France', '2024-01-04 16:30:00', 23, 'Optional note 2'),
               ('FG-234', 'Tokyo', '2024-01-05 19:45:00', 'Japan Airlines', '2024-01-05 19:00:00', 55, 'none'),
               ('GH-765', 'Sydney', '2024-01-06 14:50:00', 'Qantas', '2024-01-06 14:15:00', 78, 'none'),
               ('HI-432', 'Dubai', '2024-01-07 22:30:00', 'Emirates', '2024-01-07 21:45:00', 32, 'none'),

               ('IJ-001', 'Istanbul', '2024-01-08 16:00:00', 'Turkish Airlines', '2024-01-08 15:15:00', 11,
                'Optional note 3'),
               ('JK-222', 'Berlin', '2024-01-09 13:20:00', 'Lufthansa', '2024-01-09 12:45:00', 66, 'none'),
               ('KL-654', 'Rome', '2024-01-10 18:10:00', 'Alitalia', '2024-01-10 17:30:00', 43, 'none'),
               ('MN-543', 'Amsterdam', '2024-01-11 10:30:00', 'KLM', '2024-01-11 10:00:00', 56, 'none'),
               ('NO-098', 'Hong Kong', '2024-01-12 20:00:00', 'Cathay Pacific', '2024-01-12 19:15:00', 88, 'none'),
               ('OP-675', 'Singapore', '2024-01-13 17:45:00', 'Singapore Airlines', '2024-01-13 17:00:00', 22, 'none'),
               ('PQ-123', 'Toronto', '2024-01-14 14:20:00', 'Air Canada', '2024-01-14 13:30:00', 77, 'Optional note 4'),
               ('QR-777', 'Shanghai', '2024-01-15 12:30:00', 'China Eastern Airlines', '2024-01-15 12:00:00', 31,
                'none'),
               ('RS-333', 'Mumbai', '2024-01-16 15:30:00', 'Air India', '2024-01-16 15:00:00', 50, 'none'),
               ('ST-555', 'Sao Paulo', '2024-01-17 19:20:00', 'LATAM Airlines', '2024-01-17 18:45:00', 65, 'none'),
               ('UV-654', 'Beijing', '2024-01-18 23:00:00', 'Air China', '2024-01-18 22:15:00', 12, 'Optional note 5'),
               ('VW-001', 'Mexico City', '2024-01-19 14:10:00', 'Aeromexico', '2024-01-19 13:30:00', 40, 'none'),
               ('WX-987', 'Cairo', '2024-01-20 11:45:00', 'EgyptAir', '2024-01-20 11:00:00', 71, 'none'),
               ('YZ-456', 'Munich', '2024-01-21 15:55:00', 'Lufthansa', '2024-01-21 15:15:00', 26, 'none'),
               ('ZA-888', 'Barcelona', '2024-01-22 14:40:00', 'Iberia', '2024-01-22 14:00:00', 58, 'none'),
               ('AB-345', 'Budapest', '2024-01-23 12:15:00', 'Wizz Air', '2024-01-23 11:45:00', 44, 'none'),
               ('BC-321', 'Vienna', '2024-01-24 16:30:00', 'Austrian Airlines', '2024-01-24 15:45:00', 69,
                'Optional note 6'),
               ('CD-111', 'Warsaw', '2024-01-25 18:20:00', 'LOT Polish Airlines', '2024-01-25 17:30:00', 37, 'none'),
               ('DE-222', 'Helsinki', '2024-01-26 21:50:00', 'Finnair', '2024-01-26 21:15:00', 25, 'none'),
               ('EF-444', 'Oslo', '2024-01-27 11:00:00', 'SAS', '2024-01-27 10:15:00', 54, 'none'),
               ('FG-555', 'Copenhagen', '2024-01-28 14:25:00', 'Norwegian', '2024-01-28 13:45:00', 62, 'none'),
               ('GH-123', 'Stockholm', '2024-01-29 17:40:00', 'SAS', '2024-01-29 17:00:00', 38, 'none'),
               ('HI-987', 'Athens', '2024-01-30 15:05:00', 'Aegean Airlines', '2024-01-30 14:30:00', 49, 'none');
    `)
}