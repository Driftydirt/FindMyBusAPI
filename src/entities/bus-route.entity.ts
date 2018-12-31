import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BusStopsOnRoute } from 'entities/bus-stops-on-route.entity';

@Entity()
export class BusRoute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(
    type => BusStopsOnRoute,
    busStopsOnRoute => busStopsOnRoute.busRouteId,
  ) // note: we will create author property in the Photo class below
  busStopsOnRoute: BusStopsOnRoute[];
}
