import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BusRoute } from 'entities/bus-route.entity';
import { BusStop } from 'entities/bus-stop.entity';

@Entity()
export class BusStopsOnRoute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderID: number;

  @Column()
  busRouteId: number;
  // @ManyToOne(type => BusRoute, busRoute => busRoute.busStopsOnRoute)
  // busRoute: BusRoute;

  @ManyToOne(type => BusStop, busStop => busStop.busStopsOnRoute)
  busStop: BusStop;
}
