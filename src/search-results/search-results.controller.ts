import { Controller, Get, Param } from '@nestjs/common';
import { SearchResults } from './search-results.interface';

@Controller('search-results')
export class SearchResultsController {
  @Get()
  search(@Param('fromLocation') fromLocation, @Param('toLocation') toLocation) {
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
