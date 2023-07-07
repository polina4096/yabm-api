import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { BeatmapsService } from './beatmaps.service';
import { Beatmap } from './entities/beatmap.entity';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('beatmaps')
export class BeatmapsController {
  constructor(private readonly beatmapsService: BeatmapsService) {}

  @Get('hint')
  hint(): Promise<string | null> {
    return this.beatmapsService.hint();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Beatmap | null> {
    return this.beatmapsService.findOne(id);
  }

  @Get('')
  async search(
    @Query('query') query?: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<Beatmap>> {
    limit = limit > 100 ? 100 : limit;
    return this.beatmapsService.paginate(
      {
        page,
        limit,
      },
      query,
    );
  }
}
