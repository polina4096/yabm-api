import { Module } from '@nestjs/common';
import { BeatmapsModule } from './beatmaps/beatmaps.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Beatmap } from './beatmaps/entities/beatmap.entity';
import { Difficulty } from './beatmaps/entities/difficulty.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [Beatmap, Difficulty],
      synchronize: true,
    }),
    BeatmapsModule,
  ],
})
export class AppModule {}
