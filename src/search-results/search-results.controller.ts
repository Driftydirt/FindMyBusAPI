import { Controller, Get, Param, Logger, Query } from '@nestjs/common';
import { SearchResults } from './search-results.interface';
import * as maps from '@google/maps';

@Controller('search-results')
export class SearchResultsController {
  private readonly googleMapsClient: maps.GoogleMapsClient;

  public constructor() {
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
    Logger.log({ fromLocation, toLocation }, 'Perfoming geo-location lookup');
    const [fromCoords, toCoords] = await Promise.all([
      this.queryGoogleAPI(fromLocation),
      this.queryGoogleAPI(toLocation),
    ]);
    console.log({ fromCoords, toCoords });
    const mockResults: SearchResults = {
      fromLocation,
      toLocation,
      results: [
        { title: 'Bus 1', directions: ['Step 1', 'Step 2'] },
        { title: 'Bus 2', directions: ['Step 1', 'Step 2'] },
        { title: 'Bus 3', directions: ['Step 1', 'Step 2'] },
      ],
    };
    return mockResults;
  }
  public async queryGoogleAPI(location: string): Promise<maps.LatLngLiteral> {
    const response = await this.googleMapsClient
      .geocode({ address: location })
      .asPromise();
    // tslint:disable-next-line:no-console
    console.log({ results: JSON.stringify(response.json) });

    return response.json.results[0].geometry.location;
  }
}
