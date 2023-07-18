import { Injectable, NotFoundException } from '@nestjs/common';
import { Podcast } from './entities/podcast.entity';
import { Episode } from './entities/episode.entity';

@Injectable()
export class PodcastsService {
  private podcasts: Podcast[] = [];

  getAll(): Podcast[] {
    return this.podcasts;
  }

  create(podcastData) {
    let { episodes } = podcastData;
    if (!episodes) {
      episodes = [];
    } else {
      episodes = episodes.map((summary, idx) => ({
        id: idx + 1,
        summary,
      }));
    }
    podcastData.episodes = episodes;
    this.podcasts.push({
      id: this.podcasts.length + 1,
      ...podcastData,
    });
  }

  getPodcastById(id: string): Podcast {
    const podcast = this.podcasts.find((podcast) => podcast.id === +id);
    if (!podcast) {
      throw new NotFoundException(`Podcast with ID: ${id} is not found.`);
    }
    return podcast;
  }
  ㅊ;
  updatePodcastById(id: string, updateData) {
    const podcast = this.getPodcastById(id);
    this.deletePodcastById(id);
    this.podcasts = [...this.podcasts, { ...podcast, ...updateData }];
  }

  deletePodcastById(id: string) {
    this.getPodcastById(id);
    this.podcasts = this.podcasts.filter((podcast) => podcast.id !== +id);
  }

  getEpisodesByPodcast(id: string): Episode[] {
    const podcast = this.getPodcastById(id);
    return podcast.episodes;
  }

  createEpisodesById(id: string, episodesData: string[]) {
    const episodes = this.getEpisodesByPodcast(id);
    episodes.sort((a, b) => a.id - b.id);

    const data: Episode[] = episodesData.map((episodesData, idx) => {
      const episode: Episode = {
        id: (episodes[episodes.length - 1]?.id ?? 0) + idx + 1,
        summary: episodesData,
      };
      return episode;
    });
    const podcast = this.getPodcastById(id);
    podcast.episodes = [...episodes, ...data];
    this.deletePodcastById(id);
    this.podcasts.push(podcast);
  }

  updateEpisodeById(podcastId: string, episodeId: string, updateData: string) {
    const episodes = this.getEpisodesByPodcast(podcastId);
    const check = episodes.findIndex((episode) => episode.id === +episodeId);
    if (check === -1) {
      throw new NotFoundException(
        `episode with ID: ${episodeId} is not found.`,
      );
    }
    const podcast = this.getPodcastById(podcastId);
    podcast.episodes[check] = { id: +episodeId, summary: updateData };
    this.deletePodcastById(podcastId);
    this.podcasts.push(podcast);
  }

  deleteEpisode(podcastId: string, episodeId: string) {
    const episodes = this.getEpisodesByPodcast(podcastId);
    const podcast = this.getPodcastById(podcastId);
    const check = episodes.some((episode) => episode.id === +episodeId);
    if (!check) {
      throw new NotFoundException(
        `episode with ID: ${episodeId}} is not found.`,
      );
    }
    podcast.episodes = episodes.filter((episode) => episode.id !== +episodeId);
    this.deletePodcastById(podcastId);
    this.podcasts.push(podcast);
  }
}
