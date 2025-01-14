import { Module } from '@nestjs/common';
import { PodcastsController } from './podcasts/podcasts.controller';
import { PodcastsService } from './podcasts/podcasts.service';


@Module({
  imports: [],
  controllers: [PodcastsController],
  providers: [PodcastsService],
})
export class AppModule {}
