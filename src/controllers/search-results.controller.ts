import {
  Controller,
  Get,
  Param,
  Logger,
  Query,
  HttpException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import * as maps from '@google/maps';

import { SearchResults } from 'controllers/search-results.interface';
import { BusStopService } from 'services/bus-stop.service';
import { BusStopsOnRouteService } from 'services/bus-stops-on-route.service';
import { BusStopsOnRoute } from 'entities/bus-stops-on-route.entity';

@Controller('search-results')
export class SearchResultsController {
  private readonly googleMapsClient: maps.GoogleMapsClient;

  public constructor(
    private readonly busStopService: BusStopService,
    private readonly busStopsOnRouteService: BusStopsOnRouteService,
  ) {
    this.googleMapsClient = maps.createClient({
      key: process.env.GOOGLE_API_KEY,
      timeout: 10_000,
      Promise,
    });
  }

  @Get()
  async search(
    @Query('fromLocation') fromLocation,
    @Query('toLocation') toLocation,
  ): Promise<SearchResults> {
    if (fromLocation == null || toLocation == null) {
      throw new BadRequestException();
    }
    Logger.log({ fromLocation, toLocation }, 'Perfoming geo-location lookup');
    const [fromCoords, toCoords] = await Promise.all([
      this.queryGoogleAPI(fromLocation), // turns user input into usable data by using the google api
      this.queryGoogleAPI(toLocation),
    ]);
    if (fromCoords == null || toCoords == null) {
      throw new NotFoundException();
    }
    console.log({ fromCoords, toCoords });
    const fromStop = await this.busStopService.findStop(fromCoords);
    console.log({ fromStop });
    const toStop = await this.busStopService.findStop(toCoords);
    console.log({ toStop });

    const routesStart = await this.busStopsOnRouteService.findRoute(
      fromStop.id,
    );
    const routesEnd = await this.busStopsOnRouteService.findRoute(toStop.id);

    const truncatedRoutes: BusStopsOnRoute[][] = [];
    for (const routeStart of routesStart) {
      for (const routeEnd of routesEnd) {
        if (routeStart.busRouteId === routeEnd.busRouteId) {
          truncatedRoutes.push(
            await this.busStopsOnRouteService.findTruncatedRoute(
              routeStart.busRouteId,
              routeStart.orderID,
              routeEnd.orderID,
            ),
          );
        }
      }
    }

    const results: SearchResults = {
      fromLocation,
      toLocation,
      results: truncatedRoutes.map(
        (route): SearchResults['results'][0] => ({
          title: `Bus ${route[0].busRouteId}`,
          directions: [
            `Get on bus at ${fromStop.name}`,
            `Get off of bus at ${toStop.name}`,
          ],
        }),
      ),
    };
    return results;
  }

  public async queryGoogleAPI(
    location: string,
  ): Promise<maps.LatLngLiteral | undefined> {
    const response = await this.googleMapsClient
      .geocode({
        address: location,
        // bounds: {
        //   northeast: { lat: 52.086775, lng: 1.112659 },
        //   southwest: { lat: 52.028834, lng: 1.224324 },
        // },
      })
      .asPromise();
    // tslint:disable-next-line:no-console

    if (response.json.results.length === 0) {
      return undefined;
    }

    return response.json.results[0].geometry.location;
  }
}
