import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class, ClassBonuses } from './class.model';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class) private classRepository: Repository<Class>,
    @InjectRepository(ClassBonuses) private ClassBonusesRepository: Repository<ClassBonuses>,
  ) {
  }
  
  async getClass(class_id: number) {
    const user = await this.classRepository.findOne({
      where: { id: class_id },
      cache: false,
    });
    
    if (!user) {
      throw new HttpException('Раса не найдена', HttpStatus.BAD_REQUEST);
    }
    
    return user;
  }
  
  async getClasses() {
    // TODO: Добавить параметры
    return await this.classRepository.find({ order: { id: 'ASC' }, where: { hidden: undefined }, relations: ['bonuses', 'tag'], cache: false });
  }
  
  async getClassBonuses(class_id: number) {
    return await this.ClassBonusesRepository.find({
      where: { class_id: class_id },
      cache: false,
    });
  }
}
