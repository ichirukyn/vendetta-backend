import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Technique } from './technique.model';
import { TechniqueController } from './technique.controller';
import { TechniqueService } from './technique.service';
import { TechniqueEffect } from './technique-effect.model';

@Module({
  imports: [TypeOrmModule.forFeature([Technique, TechniqueEffect])],
  controllers: [TechniqueController],
  providers: [TechniqueService],
})
export class TechniqueModule {}
