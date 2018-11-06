import { Test, TestingModule } from '@nestjs/testing';
import { SearchResultsController } from './search-results.controller';

describe('SearchResults Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [SearchResultsController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: SearchResultsController = module.get<SearchResultsController>(SearchResultsController);
    expect(controller).toBeDefined();
  });
});
