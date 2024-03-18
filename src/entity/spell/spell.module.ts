import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Spell } from './spell.model';
import { SpellController } from './spell.controller';
import { SpellService } from './spell.service';
import { SpellEffect } from './spell-effect.model';
import { SpellBranch } from './spell-branch.model';

@Module({
  imports: [TypeOrmModule.forFeature([Spell, SpellEffect, SpellBranch])],
  controllers: [SpellController],
  providers: [SpellService],
})
export class SpellModule {}
