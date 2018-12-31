import { Injectable, Inject } from '@nestjs/common';
import { Repository, getRepository, EntityManager } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as maps from '@google/maps';

import { BusStop } from '../entities/bus-stop.entity';

@Injectable()
export class BusStopService {
  public constructor(
    @InjectRepository(BusStop)
    private readonly busStopRepository: Repository<BusStop>,
  ) {}

  public async findStop(
    near: maps.LatLngLiteral,
  ): Promise<BusStop | undefined> {
    const stops = await this.busStopRepository
      .createQueryBuilder('busStop')
      .addSelect(
        `POW(ABS(busStop.latitude-${near.lat}),2)+POW(ABS(busStop.longitude-${
          near.lng
        }),2)`,
        'distanceSquared',
      )
      .orderBy('distanceSquared')
      .limit(10)
      .getOne();

    // console.log({ stops });

    return stops;
    // return undefined;
  }
}
