import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './skill.model';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill) private skillsRepository: Repository<Skill>,
  ) {}

  // async createUser(dto: CreateUserDto) {
  //   return this.skillsRepository.create(dto);
  // }

  async getSkill(skill_id: number) {
    const user = await this.skillsRepository.findOneBy({ id: skill_id });

    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  async getSkills() {
    return await this.skillsRepository.find();
  }
}
