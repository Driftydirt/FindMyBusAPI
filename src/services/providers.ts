import { Connection, Repository } from 'typeorm';
import { BusStop } from '../entities/bus-stop.entity';

export const busStopProviders = [
  {
    provide: 'busStopProviders',
    useFactory: (connection: Connection) => connection.getRepository(BusStop),
    inject: ['DbConnectionToken'],
  },
];
