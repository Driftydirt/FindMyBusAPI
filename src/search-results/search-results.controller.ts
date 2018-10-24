import { Controller, Get, Param, Logger } from '@nestjs/common';
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
    @Param('fromLocation') fromLocation,
    @Param('toLocation') toLocation,
  ): Promise<SearchResults> {
    const location = '1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA';

    Logger.log({ fromLocation, toLocation }, 'Perfoming geo-location lookup');

    const response = await this.googleMapsClient
      .geocode({ address: location })
      .asPromise();
    console.log({ results: JSON.stringify(response.json) });
    const locationCoords = response.json.results[0].geometry.location;

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
}
