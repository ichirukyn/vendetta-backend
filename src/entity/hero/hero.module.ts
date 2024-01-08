import { Module } from '@nestjs/common';
import { HeroService } from './hero.service';
import { HeroController } from './hero.controller';
import { Hero, HeroLvl, HeroStats } from './hero.model';
import { User } from '../users/user.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeroSkills } from './hero-skills.model';
import { HeroTechniques } from './hero-technique.model';
import { Lvl } from '../lvl/lvl.model';

@Module({
  providers: [HeroService],
  controllers: [HeroController],
  imports: [TypeOrmModule.forFeature([User, Hero, HeroStats, HeroSkills, HeroLvl, HeroTechniques, Lvl])],
})
export class HeroModule {}
