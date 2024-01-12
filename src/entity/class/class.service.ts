import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class, ClassBonuses } from './class.model';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class) private classRepository: Repository<Class>,
    @InjectRepository(ClassBonuses) private classBonusesRepository: Repository<ClassBonuses>,
  ) {
  }
  
  async getClass(class_id: number) {
    const user = await this.classRepository.findOneBy({ id: class_id });
    
    if (!user) {
      throw new HttpException('Раса не найдена', HttpStatus.BAD_REQUEST);
    }
    
    return user;
  }
  
  async getClasses() {
    return await this.classRepository.find();
  }
  
  async getClassBonuses(class_id: number) {
    return await this.classBonusesRepository.findBy({ class_id: class_id });
  }
}
