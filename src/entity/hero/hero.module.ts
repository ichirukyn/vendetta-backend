import { Module } from '@nestjs/common';
import { HeroService } from './hero.service';
import { HeroController } from './hero.controller';
import { Hero, HeroItem, HeroLvl, HeroStats, HeroTechnique } from './hero.model';
import { User } from '../users/user.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeroSkills } from './hero-skills.model';
import { Lvl } from '../lvl/lvl.model';

@Module({
  imports: [TypeOrmModule.forFeature([User, Hero, HeroStats, HeroSkills, HeroLvl, HeroTechnique, HeroItem, Lvl])],
  providers: [HeroService],
  controllers: [HeroController],
  exports: [HeroService]
})
export class HeroModule {}
