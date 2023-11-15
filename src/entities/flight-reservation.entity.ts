import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne } from "typeorm"
import { Flight } from "./flight.entity"

@Entity({ name: "flight_reservation" })
export class FlightReservation {
  @PrimaryColumn({ name: "flight_id", length: 16 })
  flightId: string

  @Column({ name: "surname", length: 32 })
  surname: string

  @Column({ name: "name", length: 32 })
  name: string

  @Column({ name: "middle_name", length: 32, nullable: true })
  middle_name: string

  @Column({ name: "reservation_date", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  reservation_date: Date

  @PrimaryColumn({ name: "seat_number", type: 'smallint' })
  seatNumber: number

  @Column({ name: "notes", nullable: true, length: 64 })
  notes: string

  @ManyToOne(() => Flight, (flight: Flight) => flight.flightId)
  @JoinColumn({ name: 'flight_id' })
  flight: Flight;
}