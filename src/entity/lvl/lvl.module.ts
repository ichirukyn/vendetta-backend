import { Module } from '@nestjs/common';
import { LvlController } from './lvl.controller';
import { LvlService } from './lvl.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lvl } from './lvl.model';

@Module({
  imports: [TypeOrmModule.forFeature([Lvl])],
  controllers: [LvlController],
  providers: [LvlService],
  exports: [LvlService],
})

export class LvlModule {}
