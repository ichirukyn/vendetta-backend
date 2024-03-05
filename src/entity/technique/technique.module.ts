import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Technique } from './technique.model';
import { TechniqueController } from './technique.controller';
import { TechniqueService } from './technique.service';
import { TechniqueEffect } from './technique-effect.model';
import { TechniqueBranch } from './technique-branch.model';

@Module({
  imports: [TypeOrmModule.forFeature([Technique, TechniqueEffect, TechniqueBranch])],
  controllers: [TechniqueController],
  providers: [TechniqueService],
})
export class TechniqueModule {}
