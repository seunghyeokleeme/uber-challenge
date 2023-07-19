import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Podcast } from './entities/podcast.entity';
import { PodcastsService } from './podcasts.service';

@Controller('podcasts')
export class PodcastsController {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Get()
  getAll(): Podcast[] {
    return this.podcastsService.getAll();
  }

  @Post()
  createPodcast(@Body() podcastData) {
    return this.podcastsService.create(podcastData);
  }

  @Get(':id/episodes')
  getEpisodesByPodcast(@Param('id') podcastId: string) {
    return this.podcastsService.getEpisodesByPodcast(podcastId);
  }

  @Post(':id/episodes')
  createEpisodesById(@Param('id') podcastId: string, @Body() episodeData) {
    const { episodes } = episodeData;
    return this.podcastsService.createEpisodesById(podcastId, episodes);
  }

  @Patch(':id/episodes/:episodeId')
  updateEpisodeById(
    @Param('id') podcastId: string,
    @Param('episodeId') episodeId: string,
    @Body() updateData,
  ) {
    const { summary } = updateData;
    return this.podcastsService.updateEpisodeById(
      podcastId,
      episodeId,
      summary,
    );
  }

  @Delete(':id/episodes/:episodeId')
  deleteEpisode(
    @Param('id') podcastId: string,
    @Param('episodeId') episodeId: string,
  ) {
    return this.podcastsService.deleteEpisode(podcastId, episodeId);
  }

  @Get(':id')
  getOne(@Param('id') podcastId: string): Podcast {
    return this.podcastsService.getPodcastById(podcastId);
  }

  @Patch(':id')
  patch(@Param('id') podcastId: string, @Body() updateData) {
    return this.podcastsService.updatePodcastById(podcastId, updateData);
  }

  @Delete(':id')
  removeOne(@Param('id') podcastId: string) {
    return this.podcastsService.deletePodcastById(podcastId);
  }
}
