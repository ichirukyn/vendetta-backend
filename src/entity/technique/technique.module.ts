import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Technique, TechniqueEffect } from './technique.model';
import { TechniqueController } from './technique.controller';
import { TechniqueService } from './technique.service';

@Module({
  imports: [TypeOrmModule.forFeature([Technique, TechniqueEffect])],
  controllers: [TechniqueController],
  providers: [TechniqueService],
})
export class TechniqueModule {}
