import { Module } from '@nestjs/common';
import { HeroService } from './hero.service';
import { HeroController } from './hero.controller';
import { Hero, HeroItem, HeroLvl, HeroStats, HeroTechnique, HeroWeapon } from './hero.model';
import { User } from '../users/user.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeroSkills } from './hero-skills.model';
import { Lvl } from '../lvl/lvl.model';
import { HeroSpell } from './hero-spell.model';

@Module({
  imports: [TypeOrmModule.forFeature([User, Hero, HeroStats, HeroSkills, HeroSpell, HeroLvl, HeroTechnique, HeroItem, HeroWeapon, Lvl])],
  providers: [HeroService],
  controllers: [HeroController],
  exports: [HeroService],
})
export class HeroModule {
}
