import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'reflect-metadata';

import { SearchResultsController } from 'controllers/search-results.controller';
import { BusRouteService } from 'services/bus-route.service';
import { BusStopService } from 'services/bus-stop.service';
import { BusStop } from 'entities/bus-stop.entity';
import { BusRoute } from 'entities/bus-route.entity';
import { BusStopsOnRouteService } from 'services/bus-stops-on-route.service';
import { busStopsOnRouteProviders } from 'services/bus-stops-on-route.providers';
import { BusStopsOnRoute } from 'entities/bus-stops-on-route.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'BorderLands 2',
      database: 'findmybus',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([BusStop, BusRoute, BusStopsOnRoute]),
  ],
  controllers: [SearchResultsController],
  providers: [BusRouteService, BusStopService, BusStopsOnRouteService],
})
export class AppModule {}
