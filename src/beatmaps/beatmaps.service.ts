import { Injectable } from '@nestjs/common';
import { Beatmap } from './entities/beatmap.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class BeatmapsService {
  constructor(
    @InjectRepository(Beatmap)
    private readonly beatmapsRepository: Repository<Beatmap>,
  ) {}

  hint(): Promise<string | null> {
    return this.beatmapsRepository
      .findOne({ where: {} })
      .then((e) => (e !== undefined ? `${e?.artist} – ${e?.title}` : null));
  }

  findOne(id: number): Promise<Beatmap | null> {
    return this.beatmapsRepository.findOne({
      where: { id: id },
      relations: ['difficulties'],
    });
  }

  async paginate(
    options: IPaginationOptions,
    query?: string,
  ): Promise<Pagination<Beatmap>> {
    if (query !== undefined) {
      return paginate<Beatmap>(this.beatmapsRepository, options, {
        where: [
          { artist: Like(`%${query}%`) },
          { title: Like(`%${query}%`) },
          { mapper: Like(`%${query}%`) },
        ],
      });
    } else {
      return paginate<Beatmap>(this.beatmapsRepository, options);
    }
  }
}
