import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusRoute } from 'entities/bus-route.entity';

@Injectable()
export class BusRouteService {
  public constructor(
    @InjectRepository(BusRoute)
    private readonly busRouteRepository: Repository<BusRoute>,
  ) {}

  async findAll(): Promise<BusRoute[]> {
    return await this.busRouteRepository.find();
  }
}
