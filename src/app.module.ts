import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeroModule } from './entity/hero/hero.module';
import { Hero, HeroLvl, HeroStats, HeroTechnique } from './entity/hero/hero.model';
import { HeroSkills } from './entity/hero/hero-skills.model';
import { SkillModule } from './entity/skill/skill.module';
import { Skill } from './entity/skill/skill.model';
import { TechniqueModule } from './entity/technique/technique.module';
import { Technique, TechniqueEffect } from './entity/technique/technique.model';
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
import { Enemy, EnemyStats, EnemyTechnique, EnemyWeapon } from './entity/enemy/enemy.model';
import { EnemyModule } from './entity/enemy/enemy.module';
import { Event, EventTrigger } from './entity/event/event.model';
import { EventModule } from './entity/event/event.module';

const entity = [
  User,
  Hero, HeroStats, HeroSkills, HeroLvl, HeroTechnique,
  Race, RaceBonuses,
  Class, ClassBonuses,
  Technique, TechniqueEffect,
  Effect, Item, Lvl, Skill, Statistic,
  Enemy, EnemyStats, EnemyWeapon, EnemyTechnique,
  Event, EventTrigger
];

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${ process.env.NODE_ENV }`,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: entity,
      logging: true,
      logNotifications: true,
    }),
    UsersModule,
    HeroModule,
    SkillModule,
    RaceModule,
    ClassModule,
    TechniqueModule,
    StatisticModule,
    ItemModule,
    EnemyModule,
    EventModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
