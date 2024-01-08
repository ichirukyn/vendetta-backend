import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hero } from '../hero/hero.model';

@Module({
  imports: [TypeOrmModule.forFeature([User, Hero])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
