import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Race, RaceBonuses } from './race.model';
import { Class } from '../class/class.model';
import { QueryRaceDto } from './race.controller';

@Injectable()
export class RaceService {
  constructor(
    @InjectRepository(Race) private racesRepository: Repository<Race>,
    @InjectRepository(Class) private classRepository: Repository<Class>,
    @InjectRepository(RaceBonuses) private raceBonusesRepository: Repository<RaceBonuses>,
  ) {
  }
  
  async getRace(race_id: number, { hidden }: QueryRaceDto) {
    const user = await this.racesRepository.findOne({
      where: { id: race_id, hidden },
      cache: false,
    });
    
    if (!user) {
      throw new HttpException('Раса не найдена', HttpStatus.BAD_REQUEST);
    }
    
    return user;
  }
  
  async getRaces({ hidden }: QueryRaceDto) {
    return await this.racesRepository.find({ order: { id: 'ASC' }, where: { hidden: undefined }, relations: ['bonuses', 'tag'], cache: false });
  }
  
  async getRaceBonuses(race_id: number) {
    return await this.raceBonusesRepository.find({
      where: { race_id: race_id },
      cache: false,
    });
  }
  
  async getClassByRace(race_id?: number) {
    return await this.classRepository.find({
      where: { race_id: race_id },
      cache: false,
    });
  }
}
