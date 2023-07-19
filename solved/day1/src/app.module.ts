import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PodcastsModule } from './podcast/podcasts.module';

@Module({
  imports: [PodcastsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
