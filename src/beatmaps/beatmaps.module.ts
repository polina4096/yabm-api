import { Module } from '@nestjs/common';
import { BeatmapsService } from './beatmaps.service';
import { BeatmapsController } from './beatmaps.controller';
import { Beatmap } from './entities/beatmap.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Beatmap])],
  controllers: [BeatmapsController],
  providers: [BeatmapsService],
})
export class BeatmapsModule {}
