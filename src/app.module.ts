import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeroModule } from './entity/hero/hero.module';
import { Hero, HeroItem, HeroLvl, HeroStats, HeroTechnique, HeroWeapon } from './entity/hero/hero.model';
import { HeroSkills } from './entity/hero/hero-skills.model';
import { Skill } from './entity/skill/skill.model';
import { TechniqueModule } from './entity/technique/technique.module';
import { Technique } from './entity/technique/technique.model';
import { UsersModule } from './entity/users/users.module';
import { User } from './entity/users/user.model';
import { Race, RaceBonuses } from './entity/race/race.model';
import { RaceModule } from './entity/race/race.module';
import { Class, ClassBonuses } from './entity/class/class.model';
import { ClassModule } from './entity/class/class.module';
import { Lvl } from './entity/lvl/lvl.model';
import { Statistic } from './entity/statistic/statistic.model';
import { StatisticModule } from './entity/statistic/statistic.module';
import { Effect } from './entity/effect/effect.model';
import { Item } from './entity/item/item.model';
import { ItemModule } from './entity/item/item.module';
import { Enemy, EnemyItem, EnemyTechnique, EnemyWeapon } from './entity/enemy/enemy.model';
import { EnemyModule } from './entity/enemy/enemy.module';
import { Event, EventTrigger } from './entity/event/event.model';
import { EventModule } from './entity/event/event.module';
import { TechniqueEffect } from './entity/technique/technique-effect.model';
import { EnemyStats } from './entity/enemy/enemy-stats.model';
import { ArenaFloor } from './entity/arena/arena.model';
import { ArenaFloorModule } from './entity/arena/arena.module';
import { ArenaFloorEnemy } from './entity/arena/floor.model';
import { EnemyTeam } from './entity/enemy/enemy-team';
import { Team } from './entity/team/team.model';
import { TeamModule } from './entity/team/team.module';
import { TechniqueBranch } from './entity/technique/technique-branch.model';
import { Spell } from './entity/spell/spell.model';
import { SpellEffect } from './entity/spell/spell-effect.model';
import { SpellBranch } from './entity/spell/spell-branch.model';
import { SpellModule } from './entity/spell/spell.module';
import { HeroSpell } from './entity/hero/hero-spell.model';
import { TagModule } from './entity/tag/tag.module';
import { Tag } from './entity/tag/tag.model';
import { config } from './config';

const entity = [
  ArenaFloor, ArenaFloorEnemy,
  User,
  Hero, HeroStats, HeroSkills, HeroLvl, HeroTechnique, HeroItem, HeroSpell, HeroWeapon,
  Race, RaceBonuses,
  Class, ClassBonuses,
  Technique, TechniqueEffect, TechniqueBranch,
  Spell, SpellEffect, SpellBranch,
  Tag,
  Team,
  Effect, Item, Lvl, Skill, Statistic,
  Enemy, EnemyStats, EnemyWeapon, EnemyTechnique, EnemyItem, EnemyTeam,
  Event, EventTrigger,
];

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.database.host,
      port: config.database.port,
      username: config.database.user,
      password: config.database.pass,
      database: config.database.name,
      entities: entity,
      logging: true,
      logNotifications: true
    }),
    ArenaFloorModule,
    UsersModule,
    HeroModule,
    RaceModule,
    ClassModule,
    TechniqueModule,
    TeamModule,
    StatisticModule,
    ItemModule,
    EnemyModule,
    EventModule,
    SpellModule,
    TagModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
