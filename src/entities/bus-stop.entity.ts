import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { BusStopsOnRoute } from 'entities/bus-stops-on-route.entity';

@Entity()
export class BusStop {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'float', precision: 9, scale: 6 })
  latitude: number;

  @Column({ type: 'float', precision: 9, scale: 6 })
  longitude: number;

  @OneToMany(
    type => BusStopsOnRoute,
    busStopsOnRoute => busStopsOnRoute.busStop,
  )
  busStopsOnRoute: BusStopsOnRoute[];
}
