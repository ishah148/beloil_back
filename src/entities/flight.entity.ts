import { Entity, Column, PrimaryColumn } from "typeorm"


@Entity({ name: "flight" })
export class Flight {
  @PrimaryColumn({ name: "flight_id", length: 16 })
  flightId: string

  @Column({ name: "city", length: 32 })
  city: string

  @Column({ name: "departure_time" })
  departureTime: Date

  @Column({ name: "airline_name", length: 32 })
  airlineName: string

  @Column({ name: "checkin_time" })
  checkinTime: Date

  @Column({ name: "seat_capacity", type: 'smallint' })
  seatCapacity: number

  @Column({ name: "notes", nullable: true, length: 64 })
  notes: string
}