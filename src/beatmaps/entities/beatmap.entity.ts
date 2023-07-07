import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Difficulty } from './difficulty.entity';

@Entity()
export class Beatmap {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  artist: string;

  @Column()
  artist_unicode: string;

  @Column()
  title: string;

  @Column()
  title_unicode: string;

  @Column()
  mapper: string;

  @OneToMany(() => Difficulty, (difficulty) => difficulty.beatmap, {
    eager: true,
  })
  difficulties: Difficulty;
}
