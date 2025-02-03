import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hero } from '../hero/hero.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Hero) private usersHeroRepository: Repository<Hero>,
  ) {}
  
  async createUser(dto: CreateUserDto) {
    let user = this.usersRepository.create(dto);
    return await this.usersRepository.save(user);
  }
  
  async getUser(chat_id: string) {
    const user = await this.usersRepository.findOneBy({ chat_id: chat_id });
    
    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST);
    }
    
    return user;
  }
  
  async getUserChatId(user_id: number) {
    const user = await this.usersRepository.findOneBy({ id: user_id });
    
    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST);
    }
    
    return user.chat_id;
  }
  
  async getUsers() {
    return await this.usersRepository.find();
  }
  
  
  // Hero
  async getUserHero(user_id: number) {
    const hero = await this.usersHeroRepository.findOne({
      relations: ['user', 'race', 'class'],
      where: { user: { id: user_id } },
    });
    if (!hero) {
      throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST);
    }
    
    return hero;
  }
}
