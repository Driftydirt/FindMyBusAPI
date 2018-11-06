import { Connection, Repository } from 'typeorm';
import { BusStop } from '../entities/bus-stop.entity';

export const PROVIDERS = [
  {
    provide: 'busStopProviders',
    useFactory: (connection: Connection) => connection.getRepository(BusStop),
    inject: ['DbConnectionToken'],
  },
];
