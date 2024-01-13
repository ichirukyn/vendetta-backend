import { Module } from '@nestjs/common';
import { HeroService } from './hero.service';
import { HeroController } from './hero.controller';
import { Hero, HeroLvl, HeroStats, HeroTechnique } from './hero.model';
import { User } from '../users/user.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeroSkills } from './hero-skills.model';
import { Lvl } from '../lvl/lvl.model';

@Module({
  providers: [HeroService],
  controllers: [HeroController],
  imports: [TypeOrmModule.forFeature([User, Hero, HeroStats, HeroSkills, HeroLvl, HeroTechnique, Lvl])],
})
export class HeroModule {}
