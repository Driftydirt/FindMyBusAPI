import { Injectable, Inject } from '@nestjs/common';
import { BusStopsOnRoute } from 'entities/bus-stops-on-route.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { busStopsOnRouteProviders } from './bus-stops-on-route.providers';
import { BusStop } from 'entities/bus-stop.entity';

@Injectable()
export class BusStopsOnRouteService {
  public constructor(
    @InjectRepository(BusStopsOnRoute)
    private readonly busStopsOnRouteRepository: Repository<BusStopsOnRoute>,
  ) {}

  public async findRoute(stop: number): Promise<BusStopsOnRoute[] | undefined> {
    const routes = await this.busStopsOnRouteRepository
      .createQueryBuilder('busStopsOnRoute')
      .where(`busStopId = ${stop}`)
      .getMany();
    console.log({ routes });
    return routes;
  }

  public async findTruncatedRoute(
    route: number,
    startID: number,
    endID: number,
  ): Promise<BusStopsOnRoute[] | undefined> {
    const truncatedRoute = await this.busStopsOnRouteRepository
      .createQueryBuilder('busStopsOnRoute')
      .where(`busRouteId = ${route}`)
      .andWhere(`orderID >= ${startID}`)
      .andWhere(`orderID <= ${endID}`)
      .getMany();
    console.log({ truncatedRoute });
    return truncatedRoute;
  }
}
