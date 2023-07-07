import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Beatmap } from './beatmap.entity';
import { ColumnNumericTransformer } from '../../transformers/ColumnNumericTransformer';

@Entity()
export class Difficulty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', {
    precision: 6,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  starRating: number;

  @ManyToOne(() => Beatmap, (beatmap) => beatmap.difficulties)
  beatmap: Beatmap[];
}
