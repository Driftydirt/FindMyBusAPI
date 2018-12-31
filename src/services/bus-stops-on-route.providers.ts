import { Connection, Repository } from 'typeorm';
import { BusStopsOnRoute } from 'entities/bus-stops-on-route.entity';

export const busStopsOnRouteProviders = [
  {
    provide: 'busStopsOnRouteProviders',
    useFactory: (connection: Connection) =>
      connection.getRepository(BusStopsOnRoute),
    inject: ['DbConnectionToken'],
  },
];
