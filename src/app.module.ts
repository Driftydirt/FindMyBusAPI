import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchResultsController } from './search-results/search-results.controller';

@Module({
  imports: [],
  controllers: [AppController, SearchResultsController],
  providers: [AppService],
})
export class AppModule {}
